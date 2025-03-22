import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DatatablePagination from "@/components/table/datatable-pagination";
import { useMemo, useState, useCallback } from "react";
import { isAfter, isBefore, isEqual, parseISO } from "date-fns";
import { DateRange } from "react-day-picker";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { ExportDialog } from "../dialogs/export-dialog";
import { DataTableActions } from "./data-table-actions";
import { DataTableFilters } from "./data-table-filters";
import { DataTableContent } from "./data-table-content";

export type ExportFormat = "pdf" | "excel" | "json";

interface DatatableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  caption?: string;
  globalFilterColumn?: string;
  dateColumn?: keyof TData; 
  translations: Record<string, string>;
  onExport?: (params:URLSearchParams) => void;
  newResource?: () => void;
  onDeleteSelected?: (selectedItems: TData[]) => void;
}

export function DataTable<TData, TValue>({
  data,
  columns,
  caption,
  globalFilterColumn,
  dateColumn,
  translations,
  onExport,
  newResource,
  onDeleteSelected
}: DatatableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 10,
    pageIndex: 0,
  });
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  const filteredData = useMemo(() => {
    if (!dateColumn || !date || !date.from) {
      return data;
    }

    return data.filter((item) => {
      const itemDate = item[dateColumn];
      if (!itemDate) return false;
      
      const itemDateObj = typeof itemDate === 'string' 
        ? parseISO(itemDate) 
        : itemDate instanceof Date 
          ? itemDate 
          : new Date(itemDate as any);
      
      return (
        (date.from && (isAfter(itemDateObj, date.from) || isEqual(itemDateObj, date.from))) &&
        (!date.to || (isBefore(itemDateObj, date.to) || isEqual(itemDateObj, date.to)))
      );
    });
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

  const clearDateFilter = useCallback(() => {
    setDate(undefined);
  }, []);

  const getSelectedItems = useCallback(() => {
    const selectedRowIndices = Object.keys(rowSelection).map(Number);
    return selectedRowIndices.map(index => data[index]);
  }, [rowSelection, data]);

  const handleDeleteSelected = useCallback(() => {
    const selectedItems = getSelectedItems();
    if (onDeleteSelected) {
      onDeleteSelected(selectedItems);
    }
    setIsDeleteDialogOpen(false);
    setRowSelection({});
  }, [getSelectedItems, onDeleteSelected]);

  const handleExportClick = useCallback(() => {
    setIsExportDialogOpen(true); 
  }, []);

  const handleExportData = useCallback((format: ExportFormat, startDate?: Date, endDate?: Date) => {
    if (onExport) {
      const params = new URLSearchParams();
      params.append('format', format);
      if (startDate) {
        params.append('startDate', startDate.toISOString().split('T')[0]);
      }
      if (endDate) {
        params.append('endDate', endDate.toISOString().split('T')[0]);
      }
      onExport(params);
    }
    setIsExportDialogOpen(false);
  }, [onExport]);

  return (
    <>
      <DeleteDialog 
        isOpen={isDeleteDialogOpen}
        description="Esta acción eliminará los productos seleccionados permanentemente. ¿Deseas continuar?"
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteSelected}
      />
      
      <ExportDialog
        open={isExportDialogOpen}
        setOpen={setIsExportDialogOpen}
        onExport={handleExportData}
        title="Exportar datos"
        description="Selecciona el formato y rango de fechas para exportar los datos."
        buttonText="Exportar"
        exportFormats={["pdf", "excel", "json"]}
      />
      
      <div className="space-y-4">
        <div className="flex items-center lg:flex-row-reverse gap-2 justify-between flex-wrap lg:flex-nowrap">
          <DataTableActions 
            table={table}
            translations={translations}
            newResource={newResource}
            onExport={handleExportClick}
            onDeleteSelected={() => setIsDeleteDialogOpen(true)}
          />
          <DataTableFilters 
            table={table}
            globalFilterColumn={globalFilterColumn}
            dateColumn={dateColumn}
            date={date}
            onDateChange={setDate}
            onClearDateFilter={clearDateFilter}
          />
        </div>
        <DataTableContent 
          table={table}
          columns={columns}
          caption={caption}
        />
        <DatatablePagination table={table} />
      </div>
    </>
  );
}