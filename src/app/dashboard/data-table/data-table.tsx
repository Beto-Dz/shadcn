"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  Table as dTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,} from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const InputFilterComponent = ({ table, placeholder, columnName }: { table: dTable<any>; placeholder: string; columnName: string; }) => {
  return (
    <Input
      placeholder={placeholder}
      value={(table.getColumn(columnName)?.getFilterValue() as string) ?? ""}
      onChange={(event) => table.getColumn(columnName)?.setFilterValue(event.target.value)}
      className="max-w-sm"
    />
  );
};

const SelectFilterComponent = ( { table, }: { table: dTable<any>;}) => {

  const [value, setValue] = useState<string>("all");

  return (
    <Select value={value} onValueChange={ (newValue) => {
      setValue(newValue);

      if( newValue === 'all' ){
        table.getColumn("status")?.setFilterValue(undefined)
        return;
      }

      table.getColumn("status")?.setFilterValue(newValue)
    } } >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Estatus - all" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Estatus</SelectLabel>
          <SelectItem value="all">all</SelectItem>
          <SelectItem value="pending">pending</SelectItem>
          <SelectItem value="processing">processing</SelectItem>
          <SelectItem value="failed">failed</SelectItem>
          <SelectItem value="success">success</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export function DataTable<TData, TValue>({ columns, data, }: DataTableProps<TData, TValue>) {
  // estado para el ordenamiento
  const [sorting, setSorting] = useState<SortingState>([]);

  // estado para filtrar dinamicamente
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // hook para la tabla
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold text-2xl">Tabla con tanstack table</h2>

      <div className="flex justify-evenly bg-emerald-50">
        <span>Filtros:</span>
        <InputFilterComponent
          table={table}
          placeholder="Filtrar nombres..."
          columnName="clientName"
        />
        <InputFilterComponent
          table={table}
          placeholder="Filtrar correos..."
          columnName="email"
        />
        <SelectFilterComponent table={table} />
      </div>

      <div className="rounded-md border">
        <Table className="text-center">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-center bg-sky-100"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="odd:bg-sky-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* controles */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
