import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {DataTableColumnHeader} from "@/components/table/datatable-column-header";
import {DataTableRowSelectionHeader} from "@/components/table/datatable-row-selection-header";
import {DataTableRowSelectionCell} from "@/components/table/datatable-row-selection-cell";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableRowSelectionHeader table={table} />,
    cell: ({ row }) => <DataTableRowSelectionCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader title="Nombre" column={column} />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader title="Descripción" column={column} />
    ),
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate" title={row.getValue("description")}>
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "purchase_price",
    header: ({ column }) => (
      <DataTableColumnHeader title="Precio de Compra" column={column} />
    ),
    cell: ({ row }) => {
      const value = row.getValue("purchase_price");
      return value ? `${parseFloat(value as string).toFixed(2)} Bs` : "-";
    },
  },
  {
    accessorKey: "sale_price",
    header: ({ column }) => (
      <DataTableColumnHeader title="Precio de Venta" column={column} />
    ),
    cell: ({ row }) => {
      const value = row.getValue("sale_price");
      return value ? `${parseFloat(value as string).toFixed(2)} Bs` : "-";
    },
  },
  {
    accessorKey: "is_excluded",
    header: ({ column }) => (
      <DataTableColumnHeader title="Excluido" column={column} />
    ),
    cell: ({ row }) => (
        <Badge
          variant={row.getValue("is_excluded") ? "success" : "bordered"}>
          {row.getValue("is_excluded") ? "Sí" : "No"}
        </Badge>
      )
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader title="Fecha Creación" column={column} />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(String(row.original.id))
            }
          >
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Ver</DropdownMenuItem>
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuItem>Eliminar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];