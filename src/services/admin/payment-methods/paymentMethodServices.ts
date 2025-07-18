import { authApi } from "@/services/apiServices";
import { AxiosError } from "axios";
import { PaymentMethod } from "@/pages/Admin/PaymentMethods/PaymentMethod.type"; // cập nhật đúng path
import { Meta } from "@/types";
import { useQuery } from "@tanstack/react-query";

// Lấy danh sách phương thức thanh toán
export async function getPaymentMethods({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<{
  status?: string;
  message?: string;
  data?: PaymentMethod[];
  meta?: Meta;
}> {
  try {
    const response = await authApi.get(
      `/admin/payment-methods?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      status: string;
      message: string;
    }>;
    return {
      status: axiosError.response?.data.status,
      message:
        axiosError.response?.data.message ||
        "Không thể lấy danh sách phương thức thanh toán",
    };
  }
}

// Tạo phương thức thanh toán
export async function createPaymentMethod(data: {
  name: string;
  code?: string;
  description?: string;
  is_active?: boolean;
}): Promise<{
  status?: string;
  message?: string;
  data?: PaymentMethod;
}> {
  try {
    const response = await authApi.post("/admin/payment-methods", data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      status: string;
      message: string;
    }>;
    return {
      status: axiosError.response?.data.status,
      message:
        axiosError.response?.data.message || "Không thể tạo phương thức thanh toán",
    };
  }
}

// Cập nhật phương thức thanh toán
export async function updatePaymentMethod(
  id: number,
  data: {
    name: string;
    code?: string;
    description?: string;
    is_active?: boolean;
  }
): Promise<{
  status?: string;
  message?: string;
}> {
  try {
    const response = await authApi.put(`/admin/payment-methods/${id}`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      status: string;
      message: string;
    }>;
    return {
      status: axiosError.response?.data.status,
      message:
        axiosError.response?.data.message ||
        "Không thể cập nhật phương thức thanh toán",
    };
  }
}
export function usePaymentMethods(page: number, limit: number) {
  return useQuery({
    queryKey: ["payment-methods", page, limit],
    queryFn: () => getPaymentMethods({ page, limit }),
    staleTime: 1000 * 60 * 10, // 10 phút
  });
}
