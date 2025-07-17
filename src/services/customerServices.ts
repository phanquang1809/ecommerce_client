import { AxiosError } from "axios";
import { authApi } from "./apiServices";
import { Customer } from "../types";
type CustomerDetail = Customer & { phone: string,created_at:string };

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