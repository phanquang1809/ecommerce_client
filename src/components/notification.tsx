import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  markNotificationAsRead,
  useInfiniteNotifications,
} from "@/services/notificationService";

export default function NotificationDropdown() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteNotifications();

  const notifications = data?.pages.flatMap((page) => page.data) ?? [];
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleMarkIsRead = async (id: number) => {
    try {
      const res = await markNotificationAsRead(id);
      if (res.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      }
    } catch (error) {
      console.error("Lỗi khi đánh dấu đã đọc:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-2 flex h-2 w-2 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

   <DropdownMenuContent align="end" className="min-w-80 max-h-80 overflow-auto pr-1">
  <DropdownMenuLabel className="p-2 font-semibold text-base flex justify-between items-center">
    <span>Thông báo</span>
    <Badge variant="outline">{unreadCount} chưa đọc</Badge>
  </DropdownMenuLabel>

  <div
    className="h-64 overflow-y-auto pr-1 custom-scrollbar"
    onScroll={(e) => {
      const target = e.currentTarget;
      const isBottom =
        target.scrollHeight - target.scrollTop <= target.clientHeight + 20;

      if (isBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }}
  >
    {/* ✅ Nếu không có thông báo nào */}
    {notifications.length === 0 && (
      <div className="text-center text-sm text-muted-foreground py-6">
        Chưa có thông báo nào
      </div>
    )}

    {/* Danh sách thông báo */}
    {notifications.map((noti) => (
      <DropdownMenuItem
        key={noti.id}
        className="relative cursor-pointer flex flex-col gap-1 items-start"
        onClick={() => {
          if (noti.url) {
            navigate(noti.url);
            if (!noti.is_read) {
              handleMarkIsRead(noti.id);
            }
          }
        }}
      >
        <h3 className="font-semibold">{noti.title}</h3>
        <p className="text-sm text-muted-foreground">{noti.message}</p>
        <span className="text-xs text-muted-foreground">
          {new Date(noti.created_at).toLocaleString("vi-VN")}
        </span>
        {!noti.is_read && (
          <Dot className="absolute top-1 right-1 text-red-500 size-5" />
        )}
      </DropdownMenuItem>
    ))}

    {/* Hiển thị tải thêm nếu còn trang */}
    {hasNextPage && notifications.length > 0 && (
      <div className="text-center py-2 text-xs text-muted-foreground">
        {isFetchingNextPage ? "Đang tải thêm..." : "Cuộn để xem thêm"}
      </div>
    )}
  </div>
</DropdownMenuContent>

    </DropdownMenu>
  );
}
