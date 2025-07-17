import useUserStore from "../../store/userStore";
import { Link } from "react-router-dom";
import { HiOutlineBuildingStorefront, HiOutlineChartPie, HiOutlineCog6Tooth} from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";

export default function AdminSidebar() {
  const { user, logout } = useUserStore();
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-100 shadow-2xl p-2 z-[999] flex items-center justify-between">
      <Link to="/admin/profile" className="flex items-center gap-2 ">
        {/* <Avatar size="default" src={user?.avatar} /> */}
        <p className="font-medium text-blue-700">{user?.full_name ?? user?.user_name}</p>
      </Link>
      <div className="flex items-center gap-2">
        <Link to="/admin" className=" text-blue-500 rounded-md font-semibold flex gap-1 items-center ">
          <HiOutlineChartPie className="size-5"/>
          <p>Thống kê</p>
        </Link>
        <Link to="/admin/shop" className=" text-blue-500 rounded-md font-semibold flex gap-1 items-center">
        <HiOutlineBuildingStorefront className="size-5"/>
        <p>Cửa hàng</p></Link>
        <Link to="/admin/setting" className=" text-blue-500 rounded-md font-semibold flex gap-1 items-center">
        <HiOutlineCog6Tooth className="size-5"/>
        <p>Cài đặt</p>
        </Link>
      </div>
      <button
        onClick={logout}
        className="text-blue-500 rounded-md font-semibold flex gap-1 items-center"
      >
        <HiOutlineLogout className="size-5"/>
        <p>Thoát</p>
      </button>
    </div>
  );
}
