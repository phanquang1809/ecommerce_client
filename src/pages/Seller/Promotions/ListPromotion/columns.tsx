import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, MoreVertical, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Promotion } from "../promotion.type";

export const columns = (
  onEdit: (promotion: Promotion) => void,
  onToggleStatus?: (id: number|string, is_active: boolean) => void,
  onDelete?: (id: number|string) => void
): ColumnDef<Promotion>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên chương trình" />,
    cell: ({ row }) => (
      <div className="font-medium text-primary">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mã Code" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="rounded">{row.original.code}</Badge>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Loại khuyến mãi" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="rounded">{row.original.type}</Badge>
    ),
  },
//   {
//     accessorKey: "discount_value",
//     header: ({ column }) => <DataTableColumnHeader column={column} title="Giá trị giảm" />,
//     cell: ({ row }) => {
//       const { discount_type, discount_value } = row.original;
//       return discount_type === "percent"
//         ? `${discount_value}%`
//         : formatCurrency(discount_value);
//     },
//   },
//   {
//     accessorKey: "max_discount",
//     header: ({ column }) => <DataTableColumnHeader column={column} title="Giảm tối đa" />,
//     cell: ({ row }) => formatCurrency(row.original.max_discount || 0),
//   },
//   {
//     accessorKey: "min_order_value",
//     header: ({ column }) => <DataTableColumnHeader column={column} title="Giá trị đơn tối thiểu" />,
//     cell: ({ row }) => formatCurrency(row.original.min_order_value || 0),
//   },
//   {
//     accessorKey: "usage_limit",
//     header: ({ column }) => <DataTableColumnHeader column={column} title="Lượt dùng" />,
//     cell: ({ row }) => row.original.usage_limit ?? "-",
//   },
  {
    accessorKey: "start_date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Thời gian" />,
    cell: ({ row }) => {
      const { start_date, end_date } = row.original;
      return (
       <div className="text-sm text-muted-foreground">
  {start_date && end_date && (
    <>
      {new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(start_date))}{" "}
      -{" "}
      {new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(end_date))}
    </>
  )}
</div>

      );
    },
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
    cell: ({ row }) =>
      row.original.is_active ? (
        <Badge variant="outline" className="rounded">Đang áp dụng</Badge>
      ) : (
        <Badge variant="destructive" className="rounded">Đã ẩn</Badge>
      ),
  },
  {
    id: "actions",
    header: "Tác vụ",
    cell: ({ row }) => {
      const promotion = row.original;
      return (
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
            <DropdownMenuItem onClick={() => onEdit(promotion)}>
              Cập nhật
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleStatus?.(promotion.id!, !promotion.is_active)}>
              {promotion.is_active ? (
                <>
                  <span>Ẩn</span>
                  <EyeOff className="ml-auto h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Hiện</span>
                  <Eye className="ml-auto h-4 w-4" />
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete?.(promotion.id!)}>
              <span>Xoá</span>
              <Trash2 className="ml-auto h-4 w-4 text-red-500" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
