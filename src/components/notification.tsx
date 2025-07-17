import { Bell, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "./ui/badge";

interface Notification {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isRead: boolean;
  createdAt: string;
}

export function Notification({
  notifications,
}: {
  notifications: Notification[] | [];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell />
          {notifications.filter((noti) => !noti.isRead).length > 0 && (
              <span className="absolute top-1.5 right-2 flex h-2 w-2 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-80 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center justify-between gap-2 px-2 py-1.5 text-left">
            <h3 className="text-lg">Thông báo</h3>
            <div className="flex items-center">
              <Badge variant="outline">
                {notifications.filter((noti) => !noti.isRead).length} chưa đọc
              </Badge>
              <Button variant="link" className="underline">
                xem tất cả
              </Button>
            </div>
          </div>
        </DropdownMenuLabel>
        <div className="max-h-70 custom-scrollbar pr-1">
          {notifications.map((noti) => (
            <DropdownMenuItem key={noti.id} className="relative cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="min-w-8 flex items-center justify-center">
                  {noti.icon}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <h3 className="font-semibold">{noti.title}</h3>
                  <p className="line-clamp-1">{noti.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(noti.createdAt).toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              {!noti.isRead && (
                <Dot className="absolute top-0 right-0 text-red-500 size-8" />
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
