import { authApi } from "@/services/apiServices";

export const getTransporters = async () => {
  const response = await authApi.get("/admin/transporters");
  return response.data;
};

export const createTransporter = async (data: FormData) => {
  const response = await authApi.post("/admin/transporters", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateTransporter = async (data: FormData, id: number) => {
  const response = await authApi.post("/admin/transporters/" + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateTransporterStatus = async (id: number, status: string) => {
  const response = await authApi.patch("/admin/transporters/" + id + "/status", { status });
  return response.data;
};