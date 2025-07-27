import { useQuery } from "@tanstack/react-query";
import { authApi } from "../apiServices";
export type AddressForm = {
  id: number;
  customer_name: string;
  customer_phone_number: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  is_default: boolean;
};
interface ApiResponse {
  message: string;
  status: number;
  data: AddressForm[];
}

export const getAddresses = (): Promise<ApiResponse> => {
  return authApi.get("/auth/addresses").then((res) => res.data);
};

export const useAddresses = () =>
  useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
    staleTime: 1000 * 60 * 5, // 5 phút
    refetchOnWindowFocus: true,
  });

export const createAddress = async (data: AddressForm) => {
  const res = await authApi.post("/auth/addresses", data);
  return res.data;
};
export const removeAddress = async (id: number) => {
  const res = await authApi.delete(`/auth/addresses/${id}`);
  return res.data;
};
export const updateAddress = async (id: number, data: AddressForm) => {
  const res = await authApi.put(`/auth/addresses/${id}`, data);
  return res.data;
};