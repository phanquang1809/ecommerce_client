import { ColumnDef } from "@tanstack/react-table";
// import { Badge } from '@/components/ui/badge'
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Lock, MoreVertical, Trash2, Unlock } from "lucide-react";
import Badge from "@/UI/Badge";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Transporter } from "../../../features/transporters/types/transporter.type";
import { Link } from "react-router-dom";
const statuses = [
  {
    value: "active",
    label: "Hoạt động",
    color: "lime",
  },
  {
    value: "inactive",
    label: "Bị khóa",
    color: "purple",
  },
];
export const columns = (
  onEdit: (transporter: Transporter) => void,
  onUpdateStatus: (id: string, status: "active" | "inactive") => void
): ColumnDef<Transporter>[] => [
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
      <DataTableColumnHeader column={column} title="Tên đơn vị" />
    ),
    meta: {
      label: "Tên đơn vị",
    },
    enableHiding: false,
  },
  {
    accessorKey: "api_url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Đường dẫn kết nối" />
    ),
    cell: ({ row }) => {
      return (
        <Link
          to={row.getValue("api_url")}
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          {row.getValue("api_url")}
        </Link>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "api_token",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Token" />
    ),
    enableHiding: false,
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
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            Cập nhật
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onUpdateStatus(row.original.id, row.original.status === "active" ? "inactive" : "active")}>
            {row.original.status === "inactive" ? (
              <span className="flex items-center justify-between w-full">
                Mở khóa
                <Unlock />
              </span>
            ) : (
              <span className="flex items-center justify-between w-full">
                Khóa
                <Lock />
              </span>
            )}
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
