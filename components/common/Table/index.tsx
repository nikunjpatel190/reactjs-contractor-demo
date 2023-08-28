import React from "react"
import { ContractorType } from "@/types";
import { Column, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from "react-table";


const Table: React.FC<{ data: ContractorType[], columns: Column<ContractorType>[] }> = (props) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable({ columns: props.columns, data: props.data },
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

  return (<table {...getTableProps()} className="min-w-full rounded-sm">
    <thead className="bg-white">
      {headerGroups.map(headerGroup => (
        <>
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                scope="col"
                className="group px-6 py-3 text-left thead-text uppercase tracking-wider"
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        </>
      ))}
    </thead>
    <tbody {...getTableBodyProps()} className="bg-white">
      {rows.map(row => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()} className={`${row.isSelected ? 'selected' : ''}`}>
            {row.cells.map(cell => {
              return (
                <td
                  {...cell.getCellProps()}
                  className="px-6 py-5 whitespace-nowrap"
                  role="cell"
                >
                  {cell.render('Cell')}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
  )
}

export default Table
