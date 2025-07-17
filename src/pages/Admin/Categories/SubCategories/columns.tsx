import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {  CategorySubGroup } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2 } from "lucide-react";
import Badge from "@/UI/Badge";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DragHandle } from "@/components/DragHandle";

const statuses = [
  {
    value: "active",
    label: "Hoạt động",
    color: "lime",
  },
  {
    value: "inactive",
    label: "Bị khóa",
    color: "rose",
  },
];
export const columns = (
  onEdit: (category: CategorySubGroup) => void,
  isSorting: boolean
): ColumnDef<CategorySubGroup>[] => [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => (
      <DragHandle id={row.original.id} isSorting={isSorting} />
    ),
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên danh mục" />
    ),
    meta:{
      label: "Tên danh mục",
    },
    cell: ({ row }) => {
      return (
        <div
          className="flex space-x-2 items-center cursor-pointer"
          onClick={() => onEdit(row.original)}
        >
          <span className="">{row.getValue("name")}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "parent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Danh mục cha" />
    ),
    meta:{
      label: "Danh mục cha",
    },
    cell: ({ row }) => {
      return (
          <span className="">{row.original.parent.name}</span>
      );
    },
    filterFn: (row, id, value) => {
      if (!value || !Array.isArray(value)) return true; // Không lọc nếu không có giá trị
  
      const parent = row.original.parent;
      if (!parent) return false; // Bỏ qua nếu không có parent
  
      // Giả sử value là mảng các parent.id (dạng string)
      return value.some((val: string) => val === parent.id.toString())??row.getValue(id);
    },
  },
  {
    accessorKey: "totalProduct",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lượng sản phẩm" />
    ),
    meta:{
      label: "Số lượng sản phẩm",
    },
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("totalProduct")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    meta:{
      label: "Trạng thái",
    },
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return "Hoạt động";
      }

      return (
        <div className="flex w-[100px] items-center">
          {/* {status.icon && (
            <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )} */}
          <Badge color={status.color}>{status.label}</Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            Cập nhật
          </DropdownMenuItem>
          <DropdownMenuItem>
            {row.original.status === "active" ? "Khóa" : "Mở khóa"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-between">
            <span>Xóa</span>
            <Trash2 />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
