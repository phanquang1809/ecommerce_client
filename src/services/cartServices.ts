import { CartItem } from "@/types";
import { authApi } from "./apiServices";

export async function getCart(): Promise<{
  status: string;
  message: string;
  items: CartItem[];
  shop_info:{
    id:number,
    name:string,
    url:string
  }[]
}> {
  const res = await authApi.get("/cart");
  return res.data;
}
// Thêm sản phẩm vào giỏ
export async function addItem(item: { productId: number; variantId: number; quantity: number;shopId: number,unitPriceAtTime: number }): Promise<{status: string, message: string,data:CartItem}> {
  const res = await authApi.post("/cart/add", item);
  return res.data;
}

// Xoá sản phẩm khỏi giỏ
export async function removeItem(variantIds: number[]): Promise<{status: string, message: string}> {
  const res = await authApi.delete("/cart/remove", {
    data: {variantIds },
  });
  return res.data;
}

// Cập nhật số lượng sản phẩm
export async function updateQuantity(
  variantId: number,
  quantity: number,
): Promise<{status: string, message: string}> {
  const res = await authApi.post("/cart/update", {
    variantId,
    quantity,
  });
  return res.data;
}

// Xoá toàn bộ giỏ
export async function clearCart(): Promise<CartItem[]> {
  const res = await authApi.delete("/cart/clear");
  return res.data.cart;
}
export async function getShippingFee(data: {
  shop_id: number;
  province: string;
  district: string;
  address: string;
  weight: number;
  value: number;
}): Promise<{
  status: string;
  fee: number;
}> {
  const res = await authApi.post("/cart/shipping-fee", data);
  return res.data;
}