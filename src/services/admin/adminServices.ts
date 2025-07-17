import { AxiosError } from "axios";
import { authApi } from "../apiServices";
import { BuyerProps, CategoryRevenue, CategorySubGroup, Customer, Meta, Shop } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { useAuthFetch } from "@/hooks/useAuthFetch";
type CustomerDetail = Customer & { phone: string; created_at: string };

type DashboardData = {
  totalCustomer: number;
  totalOrder: number;
  totalReveneu: number;
  totalSeller: number;
  categoriesRevenue: CategoryRevenue[];
  topBuyer: BuyerProps[];
};

export const getCustomers = async (): Promise<{
  status?: string;
  message?: string;
  data?: Customer[];
}> => {
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
};
export const getCustomerDetial = async (
  id: number
): Promise<{ status?: string; message?: string; data?: CustomerDetail }> => {
  try {
    const response = await authApi.get("/admin/customers/details/" + id);
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
};

const getDashboard = async (): Promise<{
  status?: string;
  message?: string;
  data?: DashboardData;
}> => {
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
};

export function useDashboardForAdmin() {
  return useQuery<{ status?: string; message?: string; data?: DashboardData }>({
    queryKey: ["dashboardData"],
    queryFn: getDashboard,
    staleTime: 1000 * 60 * 10,
  });
}



export async function getCategorySubGroupsForAdmin({page=1,limit=20}:{page?:number,limit?:number}): Promise<{
  status?: string;
  message?: string;
  data?: CategorySubGroup[];
   meta?:Meta;
}> {
  try {
    const response = await authApi.get("/admin/category-subgroups?page="+page+"&limit="+limit);
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
export function useCategorySubGroupsForAdmin(page: number, limit: number) {
  return useQuery<{ status?: string; message?: string; data?: CategorySubGroup[];parents?:{id:number,name:string}[];meta?:Meta }>({
    queryKey: ["categorySubGroupsForAdmin",page,limit], // Đây là query key của bạn
    queryFn: () => getCategorySubGroupsForAdmin({page,limit}), // Hàm gọi API để fetch dữ liệu
    staleTime: 1000 * 60 * 10, // Cache 10 phút
  });
}
export async function updateCategorySubGroupOrder(categoryIds: number[]) {
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

export async function getSubCategoriesForAdmin({page=1,limit=20}:{page?:number,limit?:number}): Promise<{
  status?: string;
  message?: string;
  data?: CategorySubGroup[];
  parents?:{id:number,name:string}[]
  meta?:Meta;
}> {
  try {
    const response = await authApi.get("/admin/category-subcategories?page="+page+"&limit="+limit);
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

export function useSubCategoriesForAdmin(page: number, limit: number) {
  return useQuery({
    queryKey: ['subCategoriesForAdmin', page, limit], // Cache từng cặp page/limit
    queryFn: () => getSubCategoriesForAdmin({ page, limit }),
    staleTime: 1000 * 60 * 10, // 10 phút
  });
}

export function uploadImage(image: File, signal: AbortSignal) {
  const formData = new FormData();
  formData.append("image", image);
  return authApi.post("/admin/upload-image", formData, {
    signal,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
type CategoryForProduct = {
   id: number;
  name: string;
  slug?: string;
  children?: CategoryForProduct[];
};

export async function getCategoriesForProduct(): Promise<{
  status?: string;
  message?: string;
  data?: CategoryForProduct[] | null;
}> {
  const response = await authApi.get("/admin/products/categories");
  return response.data;
}
export function useCategoriesForProduct(enabled = true) {
  return useQuery({
    queryKey: ["categories-for-product"],
    queryFn: getCategoriesForProduct,
    staleTime: 1000 * 60 * 30, // 30 phút
    refetchOnWindowFocus: false,
    enabled, // chỉ gọi khi enabled là true
  });
}
interface Ward {
  label: string;
  value: string;
}

interface District {
  label: string;
  value: string;
  children: Ward[];
}

interface Province {
  label: string;
  value: string;
  children: District[];
}

interface VietnamProvinceAPIResponse {
  name: string;
  code: string;
  districts: {
    name: string;
    code: string;
    wards: {
      name: string;
      code: string;
    }[];
  }[];
}

export async function getVietnamProvinces(): Promise<Province[]> {
  const res = await fetch("https://provinces.open-api.vn/api/?depth=3");
  const data: VietnamProvinceAPIResponse[] = await res.json();

  return data.map((p) => ({
    label: p.name,
    value: p.code,
    children: p.districts.map((d) => ({
      label: d.name,
      value: d.code,
      children: d.wards.map((w) => ({
        label: w.name,
        value: w.code,
      })),
    })),
  }));
}

export function useVietnamProvinces(enabled = true) {
  return useQuery({
    queryKey: ["vietname-provinces"],
    queryFn: getVietnamProvinces,
    staleTime: 1000 * 60 * 30, // 30 phút
    refetchOnWindowFocus: false,
    enabled, // chỉ gọi khi enabled là true
  });
}

export const getShops = async (): Promise<{
  status?: string;
  message?: string;
  data?: Shop[];
}> => {
  try {
    const response = await authApi.get("/admin/shops");
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
};
interface ShopProfileProps {
  data: Shop;
  status: string;
  message: string;
}
export function useShopDetail(slug?: string) {
  const shouldFetch = !!slug;
  return useAuthFetch<ShopProfileProps>(shouldFetch ? `/admin/shops/${slug}` : null);
}