import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useEffect } from "react";

interface PropsPaginaciónTabla<TData> {
  table: Table<TData>;
}

export default function PaginaciónTabla<TData>({
  table,
}: PropsPaginaciónTabla<TData>) {
  useEffect(() => {
    table.setPageSize(10);
  }, []);

  const tamañosPagina = Array.from(
    new Set([5, 10, 15, 25, 50, table.getFilteredRowModel().rows.length])
  );

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full px-2 py-4 ">
      <div className="text-sm text-muted-foreground order-2 md:order-1 mt-4 md:mb-0">
        {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
      </div>
      
      <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-end space-y-4 md:space-y-0 md:space-x-6 order-1 md:order-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Filas por página</span>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-16 text-xs ">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {tamañosPagina.map((tamañoPagina) => (
                <SelectItem key={tamañoPagina} value={`${tamañoPagina}`}>
                  {tamañoPagina}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded "
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Primera página</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded "
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Página anterior</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded "
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Página siguiente</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded "
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Última página</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}