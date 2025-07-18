import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePaymentMethods } from "@/services/website";

export default function PaymentMethod({
  selectedMethod,
  setSelectedMethod,
}: {
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
}) {
  const { data, isLoading } = usePaymentMethods();

  const methods = data?.data || [];

  return (
    <div className="p-4 bg-white rounded">
      <h2 className="text-lg font-semibold mb-4">Chọn phương thức thanh toán</h2>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Đang tải phương thức...</p>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {methods.map((method) => (
            <Button
              key={method.code}
              variant="outline"
              onClick={() => setSelectedMethod(method.code ||"cod")}
              className={cn(
                "justify-start h-auto py-4 border-2 text-left rounded text-sm",
                selectedMethod === method.code
                  ? "border-dashed !border-blue-500 !bg-blue-50"
                  : "border-dashed hover:border-blue-500 hover:bg-blue-50"
              )}
            >
              {method.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
