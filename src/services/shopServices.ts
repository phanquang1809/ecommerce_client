import { Shop } from "@/pages/Website/ProductDetails/productdetails.type";
import {api} from "./apiServices";
interface GetShopBySlugResponse {
  status: string;
  data: Shop;
}
export async function getShopBySlug(slug: string): Promise<GetShopBySlugResponse | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // Hủy request sau 5s

  try {
    const response = await api.get<GetShopBySlugResponse>(`/shops/${slug}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response.data;
  } catch (error) {
    if (error instanceof Error && error.message === "AbortError") {
      console.error("⚠️ Request bị hủy do timeout sau 5 giây");
    } else {
      console.error("❌ Lỗi khi lấy sản phẩm:", error);
    }
    return null;
  }
}