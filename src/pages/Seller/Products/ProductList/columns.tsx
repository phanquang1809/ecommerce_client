import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { formatCurrency } from "@/utils/format";
import { Product } from "../../../../features/products/types/product.type";
import { Badge } from "@/components/ui/badge";
export const columns = (
  onEdit: (product: Product) => void,
  onView: (url:string) => void,
  onEditPrice: (product: Product) => void,
  onUpdateStatus: (slug: string, status: string) => void,
): ColumnDef<Product>[] => [
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
      <DataTableColumnHeader column={column} title="Sản phẩm" />
    ),
    meta: {
      label: "Tên sản phẩm",
    },
    cell: ({ row }) => {
      return (
        <div className="space-y-2">
          <div
            className="flex space-x-2 items-start cursor-pointer"
            onClick={() => onEdit(row.original)}
          >
            <Avatar className="bg-accent size-20 !rounded-md">
              <AvatarImage
                src={row.original.images[0]}
                alt="@shadcn"
              />
            </Avatar>
            <div className="flex flex-col gap-1">
              {row.original.status === "inactive" && (
                <Badge variant="outline" className="rounded">
                  <EyeOff />
                  Bị ẩn
                </Badge>
              )}
              <div className="font-medium text-primary dark:text-white max-w-[400px] break-words whitespace-normal">
                {row.original.name}
              </div>
              {/* <div className="max-w-[400px] text-gray-400 dark:text-gray-500 truncate">
                {row.original.description}
              </div> */}
              {row.original.variants.length > 1 && (
                <div className="flex">
                  <Badge variant="outline">
                    {row.original.variants.length} phân loại
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Danh mục" />
    ),
    meta: {
      label: "Danh mục",
    },
    cell: ({ row }) => {
      return (
        <div className="items-center">
          <Badge variant="outline">{row.original.category?.name}</Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      if (!value || !Array.isArray(value)) return true; // Không lọc nếu không có giá trị

      const parent = row.original.category;
      if (!parent) return false; // Bỏ qua nếu không có parent

      // Giả sử value là mảng các parent.id (dạng string)
      return (
        value.some((val: string) => val === parent.id.toString()) ??
        row.getValue(id)
      );
    },
  },
  {
    accessorKey: "total_sold",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Doanh số" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("total_sold")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "pricing",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá bán" />
    ),
    cell: ({ row }) => (
      <div
        className="group flex items-center gap-2 cursor-pointer"
        onClick={() => onEditPrice(row.original)}
      >
        <div>
          {row.original.pricing?.price
            ? formatCurrency(row.original.pricing.price)
            : `${formatCurrency(
                row.original.pricing?.min_price || 0
              )} - ${formatCurrency(row.original.pricing?.max_price || 0)}`}
        </div>
        <Pencil className="opacity-0 group-hover:opacity-100  size-4 text-blue-500" />
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      const pricingA = rowA.original.pricing;
      const pricingB = rowB.original.pricing;

      const valueA = pricingA?.price ?? pricingA?.min_price ?? 0;
      const valueB = pricingB?.price ?? pricingB?.min_price ?? 0;

      return valueA - valueB;
    },
    enableHiding: false,
  },
  {
    accessorKey: "total_stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kho hàng" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("total_stock")}</div>,
    enableHiding: false,
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
          <DropdownMenuItem
            className="justify-between"
            onClick={() =>
              onUpdateStatus(
                row.original.slug || "",
                row.original.status === "active" ? "inactive" : "active"
              )
            }
          >
            {row.original.status === "active" ? (
              <>
                <span>Ẩn</span>
                <EyeOff />
              </>
            ) : (
              <>
                <span>Hiện</span>
                <Eye />
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onView(row.original.slug || "")}>
            Xem trước
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
