import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrder, updateOrderStatus } from "@/services/seller/orderServices";
import { formatCurrency } from "@/utils/format";
import { Banknote, Hash, MapPinHouse, NotepadText, User2 } from "lucide-react";
import { getOrderStatusLabel } from "./columns";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const OrderDetail = () => {
  const { number } = useParams();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["order", number],
    queryFn: () => getOrder(number!),
    enabled: !!number,
    staleTime: 1000 * 60 * 3,
  });

  if (isLoading) {
    return <div className="p-4">Đang tải đơn hàng...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500">
        Không thể tải đơn hàng: {error?.message}
      </div>
    );
  }
  const order = data?.data;
  const handleUpdateStatus = async (status: string) => {
    const response = await updateOrderStatus(order?.order_number || "", status);
    if (response.status === "success") {
      refetch();
    }
  };
  return (
    <div className="my-10 space-y-4 flex container mx-auto gap-4">
      <div className="w-3/4 flex flex-col gap-4">
        <div className="rounded-md border p-4 flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <NotepadText className="size-6 text-bg-primary" />
            <div className="flex flex-col ">
              <span className="font-semibold">
                {getOrderStatusLabel(order?.status || "")}
              </span>
              {order?.status === "processing" && (
                <span className="text-sm text-muted-foreground">
                  Đợi shipper đến lấy hàng
                </span>
              )}

              {order?.status === "shipping" && (
                <span className="text-sm text-muted-foreground">
                  Đơn đang được shipper giao
                </span>
              )}

              {order?.status === "completed" && (
                <span className="text-sm text-muted-foreground">
                  Giao hàng thành công
                </span>
              )}

              {order?.status === "cancelled" && (
                <span className="text-sm text-muted-foreground">
                  Đơn đã hủy bởi{" "}
                  {order?.cancelled_by_shop ? "shop" : "khách hàng"}
                </span>
              )}
              {order?.cancel_reason && (
                <span className="text-sm text-muted-foreground">
                  Lý do hủy: {order?.cancel_reason}
                </span>
              )}
            </div>
          </div>

          {(order?.status === "pending" || order?.status === "processing") && (
            <div className="p-4 bg-muted rounded flex items-center justify-between">
              <span className="text-lg">Tiếp theo bạn có thể</span>
              <div className="flex gap-2">
                {/* Hủy đơn hàng trong cả hai trạng thái */}
                <Button
                  variant="outline"
                  className="rounded"
                  onClick={() => handleUpdateStatus("cancelled")}
                >
                  Hủy đơn hàng
                </Button>

                {/* Chỉ hiện "Chuẩn bị hàng" khi là pending */}
                {order?.status === "pending" && (
                  <Button
                    className="bg-blue-600 hover:bg-blue-500 rounded"
                    onClick={() => handleUpdateStatus("processing")}
                  >
                    Chuẩn bị hàng
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="rounded-md border p-4 flex flex-col gap-4">
          <div className="flex items-start gap-2">
            <Hash className="size-6 " />
            <div className="flex flex-col">
              <span className="font-semibold">Mã đơn hàng</span>
              <div>#{order?.order_number}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPinHouse className="size-6 text-bg-primary" />
            <div className="flex flex-col">
              <span className="font-semibold">Địa chỉ nhận hàng</span>
              <span>
                {order?.buyer.receiver_name}, {order?.buyer.receiver_phone}
              </span>
              <span>{order?.shipping_address}</span>
            </div>
          </div>
        </div>
        <div className="rounded-md border p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="rounded size-10 ">
              <AvatarImage
                src={order?.buyer.avatar}
                alt={order?.buyer.user_name}
              />
              <AvatarFallback className="rounded !bg-blue-600">
                <User2 className="size-5 text-white" />
              </AvatarFallback>
            </Avatar>
            <span>{order?.buyer.user_name}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded">
              Theo dõi
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-500 rounded">
              Chat Ngay
            </Button>
          </div>
        </div>
        <div className="rounded-md border p-4">
          <div className="flex items-center gap-2">
            <Banknote className="size-6 text-bg-primary" />
            <span className="font-semibold">Thông tin thanh toán</span>
          </div>
          <div className="overflow-x-auto mt-4 rounded-md border border-dashed">
            <table className="w-full text-left text-sm ">
              <thead className="font-medium bg-muted">
                <tr>
                  <th className="px-4 py-2 border-dashed text-center">STT</th>
                  <th className="px-4 py-2 border-l border-dashed">Sản phẩm</th>
                  <th className="px-4 py-2 border-l border-dashed">Đơn giá</th>
                  <th className="px-4 py-2 border-l border-dashed">Số lượng</th>
                  <th className="px-4 py-2 border-l border-dashed">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {order?.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-t border-dashed text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border-t border-l border-dashed flex items-start gap-2">
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <div className="font-semibold">{item.product_name}</div>
                        <div className="text-xs ">
                          {item.product_variant_name}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 border-t border-l border-dashed">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="px-4 py-2 border-t border-l border-dashed">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-2 border-t border-l border-dashed">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-1/4 flex flex-col gap-4 rounded-md h-fit p-4 border">
        <div className="flex flex-col gap-2">
          <h3 className="text-center text-sm font-semibold mb-2 uppercase tracking-wide">
            Lịch sử đơn hàng
          </h3>
          <div className="flex flex-col relative">
            {order?.logs?.map((log, index) => {
              return (
                <div key={index} className="relative pb-2 border-b mb-2">
                  <div className="">
                    <p className={cn("text-sm",index===0 && "font-bold")}>{log.message}</p>
                    <p className="text-xs text-gray-500">{log.created_at}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
