import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import useUserStore from "@/store/userStore";
import { CloudUpload, Plus, X } from "lucide-react";
import { uploadImage } from "@/services/admin/adminServices";
import { Separator } from "@radix-ui/react-separator";
import { updateProfile } from "@/services/seller/profile";
import AddressSelect from "./AddressSelect";
import { useNavigate } from "react-router-dom";

type Address = {
  label: string;
  value: string;
  children?: Address[];
};
export default function SellerEdit() {
  const navigate = useNavigate();

  const { user, setUser } = useUserStore.getState();
  
  const [storeName, setStoreName] = useState("");
  const [storeNameError, setStoreNameError] = useState("");

  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");
  const [phoneError, setPhoneError] = useState("");

  const [avatar, setAvatar] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState(avatar);
  const [address, setAddress] = useState<{
    province: Address;
    district: Address;
    ward: Address;
    addressDetail: string;
  }>({
    province: { label: "", value: "" },
    district: { label: "", value: "" },
    ward: { label: "", value: "" },
    addressDetail: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // Chỉ cho phép nhập số
    if (!/^\d*$/.test(rawValue)) return;

    setPhoneNumber(rawValue);

    // Nếu rỗng thì báo lỗi ngay
    if (rawValue === "") {
      setPhoneError("Vui lòng nhập số điện thoại");
    } else if (!/^0\d{9}$/.test(rawValue)) {
      setPhoneError("Số điện thoại không hợp lệ");
    } else {
      setPhoneError("");
    }
  };
  const handleStoreNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStoreName(value);

    if (value.trim() === "") {
      setStoreNameError("Vui lòng nhập tên cửa hàng");
    } else if (value.length < 5) {
      setStoreNameError("Tên cửa hàng phải tối thiểu 5 ký tự");
    } else if (value.length > 30) {
      setStoreName(value.slice(0, 30));
    } else {
      setStoreNameError("");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", storeName);
    formData.append("phone", phoneNumber);

    if (avatar) {
      formData.append("logo", avatar); // avatar là File
    }

    formData.append("province", address.province.label);
    formData.append("district", address.district.label);
    formData.append("ward", address.ward.label);
    formData.append("address", address.addressDetail);
    try {
      formData.append("_method", "PUT");
      const response = await updateProfile(formData);
      if (user) {
        const updatedUser = {
          ...user,
          shop: response.shop, // hoặc response.shop tùy theo dữ liệu trả về từ API
        };
        setUser(updatedUser);
        navigate("/seller");
      }
      console.log("Cập nhật thành công:", response);
    } catch (error) {
      console.error("Lỗi cập nhật profile:", error);
    }
  };
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Hiển thị ảnh tạm thời
    const previewUrl = URL.createObjectURL(file);
    setPreviewAvatar(previewUrl);

    try {
      const controller = new AbortController();
      const response = await uploadImage(file, controller.signal);

      if (response.data?.url) {
        setAvatar(response.data.url); // cập nhật ảnh thật từ Cloudinary
      }
    } catch (error) {
      console.error("Lỗi upload ảnh:", error);
      // Có thể hiện thông báo lỗi ở đây nếu cần
    }
  };
  const isValidAddress = (addr: typeof address) => {
    return (
      !!addr.addressDetail?.trim() &&
      !!addr.province?.value &&
      !!addr.district?.value &&
      !!addr.ward?.value
    );
  };
  const isValid = storeName && phoneNumber && isValidAddress(address);
  return (
    <div className="max-w-5xl mx-auto p-10 bg-accent mt-10 rounded-md">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Cập nhật thông tin cửa hàng
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 mb-4 items-start">
          <div className="flex flex-col items-center justify-center">
            <div className="relative group cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <Avatar className="size-30 !bg-background group-hover:opacity-80 rounded-md transition-opacity duration-200">
                <AvatarImage
                  className="object-contain"
                  src={previewAvatar}
                  alt="Logo cửa hàng"
                />
                <AvatarFallback className="!bg-background group-hover:hidden font-bold text-muted-foreground">
                  Walmart
                </AvatarFallback>
              </Avatar>
              <CloudUpload className="size-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <span className="text-xs mt-2">Logo cửa hàng</span>
          </div>
          <div className="flex-1 space-y-2">
            <div>
              <Label htmlFor="storeName" className="font-semibold mb-1">
                <span className="text-rose-400">*</span> Tên cửa hàng
              </Label>
              <div className="relative group">
                <Input
                  id="storeName"
                  value={storeName}
                  onChange={handleStoreNameChange}
                  placeholder="Nhập tên cửa hàng"
                  className={storeNameError ? "border-red-500 !ring-0" : ""}
                />
                {storeName && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-5 hidden group-hover:flex rounded-full"
                      onClick={() => {
                        setStoreName("");
                      }}
                    >
                      <X className="size-3" />
                      <span className="sr-only">Clear</span>
                    </Button>
                    <Separator orientation="vertical" className="!h-4" />
                    <p className="!text-xs text-muted-foreground">
                      {storeName.length}/30
                    </p>
                  </div>
                )}
              </div>
              {storeNameError && (
                <p className="text-red-500 text-xs mt-1">{storeNameError}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phoneNumber" className="font-semibold mb-1">
                <span className="text-rose-400">*</span> Số điện thoại
              </Label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className={phoneError ? "border-red-500 !ring-0" : ""}
              />
              {phoneError && (
                <p className="text-red-500 text-xs mt-1">{phoneError}</p>
              )}
            </div>
          </div>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <Label className="font-semibold">
            <span className="text-rose-400">*</span>Địa chỉ lấy hàng:
          </Label>
          {address.addressDetail &&
          address.ward &&
          address.district &&
          address.province ? (
            <div className="flex items-center gap-1">
              <div>
                {address.addressDetail}, {address.ward.label},{" "}
                {address.district.label}, {address.province.label}.
              </div>
              <div
                className=" text-blue-600 cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                chỉnh sửa
              </div>
            </div>
          ) : (
            <Button size="sm" type="button" onClick={() => setIsOpen(true)}>
              <Plus className="size-4" />
              Thêm mới
            </Button>
          )}
          <AddressSelect
            title="Chọn địa chỉ lấy hàng"
            address={address}
            open={isOpen}
            onOpenChange={setIsOpen}
            onConfirm={(address) => {
              setAddress({
                province: address.province,
                district: address.district,
                ward: address.ward,
                addressDetail: address.addressDetail,
              });
            }}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="mt-4" disabled={!isValid}>
            Lưu thông tin
          </Button>
        </div>
      </form>
    </div>
  );
}
