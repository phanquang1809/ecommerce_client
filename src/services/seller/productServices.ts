import { Product } from "@/features/products/types/product.type";
import { authApi } from "../apiServices";
import { useQuery } from "@tanstack/react-query";

export const createProduct = async (data: FormData) => {
    const response = await authApi.post("/shop/products", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
export const updateProduct = async (data: FormData, slug?:string) => {
    const response = await authApi.post("/shop/products/"+slug , data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
export const getFormData = async () => {
    const response = await authApi.get("/shop/products/form-data", {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}
export const getFormDataDetails = async (cat_id:number) => {
    const response = await authApi.get("/shop/products/form-data-details", {
        params:{cat_id},
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}
export const getProductList = async ({
  page = 1,
  limit = 20,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{
  status?: string;
  message?: string;
  data: Product[];
  meta?: { total: number; current_page: number; last_page: number; per_page: number };
}> => {
  const response = await authApi.get("/shop/products", {
    params: { page, limit, search },
  });
  return response.data;
};
export const getProduct = async(slug?:string):Promise<{ status?: string; message?: string; data:Product[];meta?: { total: number;current_page: number; last_page: number; per_page: number }}> =>{
    const response = await authApi.get("/shop/products/"+slug);
    return response.data;
}

export const updateProductStatus = async (slug: string, status: string) => {
    const response = await authApi.patch("/shop/products/" + slug+"/status", { status });
    return response.data;
}

export const getProductForQuickEdit = async (slug: string) => {
    const response = await authApi.get("/shop/products/" + slug + "/quick-edit");
    return response.data;
}

export const updateProductStatusAll = async (ids:(string|number)[],status: string) => {
    const response = await authApi.patch("/shop/products/status", { status, ids });
    return response.data;
}


export const useProductList = ({
  page = 1,
  limit = 20,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["products", page, limit, search],
    queryFn: () => getProductList({ page, limit, search }),
    staleTime: 1000 * 60 * 5, // 5 phút
  });
};