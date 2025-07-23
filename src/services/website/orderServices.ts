import { Meta } from "@/types";
import { authApi } from "../apiServices";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Order } from "../seller/orderServices";

export type OrderItem = {
  product_id: number;
  image: string;
  product_name: string;
  variant_id: number;
  variant_name: string;
  quantity: number;
  price: number;
  total_price: number;
};

export type OrderGroup = {
  order_number?: string;
  shop_id: number;
  items: OrderItem[];
  shipping_fee: number;
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  payment_method: string;
  address_id: number;
  // shipping_address: string;
};

// Đơn hàng đã tạo (hiển thị lịch sử)


// ✅ Hàm tạo nhiều đơn hàng
export async function createOrders(orders: OrderGroup[]): Promise<{
  status: string;
  message: string;
}> {
  const res = await authApi.post("/orders/create", { orders });
  return res.data;
}

// ✅ Hàm lấy danh sách đơn hàng (có thể lọc theo status)
export async function getOrdersByStatus({
  status = "",
  page = 1,
  limit = 10,
}: {
  status: string;
  page: number;
  limit?: number;
}): Promise<{
  status: string;
  message: string;
  orders: Order[];
  meta: Meta;
}> {
  try {
    const res = await authApi.get(
      `/orders?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`
    );
    return res.data;
    ;
  } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
      throw new Error("Không thể lấy danh sách đơn hàng");
  }
  
}
export function useOrdersInfinite(status: string = "",limit: number = 5) {
  return useInfiniteQuery({
    queryKey: ["orders", status],
    queryFn: ({ pageParam = 1 }) =>
      getOrdersByStatus({ page: pageParam, status, limit }),
    getNextPageParam: (lastPage) => {
      const current = lastPage.meta.current_page;
      const last = lastPage.meta.last_page;
      return current < last ? current + 1 : undefined;
    },
    initialPageParam: 1, // 👈 THÊM DÒNG NÀY
    staleTime: 0,
  });
}

export const getOrderDetail = async (orderNumber: string): Promise<Order> => {
  const response = await authApi.get("/orders/" + orderNumber);
  if (!response.data.data) {
    throw new Error(response.data.message || "Không tìm thấy đơn hàng");
  }
  return response.data.data;
};
export const useOrderDetail = (orderNumber: string) => {
  return useQuery({
    queryKey: ["order-detail", orderNumber],
    queryFn: () => getOrderDetail(orderNumber),
    enabled: !!orderNumber,
  });
};