import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DatatablePagination from "@/components/table/datatable-pagination";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Settings2, ChevronsUpDown, Search, Download, Plus, CalendarIcon, Trash } from "lucide-react";
import { format, isAfter, isBefore, isEqual, parseISO } from "date-fns"
import { DateRange } from "react-day-picker"
import { es } from 'date-fns/locale'; 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DeleteDialog } from "@/components/dialogs/delete-dialog";

interface DatatableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  caption?: string;
  globalFilterColumn?: string;
  dateColumn?: keyof TData; 
  translations: Record<string, string>;
  handleExport?:()=>void;
  newResource?:()=>void;
  onDeleteSelected?: (selectedItems: TData[]) => void
}

export function DataTable<TData, TValue>({
  data,
  columns,
  caption,
  globalFilterColumn,
  dateColumn,
  translations,
  handleExport,
  newResource,
  onDeleteSelected
}: DatatableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 10,
    pageIndex: 0,
  });
  
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [filteredData, setFilteredData] = useState<TData[]>(data);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    if (!dateColumn || !date || !date.from) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) => {
      const itemDate = item[dateColumn];
      if (!itemDate) return false;
      
      const itemDateObj = typeof itemDate === 'string' 
        ? parseISO(itemDate) 
        : itemDate instanceof Date 
          ? itemDate 
          : new Date(itemDate as any);
      
      const isInRange = (
        (date.from && (isAfter(itemDateObj, date.from) || isEqual(itemDateObj, date.from))) &&
        (!date.to || (isBefore(itemDateObj, date.to) || isEqual(itemDateObj, date.to)))
      );
      
      return isInRange;
    });
    
    setFilteredData(filtered);
  }, [data, date, dateColumn]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const hasSelectedItems = table.getFilteredSelectedRowModel().rows.length > 0;
  const translateColumnName = (columnId: string): string => {
    return translations[columnId] || columnId;
  };

  const clearDateFilter = () => {
    setDate(undefined);
  };
  const getSelectedItems = () => {
    const selectedRowIndices = Object.keys(rowSelection).map(Number)
    const selectedItems = selectedRowIndices.map(index => data[index])
    
    return selectedItems
  }
  const handleDeleteSelected = () => {
    const selectedItems = getSelectedItems();
    if (onDeleteSelected) {
      onDeleteSelected(selectedItems);
    }
    setIsDeleteDialogOpen(false);
    
    setRowSelection({});
  }
  return (
    <>
      <DeleteDialog 
        isOpen={isDeleteDialogOpen}
        description="Esta acción eliminará los productos seleccionados permanentemente. ¿Deseas continuar?"
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteSelected}
      />
      <div className="space-y-4 ">
        <div className="flex items-center lg:flex-row-reverse gap-2 justify-between flex-wrap lg:flex-nowrap">
          <div className="flex items-center gap-2 ml-auto">
            {hasSelectedItems && (
              <Button onClick={()=>setIsDeleteDialogOpen(true)} variant="destructive">
                <Trash size={18} className="m-auto lg:mr-2" />
                <span className="hidden lg:block">Eliminar ({table.getFilteredSelectedRowModel().rows.length})</span>
              </Button>
            )}
            {newResource && (
              <Button variant="outline" onClick={newResource}>
                <Plus size={18} className="m-auto lg:mr-2" />
                <span className="hidden lg:block">Nuevo</span>
              </Button>
            )}
            
            {handleExport && (
              <Button variant="outline" onClick={handleExport}>
                <Download size={18} className=" m-auto lg:mr-2" />
                <span className="hidden lg:block">Exportar</span>
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Settings2 size={18} className=" m-auto lg:mr-2" />
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
                        {translateColumnName(column.id)}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex w-full md:flex-row-reverse gap-2">
          {globalFilterColumn && (
            <Input
              startIcon={Search}
              placeholder="Buscar..."
              value={
                (table
                  .getColumn(globalFilterColumn)
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn(globalFilterColumn)
                  ?.setFilterValue(event.target.value)
              }
              className="w-full lg:max-w-md"
            />
            
          )}
          {dateColumn && (
            <div className="flex gap-2 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal")}
                  >
                    <CalendarIcon size={18} className=" m-auto lg:mr-2" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "dd/MM/yyyy")} -{" "}
                          {format(date.to, "dd/MM/yyyy")}
                        </>
                      ) : (
                        format(date.from, "dd/MM/yyyy")
                      )
                    ) : (
                      <span className="hidden lg:block">Filtrar por fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    locale={es}
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                  {date && (
                    <div className="p-3 border-t border-border">
                      <Button variant="ghost" size="sm" onClick={clearDateFilter}>Limpiar filtro</Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          )}
          </div>
        </div>

        <div className="rounded-md border grid grid-cols-1 w-full overflow-x-auto">
          <Table>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
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
                    No hay resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DatatablePagination table={table} />
      </div>
    </>
  );
}