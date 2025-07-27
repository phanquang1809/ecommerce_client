import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import AddressSelect from "@/pages/Seller/Profile/AddressSelect";
import { Label } from "@/components/ui/label";
import { useVietnamProvinces } from "@/services/admin/adminServices";
import { normalizeString } from "@/utils/format";
import {
  createAddress,
  removeAddress,
  updateAddress,
} from "@/services/website/userServices";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useUserStore from "@/store/userStore";
type Address = {
  label: string;
  value: string;
  children?: Address[];
};

export default function AddAddressDialog({
  currentAddress,
  open,
  onOpenChange,
}: {
  currentAddress?: {
    id: number;
    customer_name: string;
    customer_phone_number: string;
    address: string;
    province: string;
    district: string;
    ward: string;
    is_default: boolean;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { setUser, user } = useUserStore();
  const [form, setForm] = useState({
    id: 0,
    customer_name: "",
    customer_phone_number: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    is_default: false,
  });
  const [selectedAddress, setSelectedAddress] = useState({
    province: { label: "", value: "" },
    district: { label: "", value: "" },
    ward: { label: "", value: "" },
    addressDetail: "",
  });

  const { data: provinces } = useVietnamProvinces();

  useEffect(() => {
    if (open && currentAddress) {
      setForm(currentAddress);
    }
  }, [open, currentAddress]);

  useEffect(() => {
    if (open && provinces && currentAddress) {
      const province = provinces.find(
        (p) =>
          normalizeString(p.label) === normalizeString(currentAddress.province)
      );

      const district = province?.children?.find(
        (d) =>
          normalizeString(d.label) === normalizeString(currentAddress.district)
      );

      const ward = district?.children?.find(
        (w) => normalizeString(w.label) === normalizeString(currentAddress.ward)
      );
      console.log(province, district, ward);

      if (province && district && ward) {
        setSelectedAddress({
          province,
          district,
          ward,
          addressDetail: currentAddress.address,
        });
      }
    }
  }, [open, provinces, currentAddress]);
  console.log("selectedAddress", selectedAddress);
  const queryClient = useQueryClient();
  const handleSubmit = async () => {
    let res;
    try {
      if (currentAddress && currentAddress.id) {
        res = await updateAddress(currentAddress.id, form);
        toast.success("Cập nhật địa chỉ thành công");
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      } else {
        // 👉 Gọi API thêm mới nếu không có
        res = await createAddress(form);
        toast.success("Thêm địa chỉ thành công");
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      }
      if (res.data.is_default) {
        setUser({
          ...user,
          address: res.data,
        });
      }
      onOpenChange(false); // Đóng dialog
      handleReset(); // Reset form
    } catch (err) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
      console.error("Submit error:", err);
    }
  };
const handleDelete = async () => {
  if (!currentAddress?.id) return;

  try {
    const res = await removeAddress(currentAddress.id);
    toast.success("Xóa địa chỉ thành công");

    // Nếu API trả về địa chỉ mới → gán lại cho user và frontend
    const newAddress = res?.new_default_address;
    if (newAddress) {
      setSelectedAddress(newAddress);
      setUser({ ...user, address: newAddress });
    } else {
      // Không còn địa chỉ nào
      setSelectedAddress({
    province: { label: "", value: "" },
    district: { label: "", value: "" },
    ward: { label: "", value: "" },
    addressDetail: "",
  });
      setUser({ ...user, address: undefined });
    }

    onOpenChange(false);
    handleReset();

    queryClient.invalidateQueries({ queryKey: ["addresses"] });
  } catch (err) {
    toast.error("Xóa thất bại. Vui lòng thử lại.");
    console.error("Delete error:", err);
  }
};
  const handleConfirm = (address: {
    province: Address;
    district: Address;
    ward: Address;
    addressDetail: string;
  }) => {
    setForm({
      ...form,
      address: address.addressDetail,
      province: address.province.label,
      district: address.district.label,
      ward: address.ward.label,
    });
    setOpenAddress(false);
  };

  const handleReset = () => {
    setForm({
      id: 0,
      customer_name: "",
      customer_phone_number: "",
      address: "",
      province: "",
      district: "",
      ward: "",
      is_default: false,
    });
    setSelectedAddress({
      province: { label: "", value: "" },
      district: { label: "", value: "" },
      ward: { label: "", value: "" },
      addressDetail: "",
    });
    setOpenAddress(false);
  };
  const isPhoneValid = /^0\d{9}$/.test(form.customer_phone_number.trim());

  const isFormValid =
    form.customer_name.trim() !== "" &&
    isPhoneValid &&
    form.province &&
    form.district &&
    form.ward &&
    form.address.trim() !== "";
  const [openAddress, setOpenAddress] = useState(false);
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onOpenChange(false);
        handleReset();
      }}
    >
      <DialogContent className="sm:max-w-[550px] rounded">
        <DialogHeader>
          <DialogTitle>Thêm địa chỉ nhận hàng</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="mb-1" htmlFor="name">
              Tên người nhận
            </Label>
            <Input
              id="name"
              placeholder="Nhập tên người nhận"
              value={form.customer_name}
              className="rounded"
              onChange={(e) =>
                setForm({ ...form, customer_name: e.target.value })
              }
            />
          </div>
          <div>
            <Label className="mb-1" htmlFor="phone">
              Số điện thoại người nhận
            </Label>
            <Input
              id="phone"
              placeholder="Nhập số điện thoại người nhận"
              value={form.customer_phone_number}
              className="rounded"
              onChange={(e) =>
                setForm({ ...form, customer_phone_number: e.target.value })
              }
            />
          </div>
        </div>
        {form.address ? (
          <div className="space-y-2">
            <div className="text-sm ">
              <span className="font-semibold">Địa chỉ:</span>
              <span>
                {" "}
                {form.address +
                  ", " +
                  form.ward +
                  ", " +
                  form.district +
                  ", " +
                  form.province}
                .
              </span>
            </div>
            <Button
              variant="outline"
              className="rounded"
              size="sm"
              onClick={() => setOpenAddress(true)}
            >
              Thay đổi
            </Button>
          </div>
        ) : (
          <Button
            size={"sm"}
            variant="outline"
            className="rounded"
            onClick={() => setOpenAddress(true)}
          >
            Chọn địa chỉ
          </Button>
        )}
        <AddressSelect
          title="Chọn địa chỉ giao hàng"
          open={openAddress}
          onOpenChange={setOpenAddress}
          onConfirm={handleConfirm}
          address={selectedAddress}
        />

        <div className="flex items-center space-x-2">
          <Checkbox
            id="default"
            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            checked={form.is_default}
            onCheckedChange={(val) =>
              setForm({ ...form, is_default: val as boolean })
            }
          />
          <label htmlFor="default" className="text-sm">
            Dùng làm địa chỉ giao hàng mặc định
          </label>
        </div>
        <div className="flex gap-2">
          {currentAddress && (
            <Button
              size={"sm"}
              variant="outline"
              className="flex-1 rounded font-semibold"
              onClick={handleDelete}
            >
              Xóa
            </Button>
          )}
          <Button
            disabled={!isFormValid}
            size={"sm"}
            className="flex-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold"
            onClick={handleSubmit}
          >
            Lưu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
