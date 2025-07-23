import { AxiosError } from "axios";
// import { jwtDecode } from "jwt-decode";
import { AuthResponse, User } from "../types";
import { api, authApi } from "./apiServices";

export const login = async (
  userInput: string,
  password: string,
  rememberMe: boolean,
  seller?: boolean
) => {
  try {
    const response = await api.post<AuthResponse>("/auth/login", {
      userInput,
      password,
      rememberMe,
      seller
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ status: string; message: string }>;
    throw new Error(
      axiosError.response?.data.message ||
        "Lỗi không xác định, vui lòng thử lại!"
    );
  }
};

export const logout = async () => {
  try {
    const response = await authApi.post("/auth/logout");
    const { status, message } = response.data;
    return { status, message };
  } catch (error) {
    const axiosError = error as AxiosError<{ status: string; message: string }>;
    throw new Error(
      axiosError.response?.data.message ||
        "Lỗi không xác định, vui lòng thử lại!"
    );
  }
};

export const register = async (email: string, code: string) => {
  try {
    const response = await api.post("/auth/register", { email, code });
    const { status, message } = response.data;
    return { status, message };
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
export const createUser = async (
  email: string,
  password: string,
  c_password: string,
  token: string,
  phone?: string,
  address?: {
    province: { label: string; value: string };
    district: { label: string; value: string };
    ward: { label: string; value: string };
    addressDetail: string;
  }
) => {
  try {
    const response = await api.post("/auth/create", {
      email,
      password,
      c_password,
      token,
      phone,
      address, // Đảm bảo backend cũng chấp nhận field này
    });

    const { status, message, user } = response.data;
    return { status, message, user };
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

export const verifyEmail = async (email: string, code: string,seller: boolean) => {
  try {
    const response = await api.post("/auth/verify-email", { email, code,seller });
    const { status, message,token } = response.data;
    return { status, message,token };
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
export const checkUserExist= async (userInput:string) => {
    try {
        const response = await api.post("/auth/check-exist", {
          userInput,
        });
        return response.data;
    } catch {
        return false;
    }
};

// export const checkAuth = (): User | null => {
//   const token = localStorage.getItem("token");
//   if (!token) return null;

//   try {
//     const decoded: { exp: number; user: User } = jwtDecode(token);
//     const now = Math.floor(Date.now() / 1000);

//     // Kiểm tra token hết hạn
//     if (decoded.exp < now) {
//       console.log("Token đã hết hạn!");
//       localStorage.removeItem("token");
//       return null;
//     }
//     // Trả về thông tin user nếu token còn hiệu lực
//     return decoded.user;
//   } catch (error) {
//     console.error("Lỗi giải mã token!", error);
//     localStorage.removeItem("token");
//     return null;
//   }
// };
export const checkAuth= async (): Promise<User | null> => {
  try {
      const res = await authApi.get("/auth/me", { withCredentials: true });
      return res.data;
  } catch {
      return null;
  }
};
export const sendVerificationCode = async (email: string,seller: boolean): Promise<{ status?: string; message?: string }> => {
  try {
    const response = await api.post("/auth/send-otp", { email,seller });
    return response.data;
  }catch (error) {
    const axiosError = error as AxiosError<{ status: string; message: string }>;
    return {
      status: axiosError.response?.data.status,
      message:
        axiosError.response?.data.message ||
        "Lỗi không xác định, vui lòng thử lại!",
    };
  }
};

export const changePassword = async (
  token: string,
  password: string,
  confirmPassword: string
): Promise<{ status?: string; message?: string }> => {
  try {
    const response = await api.post("/auth/change-password", {
      token,
      password,
      confirmPassword,
    });
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

export const forgotPassword = async (
  email: string
): Promise<{ status?: string; message?: string }> => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
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