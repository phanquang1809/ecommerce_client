import { BadgeCheck, Bell, CreditCard, LogOut, User2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@/types";
import useUserStore from "@/store/userStore";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export function UserDropdown({ user,role="user" }: { user: User | null,role?:string }) {
  const {logout} = useUserStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await logout();
    if (res.status === "success") {
      navigate("/customer/account/login");
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={cn("flex items-center gap-2 rounded-md cursor-pointer",role!=="admin"&&"hover:bg-blue-500  p-2")}>
          <Avatar className={cn("rounded",role==="admin"?"size-9":"size-6")}>
            <AvatarImage src={user?.avatar} alt={user?.full_name} />
            <AvatarFallback className={cn("rounded",role==="admin"?"bg-primary":"text-sm bg-blue-900 text-white rounded")}>
              <User2 className="size-4 text-white" />
            </AvatarFallback>
          </Avatar>
          {role!=="admin" &&
          <span className="text-white font-semibold text-sm">Tài khoản</span>
          }
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user?.avatar} alt={user?.full_name} />
              <AvatarFallback className="rounded-lg">AD</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user?.user_name}</span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer"  onClick={()=>navigate("/customer/info")}>
            <BadgeCheck />
            Tài khoản
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <CreditCard />
            Ví walmart
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Bell />
            Thông báo
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
