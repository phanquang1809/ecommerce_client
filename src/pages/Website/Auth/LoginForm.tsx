import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";

export default function LoginForm({
  userInput,
  setUserInput,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  error,
  setError,
  setIsOpen,
  isLoading,
}: {
  userInput: string;
  setUserInput: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  error: { userInput?: string; password?: string };
  setError: (value: { userInput?: string ; password?: string }) => void;
  setIsOpen: (value: boolean) => void;
  isLoading: boolean;
}) {
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setUserInput(newValue);
    setError({ ...error, userInput: "" });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setError({ ...error, password: "" });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label
          htmlFor="userInput"
          className="block font-medium text-muted-foreground"
        >
          Email/Tên đăng nhập
        </Label>
        <Input
          id="userInput"
          type="text"
          value={userInput}
          onChange={handleUserInputChange}
          className={` ${
            error.userInput ? "border-red-500" : ""
          }`}
          placeholder="Nhập email hoặc tên đăng nhập"
          disabled={isLoading}
          autoComplete="userInput"
        />
        {error.userInput && (
          <p className="text-red-600 text-xs">{error.userInput}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="block font-medium text-muted-foreground"
        >
          Mật khẩu
        </Label>
        <PasswordInput
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className={`w-full ${
            error.password ? "border-red-500" : ""
          }`}
          placeholder="Nhập mật khẩu"
          autoComplete="password"
          disabled={isLoading}
        />
        {error.password && (
          <p className="text-red-600 text-xs">{error.password}</p>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked: boolean) => setRememberMe(checked)}
            disabled={isLoading}
            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <Label
            htmlFor="rememberMe"
            className="text-sm  text-muted-foreground"
          >
            Ghi nhớ tôi
          </Label>
        </div>
        <Button
        type="button"
          variant="link"
          onClick={(e) => {setIsOpen(true); e.preventDefault(); e.stopPropagation();}}
          className="text-blue-600 text-sm p-0"
          disabled={isLoading}
        >
          Quên mật khẩu?
        </Button>
      </div>
    </div>
  );
}