import { createYoga } from 'graphql-yoga'
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";

import type PrismaTypes from "@pothos/plugin-prisma/generated";
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/prisma'

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  }
})

builder.queryType({})

builder.mutationType({})

builder.prismaObject("Contractor", {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    name: t.exposeString('name', { nullable: true }),
    dayrate: t.exposeFloat('dayrate'),
    availability: t.exposeBoolean('availability'),
    specialities: t.relation('specialities'),
    color: t.exposeString('color', { nullable: true }),
  })
})


builder.prismaObject("Specialities", {
  fields: (t) => ({
    id: t.exposeID('id'),
    key: t.exposeString('key'),
    value: t.exposeString('value'),
  })
})

builder.queryField('list', (t) =>
  t.prismaField({
    type: ['Contractor'],
    resolve: async (query, _parent, _args, _info) =>
      prisma.contractor.findMany({
        ...query,
        include: {
          specialities: true,
        },
      })
  })
)

builder.queryField('filterContractor', (t) =>
  t.prismaField({
    type: ['Contractor'],
    args: {
      searchString: t.arg.string({ required: false })
    },
    resolve: async (query, _parent, args, _info) => {
      const or = args.searchString
        ? {
          OR: [
            { name: { contains: args.searchString } },
            {
              specialities: {
                some: {
                  value: {
                    contains: args.searchString
                  }
                }
              }
            },
          ],
        }
        : {}
      return prisma.contractor.findMany({
        ...query,
        include: {
          specialities: true,
        },
        where: { ...or }
      })
    }
  })
)

builder.mutationField('createContractor', (t) =>
  t.prismaField({
    type: 'Contractor',
    args: {
      name: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
      dayrate: t.arg.float({ required: true }),
      color: t.arg.string(),
      availability: t.arg.boolean({ defaultValue: true, required: true })
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.contractor.create({
        ...query,
        data: {
          name: args.name,
          email: args.email,
          color: args.color,
          availability: args.availability,
          dayrate: args.dayrate
          // author: {
          //   connect: { email: args.authorEmail }
          // }
        }
      })
  })
)

const schema = builder.toSchema()

export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema,
  graphqlEndpoint: '/api/graphql'
})

export const config = {
  api: {
    bodyParser: false
  }
}