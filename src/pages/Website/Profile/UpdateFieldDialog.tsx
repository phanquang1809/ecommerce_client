import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, EyeOff, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpdateFieldDialogProps {
  title: string;
  defaultValue?: string;
  description?: string;
  field: "phone" | "email" | "password";
  trigger: React.ReactNode;
  onSuccess?: (
    newValue: string
  ) => Promise<{ status: string; message: string }>;
}

export function UpdateFieldDialog({
  title,
  description,
  defaultValue,
  field,
  trigger,
  onSuccess,
}: UpdateFieldDialogProps) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  const validatePassword = (pw: string) =>
    pw.length >= 8 && pw.length <= 32 && /[a-zA-Z]/.test(pw) && /\d/.test(pw);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone); // 10 chữ số
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({ password: "", confirmPassword: "", email: "", phone: "" });

    if (field === "password") {
      if (value === "") {
        setError({
          ...error,
          password: "Vui lòng nhập mật khẩu",
        });
        return;
      }
      if (value !== confirmPassword) {
        setError({
          ...error,
          confirmPassword: "Mật khẩu không khớp",
          password: "",
        });
        return;
      }
      if (!validatePassword(value)) {
        setError({
          ...error,
          password: "Mật khẩu không đúng định dạng",
          confirmPassword: "",
        });
        return;
      }
    }

    if (field === "email") {
      if (!validateEmail(value)) {
        setError({ ...error, email: "Email không hợp lệ" });
        return;
      }
      if (value === defaultValue) {
        setError({ ...error, email: "Vui lòng nhập email mới" });
        return;
      }
    }

    if (field === "phone") {
      if (!validatePhone(value)) {
        setError({ ...error, phone: "Số điện thoại không hợp lệ" });
        return;
      }
      if (value === defaultValue) {
        setError({ ...error, phone: "Vui lòng nhập số điện thoại mới" });
        return;
      }
    }

    if (onSuccess) {
      try {
        setLoading(true);
        const res = await onSuccess(value);
        if (res.status === "success") {
          setOpen(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setValue(defaultValue || "");
    setConfirmPassword("");
    setError({
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };
  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm(); // reset khi đóng
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {field === "password" ? (
            <div className="flex flex-col gap-4">
              {/* Password */}
              <div>
                <div className="relative">
                  <Input
                    disabled={loading}
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu mới"
                    maxLength={32}
                    value={value}
                    className={cn(
                      "h-8 rounded !ring-0",
                      error.password && "border-red-500"
                    )}
                    onChange={(e) => {
                      setValue(e.target.value);
                      setError((prev) => ({
                        ...prev,
                        [field]: "",
                      }));
                    }}
                    autoComplete="new-password"
                    name="password"
                  />
                  <Button
                    disabled={loading}
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2  size-6 shadow-none"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {error.password && (
                  <p className="text-xs text-red-500 mt-1">{error.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative">
                  <Input
                    disabled={loading}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu mới"
                    value={confirmPassword}
                    maxLength={32}
                    className={cn(
                      "h-8 rounded",
                      error.confirmPassword && "border-red-500"
                    )}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError((prev) => ({
                        ...prev,
                        confirmPassword: "",
                      }));
                    }}
                    autoComplete="new-password"
                    name="confirm-password"
                  />
                  <Button
                    disabled={loading}
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2  size-6 shadow-none"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {error.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {error.confirmPassword}
                  </p>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số.
              </p>
            </div>
          ) : (
            <div>
              <Input
                disabled={loading}
                placeholder={`Nhập ${
                  field === "phone" ? "số điện thoại" : "email"
                } mới`}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError((prev) => ({
                    ...prev,
                    [field]: "",
                  }));
                }}
                className={cn("rounded", error[field] && "border-red-500")}
                autoComplete="new-field"
                name={`field-${Math.random()}`}
              />
              {error[field] && (
                <p className="text-xs text-red-500 mt-1">{error[field]}</p>
              )}
            </div>
          )}
          <DialogFooter className="pt-4">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded bg-blue-600 hover:bg-blue-500"
            >
              {loading && <Loader className="animate-spin" />}
              Lưu
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
