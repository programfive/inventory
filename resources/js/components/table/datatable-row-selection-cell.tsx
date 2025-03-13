import { Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

interface DatatableRowSelectionCellProps<TData> {
  row: Row<TData>;
}

export function DataTableRowSelectionCell<TData>({
  row,
}: DatatableRowSelectionCellProps<TData>) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
}