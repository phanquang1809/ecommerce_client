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
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Trash2 } from "lucide-react";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { PaymentMethod } from "./PaymentMethod.type";

export const columns = (
  onEdit: (paymentMethod: PaymentMethod) => void
): ColumnDef<PaymentMethod>[] => [
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
      <DataTableColumnHeader column={column} title="Tên phương thức" />
    ),
    cell: ({ row }) => (
      <div
        className="cursor-pointer"
        onClick={() => onEdit(row.original)}
      >
        {row.getValue("name")}
      </div>
    ),
    meta: { label: "Tên phương thức" },
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã code" />
    ),
    cell: ({ row }) => row.getValue("code") || "—",
    meta: { label: "Code" },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mô tả" />
    ),
    cell: ({ row }) => (
      <div className="text-sm max-w-[300px] line-clamp-2">
        {row.original.description ?? "Không có mô tả"}
      </div>
    ),
    meta: { label: "Mô tả" },
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const active = row.original.is_active;
      return (
        <Badge
          variant={active ? "default" : "outline"}
          className="text-xs rounded"
        >
          {active ? "Hoạt động" : "Ngừng hoạt động"}
        </Badge>
      );
    },
    meta: { label: "Trạng thái" },
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
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            Cập nhật
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-between !text-red-600">
            <span>Xoá</span>
            <Trash2 className="text-red-600 h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
