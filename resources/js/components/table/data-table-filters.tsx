import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Table } from "@tanstack/react-table";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Search } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

interface DataTableFiltersProps<TData> {
  table: Table<TData>;
  globalFilterColumn?: string;
  dateColumn?: keyof TData;
  date?: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
  onClearDateFilter: () => void;
}

export function DataTableFilters<TData>({
  table,
  globalFilterColumn,
  dateColumn,
  date,
  onDateChange,
  onClearDateFilter,
}: DataTableFiltersProps<TData>) {
  return (
    <div className="flex w-full md:flex-row-reverse gap-2">
      {globalFilterColumn && (
        <Input
          startIcon={Search}
          placeholder="Buscar..."
          value={(table.getColumn(globalFilterColumn)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(globalFilterColumn)?.setFilterValue(event.target.value)}
          className="w-full lg:max-w-md"
        />
      )}
      
      {dateColumn && (
        <div className="flex gap-2 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn("justify-start text-left font-normal")}
              >
                <CalendarIcon size={18} className="m-auto lg:mr-2" />
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
                onSelect={onDateChange}
                numberOfMonths={2}
              />
              {date && (
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" onClick={onClearDateFilter}>
                    Limpiar filtro
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
