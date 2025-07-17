import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import GradientBackground from "../../../UI/GradientBackground";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import useUserStore from "../../../store/userStore";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@/components/theme-provider";

export default function AdminLogin() {
   const { setTheme } = useTheme();
  
    useEffect(() => {
      setTheme("light");
    }, [setTheme]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);
  const loading = useUserStore((state) => state.loading);
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("admin@gmail.com");
  const [error, setError] = useState<{ email?: string; password?: string }>({
    email: "",
    password: "",
  });

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = { email: "", password: "" };
    setMessage("");
    if (email === "") {
      newErrors.email = "Vui lòng nhập email.";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Email không hợp lệ.";
    }
    if (password === "") {
      newErrors.password = "Vui lòng nhập mật khẩu.";
    }

    setError(newErrors);

    if (!newErrors.email && !newErrors.password) {
      const result = await login(email, password, rememberMe);
      if (result.status === "success") {
        queryClient.invalidateQueries();
        navigate("/admin");
      } else {
        setMessage(result.message);
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError((prev) => ({ ...prev, email: "" }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError((prev) => ({ ...prev, password: "" }));
  };

  const { isAuthenticated, user } = useUserStore();

  if (isAuthenticated && user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div>
      <GradientBackground />
      <div className="text-container z-[100] w-full h-full absolute top-0 left-0 flex justify-center items-center text-white select-none drop-shadow-[1px_1px_rgba(0,0,0,0.1)]">
        <div className="max-w-[450px] w-[calc(100vw-32px)] mx-auto rounded-lg p-6 flex flex-col bg-background">
          <img
            src="/image/Walmart-Logo-New.png"
            alt="logo"
            className="w-40 mx-auto"
          />
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="block font-medium text-muted-foreground"
              >
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full ${error.email ? "border-red-500" : ""}`}
                  placeholder="Nhập email"
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
              {error.email && (
                <p className="text-red-600 text-xs">{error.email}</p>
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
                className={`w-full ${error.password ? "border-red-500" : ""}`}
                placeholder="Nhập mật khẩu"
                autoComplete="current-password"
                disabled={loading}
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
                  disabled={loading}
                  className="data-[state=checked]:!bg-blue-600 data-[state=checked]:!border-blue-600"
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-sm text-muted-foreground"
                >
                  Ghi nhớ tôi
                </Label>
              </div>
              <Button
                variant="link"
                asChild
                className="text-blue-600 text-sm p-0"
                disabled={loading}
              >
                <Link to="#">Quên mật khẩu?</Link>
              </Button>
            </div>
            {message && (
            <p className="text-red-600 mt-2 text-sm">{message}</p>
          )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[linear-gradient(40deg,#00c5ff,#3746fc)] hover:bg-[linear-gradient(40deg,#00b5ef,#2f3de0)] text-white"
            >
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}