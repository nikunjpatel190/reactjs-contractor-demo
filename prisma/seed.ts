import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const contractorData: Prisma.ContractorCreateInput[] = [
  {
    name: 'Strykes',
    email: 'strykes@test.com',
    dayrate: 30000,
    availability: true,
    color: '#3F893E',
    specialities: {
      create: [
        {
          key : 'surgery',
          value: 'Surgery'
        },
        {
          key : 'medical',
          value: 'Medical'
        },
      ],
    },
  },
  {
    name: 'Rossonerri',
    email: 'rossonerri@test.com',
    dayrate: 25000,
    availability: false,
    color: '#3E4589',
    specialities: {
      create: [
        {
          key : 'healthcare',
          value: 'Healthcare'
        },
        {
          key : 'fitness',
          value: 'Fitness'
        },
      ],
    },
  },
  {
    name: 'Tyga',
    email: 'tyga@test.com',
    dayrate: 19900,
    availability: false,
    color: '#883E89',
    specialities: {
      create: [
        {
          key : 'surgery',
          value: 'Surgery'
        },
        {
          key : 'medical',
          value: 'Medical'
        },
      ],
    },
  },
  {
    name: 'Yolo.corp',
    email: 'yolo.corp@test.com',
    dayrate: 20000,
    availability: true,
    color: '#89863E',
    specialities: {
      create: [
        {
          key : 'automotive',
          value: 'Automotive'
        },
        {
          key : 'modification',
          value: 'Modification'
        },
      ],
    },
  },
  {
    name: 'Bardi',
    email: 'bardi@test.com',
    dayrate: 10000,
    availability: true,
    color: '#893E3E',
    specialities: {
      create: [
        {
          key : 'technology',
          value: 'Technology'
        },
        {
          key : 'home_living',
          value: 'Home Living'
        },
      ],
    },
  },
  {
    name: 'Jecob',
    email: 'jecob@test.com',
    dayrate: 24000,
    availability: true,
    color: '#3F893E',
    specialities: {
      create: [
        {
          key : 'surgery',
          value: 'Surgery'
        },
        {
          key : 'medical',
          value: 'Medical'
        },
      ],
    },
  },
  {
    name: 'Joe',
    email: 'joe@test.com',
    dayrate: 12000,
    availability: true,
    color: '#3E4589',
    specialities: {
      create: [
        {
          key : 'healthcare',
          value: 'Healthcare'
        },
        {
          key : 'fitness',
          value: 'Fitness'
        },
      ],
    },
  },
  {
    name: 'Isa',
    email: 'isa@test.com',
    dayrate: 16000,
    availability: true,
    color: '#883E89',
    specialities: {
      create: [
        {
          key : 'surgery',
          value: 'Surgery'
        },
        {
          key : 'medical',
          value: 'Medical'
        },
      ],
    },
  },
  {
    name: 'Robert',
    email: 'robert@test.com',
    dayrate: 33000,
    availability: true,
    color: '#89863E',
    specialities: {
      create: [
        {
          key : 'automotive',
          value: 'Automotive'
        },
        {
          key : 'modification',
          value: 'Modification'
        },
      ],
    },
  },
  {
    name: 'Laz',
    email: 'laz@test.com',
    dayrate: 46000,
    availability: true,
    color: '#893E3E',
    specialities: {
      create: [
        {
          key : 'technology',
          value: 'Technology'
        },
        {
          key : 'home_living',
          value: 'Home Living'
        },
      ],
    },
  },
]

export async function main() {
  try {
    console.log(`Start seeding ...`)
    // for (const u of userData) {
    //   const user = await prisma.user.create({
    //     data: u,
    //   })
    //   console.log(`Created user with id: ${user.id}`)
    // }
    for (const u of contractorData) {
      const user = await prisma.contractor.create({
        data: u,
      })
      console.log(`Created contractor with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
