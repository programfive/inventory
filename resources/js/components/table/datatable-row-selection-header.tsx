import { Table } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

interface DatatableRowSelectionHeaderProps<TData> {
  table: Table<TData>;
}

export function DataTableRowSelectionHeader<TData>({
  table,
}: DatatableRowSelectionHeaderProps<TData>) {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
      aria-label="Select all"
    />
  );
}