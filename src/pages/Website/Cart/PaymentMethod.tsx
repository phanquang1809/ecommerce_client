"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const mockPaymentMethods = [
  { code: "cod", label: "Tiền mặt (COD)" },
  { code: "momo", label: "Thanh toán MoMo" },
  { code: "vnpay", label: "Thanh toán VNPay" },
  { code: "wallet", label: "Ví WalmartPay" },

];

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState("cod");

  return (
    <div className="p-4 bg-white rounded">
      <h2 className="text-lg font-semibold mb-4">Chọn phương thức thanh toán</h2>
      <div className="grid grid-cols-4 gap-4">
        {mockPaymentMethods.map((method) => (
          <Button
            key={method.code}
            variant="outline"
            onClick={() => setSelectedMethod(method.code)}
            className={cn(
              "justify-start h-auto py-4 border-2 text-left rounded",
              selectedMethod === method.code
                ? "border-dashed !border-blue-500 !bg-blue-50"
                : "border-dashed hover:border-blue-500 hover:bg-blue-50"
            )}
          >
            {method.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
