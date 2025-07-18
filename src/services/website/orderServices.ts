import { Meta } from "@/types";
import { authApi } from "../apiServices";
import { AxiosError } from "axios";

export type OrderItem = {
  product_id: number;
  image: string;
  product_name: string;
  variant_id: number;
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
  shipping_address: string;
};

// Đơn hàng đã tạo (hiển thị lịch sử)
export type Order = {
  id: number;
  order_number: string;
  shop_id: number;
  final_amount: number;
  status: string;
  payment_method: string;
  shipping_address: string;
  payment_status: string;
  created_at: string;
  items: OrderItem[];
};

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
  status?: string;
  page?: number;
  limit?: number;
}): Promise<{
  status?: string;
  message?: string;
  orders?: Order[];
  meta?: Meta;
}> {
  try {
    const res = await authApi.get(
      `/orders?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`
    );
    return {
      status: "success",
      orders: res.data.orders,
      meta: res.data.meta, // backend cần trả về `meta`
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ status: string; message: string }>;
    return {
      status: axiosError.response?.data.status,
      message:
        axiosError.response?.data.message ||
        "Lỗi không xác định, vui lòng thử lại!",
    };
  }
}