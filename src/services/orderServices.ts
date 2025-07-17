import { authApi } from "./apiServices";

export type OrderItem = {
  product_id: number;
  product_name: string;
  variant_id: number;
  quantity: number;
  price: number;
  total_price: number;
};

export type OrderGroup = {
  shop_id: number;
  items: OrderItem[];
  shipping_fee: number;
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  shipping_address: string;
};

// Hàm tạo nhiều đơn hàng
export async function createOrders(orders: OrderGroup[]): Promise<{
  status: string;
  message: string;
}> {
  const res = await authApi.post("/orders/create", { orders });
  return res.data;
}
