// components/CheckoutShopGroup.tsx
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types";
import { formatCurrency } from "@/utils/format";
import { TicketPercent } from "lucide-react";

export default function CheckoutShopGroup({
  shop,
  items,
}: {
  shop: { id: number; name: string; url: string } | undefined;
  items: CartItem[];
}) {
  return (
    <div className="border border-dashed border-blue-600 mb-4 p-2 rounded">
      <h2 className="text-md font-semibold mb-3 text-blue-600">
        {shop?.name || "Không rõ cửa hàng"}
      </h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.variantId}
            className="grid grid-cols-5 gap-4 items-center pb-2"
          >
            {/* Cột 1: Thông tin sản phẩm */}
            <div className="col-span-2 flex items-start gap-3">
              <img
                src={item.image}
                alt={item.productName}
                className="w-15 h-15 object-cover"
              />
              <div>
                <p className="hover:text-blue-600 text-sm">
                  {item.productName}
                </p>
                <p className="text-sm text-gray-500">{item.variantOptions}</p>
              </div>
            </div>

            {/* Cột 2: Đơn giá */}
            <div className="text-center text-sm">
              {formatCurrency(item.unitPriceAtTime)}
            </div>

            {/* Cột 3: Số lượng */}
            <div className="text-center text-sm">{item.quantity}</div>

            {/* Cột 4: Thành tiền */}
            <div className="text-right text-sm text-red-600">
              {formatCurrency(item.unitPriceAtTime * item.quantity)}
            </div>
          </li>
        ))}
      </ul>
      <div className="w-full flex justify-end border-t border-blue-600 border-dashed pt-2">
        <Button
          variant="outline"
          className="rounded  !text-blue-600 border-blue-600 border-dashed hover:bg-blue-50"
        >
          <TicketPercent className="size-4" />
          Chọn Voucher
        </Button>
      </div>
    </div>
  );
}
