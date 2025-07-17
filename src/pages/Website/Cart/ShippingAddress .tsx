import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import useUserStore from "@/store/userStore";
import { Link } from "react-router-dom";

export default function ShippingAddress() {
  const { user } = useUserStore();
  return (
    <div className="bg-white rounded p-4 text-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold mb-2">Giao tới</h3>
        <Link to="/profile" className="font-semibold mb-2 text-blue-600">
          Thay đổi
        </Link>
      </div>
      <div className="text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5 font-semibold">
            <p className="">{user?.default_address?.customer_name || user?.user_name}</p>
          <Separator orientation="vertical" className="!h-4" />
          <p>{user?.default_address?.customer_phone_number || user?.phone}</p>
          </div>
        <Badge className="ml-2 text-xs rounded bg-green-50 text-green-400">Mặc định</Badge>
        </div>
            <p className="text-gray-600">
                  {user?.default_address?.address + ", " + user?.default_address?.ward+ ", " + user?.default_address?.district + ", " + user?.default_address?.province}
        </p>
      </div>
    </div>
  );
}
