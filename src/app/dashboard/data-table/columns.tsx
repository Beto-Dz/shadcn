"use client";

import { Badge } from "@/components/ui/badge";
import { Payment } from "@/data/payments.data";
import { Column, ColumnDef, SortDirection } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

// pequeño componente para definir el icono
const SortedIcon = ({ isSorted }:{ isSorted: false | SortDirection })  => {
  if( isSorted === 'asc' ) {
    return <ChevronUp className="ml-2 h-4 w-4" />
  } else if( isSorted === 'desc' ) {
    return <ChevronDown className="ml-2 h-4 w-4" />
  }

  return null;
}

// pequeño componente para reutilizar el button
const SortButton = ({ column, text }: { column: Column<any, any>, text: string }) => {
  return <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
    { text }
    < SortedIcon isSorted={column.getIsSorted()} /> 
  </Button>
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "clientName",
    header: ({ column }) => {
      return (
        <SortButton column={column} text="Nombre de cliente"  />
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <SortButton column={column} text="Correo electrónico"  />
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <SortButton column={column} text="Estatus"  />
      )
    },
    cell: ({ row }) => {
      // de la fila, recuperando el valor de status
      const status = row.getValue("status") as string;

      // del obj accedemos a la llave correspondiente y si no un default
      const variant =
        {
          pending: "outline",
          processing: "secondary",
          failed: "destructive",
          success: "custom",
        }[status] ?? ("default" as any);

      return (
        <div className="flex justify-center">
          <Badge variant={variant} capitalize>
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    // el header perfectamente puede ser un jsx
    header: ({ column }) => {
      return (
        <SortButton column={column} text="Cantidad"  />
      )
    },
    // de la celda, tomamos la fila
    cell: ({ row }) => {
      // de la fila accedemos al valor amount (accessorKey)
      const amount = parseFloat(row.getValue("amount"));
      // aplicamos el formateo de la moneda a dolar usa
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      // retornamos en la celda, el valor formateado
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  // para las acciones no vamos a poner un header
  {
    id: "actions",
    cell: ({ row }) => {
      // obtenemos la información de la fila en 'original', es decir sin cambios que hayan ocurrido en cada celda
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                const promise = navigator.clipboard.writeText(payment.id);

                toast.promise(promise, {
                  loading: "copiando...",
                  success: `Se ha copiado el id al portapapeles!`,
                  error: "error...",
                  position: "top-right",
                });
              }}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
