import { Button } from "@/components/ui/button";
import { getOrderStatusLabel } from "@/pages/Seller/Orders/columns";
import { api } from "@/services/apiServices";
import { useHandleGetShopDetail } from "@/services/seller";
import { Order } from "@/services/seller/orderServices";
import { handleChatWithShop } from "@/services/website/chatServices";
import { formatCurrency } from "@/utils/format";
import { useQueryClient } from "@tanstack/react-query";
import { MessageCircleMore, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const OrderCard = ({ order }: { order: Order }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handlePayment = async (method: string) => {
    if (method === "bank_transfer") {
      window.location.href = `/checkout/payment-qr?orderNumber=${order.order_number}&amount=${order.total}`;
      return;
    }
    const paymentResponse = await api.post(`/${method}/create`, {
      order_number: order.order_number,
      amount: order.total,
    });
    if (paymentResponse.data.status === "success") {
      window.location.href = paymentResponse.data.payment_url;
    } else {
      toast.error("Không thể tạo thanh toán, vui lòng thử lại!");
    }
  };
  const handleGetShopDetail = useHandleGetShopDetail();

  return (
    <div className="rounded-md p-4 bg-white shadow">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <div className="flex items-center gap-2">
          <img
            src={order.shop?.logo}
            alt={order.shop?.name}
            className="w-8 h-8 rounded border object-contain"
          />
          <div className="text-base font-medium text-gray-800">
            {order.shop?.name}
          </div>
          <Button
            className="rounded bg-blue-600 hover:bg-blue-500"
            size="sm"
            onClick={() => handleChatWithShop(order.shop?.owner_id || 0, queryClient)}
          >
            <MessageCircleMore className="w-4 h-4" />
            Chat
          </Button>
          <Button
            variant="outline"
            className="rounded"
            size="sm"
            onClick={() => handleGetShopDetail(order.shop?.slug || "")}
          >
            <Store className="w-4 h-4" />
            Xem shop
          </Button>
        </div>
        <div className="text-base font-medium text-gray-800">
          {order.payment_status === "pending"
            ? "Chờ thanh toán"
            : getOrderStatusLabel(order.status)}
        </div>
      </div>
      <div className="space-y-4">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between gap-4 items-center">
            <div className="flex gap-4 items-start">
              <img
                src={item.image}
                alt={item.product_name}
                className="w-20 h-20 object-cover rounded"
                onError={(e) => {
                  e.currentTarget.src = "/image/spark-icon.svg";
                }}
              />
              <div>
                <div className="text-sm font-medium line-clamp-2">
                  {item.product_name}
                </div>
                <div className="text-sm text-muted-foreground">
                  Phân loại hàng: {item.product_variant_name}
                </div>
                <div className="text-sm text-gray-500">x{item.quantity}</div>
              </div>
            </div>
            <div className="text-sm text-gray-700">
              {formatCurrency(item.price || 0)} đ
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end items-center mt-4 border-t pt-4">
        <div className="text-base font-semibold text-red-500">
          Tổng tiền: {formatCurrency(order.total || 0)}
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" size="sm" className="rounded">
          Mua lại
        </Button>
        {order.payment_status === "pending" && (
          <Button
            variant="outline"
            size="sm"
            className="rounded"
            onClick={() =>
              handlePayment(order.payment_method || "bank_transfer")
            }
          >
            Thanh toán
          </Button>
        )}
        <Button
          variant="default"
          size="sm"
          className="bg-blue-600 hover:bg-blue-500 rounded"
          onClick={() => navigate(`/customer/order/view/${order.order_number}`)}
        >
          Xem chi tiết
        </Button>
      </div>
    </div>
  );
};
