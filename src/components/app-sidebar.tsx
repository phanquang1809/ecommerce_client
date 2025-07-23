import * as React from "react";
import {
  Settings2,
  Package,
  LayoutDashboard,
  Users,
  Waypoints,
  Store,
  Truck,
  Tickets,
  ChartSpline,
  Images,
  Gift,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
// import { NavUser } from "@/components/nav-user";
import logoThumb from "/image/spark-icon.svg";
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import useUserStore from "@/store/userStore";

const adminSidebarData = {
  sections: [
    {
      id: "dashboard",
      items: [
        {
          title: "Thống kê",
          url: "/admin",
          icon: ChartSpline,
        },
      ],
    },
    {
      id: "product-management",
      title: "Quản lý sản phẩm",
      items: [
        {
          title: "Ngành hàng",
          url: "#",
          icon: LayoutDashboard,
          items: [
            {
              title: "Tất cả ngành hàng",
              url: "/admin/categories/groups",
            },
            {
              title: "Danh mục",
              url: "/admin/categories/subgroups",
            },
            {
              title: "Danh mục con",
              url: "/admin/categories/subcategories",
            },
          ],
        },
        {
          title: "Thuộc tính & Thương hiệu",
          url: "#",
          icon: Waypoints,
            items: [
            {
              title: "Thuộc tính",
              url: "/admin/attributes",
            },
            {
              title: "Thương hiệu",
              url: "/admin/brands",
            },
          ],
        },
        {
          title: "Sản phẩm",
          url: "/admin/products",
          icon: Package,
        },
      ],
    },
    {
      id: "user-management",
      title: "Người dùng",
      items: [
        {
          title: "Người dùng",
          url: "/admin/customers",
          icon: Users,
        },
        {
          title: "Cửa hàng",
          url: "/admin/shops",
          icon: Store,
        },
      ],
    },
    {
      id: "transactions",
      title: "Giao dịch",
      items: [
        {
          title: "Khuyến mãi",
          url: "/admin/vouchers",
          icon: Tickets,
        },
        {
          title: "Đơn hàng",
          url: "/admin/orders",
          icon: Truck,
        },
      ],
    },
     {
      id: "media",
      items: [
        {
          title: "Media",
          url: "/admin/media",
          icon: Images,
        },
      ],
    },
    {
      id: "system-settings",
      title: "Cài đặt hệ thống",
      items: [
        {
          title: "Cài đặt",
          url: "#",
          icon: Settings2,
          items: [
            { title: "Vận chuyển", url: "/admin/transporters" },
            { title: "Phương thức thanh toán", url: "/admin/payment-methods" },
          ],
        },
      ],
    },
  ],
};

const sellerSidebarData = {
  sections: [
    {
      id: "dashboard",
      items: [
        {
          title: "Thống kê",
          url: "/seller",
          icon: ChartSpline,
        },
      ],
    },
     {
      id: "order-management",
      title: "",
      items: [
        {
          title: "Đơn hàng",
          url: "",
          icon: Package,
          items: [
            {
              title: "Tất cả đơn hàng",
              url: "/seller/orders",
            },
            // {
            //   title: "Đơn hàng chưa xử lý",
            //   url: "/seller/orders/pending",
            // },
          ],
        },
      ],
    },
    {
      id: "product-management",
      title: "Quản lý sản phẩm",
      items: [
        {
          title: "Sản phẩm",
          url: "",
          icon: Package,
          items: [
            {
              title: "Danh sách sản phẩm",
              url: "/seller/products",
            },
            {
              title: "Thêm sản phẩm",
              url: "/seller/products/add",
            },
          ],
        },
        {
          title: "Chương trình khuyến mãi",
          url: "",
          icon: Gift,
          items: [
            {
              title: "Khuyến mãi của shop",
              url: "/seller/promotions",
            },
            {
              title: "Flash sale",
              url: "/seller/promotions/flash-sale",
            },
          ],
        },
      ],
    },
     {
      id: "media",
      items: [
        {
          title: "Media",
          url: "/seller/media",
          icon: Images,
        },
      ],
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUserStore();
  const sidebarData = React.useMemo(() => {
    if (user?.role === "admin") return adminSidebarData;
    if (user?.role === "shop") return sellerSidebarData;
    return { sections: [] }; // hoặc return menu cơ bản cho user
  }, [user]);
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <img src={user?.role === "shop" ? user?.shop?.logo : logoThumb} alt="logo" className="size-12 rounded object-contain" />
          {state === "expanded" && (
            <span className="text-2xl text-blue-600 font-bold">{user?.role === "shop" ? user?.shop?.name : "Walmart" }</span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.sections.map((section) => (
          <div key={section.id}>
            {section.title && (
              <div className="flex h-8 shrink-0 items-center rounded-md px-4 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0">
                {section.title}
              </div>
            )}
            <NavMain items={section.items} />
          </div>
        ))}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
