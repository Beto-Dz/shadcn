"use client";

import { Badge } from "@/components/ui/badge";
import { Payment } from "@/data/payments.data";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "clientName",
    header: "Nombre Cliente",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Estatus</div>,
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
          <Badge variant={variant} capitalize >{status}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    // el header perfectamente puede ser un jsx
    header: () => <div className="text-center">Cantidad</div>,
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
];
