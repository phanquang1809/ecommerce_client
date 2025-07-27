import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { ArrowLeft, Plus } from "lucide-react";
import AddressSelect from "@/pages/Seller/Profile/AddressSelect";

type Address = {
  label: string;
  value: string;
  children?: Address[];
};

interface Props {
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  error: { password?: string; confirmPassword?: string };
  setError: (value: { password?: string; confirmPassword?: string }) => void;
  isLoading: boolean;

  phoneNumber?: string;
  setPhoneNumber?: (value: string) => void;
  phoneError?: string;
  setPhoneError?: (value: string) => void;

  address?: {
    province: Address;
    district: Address;
    ward: Address;
    addressDetail: string;
  };
  setAddress?: (addr: {
    province: Address;
    district: Address;
    ward: Address;
    addressDetail: string;
  }) => void;
}

export default function CreateAccount({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  setError,
  isLoading,
  phoneNumber,
  setPhoneNumber,
  phoneError,
  setPhoneError,
  address,
  setAddress,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setError({
      ...error,
      password:
        newValue.length < 6 && newValue
          ? "Mật khẩu phải có ít nhất 6 ký tự"
          : "",
      confirmPassword:
        confirmPassword && newValue !== confirmPassword
          ? "Mật khẩu xác nhận không khớp"
          : "",
    });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setConfirmPassword(newValue);
    setError({
      ...error,
      confirmPassword:
        newValue !== password ? "Mật khẩu xác nhận không khớp" : "",
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (/^\d*$/.test(raw)) {
      setPhoneNumber?.(raw);
      if (raw === "") {
        setPhoneError?.("Vui lòng nhập số điện thoại");
      } else if (!/^0\d{9}$/.test(raw)) {
        setPhoneError?.("Số điện thoại không hợp lệ");
      } else {
        setPhoneError?.("");
      }
    }
  };

  return (
    <div className="space-y-4">
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="size-4 text-black" />
        <span className="text-xs text-black">Quay lại</span>
      </Button>

      <h1 className="text-2xl font-bold text-black">Tạo tài khoản</h1>

      {/* Mật khẩu */}
      <div className="space-y-2">
        <Label htmlFor="password" className="block font-medium text-gray-900">
          Mật khẩu
        </Label>
        <PasswordInput
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className={`w-full ${error.password ? "border-red-500" : ""}`}
          placeholder="Nhập mật khẩu"
          autoComplete="new-password"
          disabled={isLoading}
        />
        {error.password && (
          <p className="text-red-600 text-xs">{error.password}</p>
        )}
      </div>

      {/* Xác nhận mật khẩu */}
      <div className="space-y-2">
        <Label
          htmlFor="confirmPassword"
          className="block font-medium text-gray-900"
        >
          Xác nhận mật khẩu
        </Label>
        <PasswordInput
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={`w-full ${
            error.confirmPassword ? "border-red-500" : ""
          }`}
          placeholder="Nhập lại mật khẩu"
          autoComplete="new-password"
          disabled={isLoading}
        />
        {error.confirmPassword && (
          <p className="text-red-600 text-xs">{error.confirmPassword}</p>
        )}
      </div>

      {/* Số điện thoại */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="block font-medium text-gray-900">
          Số điện thoại
        </Label>
        <Input
          id="phone"
          value={phoneNumber}
          onChange={handlePhoneChange}
          className={`w-full ${phoneError ? "border-red-500" : ""}`}
          placeholder="Nhập số điện thoại"
          disabled={isLoading}
        />
        {phoneError && <p className="text-red-600 text-xs">{phoneError}</p>}
      </div>

      {/* Địa chỉ */}
      <div className="space-y-2">
        <Label className="block font-medium text-gray-900">Địa chỉ</Label>
        {address?.addressDetail ? (
          <div className="flex items-center gap-2 text-sm">
            <span>
              {address.addressDetail}, {address.ward.label},{" "}
              {address.district.label}, {address.province.label}
            </span>
            <Button
              type="button"
              variant="link"
              className="text-blue-600 text-xs"
              onClick={() => setIsOpen(true)}
            >
              Chỉnh sửa
            </Button>
          </div>
        ) : (
          <Button type="button" onClick={() => setIsOpen(true)} size="sm">
            <Plus className="size-4" />
            Thêm địa chỉ
          </Button>
        )}
        <AddressSelect
          title="Chọn địa chỉ nhận hàng"
          address={address||{province: {label: "", value: ""}, district: {label: "", value: ""}, ward: {label: "", value: ""}, addressDetail: ""}}
          open={isOpen}
          onOpenChange={setIsOpen}
          onConfirm={(value) => {
            setAddress?.({
              province: value.province,
              district: value.district,
              ward: value.ward,
              addressDetail: value.addressDetail,
            });
          }}
        />
      </div>
    </div>
  );
}
