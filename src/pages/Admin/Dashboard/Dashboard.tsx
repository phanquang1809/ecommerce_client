import {
  BanknotesIcon,
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useMemo } from "react";
import { useDashboardForAdmin } from "@/services/admin/adminServices";
import {
  HiOutlineCreditCard,
  HiOutlineMegaphone,
  HiOutlineShare,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown } from "lucide-react";
import { DatePickerWithRange } from "@/components/date-picker";
import RefreshData from "@/components/refresh-data";
import TopRevenueByCategory from "@/components/TopRevenueByCategory";
import { AllReveneu } from "@/components/AllReveneu";
import TopSaleProduct from "@/components/TopSaleProduct";
import TopBuyer from "@/components/TopBuyer";
import TopSeller from "@/components/TopSeller";
import { StatisticCard } from "@/components/StatisticCard";
import { ActionCard } from "@/components/ActionCard";



const Dashboard = () => {
  console.log("Dashboard is rendering...");
  const navigate = useNavigate();
  const { data, refetch } = useDashboardForAdmin();
  // Sử dụng useMemo để tính toán tất cả giá trị từ data một lần
  const dashboardData = useMemo(() => {
    if (!data?.data) {
      return {
        totalCustomer: 0,
        totalOrder: 0,
        totalSeller: 0,
        totalReveneu: 0,
        categoriesRevenue: [],
        topBuyer: [],
      };
    }
    return {
      totalCustomer: data.data.totalCustomer || 0,
      totalOrder: data.data.totalOrder || 0,
      totalSeller: data.data.totalSeller || 0,
      totalReveneu: data.data.totalReveneu || 0,
      categoriesRevenue: data.data.categoriesRevenue || [],
      topBuyer: data.data.topBuyer || [],
    };
  }, [data]);

  // Memo hóa hàm navigate để tránh re-render không cần thiết
  const handleNavigate = useCallback(() => {
    navigate("/admin/shops");
  }, [navigate]);

  return (
    <div className="my-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Thống Kê</h1>
        <div className="flex items-center gap-2">
          <RefreshData getData={refetch} />
          <DatePickerWithRange />
        </div>
      </div>
      <section className="grid grid-cols-4 gap-3 mt-3">
        {[
          {
            title: "Người dùng",
            value: dashboardData.totalCustomer,
            trend: <TrendingUp className="size-4 text-green-500" />,
            trendText: "10% so với tháng trước",
            icon: <UserGroupIcon className="size-6" />,
          },
          {
            title: "Cửa hàng",
            value: dashboardData.totalSeller,
            trend: <TrendingUp className="size-4 text-green-500" />,
            trendText: "56% so với tháng trước",
            icon: <BuildingStorefrontIcon className="size-6" />,
          },
          {
            title: "Đơn hàng",
            value: dashboardData.totalOrder,
            trend: <TrendingDown className="size-4 text-red-500" />,
            trendText: "36% so với tháng trước",
            icon: <ShoppingBagIcon className="size-6" />,
          },
          {
            title: "Doanh thu",
            value: dashboardData.totalReveneu,
            trend: <TrendingDown className="size-4 text-red-500" />,
            trendText: "25% so với tháng trước",
            icon: <BanknotesIcon className="size-6" />,
          },
        ].map((item, index) => (
          <StatisticCard key={index} {...item} />
        ))}
      </section>
      <section className="grid grid-cols-3 gap-3 mt-3">
        {[
          {
            title: "Chờ xác thực",
            value: dashboardData.totalSeller,
            trend: <TrendingUp className="size-4 text-green-500" />,
            trendText: "10% so với tháng trước",
            icon: <HiOutlineShare className="size-12" />,
            onClick: handleNavigate,
          },
          {
            title: "Yêu cầu thanh toán",
            value: dashboardData.totalSeller,
            trend: <TrendingUp className="size-4 text-green-500" />,
            trendText: "10% so với tháng trước",
            icon: <HiOutlineCreditCard className="size-12" />,
          },
          {
            title: "Khiếu nại",
            value: dashboardData.totalSeller,
            trend: <TrendingUp className="size-4 text-green-500" />,
            trendText: "10% so với tháng trước",
            icon: <HiOutlineMegaphone className="size-12" />,
          },
        ].map((item, index) => (
          <ActionCard key={index} {...item} />
        ))}
      </section>
      <section className="grid grid-cols-3 gap-3 mt-3">
        <div className="col-span-2">
          <AllReveneu />
        </div>
        <TopRevenueByCategory data={dashboardData.categoriesRevenue} />
      </section>
      <section className="grid grid-cols-3 gap-3 mt-3">
          <TopSaleProduct/>
        <TopBuyer topBuyer={dashboardData.topBuyer}/>
        <TopSeller/>
      </section>
    </div>
  );
};

export default Dashboard;