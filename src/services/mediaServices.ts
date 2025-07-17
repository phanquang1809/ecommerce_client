import { FolderProps, MediaItemProps } from "@/pages/Seller/Media/media.type";
import { authApi } from "./apiServices";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Định nghĩa kiểu cho response của API
interface ApiResponse<T> {
  status: string;
  data: T;
}

// Lấy danh sách thư mục (cây thư mục gốc)
export const getMediaFolders = async (): Promise<ApiResponse<{ folders: FolderProps[], media_files: MediaItemProps[] }>> => {
  try {
    const response = await authApi.get("/media/folders");
    if (response.data.status !== "success") {
      throw new Error(`API failed with status: ${response.data.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching media folders:", error);
    throw new Error("Không thể lấy danh sách thư mục");
  }
};

// Lấy chi tiết một thư mục
export const getMediaFolderDetails = async (
  id: number
): Promise<ApiResponse<{ folder: FolderProps; media_files: MediaItemProps[]; breadcrumb: {id: number,name: string}[] }>> => {
  try {
    const response = await authApi.get(`/media/folders/${id}`);
    if (response.data.status !== "success") {
      throw new Error(`API failed with status: ${response.data.status}`);
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching folder details for id ${id}:`, error);
    throw new Error("Không thể lấy chi tiết thư mục");
  }
};

// Tạo thư mục mới
export const createMediaFolder = async (data: {
  name: string;
  parent_id?: number | null;
}): Promise<ApiResponse<FolderProps>> => {
  try {
    const response = await authApi.post("/media/folders", data);
    if (response.data.status !== "success") {
      throw new Error(`API failed with status: ${response.data.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error creating media folder:", error);
    throw new Error("Không thể tạo thư mục");
  }
};

export const deleteMediaFolder = async (
  id: number
): Promise<ApiResponse<{ status: string }>> => {
  try {
    const response = await authApi.delete(`/media/folders/${id}`);
    if (response.data.status !== "success") {
      throw new Error(`API failed with status: ${response.data.status}`);
    }
    return response.data;
  } catch (error) {
    console.error(`Error deleting folder with id ${id}:`, error);
    throw new Error("Không thể xóa thư mục");
  }
};



export const uploadImage = async (
  id: number | null,
  image: File,
): Promise<ApiResponse<MediaItemProps>> => {
  try {
    const formData = new FormData();
    formData.append("image", image);
   
    const response = await authApi.post(
      `/media/folders${id ? `/${id}` : ""}/upload-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.status !== "success") {
      throw new Error(`API failed with status: ${response.data.status}`);
    }

    return response.data;
  } catch (error) {
    console.error(`Lỗi khi upload ảnh vào folder ${id}:`, error);
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.data) {
      throw error;
    }
    throw new Error("Không thể upload ảnh");
  }
};
export const deleteImages = async (
  ids: number[]
): Promise<ApiResponse<{ status: string; message: string }>> => {
  try {
    const response = await authApi.delete("/media/media-items", { data: { ids } });
    if (response.data.status !== "success") {
      throw new Error(`API failed with status: ${response.data.status}`);
    }
    return response.data;
  }
  catch (error) {
    console.error("Error deleting media items:", error);
    throw new Error("Không thể xóa ảnh");
  }
}
export const getMediaItemsByUrls = async(urls: string[]): Promise<ApiResponse<MediaItemProps[]>> => {
  try {
    const response = await authApi.post("/media/media-items-by-urls", {urls});
    if (response.data.status !== "success") {
      throw new Error(`API failed with status: ${response.data.status}`);
    }
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi upload ảnh vào folder ${urls}:`, error);
    throw new Error("Không thể upload ảnh");
  }
}
export const useMediaFolders = () => {
  return useQuery<{ folders: FolderProps[], media_files: MediaItemProps[] }>({
    queryKey: ["mediaFolders"],
    queryFn: async () => {
      const res = await getMediaFolders();
      return res.data; // ✅ Trả về data trực tiếp
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useMediaFolderDetails = (id: number) => {
  return useQuery<{ folder: FolderProps; media_files: MediaItemProps[]; breadcrumb: {id: number,name: string}[] }>({
    queryKey: ["mediaFolderDetails", id],
    queryFn: async () => {
      const res = await getMediaFolderDetails(id);
      return res.data; // ✅ Trả về data trực tiếp
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};