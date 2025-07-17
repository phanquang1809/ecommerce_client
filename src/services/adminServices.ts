import { AxiosError } from "axios";
import { authApi } from "./apiServices";
import { BuyerProps, CategoryRevenue, Customer } from "../types";
import { useQuery } from "@tanstack/react-query";
type CustomerDetail = Customer & { phone: string,created_at:string };

type DashboardData = {
  totalCustomer:number;
  totalOrder:number;
  totalReveneu:number;
  totalSeller:number;
  categoriesRevenue:CategoryRevenue[];
  topBuyer: BuyerProps[],
}

export const getCustomers=async():Promise<{ status?: string; message?: string; data?:Customer[] }> =>{
    try {
      const response = await authApi.get("/admin/customers");
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
export const getCustomerDetial=async(id:number):Promise<{ status?: string; message?: string; data?:CustomerDetail }> =>{
    try {
      const response = await authApi.get("/admin/customers/details/"+id);
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

const getDashboard =async():Promise<{ status?: string; message?: string; data?:DashboardData  }> =>
{
  try {
    const response = await authApi.get("/admin/dashboard");
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

export function useDashboardForAdmin() {
  return useQuery<{ status?: string; message?: string; data?:DashboardData }>({
    queryKey: ["dashboardData"],  
    queryFn: getDashboard, 
    staleTime: 1000 * 60 * 10,
  });
}