import { Meta, Shop } from "@/types";
import { authApi } from "../apiServices";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Product } from "@/features/products/types/product.type";
import { useNavigate } from "react-router-dom";
import NProgress from "nprogress";

export type ShopDetails = Shop & {
  total_products: number;
  total_reviews: number;
  followers: number;
  following: number;
  highlight_products: Product[];
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
};
export async function createAttributeValueByShop({
  attributeId,
  value,
}: {
  attributeId: number;
  value: string;
}) {
  const res = await authApi.post("/shop/attribute-value", {
    attribute_id: attributeId,
    value: value.trim(),
  });
  return res.data;
}

export const getShopDetails = async (slug: string): Promise<ShopDetails> => {
  const res = await authApi.get(`/shops/${slug}`);
  return res.data;
};

export const useShopDetails = (slug: string) => {
  const queryClient = useQueryClient();
  return useQuery<ShopDetails>({
    queryKey: ["shopDetails", slug],
    queryFn: () => getShopDetails(slug),
    enabled: !!slug,
    // 👇 lấy dữ liệu từ cache nếu đã được prefetch
    initialData: () => queryClient.getQueryData(["shopDetails", slug]),
    staleTime: 1000 * 60 * 5, // tuỳ chỉnh nếu muốn giữ cache tươi lâu hơn
  });
};

export const useHandleGetShopDetail = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleGetShopDetail = async (slug: string) => {
    try {
      const cached = queryClient.getQueryData(["shopDetails", slug]);
      if (!cached) {
        NProgress.start();

        // Nếu chưa có thì mới gọi API và prefetch
        await queryClient.prefetchQuery({
          queryKey: ["shopDetails", slug],
          queryFn: () => getShopDetails(slug),
        });

        NProgress.done();
      }

      // Điều hướng sau khi chắc chắn đã có dữ liệu
      navigate(`/cua-hang/${slug}?tab=store`);
    } catch (error) {
      console.error("Lỗi lấy thông tin shop:", error);
      NProgress.done();
    }
  };

  return handleGetShopDetail;
};

export const getShopProducts = async ({
  slug,
  sortBy,
  category,
  page = 1,
  limit = 20,
}: {
  slug: string;
  sortBy?: string;
  category?: string;
  page?: number;
  limit?: number;
}): Promise<{
  status?: string;
  message?: string;
  data: Product[];
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  meta: Meta;
}> => {
  const response = await authApi.get(`/shops/${slug}/products`, {
    params: { page, limit, sortBy,category },
  });
  return response.data;
};

export const useShopProducts = (slug: string, page = 1) => {
  return useQuery({
    queryKey: ["shopProducts", slug, page],
    queryFn: () => getShopProducts({ slug, page }),
    enabled: !!slug,
    staleTime: 1000 * 60 * 3,
  });
};

export const useInfiniteShopProducts = (slug: string,sortBy: string,category: string) => {
  return useInfiniteQuery({
    queryKey: ["shopProducts", slug,sortBy,category],
    queryFn: ({ pageParam = 1 }) =>
      getShopProducts({
        slug,
        page: pageParam,
        sortBy,
        category
      }),
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.meta;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!slug,
  });
};