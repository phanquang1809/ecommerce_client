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
import { Brand } from "./Brand.type";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const columns = (onEdit: (brand: Brand) => void): ColumnDef<Brand>[] => [
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
      <DataTableColumnHeader column={column} title="Thương hiệu" />
    ),
    meta: {
      label: "Tên thương hiệu",
    },
    cell: ({ row }) => {
      const brand = row.original;
      return (
        <div
          className="flex space-x-2 items-start cursor-pointer"
          onClick={() => onEdit(brand)}
        >
          <Avatar className="rounded bg-accent size-12">
            <AvatarImage src={brand.logo} alt={brand.name} />
          </Avatar>
          <span className="text-md">{row.getValue("name")}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mô tả" />
    ),
    cell: ({ row }) => (
      <div className="text-sm max-w-[300px] line-clamp-2">
        {row.original.description??"Không có mô tả"}
      </div>
    ),
    meta: {
      label: "Mô tả",
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
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={status === "active" ? "default" : "outline"}
          className="text-xs rounded"
        >
          {status === "active" ? "Hoạt động" : "Ngừng hoạt động"}
        </Badge>
      );
    },
    meta: {
      label: "Trạng thái",
    },
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
