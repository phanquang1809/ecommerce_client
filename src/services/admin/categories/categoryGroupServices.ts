import { authApi } from "@/services/apiServices";
import { CategoryGroup, Meta } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export async function getCategoryGroupsForAdmin({page=1,limit=20}:{page?:number,limit?:number}): Promise<{
  status?: string;
  message?: string;
  data?: CategoryGroup[];
  meta?:Meta
}> {
  try {
    const response = await authApi.get("/admin/category-groups?page="+page+"&limit="+limit);
    return response.data;
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
export function useCategoryGroupsForAdmin(page: number, limit: number) {
  return useQuery<{ status?: string; message?: string; data?: CategoryGroup[];meta?:Meta }>({
    queryKey: ["categoryGroupsForAdmin",page,limit], // Đây là query key của bạn
    queryFn: () => getCategoryGroupsForAdmin({page,limit}), // Hàm gọi API để fetch dữ liệu
    staleTime: 1000 * 60 * 10, // Cache 10 phút
  });
}
export async function updateCategoryGroupOrder(categoryIds: number[]) {
  try {
    const response = await authApi.post("/admin/category-groups/update-order", { categoryIds });
    return response;
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
export async function addCategory(data: {
  name: string;
  description: string;
  image?: string|null;
  status?: string;
  parentId?: number;
}) {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if(data.status)
    {
      formData.append("status", data.status);
    }
    if (data.parentId) {
      formData.append("parent_id", data.parentId.toString());
    }
    if (data.image)
    {
      formData.append("image_url", data.image);
    }
    const response = await authApi.post("/admin/category", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
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
export async function updateCategory(data: {
  name: string;
  description: string;
  image?: string | null;
  id?: number;
  status?: string;
  parentId?: number;
}) {
  try {    
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if(data.status)
    {
      formData.append("status", data.status);
    }
    if (data.parentId) {
      formData.append("parent_id", data.parentId.toString());
    }
    if (data.image) {
      formData.append("image_url", data.image);
    }
    formData.append("_method", "PUT")
    const response = await authApi.post(`/admin/category/${data.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    return response.data;
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

export async function deleteCategory(id: number) {
  try {
    const response = await authApi.delete(`/admin/category/${id}`);
    return response.data;
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