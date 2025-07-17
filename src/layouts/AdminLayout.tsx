import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet, useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";
import { UserDropdown } from "@/components/user-dropdown";
import { Notification } from "@/components/notification";
import { AlertCircle, Info, PackageCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoThumb from "/image/spark-icon.svg";
// import SellButton from "@/components/SellButton";
import { ThemeProvider } from "@/components/theme-provider";

const mockNotifications = [
  {
    id: 1,
    title: "Đơn hàng đã xác nhận",
    description: "Đơn hàng #1001 đã được xác nhận.",
    icon: <PackageCheck className="text-green-500 w-5 h-5" />,
    isRead: false,
    createdAt: "2025-04-20T14:45:00Z",
  },
  {
    id: 2,
    title: "Đang giao hàng",
    description: "Đơn hàng #1002 đang trên đường giao.",
    icon: <Truck className="text-blue-500 w-5 h-5" />,
    isRead: true,
    createdAt: "2025-04-20T14:43:00Z",
  },
  {
    id: 3,
    title: "Lỗi thanh toán",
    description: "Thanh toán cho đơn hàng #1003 thất bại.",
    icon: <AlertCircle className="text-red-500 w-5 h-5" />,
    isRead: false,
    createdAt: "2025-04-20T14:40:00Z",
  },
  {
    id: 4,
    title: "Thông báo hệ thống",
    description: "Hệ thống sẽ bảo trì lúc 02:00 sáng.",
    icon: <Info className="text-yellow-500 w-5 h-5" />,
    isRead: true,
    createdAt: "2025-04-20T14:36:00Z",
  },
  {
    id: 5,
    title: "Đơn hàng hoàn tất",
    description: "Đơn hàng #1004 đã được giao thành công.",
    icon: <PackageCheck className="text-green-500 w-5 h-5" />,
    isRead: false,
    createdAt: "2025-04-20T14:32:00Z",
  },
  {
    id: 6,
    title: "Khuyến mãi mới",
    description: "Nhận ngay mã giảm giá 10% khi đặt hàng hôm nay!",
    icon: <Info className="text-yellow-500 w-5 h-5" />,
    isRead: true,
    createdAt: "2025-04-20T14:28:00Z",
  },
  {
    id: 7,
    title: "Xác minh email",
    description: "Vui lòng xác minh email để hoàn tất đăng ký.",
    icon: <AlertCircle className="text-red-500 w-5 h-5" />,
    isRead: false,
    createdAt: "2025-04-20T14:25:00Z",
  },
  {
    id: 8,
    title: "Đơn hàng đã hủy",
    description: "Đơn hàng #1005 đã bị hủy theo yêu cầu.",
    icon: <AlertCircle className="text-red-500 w-5 h-5" />,
    isRead: true,
    createdAt: "2025-04-20T14:22:00Z",
  },
  {
    id: 9,
    title: "Đánh giá sản phẩm",
    description: "Hãy đánh giá sản phẩm bạn vừa mua.",
    icon: <Info className="text-yellow-500 w-5 h-5" />,
    isRead: false,
    createdAt: "2025-04-20T14:18:00Z",
  },
  {
    id: 10,
    title: "Đơn hàng mới",
    description: "Đơn hàng #1006 đã được tạo thành công.",
    icon: <PackageCheck className="text-green-500 w-5 h-5" />,
    isRead: true,
    createdAt: "2025-04-20T14:15:00Z",
  },
  {
    id: 11,
    title: "Đang xử lý đơn hàng",
    description: "Đơn hàng #1007 đang được xử lý.",
    icon: <Truck className="text-blue-500 w-5 h-5" />,
    isRead: false,
    createdAt: "2025-04-20T14:12:00Z",
  },
  {
    id: 12,
    title: "Giao hàng thất bại",
    description: "Không thể giao đơn hàng #1008.",
    icon: <AlertCircle className="text-red-500 w-5 h-5" />,
    isRead: false,
    createdAt: "2025-04-20T14:08:00Z",
  },
  {
    id: 13,
    title: "Thông báo cập nhật",
    description: "Ứng dụng đã cập nhật lên phiên bản mới.",
    icon: <Info className="text-yellow-500 w-5 h-5" />,
    isRead: true,
    createdAt: "2025-04-20T14:05:00Z",
  },
  {
    id: 14,
    title: "Mã giảm giá sắp hết hạn",
    description: "Mã giảm giá của bạn chỉ còn hiệu lực 1 ngày!",
    icon: <Info className="text-yellow-500 w-5 h-5" />,
    isRead: false,
    createdAt: "2025-04-20T14:01:00Z",
  },
  {
    id: 15,
    title: "Đơn hàng sắp giao",
    description: "Đơn hàng #1009 sẽ được giao trong hôm nay.",
    icon: <Truck className="text-blue-500 w-5 h-5" />,
    isRead: true,
    createdAt: "2025-04-20T13:58:00Z",
  },
];

export default function AdminLayout() {
  const { user } = useUserStore();
  const isShopIncomplete = user?.role === "shop" && !user.shop;
  const isShopPending =
    user?.role === "shop" && user.shop?.status === "pending";
  const navigate = useNavigate();
  if (isShopIncomplete) {
    return (
      <SidebarProvider>
        <header
          className="
            fixed top-0 right-0 z-40
            h-14 shrink-0 
            flex items-center gap-2 
            bg-background 
            shadow-xs
            transition-[width,height] ease-linear 
            w-full"
        >
          <div className="flex items-center justify-between gap-2 px-4 w-full">
            <h3 className="text-lg">Đăng ký để trở thành người bán Walmart</h3>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <UserDropdown user={user} />
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center min-h-screen gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-5xl font-bold text-blue-600">Walmart</h3>
            <img src={logoThumb} alt="logo" width={60} height={60} />
          </div>
          <h3 className="text-3xl font-semibold">Chào mừng đến với Walmart!</h3>
          <p className="text-md">
            Vui lòng cung cấp thông tin để thành lập tài khoản người bán trên
            Walmart
          </p>
          <Button variant="default" onClick={() => navigate("/seller/edit")}>
            Bắt đầu đăng ký
          </Button>
        </main>
      </SidebarProvider>
    );
  }
  if (isShopPending) {
    return (
      <SidebarProvider>
        <header
          className="
            fixed top-0 right-0 z-40
            h-14 shrink-0 
            flex items-center gap-2 
            bg-background 
            shadow-xs
            transition-[width,height] ease-linear 
            w-full"
        >
          <div className="flex items-center justify-between gap-2 px-4 w-full">
            <h3 className="text-lg">Đăng ký để trở thành người bán Walmart</h3>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <UserDropdown user={user} />
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center min-h-screen gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-5xl font-bold text-blue-600">Walmart</h3>
            <img src={logoThumb} alt="logo" width={60} height={60} />
          </div>
          <h3 className="text-3xl font-semibold">Chào mừng đến với Walmart!</h3>
          <p className="text-md max-w-2xl text-center">
            Cửa hàng của bạn đang trong quá trình chờ duyệt từ hệ thống, chúng
            tôi sẽ thông báo đến địa chỉ email bạn đã cung cấp khi quá trình này
            hoàn tất. Vui lòng quay lại sau.
          </p>
        </main>
      </SidebarProvider>
    );
  }
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="">
          <header
            className="
             fixed top-0 right-0 z-40
             h-14 shrink-0 
             flex items-center gap-2 
             bg-background 
             shadow-xs
             transition-[width,height] ease-linear 
             w-[calc(100%-var(--sidebar-width))] 
             group-has-[[data-collapsible=icon]]/sidebar-wrapper:w-[calc(100%-var(--sidebar-width-icon))]"
          >
            <div className="flex items-center justify-between gap-2 px-4 w-full">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <ModeToggle />
                <Notification notifications={mockNotifications} />
                {/* <SellButton/> */}
                <UserDropdown user={user} role="admin" />
              </div>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 mt-10">
            <Outlet />
            <Toaster position="top-center" />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
