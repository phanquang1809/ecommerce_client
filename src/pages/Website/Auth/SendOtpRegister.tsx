import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
import { sendVerificationCode } from "@/services/authServices";
import { useNavigate } from "react-router-dom";

interface SendOtpRegisterProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function SendOtpRegister({
  open,
  setOpen,
}: SendOtpRegisterProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
    const navigate = useNavigate();
  const handleSendEmail = async () => {
    if (!email.trim()) {
      setError("Vui lòng nhập email!");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ!");
      return;
    }
    setIsLoading(true);
    try {
      const result = await sendVerificationCode(email,false);
      if (result.status === "success") {
        toast.success(
          <span className="text-xs">Vui lòng kiểm tra email của bạn 📩</span>
        );
        setOpen(false);
        setEmail("");
        setError("");
        navigate("/customer/account/verify?email=" + email);
      } else if (result.status === "error") {
        setError(result.message || "Có lỗi xảy ra!");
      } else
        toast.error(result.message || "Có lỗi xảy ra!");
    } catch {
      toast.error(<span className="text-xs">Có lỗi xảy ra! ❌</span>);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setEmail("");
          setError("");
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Đăng ký tài khoản</DialogTitle>
          <DialogDescription>
            Nhập email của bạn để nhận mã xác thực.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={(e)=>{handleSendEmail(); e.preventDefault();}}>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="block font-medium text-gray-900 dark:text-gray-100"
            >
              Email
            </Label>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className={`w-full ${error ? "border-red-500" : ""}`}
              placeholder="Nhập email của bạn"
              disabled={isLoading}
            />
            {error && <p className="text-red-600 text-xs">{error}</p>}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              size="sm"
              className="bg-gradient-to-r from-[#00c5ff] to-[#3746fc]  text-white px-4 py-2 text-sm font-semibold hover:bg-black/80"
              disabled={isLoading}
            >
              {isLoading && (
                <svg
                  className="text-transparent animate-spin"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                >
                  <path
                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  ></path>
                </svg>
              )}
              {isLoading ? "Đang gửi" : "Gửi OTP"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
