import { Brand } from "@/pages/Admin/Brands/Brand.type"; // Đổi lại đường dẫn nếu cần
import { authApi } from "@/services/apiServices";
import { Meta } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Lấy danh sách thương hiệu
export async function getBrands({ page = 1, limit = 20 }: { page?: number; limit?: number }): Promise<{
  status?: string;
  message?: string;
  data?: Brand[];
  meta?: Meta;
}> {
  try {
    const response = await authApi.get(`/admin/brands?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ status: string; message: string }>;
    return {
      status: axiosError.response?.data.status,
      message: axiosError.response?.data.message || "Lỗi không xác định, vui lòng thử lại!",
    };
  }
}

// Hook React Query
export function useBrands(page: number, limit: number) {
  return useQuery({
    queryKey: ["brands", page, limit],
    queryFn: () => getBrands({ page, limit }),
    staleTime: 1000 * 60 * 10, // 10 phút
  });
}

// Tạo mới thương hiệu
export async function createBrand(data: {
  name: string;
  logo: string;
  description: string;
  url: string;
  categories: { id: number; name: string }[];
}): Promise<{
  status?: string;
  message?: string;
  data?: Brand;
}> {
  try {
    const response = await authApi.post("/admin/brands", data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ status: string; message: string }>;
    return {
      status: axiosError.response?.data.status,
      message: axiosError.response?.data.message || "Lỗi không xác định, vui lòng thử lại!",
    };
  }
}

// Cập nhật thương hiệu
export async function updateBrand(
  brandId: number,
  data: {
    name: string;
    logo: string;
    description: string;
    url: string;
    categories: { id: number; name: string }[];
  }
): Promise<{
  status?: string;
  message?: string;
}> {
  try {
    const response = await authApi.put(`/admin/brands/${brandId}`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ status: string; message: string }>;
    return {
      status: axiosError.response?.data.status,
      message: axiosError.response?.data.message || "Cập nhật thất bại, vui lòng thử lại!",
    };
  }
}
