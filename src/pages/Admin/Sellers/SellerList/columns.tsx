import { ColumnDef } from "@tanstack/react-table";
// import { Badge } from '@/components/ui/badge'
import { Checkbox } from "@/components/ui/checkbox";
import { Shop } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Ratings } from "@/components/Ratings";
import { Link } from "react-router-dom";
const statuses = [
  {
    value: "active",
    label: "Hoạt động",
    color: "lime",
  },
  {
    value: "pending",
    label: "Chờ duyệt",
    color: "purple",
  },
  {
    value: "ban",
    label: "Bị khóa",
    color: "rose",
  },
];
export const columns = (): ColumnDef<Shop>[] => [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cửa hàng" />
    ),
    meta: {
      label: "Tên cửa hàng",
    },
    cell: ({ row }) => {
      return (
        <Link
          to={"/admin/shops/" + row.original.slug}
          state={{ shop: row.original }}
          className="flex space-x-2 items-start cursor-pointer"
        >
          <Avatar className="bg-accent size-20 rounded-md">
            <AvatarImage src={row.original.logo} alt="@shadcn" />
            <AvatarFallback className="text-xs text-muted-foreground">
              Walmart
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Link
              to={"/shops/" + row.original.slug}
              className="font-medium text-primary dark:text-white hover:text-primary"
            >
              thequang.id.vn/shops/{row.original.slug}
            </Link>
            <div className="font-medium text-primary dark:text-white">
              {row.original.name} - {row.original.address}
            </div>
            <div className="text-primary dark:text-white">
              Liên hệ: {row.original.phone}
            </div>
            <div className="text-gray-400 dark:text-gray-500">
              {row.original.description}
            </div>
          </div>
        </Link>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chủ của hàng" />
    ),
    cell: ({ row }) => (
      <div className="flex items-start gap-2">
        <Avatar className="bg-accent size-10">
          <AvatarImage src={row.original.user.avatar} alt="@shadcn" />
          <AvatarFallback className="text-xs text-muted-foreground">
            Walmart
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-primary dark:text-white">
            {row.original.user.full_name}
          </div>
          <div className="text-gray-400 dark:text-gray-500">
            {row.original.user.email}
          </div>
        </div>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Đánh giá" />
    ),
    meta: {
      label: "Đánh giá",
    },
    cell: ({ row }) => (
      <div className="text-center">
        <Ratings rating={row.original.rating} size={18} variant="yellow" />
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    meta: {
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
          <DropdownMenuItem>Cập nhật</DropdownMenuItem>
          <DropdownMenuItem>
            {row.original.status === "pending"
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
