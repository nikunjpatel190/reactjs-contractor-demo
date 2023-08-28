import Layout from "../components/layout"
import gql from "graphql-tag"
import client from "../lib/apollo-client"
import React, { useState } from "react"
import { ContractorType } from "@/types";
import { CellProps, Column, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import { classNames } from "@/components/common/Utils";
import CustomTable from "@/components/CustomTable";


const Home: React.FC<{ data: { list: ContractorType[] } }> = (props) => {

  const [contractorList, setContractorList] = useState<ContractorType[]>(props.data.list)
  const [filterModel, setFilterModel] = React.useState(false);

  const handleFilterModel = () => {
    setFilterModel(!filterModel);
  }
  const columns: Column<ContractorType>[] = React.useMemo(() => {
    return [
      {
        Header: "Name",
        accessor: 'name',
        Cell: ({ value, row }: CellProps<ContractorType>) => {
          return (
            <div className="flex items-center">
              <div className="">
                <span style={{ backgroundColor: row.original?.color }} className="px-3 py-2 uppercase leading-wide font-bold text-xs rounded-lg shadow-sm text-white">{value?.charAt(0)}</span>
              </div>
              <div className="ml-4">
                <div className="text-sm theme-text">{value}</div>
              </div>
            </div>
          )
        }
      },
      {
        Header: "Specialities",
        accessor: 'specialities',
        Cell: ({ value }: CellProps<ContractorType>) => {
          return Array.isArray(value) && value?.map((sp, index: number) => {
            return (
              <span
                key={index + '-int'}
                className={
                  classNames(
                    "pills-text"
                  )
                }
              >
                {sp.value}
              </span>
            );
          })

        }
      },
      {
        Header: "Day Rate",
        accessor: 'dayrate',
      },
      {
        Header: "Availability",
        accessor: 'availability',
        Cell: ({ value }: CellProps<ContractorType>) => <>{value ? 'Yes' : 'No'}</>
      },
    ]
  }, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({ columns: columns, data: contractorList },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <input
                type="checkbox"
                {...getToggleAllRowsSelectedProps()}
              />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <input
                type="checkbox"
                {...row.getToggleRowSelectedProps()}
              />
            </div>
          ),
          disableSortBy: true
        },
        ...columns,
      ]);
    }
  )

  return (
    <Layout>
      <div className='mx-auto max-w-5xl py-6 sm:px-6 lg:px-8 mt-20'>
        <div className="container mx-auto">
          <div className="mb-9">
            <p className="page-title">Contractors</p>
            <p className='page-description'>Lorem ipsum dolor sit amet consectetur. Lacus semper convallis non et vel nec sit proin. </p>
          </div>
          <div className="">
           <CustomTable {...props} />
          </div>

        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query ContractorQuery {
        list {
          id,
          name,
          email,
          dayrate,
          availability,
          color,
          specialities {
            id,
            key,
            value
          }
        }
      }
    `,
  });

  return {
    props: {
      data
    },
  };
}

export default Home


