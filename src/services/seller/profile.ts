import { authApi } from "../apiServices";
export const updateProfile = async (data: FormData) => {
    const response = await authApi.post("/shop/profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };