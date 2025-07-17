import { Attribute } from "@/pages/Admin/Attributes/Attribute.type";
import { authApi } from "@/services/apiServices";
import { Meta } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";


export async function getAttributes({page=1,limit=20}:{page?:number,limit?:number}): Promise<{
  status?: string;
  message?: string;
  data?: Attribute[];
  meta?:Meta;
}> {
  try {
    const response = await authApi.get("/admin/attributes?page="+page+"&limit="+limit);
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

export function useAttributes(page: number, limit: number) {
  return useQuery({
    queryKey: ['attributes', page, limit], // Cache từng cặp page/limit
    queryFn: () => getAttributes({ page, limit }),
    staleTime: 1000 * 60 * 10, // 10 phút
  });
}

export async function createAttributeValues(
  attributeId: number,
  values: string[]
): Promise<{
  status?: string;
  message?: string;
}> {
  try {
    const response = await authApi.post(
      `/admin/attributes/${attributeId}/values`,
      { values } // Gửi mảng lên
    );

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
export async function updateAttributeWithValues(
  attributeId: number,
  name: string,
  values: { id?: number; value: string }[],
  categories: { id: number; name: string }[],
  type: "variant" | "spec"
): Promise<{ status?: string; message?: string }> {
  try {
    const res = await authApi.put(`/admin/attributes/${attributeId}`, {
      name,
      values,
      categories,
      type
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ status: string; message: string }>;
    return {
      status: axiosError.response?.data.status,
      message:
        axiosError.response?.data.message || "Cập nhật thất bại, vui lòng thử lại!",
    };
  }
}
export async function createAttributeWithValues(
  name: string,
  values: { value: string }[],
  categories: { id: number; name: string }[],
  type: "variant" | "spec"
): Promise<{
  status?: string;
  message?: string;
  data?: Attribute;
}> {
  try {
    const response = await authApi.post("/admin/attributes", {
      name,
      values,
      categories,
      type
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
