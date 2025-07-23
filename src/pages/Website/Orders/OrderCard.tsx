import { Button } from "@/components/ui/button";
import { getOrderStatusLabel } from "@/pages/Seller/Orders/columns";
import { Order } from "@/services/seller/orderServices";
import { formatCurrency } from "@/utils/format";
import { MessageCircleMore, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const OrderCard = ({ order }: { order: Order }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-md p-4 bg-white shadow">
      <div className="flex justify-between border-b pb-2 mb-4">
        <div className="flex items-center gap-2">
          <img
            src={order.shop?.logo}
            alt={order.shop?.name}
            className="w-8 h-8 rounded"
             onError={(e) => {
                  e.currentTarget.src = "/image/spark-icon.svg";
                }}
          />
          <div className="text-base font-medium text-gray-800">
            {order.shop?.name}
          </div>
          <Button
            className="rounded bg-blue-600 hover:bg-blue-500"
            size="sm"
            onClick={() => navigate(`${order.shop?.url}`)}
          >
            <MessageCircleMore className="w-4 h-4" />
            Chat
          </Button>
          <Button
            variant="outline"
            className="rounded"
            size="sm"
            onClick={() => navigate(`${order.shop?.url}`)}
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
                <div className="text-sm text-gray-500">
                  x{item.quantity}
                </div>
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
              navigate(
                `/checkout/payment-qr?orderNumber=${order.order_number}&amount=${order.total}`
              )
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
