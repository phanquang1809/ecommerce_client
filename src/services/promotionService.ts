import { Promotion } from "@/pages/Seller/Promotions/promotion.type";
import { authApi } from "./apiServices";

interface ApiResponse<T> {
  status: string;
  data: T;
}


export const getPromotions = async (): Promise<ApiResponse<Promotion[]>> => {
  try {
    const response = await authApi.get("/promotions");
    if (response.data.status !== "success") {
      throw new Error(`API failed with status: ${response.data.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching promotions:", error);
    throw new Error("Không thể lấy danh sách khuyến mãi");
  }
};
export const createPromotion = async (data: Promotion): Promise<ApiResponse<Promotion>> => {
  try {
    const response = await authApi.post("/promotions", data);
    if (response.data.status !== "success") {
      throw new Error(`API failed with status: ${response.data.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error creating media folder:", error);
    throw new Error("Không thể tạo thư mục");
  }
};