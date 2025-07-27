import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
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
          <div className="flex items-start gap-2 mb-2">
            <Avatar className="h-15 w-15 bg-white">
              <AvatarImage className="" src={user?.avatar} alt={user?.full_name || user?.user_name} />
              <AvatarFallback className=" bg-blue-900 text-white">
                <UserRound className="h-10 w-10 "/>
              </AvatarFallback>
            </Avatar>
           <div>
             <p className="font-medium text-lg text-blue-900">Xin chào</p>
             <span className="font-medium text-md ">
              {user ? user.full_name || user.user_name : "Khách"}
            </span>
           </div>
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