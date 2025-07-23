import { ProductDetails } from "@/pages/Website/ProductDetails/productdetails.type";
import {api} from "../apiServices";
import { Product } from "@/features/products/types/product.type";
import { useQuery } from "@tanstack/react-query";

interface GetProductBySlugResponse {
  status: string;
  data:{
    product: ProductDetails;
    relatedProducts: Product[]
  };
}
// export async function getProductByShop(slug: string,shop:string): Promise<GetProductBySlugResponse | null> {
//   // const controller = new AbortController();
//   // const timeoutId = setTimeout(() => controller.abort(), 5000); // Hủy request sau 5s

//   try {
//     const response = await api.get<GetProductBySlugResponse>(`/products/${shop}/${slug}`, {
//       // signal: controller.signal,
//     });
//     // clearTimeout(timeoutId);
//     return response.data;
//   } catch (error) {
//       console.error("❌ Lỗi khi lấy sản phẩm:", error);
//       return null;
//   }
// }

export async function getProductByShop(slug: string, shop: string) {
  const response = await api.get<GetProductBySlugResponse>(`/products/${shop}/${slug}`);
  return response.data;
}

export const useProductByShop = (
  slug: string,
  shop: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["product-by-shop", shop, slug],
    queryFn: () => getProductByShop(slug, shop),
    enabled: !!slug && !!shop && enabled,
    staleTime: 1000 * 60 * 5, // 5 phút
  });
};