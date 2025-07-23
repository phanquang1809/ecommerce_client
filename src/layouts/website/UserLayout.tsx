import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChartPieIcon,
  DocumentTextIcon,
  GiftIcon,
  HeartIcon,
  MapPinIcon,
  StarIcon,
  UserCircleIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import useUserStore from "../../store/userStore";
import { cn } from "@/lib/utils"; // Utility for conditional classNames (from shadcn/ui)
import { UserRound } from "lucide-react";

const menuItems = [
  {
    label: "Thống Kê",
    icon: ChartPieIcon,
    key: "/customer/dashboard",
  },
  {
    label: "Thông Tin",
    icon: UserCircleIcon,
    key: "/customer/info",
  },
  {
    label: "Lịch Sử Đơn Hàng",
    icon: DocumentTextIcon,
    key: "/customer/order/history",
  },
  {
    label: "Yêu Thích",
    icon: HeartIcon,
    key: "/customer/wishlist",
  },
  {
    label: "Ví Voucher",
    icon: GiftIcon,
    key: "/customer/voucher",
  },
  {
    label: "Ví Walmart",
    icon: WalletIcon,
    key: "/customer/walmart-wallet",
  },
  {
    label: "Sổ Địa Chỉ",
    icon: MapPinIcon,
    key: "/customer/address",
  },
  {
    label: "Đánh Giá",
    icon: StarIcon,
    key: "/customer/danh-gia",
  },
];

const UserLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore();

  const handleNavigate = (key: string) => {
    navigate(key);
  };

  return (
    <div className="w-full container  p-4 mx-auto mt-5 rounded-md">
      <div className="flex gap-2">
        {/* Sidebar */}
        <aside className="w-64 h-fit">
          <div className="flex items-start gap-3 mb-2">
            <Avatar className="h-15 w-15 rounded-md">
              <AvatarImage className="rounded-md" src={user?.avatar} alt={user?.full_name || user?.user_name} />
              <AvatarFallback className="rounded-md bg-blue-900 text-white">
                <UserRound className="h-10 w-10 "/>
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-lg text-gray-900 dark:text-gray-100">
              {user ? user.full_name || user.user_name : "Khách"}
            </span>
          </div>
          <nav className="space-y-1 pr-4 border-gray-200">
            {menuItems.map((item) => (
              <Button
                key={item.key}
                variant="ghost"
                size="lg"
                className={cn(
                  "w-full justify-start gap-2 text-gray-700 hover:bg-gray-200",
                  location.pathname === item.key &&
                    "bg-gray-200 text-gray-900 "
                )}
                onClick={() => handleNavigate(item.key)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;