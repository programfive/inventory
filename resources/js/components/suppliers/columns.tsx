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
import { DataTableColumnHeader } from "@/components/table/datatable-column-header";
import { DataTableRowSelectionHeader } from "@/components/table/datatable-row-selection-header";
import { DataTableRowSelectionCell } from "@/components/table/datatable-row-selection-cell";
import { Supplier } from "@/types"; 
import { Badge } from "@/components/ui/badge";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { DeleteDialog } from "../dialogs/delete-dialog";

const handleEditResource = (supplier: Supplier) => {
  router.get(`/administration/suppliers/${supplier.id}/edit`);
};

export const columns: ColumnDef<Supplier>[] = [
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
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader title="Dirección" column={column} />
    ),
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate" title={row.getValue("address")}>
        {row.getValue("address") || "-"}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader title="Teléfono" column={column} />
    ),
    cell: ({ row }) => row.getValue("phone") || "-",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader title="Correo electrónico" column={column} />
    ),
    cell: ({ row }) => row.getValue("email") || "-",
  },
  {
    accessorKey: "contact_person",
    header: ({ column }) => (
      <DataTableColumnHeader title="Persona de contacto" column={column} />
    ),
    cell: ({ row }) => row.getValue("contact_person") || "-",
  },
  {
    accessorKey: "nit",
    header: ({ column }) => (
      <DataTableColumnHeader title="NIT" column={column} />
    ),
    cell: ({ row }) => row.getValue("nit") || "-",
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => (
      <DataTableColumnHeader title="Estado" column={column} />
    ),
    cell: ({ row }) => (
      <Badge variant={row.getValue("is_active") ? "success" : "bordered"}>
        {row.getValue("is_active") ? "Activo" : "Inactivo"}
      </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader title="Fecha de creación" column={column} />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const supplier = row.original;
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

      const handleDeleteResource = () => {
        router.delete(`/administration/suppliers/${supplier.id}/delete`);
        setIsDeleteDialogOpen(false);
      };

      const handleShowResource = () => {
        router.get(`/administration/suppliers/${supplier.id}/show`);
      };

      return (
        <>
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
                onClick={() => navigator.clipboard.writeText(supplier.id.toString())}
              >
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleShowResource}>Ver</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEditResource(supplier)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteDialog
            description="Esta acción eliminará el proveedor permanentemente. ¿Deseas continuar?"
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleDeleteResource}
          />
        </>
      );
    },
  },
];