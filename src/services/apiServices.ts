import axios, { AxiosInstance, AxiosResponse } from "axios";
import apiConfig from "../config/apiConfig";
import useUserStore from "@/store/userStore";

// ⚡️ Tạo một Axios instance với cấu hình từ apiConfig
export const api: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});
export const authApi: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: { "Content-Type": "application/json" },
});
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Bỏ qua nếu là request /auth/refresh
    if (originalRequest.url === "/auth/refresh") {
      return Promise.reject(error);
    }

    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await authApi.post("/auth/refresh");
        const user = response.data.user;
        if (user) {
          useUserStore.getState().setUser(user);
          sessionStorage.setItem("user", JSON.stringify(user));
          return authApi(originalRequest); // Thử lại request gốc
        }
        throw new Error("No user in refresh response");
      } catch (refreshError) {
        // Xóa thông tin người dùng nếu refresh thất bại
        useUserStore.getState().clearUser();
        sessionStorage.removeItem("user");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


// 🛠 Interceptor xử lý response và lỗi
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (axios.isCancel(error)) {
      console.warn("⚠️ Request đã bị hủy:", error.message);
    } else if (error.code === "ECONNABORTED") {
      console.error("⏳ Request timeout: Quá 5 giây không phản hồi");
    } else if (error.response) {
      console.error(`❌ Lỗi API ${error.response.status}:`, error.response.data);
    } else {
      console.error("❌ Lỗi không xác định:", error.message);
    }
    return Promise.reject(error);
  }
);
