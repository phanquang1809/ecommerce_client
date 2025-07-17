import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function VerificationForm({
  email,
  setCode,
  handleSendVerificationCode,
  isLoading,
}: {
  email: string;
  setCode: (value: string) => void;
  handleSendVerificationCode: () => void;
  isLoading: boolean;
}) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Đồng bộ code với digits
  useEffect(() => {
    setCode(digits.join(""));
  }, [digits, setCode]);

  // Đếm ngược
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === 0) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return; // Chỉ cho phép số
    const newDigits = [...digits];
    newDigits[index] = value.slice(0, 1);
    setDigits(newDigits);

    // Chuyển focus
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleResendOTP = () => {
    setTimeRemaining(60);
    handleSendVerificationCode();
  };

  return (
    <Card className="p-0 border-0 shadow-none">
      <CardHeader className="space-y-2 p-0">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => window.history.back()}
          className="w-fit"
        >
          <ArrowLeft className="size-4" />
          <span className="text-xs">Quay lại</span>
        </Button>
        <CardTitle className="text-2xl font-bold">Nhập mã xác thực</CardTitle>
        <CardDescription>
          Mã xác thực 6 ký tự đã được gửi đến{" "}
          <span className="font-bold">{email}</span>.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <div className="flex items-center justify-center gap-3">
          {digits.map((digit, index) => (
            <Input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className="h-12 w-12 rounded-md border border-gray-300 text-center text-2xl font-bold focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              disabled={isLoading}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="">
            {timeRemaining > 0
              ? `Gửi lại sau ${timeRemaining} giây`
              : (
                  <motion.div
                    key="resend-button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    <Button
                      onClick={handleResendOTP}
                      variant="outline"
                      disabled={isLoading}
                    >
                      Gửi lại OTP
                    </Button>
                  </motion.div>
                )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
