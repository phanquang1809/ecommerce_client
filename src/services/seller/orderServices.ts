import { authApi } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";
export type Order = {
  id: number;
  order_number: string; 
  status: string;
  note?: string;
  cancel_reason?: string;
  cancelled_by_shop?: boolean;
  total: number;
  payment_method: string;
  payment_status: string;
  created_at: string;
  logs?: {
    'type': string;
    'message': string;
    'created_at': string
  }[];
  buyer: {
    user_name: string;
    avatar: string;
    receiver_name: string;
    receiver_phone: string;
  };
  shop?: {
    name: string;
    logo: string;
    url: string;
  }
  shipping_address: string;
  items: {
    product_name: string;
    product_variant_name: string;
    image: string;
    quantity: number;
    price: number;
    total: number;
  }[];
};

// ✅ Lấy danh sách đơn hàng
export const getOrderList = async ({
  page = 1,
  limit = 20,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{
  status?: string;
  message?: string;
  data: Order[];
  meta?: { total: number; current_page: number; last_page: number; per_page: number };
}> => {
  const response = await authApi.get("/shop/orders", {
    params: { page, limit, search },
  });
  return response.data;
};

// ✅ Lấy chi tiết đơn hàng theo ID hoặc mã
export const getOrder = async (orderNumber: string): Promise<{
  status?: string;
  message?: string;
  data: Order;
}> => {
  const response = await authApi.get("/shop/orders/" + orderNumber);
  return response.data;
};
// ✅ Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (orderNumber: string, status: string) => {
  const response = await authApi.patch(`/shop/orders/${orderNumber}/status`, { status });
  return response.data;
};

// ✅ Hook dùng React Query để lấy danh sách đơn hàng
export const useOrderList = ({
  page = 1,
  limit = 20,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["orders", page, limit, search],
    queryFn: () => getOrderList({ page, limit, search }),
    staleTime: 1000 * 60 * 5, // 5 phút
  });
};
