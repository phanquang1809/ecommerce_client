import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AddAddressDialog from "./AddAddressDialog";
import { useState } from "react";
import { useAddresses } from "@/services/website/userServices";

export default function UserAddress() {
  const { data, isLoading, isError, error } = useAddresses();

  const addresses = data?.data ?? [];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<{
    id: number;
    customer_name: string;
    customer_phone_number: string;
    address: string;
    province: string;
    district: string;
    ward: string;
    is_default: boolean;
  }>(); // 👈

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Sổ địa chỉ</h2>

      {isLoading ? (
        <p className="text-sm text-muted-foreground mb-4">
          Đang tải địa chỉ...
        </p>
      ) : isError ? (
        <p className="text-sm text-red-500 mb-4">
          Lỗi tải dữ liệu: {error?.message || "Không xác định"}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground mb-4">
          {addresses.length} địa chỉ được lưu
        </p>
      )}

      <div className="bg-white rounded-md p-4 grid grid-cols-3 gap-4">
        {addresses.map((item, index) => (
          <div
            key={index}
            className="relative border rounded-md p-4 flex flex-col gap-1"
          >
            <div className="flex items-center gap-2 font-medium">
              {item.customer_name}
              {item.is_default && (
                <Badge className="text-xs px-2 py-0.5 bg-blue-100 text-blue-500 rounded">
                  Mặc định
                </Badge>
              )}
            </div>
            <div className="text-sm">{item.customer_phone_number}</div>
            <div className="text-sm text-muted-foreground">
              {item.address}, {item.ward}, {item.district}, {item.province}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3"
              onClick={() => {
                setCurrentAddress(item); // 👈 set địa chỉ cần chỉnh
                setDialogOpen(true); // mở dialog
              }}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <div
          className="border border-dashed rounded-md flex justify-center items-center cursor-pointer text-primary py-8 "
          onClick={() => setDialogOpen(true)}
        >
          <span className="font-medium text-sm">+ Thêm địa chỉ nhận hàng</span>
        </div>
      </div>

      <AddAddressDialog
        currentAddress={currentAddress}
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setCurrentAddress(undefined); // ✅ Reset về undefined
          }
          setDialogOpen(open);
        }}
      />
    </div>
  );
}
