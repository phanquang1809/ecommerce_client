import { authApi } from "../apiServices";

export const toggleFollow = async (userId: number) => {
  const res = await authApi.post("/auth/follow", { user_id: userId });
  return res.data;
};

export const checkFollow = async (userId: number) => {
  const res = await authApi.get("/auth/check-follow", {
    params: { user_id: userId },
  });
  return res.data.is_following;
};