"use client";
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from "lucide-react";

export default function Table({ 
  TableHeads, 
  TableRows, 
  headClass = "", 
  tableClass = "",
  searchPlaceholder = "Search...",
  filtersComponent,
  externalColumnFilters
}) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [localColumnFilters, setLocalColumnFilters] = useState([]);

  const activeColumnFilters = externalColumnFilters !== undefined ? externalColumnFilters : localColumnFilters;

  const columns = React.useMemo(
    () =>
      TableHeads.map((head) => ({
        accessorKey: head.key,
        header: head.Title,
        filterFn: head.filterFn, /* HERE IS THE FIX */
        cell: (info) => {
          if (head.render) {
            return head.render(info.row.original, info.row.index);
          }
          return info.getValue();
        },
        size: head.width,
        enableSorting: head.sortable !== false,
      })),
    [TableHeads]
  );

  // 2. Initialize the table
  const table = useReactTable({
    data: TableRows,
    columns,
    state: {
      sorting,
      globalFilter,
      columnFilters: activeColumnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: externalColumnFilters !== undefined ? undefined : setLocalColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="w-full bg-white">
      {/* ==== GLOBAL FILTER (SEARCH) AND FILTERS ROW ==== */}
      <div className="flex md:flex-row flex-col justify-between items-center mb-6">
        <div className="w-1/2 max-w-full md:max-w-xl">
          <input
            type="text"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none text-gray-600 placeholder-gray-400 focus:border-gray-300 bg-white"
          />
        </div>
        
        {filtersComponent && (
          <div className="flex items-center gap-4">
            {filtersComponent}
          </div>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <table className={`w-full text-left border-collapse ${tableClass}`}>
          {/* ==== TABLE HEADER ==== */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-100">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`py-4 px-2 font-semibold text-[#344054] select-none ${headClass}`}
                    style={{ width: header.column.columnDef.size }}
                  >
                    <div 
                      className={`flex items-center gap-2 ${header.column.getCanSort() ? 'cursor-pointer hover:text-gray-700' : ''}`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      
                      {header.column.getCanSort() && (
                        <span className="text-gray-400">
                          {{
                            asc: <ArrowUp size={14} className="text-gray-600" />,
                            desc: <ArrowDown size={14} className="text-gray-600" />,
                          }[header.column.getIsSorted()] ?? <ArrowUpDown size={14} />}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* ==== TABLE BODY ==== */}
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 last:border-none hover:bg-gray-50/50 transition-all">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-5 px-2 text-[#101828]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        {table.getRowModel().rows.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            No results found.
          </div>
        )}
      </div>

      {/* ==== PAGINATION CONTROLS ==== */}
      <div className="flex items-center justify-between py-4 px-2 mt-4 border border-gray-100 rounded-lg">
        <div className="text-sm text-gray-500">
          Page <span className="font-semibold text-gray-700">{table.getState().pagination.pageIndex + 1}</span> of{" "}
          <span className="font-semibold text-gray-700">{table.getPageCount() || 1}</span>
        </div>
          
          <div className="flex items-center gap-3">
              <button
                  className="p-2.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
              >
                  <ChevronLeft size={18} />
              </button>
              
              <div className="flex items-center gap-1.5">
                  {table.getPageOptions().map((pageIdx) => (
                      <button
                          key={pageIdx}
                          className={`w-9 h-9 rounded-lg border text-sm font-medium transition-all ${
                              table.getState().pagination.pageIndex === pageIdx
                                  ? "bg-[#2B7FFF] text-white border-[#2B7FFF]"
                                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => table.setPageIndex(pageIdx)}
                      >
                          {pageIdx + 1}
                      </button>
                  ))}
              </div>

              <button
                  className="p-2.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
              >
                  <ChevronRight size={18} />
              </button>
        </div>
      </div>
    </div>
  );
}
