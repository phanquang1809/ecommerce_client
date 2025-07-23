// services/website/notificationServices.ts

import { useInfiniteQuery } from "@tanstack/react-query";
import {  authApi } from "./apiServices";
import { Meta } from "@/types";

interface NotificationResponse {
  data: Notification[];
  status: string;
  meta: Meta;
}
export interface Notification {
  id: number;
  user_id: number;
  type: string;
  title: string;
  message: string;
  url: string | null;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}
// Hàm gọi API
export async function getNotifications(page: number = 1): Promise<NotificationResponse> {
  const response = await authApi.get("/notifications", {
    params: { page },
  });
  return response.data;
}
export async function markNotificationAsRead(id: number): Promise<{ status: string }> {
  const response = await authApi.patch(`/notifications/${id}/read`);
  return response.data;
}
// Hook lấy danh sách thông báo (cuộn vô cực)
export function useInfiniteNotifications() {
  return useInfiniteQuery<NotificationResponse>({
    queryKey: ["notifications"],
    queryFn: ({ pageParam = 1 }) => getNotifications(pageParam as number),
    getNextPageParam: (lastPage) => {
      const current = lastPage.meta.current_page;
      const last = lastPage.meta.last_page;
      return current < last ? current + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
}
