import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge"; // dùng ShadCN UI
import { MoreVertical, Trash2 } from "lucide-react";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Attribute } from "./Attribute.type";

export const columns = (
  onEdit: (attribute: Attribute) => void,
): ColumnDef<Attribute>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Chọn tất cả"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Chọn dòng"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên thuộc tính" />
    ),
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>
  },
  {
  accessorKey: "type",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Loại" />
  ),
  cell: ({ row }) => {
    const type = row.original.type;
    return (
      <Badge
        variant={type === "variant" ? "default" : "outline"}
        className="text-xs rounded"
      >
        {type === "variant" ? "Biến thể" : "Cấu hình"}
      </Badge>
    );
  },
},
  {
  id: "categories",
  header: "Danh mục",
  cell: ({ row }) => (
    <div className="flex flex-wrap gap-2 max-w-[300px]">
      <Badge variant="default" className="text-xs rounded">
          {row.original.categories.length}
        </Badge>
    </div>
  ),
},
  {
    id: "values",
    header: "Giá trị",
    cell: ({ row }) => (
       <Badge variant="default" className="text-xs rounded">
          {row.original.values.length}
        </Badge>
    ),
  },
  {
    id: "actions",
    header: "Tác vụ",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <MoreVertical />
            <span className="sr-only">Mở menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={() => onEdit(row.original)}>Cập nhật</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-between !text-red-600 ">
            <span>Xoá</span>
            <Trash2 className="text-red-600 h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
