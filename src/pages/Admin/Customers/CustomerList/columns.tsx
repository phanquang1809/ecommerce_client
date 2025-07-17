import { ColumnDef } from "@tanstack/react-table";
// import { Badge } from '@/components/ui/badge'
import { Checkbox } from "@/components/ui/checkbox";
import { Customer } from "@/types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {  MoreVertical, Trash2 } from "lucide-react";
import Badge from "@/UI/Badge";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
const statuses = [
  {
    value: "active",
    label: "Hoạt động",
    color:"lime"
  },
  {
    value: "inactive",
    label: "Chưa kích hoạt",
    color:"purple"
  },
  {
    value: "ban",
    label: "Bị khóa",
    color:"rose"
  },
];
export const columns = (
     onEdit: (customer: Customer) => void
):
ColumnDef<Customer>[] => [
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
    enableHiding: false,
  },

  {
    accessorKey: "full_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Khách hàng" />
    ),
    meta:{
      label: "Tên khách hàng",
    },
    cell: ({ row }) => {
      return (
        <div
          className="flex space-x-2 items-center cursor-pointer"
          //   onClick={() => onEdit(row.original)}
        >
          <Avatar className="bg-accent size-12">
            <AvatarImage src={row.original.avatar} alt="@shadcn" />
            {/* <AvatarFallback>{row.getValue("name")}</AvatarFallback> */}
          </Avatar>
          <div className="flex flex-col">
            <div className="font-medium text-primary dark:text-white">
              {row.original.full_name}
            </div>
            <div className="text-gray-400 dark:text-gray-500">
              {row.original.email}
            </div>
          </div>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "user_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên tài khoản" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("user_name")}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "totalOrder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Đơn hàng" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("totalOrder")}</div>
    ),
    enableHiding: false,
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
          <DropdownMenuItem onClick={() => onEdit(row.original)}>Cập nhật</DropdownMenuItem>
          <DropdownMenuItem>
            {row.original.status === "inactive"
              ? "Kích hoạt"
              : row.original.status === "active"
              ? "Khóa tài khoản"
              : "Mở khóa"}
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
