import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getOrdersByStatus, Order } from "@/services/website/orderServices";
import { Loader } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { useNavigate } from "react-router-dom";

const ORDER_TABS = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: "Chờ xác nhận" },
  { key: "processing", label: "Đang xử lý" },
  { key: "shipping", label: "Đang giao" },
  { key: "completed", label: "Giao hàng thành công" },
  { key: "cancelled", label: "Đã hủy" },
];

export default function UserOrderHistory() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { orders: data } = await getOrdersByStatus({
          status: selectedTab === "all" ? "" : selectedTab,
          page: 1,
          limit: 10,
        });
        setOrders(data || []);
      } catch (error) {
        console.error("Lỗi khi tải đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [selectedTab]);
  const navigate = useNavigate();
  const handlePayment = (order: Order) => {
    // Có thể gọi API tạo QR ở đây nếu cần
    navigate(
      `/checkout/payment-qr?orderId=${order.order_number}&amount=${order.final_amount}`
    );
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Lịch sử đơn hàng</h2>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="flex flex-wrap gap-2">
          {ORDER_TABS.map((tab) => (
            <TabsTrigger key={tab.key} value={tab.key}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {ORDER_TABS.map((tab) => (
          <TabsContent key={tab.key} value={tab.key}>
            {loading ? (
              <div className="flex items-center justify-center py-10 text-blue-500">
                <Loader className="animate-spin mr-2" />
                Đang tải đơn hàng...
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center text-muted-foreground py-10">
                Không có đơn hàng nào.
              </div>
            ) : (
              <div className="space-y-6 mt-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-md bg-white p-4"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                      <div className="text-base font-medium text-gray-800">
                        {order.payment_status === "unpaid"
                          ? "Chờ thanh toán"
                          : ORDER_TABS.find((t) => t.key === order.status)
                              ?.label || order.status}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between gap-4 items-center"
                        >
                          <div className="flex gap-4 items-start">
                            <img
                              src={item.image}
                              alt={item.product_name}
                              className="w-20 h-20 object-cover rounded border"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-800 line-clamp-2">
                                {item.product_name}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
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
                    {/* Footer */}
                    <div className="flex justify-end items-center mt-4 border-t pt-4">
                      <div className="text-base font-semibold text-red-500">
                        Tổng tiền: {formatCurrency(order.final_amount || 0)}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      {order.status === "pending" ? (
                        <Button variant="outline" size="sm" className="rounded">
                          Hủy
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="rounded">
                          Mua lại
                        </Button>
                      )}
                      {order.payment_status === "unpaid" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded"
                          onClick={() => handlePayment(order)}
                        >
                          Thanh toán
                        </Button>
                      )}
                      <Button
                        variant="default"
                        size="sm"
                        className="rounded bg-blue-600 hover:bg-blue-500"
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
