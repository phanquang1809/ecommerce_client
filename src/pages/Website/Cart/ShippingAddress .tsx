import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import useUserStore from "@/store/userStore";
import { useAddresses } from "@/services/website/userServices";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Address } from "@/types";
import { Button } from "@/components/ui/button";
import AddAddressDialog from "../Profile/Address/AddAddressDialog";

export default function ShippingAddress({
  selectedAddress,
  setSelectedAddress,
}: {
  selectedAddress?: {
    id: number;
    customer_name: string;
    customer_phone_number: string;
    address: string;
    province: string;
    district: string;
    ward: string;
    is_default: boolean;
  };
  setSelectedAddress: (address: Address) => void;
}) {
  const { user, setUser } = useUserStore();
  const [openDialog, setOpenDialog] = useState(false);
  const { data, isLoading } = useAddresses();

  const handleSelectAddress = async (id: number) => {
    try {
      const address = data?.data.find((a) => a.id === id);
      if (address) {
        setSelectedAddress(address);
        setUser({ ...user, address: address });
        setOpenDialog(false);
      }
    } catch {
      toast.error("Thay đổi địa chỉ thất bại");
    }
  };
  const [openAddDialog, setOpenAddDialog] = useState(false);

  return (
    <div className="bg-white rounded p-4 text-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold mb-2">Giao tới</h3>
        <button
          onClick={() => setOpenDialog(true)}
          className="font-semibold mb-2 text-blue-600"
        >
          Thay đổi
        </button>
      </div>
      {selectedAddress ? (
        <div className="text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5 font-semibold">
              <p>{selectedAddress.customer_name || user?.user_name}</p>
              <Separator orientation="vertical" className="!h-4" />
              <p>{selectedAddress.customer_phone_number || user?.phone}</p>
            </div>
            {selectedAddress.is_default && (
              <Badge className="ml-2 text-xs rounded bg-green-50 text-green-400">
                Mặc định
              </Badge>
            )}
          </div>
          <p className="text-gray-600">
            {selectedAddress.address}, {selectedAddress.ward},{" "}
            {selectedAddress.district}, {selectedAddress.province}
          </p>
        </div>
      ) : (
        <p className="text-muted-foreground">Chưa có địa chỉ</p>
      )}

      {/* Dialog chọn địa chỉ */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[550px] rounded">
          <DialogHeader>
            <DialogTitle>Chọn địa chỉ giao hàng</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {isLoading ? (
              <p>Đang tải...</p>
            ) : (
              data?.data?.map((addr) => (
                <div
                  key={addr.id}
                  className={`border rounded-md p-3 cursor-pointer hover:bg-gray-50 ${
                    addr.id === selectedAddress?.id
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() => handleSelectAddress(addr.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{addr.customer_name}</div>
                    {addr.is_default && (
                      <Badge className="text-xs rounded bg-green-50 text-green-400">
                        Mặc định
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {addr.customer_phone_number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {addr.address}, {addr.ward}, {addr.district},{" "}
                    {addr.province}
                  </div>
                </div>
              ))
            )}
          </div>
          <Button
            className="rounded"
            variant="outline"
            onClick={() => setOpenAddDialog(true)}
          >
            Thêm địa chỉ khác
          </Button>
        </DialogContent>
      </Dialog>
      <AddAddressDialog
        open={openAddDialog}
        onOpenChange={(open) => {
          setOpenAddDialog(open);
          if (!open) {
            setOpenDialog(true); 
          }
        }}
      />
    </div>
  );
}
