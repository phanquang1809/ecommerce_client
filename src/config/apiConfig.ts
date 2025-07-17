// Định nghĩa kiểu cho cấu hình
const apiUrl = import.meta.env.VITE_API_URL;

type ApiConfig = {
  baseURL: string;
  timeout: number;
};

const apiConfig: ApiConfig = {
  baseURL: apiUrl,
  timeout: 60000,
};

export default apiConfig;