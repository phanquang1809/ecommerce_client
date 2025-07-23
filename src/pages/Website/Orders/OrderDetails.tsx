import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader, MessageCircleMore, Store } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrderDetail } from "@/services/website/orderServices";
import { formatCurrency, formatDate } from "@/utils/format";
import { getOrderStatusLabel } from "@/pages/Seller/Orders/columns";

export const OrderDetails = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useOrderDetail(number || "");
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin" />
        </div>
      );
    }
    if(!data || isError){
      return (
        <div className="text-center py-8 text-gray-500">Không thể tải đơn hàng.</div>
      );
    }
  return (
    <div>
      <div className="p-4 bg-white rounded-md flex items-center justify-between">
        <Button
          variant="ghost"
          className="text-xl font-normal !bg-white"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Trở lại
        </Button>
        <div className="flex items-center gap-1">
        <h2 className="text-xl ">Chi tiết đơn hàng #{number}</h2>
        -
        <div className="text-xl rounded font-bold">{getOrderStatusLabel(data?.status  || "")}</div>
        </div>
      </div>

      <div className="mt-4 space-y-4">
  {/* Hàng 1: Địa chỉ và Lịch sử */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Địa chỉ - 1/3 */}
    <div className="md:col-span-2 bg-white p-4 rounded-md">
      <h4 className="font-bold text-lg mb-2">Địa chỉ nhận hàng</h4>
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-800">{data?.buyer?.receiver_name}</div>
        <div className="text-sm text-gray-500">{data?.buyer?.receiver_phone}</div>
        <div className="text-sm text-gray-500">{data?.shipping_address}</div>
      </div>
    </div>

    {/* Lịch sử - 2/3 */}
    <div className=" bg-white p-4 rounded-md">
      <h4 className="font-bold text-lg mb-2">Lịch sử đơn hàng</h4>
      <div className="space-y-2 text-sm text-gray-700">
        {data?.logs &&data.logs?.length > 0 ? (
          data.logs.map((log, index) => (
            <div key={index} className="border-b pb-2">
              <div className="font-medium text-gray-800">{log.message}</div>
              <div className="text-xs text-gray-500">{formatDate(log.created_at)}</div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 italic">Không có log nào.</div>
        )}
      </div>
    </div>
  </div>

  {/* Hàng 2: Sản phẩm */}
  <div className="bg-white p-4 rounded-md">
     <div className="flex items-center gap-2 pb-3 border-b">
          <img
            src={data.shop?.logo}
            alt={data.shop?.name}
            className="w-8 h-8 rounded"
          />
          <div className="text-base font-medium text-gray-800">
            {data.shop?.name}
          </div>
          <Button
            className="rounded bg-blue-600 hover:bg-blue-500"
            size="sm"
            onClick={() => navigate(`${data.shop?.url}`)}
          >
            <MessageCircleMore className="w-4 h-4" />
            Chat
          </Button>
          <Button
            variant="outline"
            className="rounded"
            size="sm"
            onClick={() => navigate(`${data.shop?.url}`)}
          >
            <Store className="w-4 h-4" />
            Xem shop
          </Button>
        </div>
    <div className="space-y-4">
      {data.items.map((item, i) => (
        <div key={i} className="flex items-center gap-4 py-2 border-b last:border-b-0">
          <img src={item.image} alt={item.product_name} className="w-16 h-16 object-cover rounded" />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-800">{item.product_name}</div>
            <div className="text-sm text-gray-500">Phân loại hàng: {item.product_variant_name}</div>
            <div className="text-sm text-gray-500">x{item.quantity}</div>
          </div>
          <div className="text-sm text-gray-700">{formatCurrency(item.price)} đ</div>
        </div>
      ))}
    </div>

    <div className="text-right font-semibold text-red-500 border-t pt-4 mt-4">
      Tổng tiền: {formatCurrency(data.total)}
    </div>
  </div>
</div>

    </div>
  );
};
