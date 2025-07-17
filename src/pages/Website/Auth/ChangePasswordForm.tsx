import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

export default function ChangePasswordForm({
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
      password: newValue.length < 6 && newValue ? "Mật khẩu phải có ít nhất 6 ký tự" : "",
      confirmPassword: confirmPassword && newValue !== confirmPassword ? "Mật khẩu xác nhận không khớp" : "",
    });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setConfirmPassword(newValue);
    setError({
      ...error,
      confirmPassword: newValue !== password ? "Mật khẩu xác nhận không khớp" : "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="password" className="block font-medium text-gray-900 dark:text-gray-100">
          Mật khẩu mới
        </Label>
        <PasswordInput
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className={`text-black ${
            error.password ? "border-red-500" : ""
          }`}
          placeholder="Nhập mật khẩu mới"
          disabled={isLoading}
        />
        {error.password && <p className="text-red-600 text-xs">{error.password}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="block font-medium text-gray-900 dark:text-gray-100">
          Nhập lại mật khẩu mới
        </Label>
        <PasswordInput
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={`text-black ${
            error.confirmPassword ? "border-red-500" : ""
          }`}
          placeholder="Nhập lại mật khẩu mới"
          disabled={isLoading}
        />
        {error.confirmPassword && (
          <p className="text-red-600 text-xs">{error.confirmPassword}</p>
        )}
      </div>
    </div>
  );
}