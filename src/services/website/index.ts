import { PaymentMethod } from "@/pages/Admin/PaymentMethods/PaymentMethod.type";
import { api } from "../apiServices";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

export async function getPaymentMethods(): Promise<{
  status?: string;
  data?: PaymentMethod[];
  message?: string;
}> {
  try {
    const res = await api.get("/payment-methods");
    return res.data;
  } catch (err) {
    const axiosError = err as AxiosError<{ status: string; message: string }>;
    return {
      status: axiosError.response?.data.status,
      message:
        axiosError.response?.data.message ||
        "Lỗi không xác định, vui lòng thử lại!",
    };
  }
}

export function usePaymentMethods() {
  return useQuery({
    queryKey: ["payment-methods"],
    queryFn: getPaymentMethods,
    staleTime: 1000 * 60 * 10,
  })
}
export async function getHomeData() {
  const response = await api.get("/home-settings");
  return response.data;
}

export function useHome() {
  return useQuery({
    queryKey: ["homeData"],
    queryFn: getHomeData,
    staleTime: 1000 * 60 * 10, 
  });
}
