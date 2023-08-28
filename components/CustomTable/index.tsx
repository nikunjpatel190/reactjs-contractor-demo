import gql from "graphql-tag"
import client from "../../lib/apollo-client"
import React, { useState } from "react"
import { ContractorType } from "@/types";
import { CellProps, Column } from "react-table";
import { classNames } from "@/components/common/Utils";
import { SearchIcon } from "@/components/Icons/SearchIcon";
import { FilterIcon } from "@/components/Icons/FilterIcon";
import Table from "../common/Table";
import SearchModel from "./SearchModel";


const CustomTable: React.FC<{ data: { list: ContractorType[] } }> = (props) => {

  const [contractorList, setContractorList] = useState<ContractorType[]>(props.data.list)
  const [filterModel, setFilterModel] = React.useState(false);
  const [value, setValue] = useState('')

  const getFilteredData = async (searchString: string) => {
    const { data } = await client.query({
      query: gql`
        query filterContractor($id: String!) {
          filterContractor(searchString: $id){
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
      variables: { id: searchString },
    });
    if (Array.isArray(data.filterContractor)) {
      setContractorList(data.filterContractor)
    }
  }

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

  return (
    <>
    <div className="my-4 flex flex-col shadow-2xl">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle  inline-block min-w-full sm:px-6 lg:px-8">
          <div className='px-4 gap-x-2 items-baseline mb-4 mt-4 w-full'>
            <div className="relative rounded-md ">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                {/* <Image alt="-" width={10} height={10} src={`/assets/images/search-sm.svg`} /> */}
                <SearchIcon />
              </div>
              <input
                type="text"
                name="price"
                id="price"
                style={{
                  paddingTop: '12px',
                  paddingBottom: '12px',
                }}
                value={value || ""}
                onChange={e => {
                  setValue(e.target.value);
                  getFilteredData(e.target.value);
                }}
                className="header-search-input rounded-md border-0 pl-9 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm  w-10/12"
                placeholder="Search..."
              />

              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  onClick={() => handleFilterModel()}
                  className='filter-btn'
                >
                  <span className='me-2 filter-text'>Filters</span>
                  {/* <Image alt="-" width={10} height={10} className='inline me-1' src={`/assets/images/sliders-02.svg`} /> */}
                  <FilterIcon className='inline' />

                </button>
              </div>
            </div>
          </div>
          <Table columns={columns} data={contractorList}/>
        </div>
      </div>
    </div>
    <SearchModel data={props.data.list} open={filterModel} handleFilterModel={handleFilterModel} />
    </>
  )
}

export default CustomTable

