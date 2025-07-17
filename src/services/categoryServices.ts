import { CategoryDetailsProps } from "./../pages/Website/Category/categorydetails.type";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { api } from "./apiServices";
import { Category, Meta } from "../types";
// Hàm lấy tất cả các danh mục
export async function getCategories() {
  const response = await api.get("/categories");
  return response.data;
}
interface CategoryDetailsResponse {
  data: CategoryDetailsProps;
  status: string;
  meta: Meta;
}

// Hàm lấy danh mục theo slug với khả năng hủy yêu cầu
export async function getCategoryBySlug(
  slug: string,
  sortBy?: string,
  selectedFilters?: { slug: string; values: string[] }[],
  page: number = 1
): Promise<CategoryDetailsResponse> {

  try {
    const params = new URLSearchParams();
    // Append sortBy và page nếu có
    if (sortBy) params.append("sortBy", sortBy);
    params.append("page", page.toString());

    if (selectedFilters) {
      selectedFilters.forEach((filter) => {
          params.append(filter.slug, filter.values.join(","));
      });
    }
    const response = await api.get(`/categories/${slug}`, {
      params,
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error && error.message === "AbortError") {
      console.error("Request bị hủy do timeout sau 5 giây");
    } else {
      console.error("Lỗi khi lấy danh mục:", error);
    }
    throw new Error("Failed to fetch category data.");
  }
}

// Hook lấy tất cả danh mục
export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: ["categories"], // Đây là query key của bạn
    queryFn: getCategories, // Hàm gọi API để fetch dữ liệu
    staleTime: 1000 * 60 * 10, // Cache 10 phút
  });
}

// Hook lấy danh mục theo slug
export const useCategoryBySlug = (
  slug: string,
  sortBy: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["category", slug, sortBy],
    queryFn: () => getCategoryBySlug(slug, sortBy),
    enabled: enabled && !!slug, // Only run if enabled and slug is valid
  });
};

export const useInfiniteCategoryBySlug = (slug: string, sortBy: string,selectedFilters: { slug: string; values: string[] }[]) => {
  return useInfiniteQuery({
    queryKey: ["category", slug, sortBy,selectedFilters],
    queryFn: ({ pageParam = 1 }) => getCategoryBySlug(slug, sortBy,selectedFilters, pageParam),
    getNextPageParam: (lastPage) => {
      const current = lastPage.meta.current_page;
      const last = lastPage.meta.last_page;
      return current < last ? current + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5, // ✅ giữ cache "fresh" trong 5 phút
    enabled: !!slug,
  });
};
