import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { ArrowLeft } from "lucide-react";

export default function CreateAccount({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  setError,
  isLoading,
}: {
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  error: { password?: string; confirmPassword?: string };
  setError: (value: { password?: string; confirmPassword?: string }) => void;
  isLoading: boolean;
}) {
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
  return (
    <div className="space-y-4">
      <Button type="button" size="sm" variant="outline" onClick={() => window.history.back()}>
        <ArrowLeft className="size-4 text-black" />
        <span className="text-xs text-black">Quay lại</span>
      </Button>
      <h1 className="text-2xl font-bold text-black">Tạo tài khoản</h1>
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
    </div>
  );
}
