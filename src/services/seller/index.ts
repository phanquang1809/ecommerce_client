import { authApi } from "../apiServices";

export async function createAttributeValueByShop({
  attributeId,
  value,
}: {
  attributeId: number;
  value: string;
}) {
  try {
    const res = await authApi.post("/shop/attribute-value", {
      attribute_id: attributeId,
      value: value.trim(),
    });

    return res.data;
  } catch (error: any) {
    console.error("Lỗi tạo attribute value:", error);
    return {
      status: "error",
      message: error?.response?.data?.message || "Lỗi không xác định",
    };
  }
}