import { useParams, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useShopDetail } from "@/services/admin/adminServices";
import { Shop } from "@/types";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default function SellerProfile() {
  const { slug } = useParams();
  const location = useLocation();
  const [shop, setShop] = useState<Shop | null>(location.state?.shop || null);
  const { data, loading, error } = useShopDetail(shop ? undefined : slug);

  useEffect(() => {
    if (!loading && !error && data) {
      setShop(data.data); // Cập nhật trạng thái khi dữ liệu API có sẵn
    }
  }, [data, loading, error]);

  if (loading) return <div>Đang tải thông tin cửa hàng...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!shop) return null;
  const mapStatus = (status: string) => {
    if (status === "active") {
      return "Hoạt động";
    } else if (status === "pending") {
      return "Chờ duyệt";
    } else {
      return "Bị khóa";
    }
  };
  return (
    <div className="my-4 grid grid-cols-5 gap-4">
      <Card className="rounded-md !shadow border-accent col-span-2 relative">
        <CardHeader>
          <div className="flex items-start space-x-4">
            <Avatar className="bg-accent size-30 rounded-md">
              <AvatarImage src={shop.logo} alt={shop.name} />
              <AvatarFallback className="text-xs text-muted-foreground">
                {shop.name?.[0] || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-xl font-bold text-primary">
                {shop.name}
              </CardTitle>
              <CardDescription className="text-sm">
                <div>Địa chỉ lấy hàng: {shop.address}</div>
                <div>Liên hệ: {shop.phone}</div>
                <div>Trang thái: {mapStatus(shop.status)}</div>
                <div>
                  Ngày tạo:{" "}
                  {new Date(shop.created_at).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </div>

              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="">{shop.description}</p>
        </CardContent>
        <Button variant="outline" size="icon" className="absolute top-2 right-2">
            <Eye />
        </Button>
      </Card>
    </div>
  );
}
