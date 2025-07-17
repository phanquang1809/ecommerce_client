import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Promotions() {
  return (
    <div className="p-4 bg-white w-full rounded">
      <h4 className="text-sm font-semibold mb-4">Walmart Khuyến Mãi</h4>
     <Button
  variant="ghost"
  className="flex items-center gap-1 !bg-transparent !justify-start !text-blue-600 rounded !ring-0"
>
  <span>Chọn hoặc nhập mã khác</span>
  <ChevronRight className="w-4 h-4" />
</Button>

    </div>
  );
}
