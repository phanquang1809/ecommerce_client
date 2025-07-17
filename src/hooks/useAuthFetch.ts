// src/hooks/useFetch.ts
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { authApi } from "@/services/apiServices";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useAuthFetch<T>(url: string | null) {
  const [state, setState] = useState<FetchState<T>>({
    data:null,
    loading: !!url,
    error: null,
  });

  useEffect(() => {
    if (!url) return; // Không thực hiện fetch nếu không có URL

    let isMounted = true;
    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const response: AxiosResponse<T> = await authApi.get(url);
        if (isMounted) {
          setState({ data: response.data, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          const axiosError = error as AxiosError<{message: string }>;
          setState({
            data: null,
            loading: false,
            error: axiosError.response?.data?.message || "Lỗi kết nối server.",
          });
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false; // Dọn dẹp khi component bị unmount
    };
  }, [url]); // Chỉ phụ thuộc vào `url`

  return state;
}
