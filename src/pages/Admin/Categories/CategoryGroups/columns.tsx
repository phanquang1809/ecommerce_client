import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { CategoryGroup } from "@/types";
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
    color: "lime",
  },
  {
    value: "inactive",
    label: "Bị khóa",
    color: "rose",
  },
];
export const columns = (
  onEdit: (category: CategoryGroup) => void,
  onDelete: (categoryId: number) => void,
): ColumnDef<CategoryGroup>[] => [
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
      <DataTableColumnHeader column={column} title="Ngành hàng" />
    ),
    meta:{
      label: "Tên ngành hàng",
    },
    cell: ({ row }) => {
      return (
        <div
          className="flex space-x-2 items-center cursor-pointer"
          onClick={() => onEdit(row.original)}
        >
          <Avatar className="rounded bg-accent size-12">
            <AvatarImage src={row.original.image} alt={row.getValue("name")} />
          </Avatar>
          <div className="flex flex-col">
          <span className="text-md">{row.getValue("name")}</span>
          <span className="text-muted-foreground text-xs truncate max-w-[300px]">{row.original.description}</span>
          </div>
        </div>
      );
    },
    enableHiding: false,
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
          <DropdownMenuItem className="justify-between" onClick={()=>onDelete(row.original.id)}>
            <span>Xóa</span>
            <Trash2 />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
