import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Settings2, ChevronsUpDown, Download, Plus, Trash } from "lucide-react";
import { useMemo, useCallback } from "react";

interface DataTableActionsProps<TData> {
  table: Table<TData>;
  translations: Record<string, string>;
  newResource?: () => void;
  onExport?: () => void;
  onDeleteSelected?: () => void;
}

export function DataTableActions<TData>({
  table,
  translations,
  newResource,
  onExport,
  onDeleteSelected,
}: DataTableActionsProps<TData>) {
  const hasSelectedItems = table.getFilteredSelectedRowModel().rows.length > 0;
  
  const translateColumnName = useCallback((columnId: string): string => {
    return translations[columnId] || columnId;
  }, [translations]);

  return (
    <div className="flex items-center gap-2 ml-auto">
      {hasSelectedItems && (
        <Button onClick={onDeleteSelected} variant="destructive">
          <Trash size={18} className="m-auto lg:mr-2" />
          <span className="hidden lg:block">
            Eliminar ({table.getFilteredSelectedRowModel().rows.length})
          </span>
        </Button>
      )}
      
      {newResource && (
        <Button variant="outline" onClick={newResource}>
          <Plus size={18} className="m-auto lg:mr-2" />
          <span className="hidden lg:block">Nuevo</span>
        </Button>
      )}
      
      {onExport && (
        <Button variant="outline" onClick={onExport}>
          <Download size={18} className="m-auto lg:mr-2" />
          <span className="hidden lg:block">Exportar</span>
        </Button>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Settings2 size={18} className="m-auto lg:mr-2" />
            <div className="hidden md:flex gap-2 items-center">
              Visualizar
              <ChevronsUpDown size={14} />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {translateColumnName(column.id)}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}