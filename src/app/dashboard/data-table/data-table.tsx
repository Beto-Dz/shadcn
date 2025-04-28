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
  VisibilityState,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Payment } from "@/data/payments.data";

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

const SelectFilterComponent = ( { table }: { table: dTable<any>;}) => {

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

  // estado para la visibilidad de columnas
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  // VisibilityState es de tipo record, lo que significa que en este caso es algo como:
  // {
  //   amount: true,
  //   status: true,
  //   email: true,
  //   clientName: true,
  // }

  // estado para la seleccion de filas
  const [rowSelection, setRowSelection] = useState({});

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
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    },
  });

  // simulacion de eliminación
  const dropsimulation = () => {
    // recorriendo las filas (son ids)
    table.getSelectedRowModel().rows.forEach( (row, index) => {
      // obteniendo la data en original de la fila
      const dataOriginal = row.original as Payment;

      const retraso:number = 1000 * (index + 1);

      // promesa para el toats
      const promise = new Promise((resolv, ) => setTimeout( () => resolv(true), retraso ));

      // usando el toast
      toast.promise(promise, {
          loading: `eliminando a ${dataOriginal.clientName}...`,
          success: `Se la eliminado ${dataOriginal.clientName}`,
          error: `Ha ocurrido un error`,
          position: "top-right",
        },
      );
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold text-2xl">Tabla con tanstack table</h2>

      <div className="flex justify-evenly">
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

      <div className="flex justify-end gap-3">
        <Button variant="destructive" onClick={dropsimulation} disabled={Object.keys(rowSelection).length <= 0} >
            <Trash2 className="h-4 w-4" />
        </Button>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="success">
                Columnas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide() && column.id !== 'actions')
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
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
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
        </div>
        <div>
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
