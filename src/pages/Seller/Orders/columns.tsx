import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  MoreVertical,
  User2,
} from "lucide-react";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { formatCurrency } from "@/utils/format";
import { Order } from "@/services/seller/orderServices";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const getOrderStatusLabel = (status: string): ReactNode => {
  switch (status) {
    case "pending":
      return (
        <div className="flex items-center gap-1">
          {/* <Clock className="h-4 w-4" /> */}
          <span>Chờ xác nhận</span>
        </div>
      );
    case "processing":
      return (
        <div className="flex items-center gap-1">
          {/* <PackageSearch className="h-4 w-4" /> */}
          <span>Chờ lấy hàng</span>
        </div>
      );
    case "shipping":
      return (
        <div className="flex items-center gap-1">
          {/* <Truck className="h-4 w-4" /> */}
          <span>Đang giao</span>
        </div>
      );
    case "completed":
      return (
        <div className="flex items-center gap-1">
          {/* <CheckCircle className="h-4 w-4" /> */}
          <span>Giao hàng thành công</span>
        </div>
      );
    case "cancelled":
      return (
        <div className="flex items-center gap-1">
          {/* <XCircle className="h-4 w-4" /> */}
          <span>Đã hủy</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-1">
          <HelpCircle className="h-4 w-4" />
          <span>Không xác định</span>
        </div>
      );
  }
};
// const getOrderPaymentStatusLabel = (payment_status: string): string => {
//   switch (payment_status) {
//     case "pending":
//       return "Chờ thanh toán";
//     case "unpaid":
//       return "Chưa thanh toán";
//     case "paid":
//       return "Đã thanh toán";
//     case "failed":
//       return "Thất bại";
//     case "cancelled":
//       return "Đã hủy";
//     default:
//       return "Không xác định";
//   }
// };

export const columns = (
  onEdit: (order: Order) => void,
  onUpdateStatus: (id: string | number, status: string) => void
): ColumnDef<Order>[] => [
  {
    accessorKey: "order_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Đơn hàng" />
    ),
    cell: ({ row }) => (
      <div className="w-[400px]">
        <div className="mb-2">
          <div className="flex items-center gap-2">
            {/* <img
              src={row.original.buyer.avatar}
              alt={row.original.buyer.user_name}
              className="w-10 h-10 rounded-md object-cover"
            /> */}
             <Avatar className="rounded size-10 ">
            <AvatarImage src={row.original.buyer.avatar} alt={row.original.buyer.user_name} />
            <AvatarFallback className="rounded bg-primary">
              <User2 className="size-5 text-white" />
            </AvatarFallback>
          </Avatar>
           <div className="flex flex-col">
             <span className="font-medium text-sm text-primary">
              {row.original.buyer.user_name}
            </span>
             <span className="font-medium text-sm text-primary">
            #{row.original.order_number}
          </span>
           </div>
          </div>
         
        </div>
        {row.original.items.map((item) => (
          <div key={item.product_name} className="flex gap-1 items-start mb-2">
            <img
              src={item.image}
              alt={item.product_name}
              className="w-14 h-14 rounded-md object-cover"
              onError={(e) => {
                  e.currentTarget.src = "/image/spark-icon.svg";
                }}
            />
            <div className="flex flex-col">
              <span className="text-primary max-w-[300px] break-words whitespace-normal">
                {item.product_name} - SL: {item.quantity}
              </span>
              {
                item.product_variant_name && (
                  <span className="text-muted-foreground text-xs">
                    Phân loại: {item.product_variant_name}
                  </span>
                )
              }
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tổng tiền" />
    ),
    cell: ({ row }) => {
      const method = row.original.payment_method;
      const renderMethod = () => {
        switch (method) {
          case "cod":
            return (
              <span className="text-xs text-muted-foreground">
                Thanh toán khi nhận hàng
              </span>
            );
          case "vnpay":
            return <span className="text-xs text-muted-foreground">VNPay</span>;
          case "momo":
            return <span className="text-xs text-muted-foreground">MoMo</span>;
          case "bank_transfer":
            return (
              <span className="text-xs text-muted-foreground">
                Chuyển khoản
              </span>
            );
          case "wallet":
            return (
              <span className="text-xs text-muted-foreground">WWallet</span>
            );
          default:
            return (
              <span className="text-xs text-muted-foreground">
                Không xác định
              </span>
            );
        }
      };
      return (
        <div className="flex flex-col">
          <span>{formatCurrency(row.original.total)}</span>
          {renderMethod()}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize py-1.5 rounded">
        {getOrderStatusLabel(row.original.status)}
      </Badge>
    ),
  },
  // {
  //   accessorKey: "created_at",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Ngày tạo" />
  //   ),
  //   cell: ({ row }) => <span>{formatDate(row.original.created_at)}</span>,
  // },
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
        <DropdownMenuContent align="end" className="w-40">
          {row.original.status === "pending" && (
              <DropdownMenuItem
                onClick={() => onUpdateStatus(row.original.order_number, "processing")}
              >
                Chuẩn bị hàng
              </DropdownMenuItem>
          )}

          {(row.original.status === "processing" || row.original.status === "pending") && (
            <DropdownMenuItem
              onClick={() => onUpdateStatus(row.original.order_number, "cancelled")}
            >
              Hủy đơn hàng
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            Xem chi tiết
          </DropdownMenuItem>

          {row.original.status === "shipping" && (
            <DropdownMenuItem
              onClick={() => onUpdateStatus(row.original.order_number, "completed")}
            >
              Đã giao hàng
            </DropdownMenuItem>
          )}

          {/* <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-between text-red-500">
            <span>Xóa đơn</span>
            <Trash2 />
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
