import { Button } from "@/components/ui/button";
import { CartItem } from "@/types";
import { ChevronDown, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/format";

type Shop = {
  id: number;
  name: string;
  // có thể bổ sung province, district nếu cần tính phí vận chuyển
};

export default function OrderSummary({
  items,
  shopInfo,
  onCheckout,
  shippingFees, // ✅ thêm prop

}: {
  items: CartItem[];
  shopInfo: Shop[];
  onCheckout: () => void;
  shippingFees: Record<number, number>;
}) {
  // Nhóm sản phẩm theo shop
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.shopId]) acc[item.shopId] = [];
    acc[item.shopId].push(item);
    return acc;
  }, {} as Record<number, CartItem[]>);

  const fakeDiscount = 100000;

  const totalPrice = items.reduce(
    (sum, item) => sum + item.unitPriceAtTime * item.quantity,
    0
  );

const totalShippingFee = Object.values(shippingFees).reduce((sum, fee) => sum + fee, 0);

const totalPayment = totalPrice + totalShippingFee - fakeDiscount;

  return (
    <div className="bg-white rounded p-4 text-sm space-y-3">
      <div className="border-b pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold mb-2">Đơn hàng</h3>
          <Link to="/cart" className="font-semibold mb-2 text-blue-600">
            Thay đổi
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <span>{items.length} sản phẩm.</span>
          <div className="flex items-center gap-1 text-blue-500 cursor-pointer">
            <span>Xem thông tin</span>
            <ChevronDown className="size-4" />
          </div>
        </div>
      </div>

      Chi tiết từng shop
          {Object.entries(grouped).map(([shopId, shopItems]) => {
        const shop = shopInfo.find((s) => s.id === Number(shopId));
        const subtotal = shopItems.reduce(
          (sum, item) => sum + item.unitPriceAtTime * item.quantity,
          0
        );
        const shopShippingFee = shippingFees[Number(shopId)] ?? 0;

        return (
          <div key={shopId} className="pb-2 border-b">
            <p className="font-semibold mb-1 text-blue-600">
              {shop?.name || `Shop #${shopId}`}
            </p>
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              {shopShippingFee === 0 ? (
                <Loader className="animate-spin size-4" />
              ):
              <span>{formatCurrency(shopShippingFee)}</span>
              }
            </div>
            <div className="flex justify-between font-semibold">
              <span>Giảm giá</span>
              <span>-{formatCurrency(fakeDiscount)}</span>
            </div>
          </div>
        );
      })}

      <div className="flex justify-between items-center pt-2">
        <span className="font-bold line-clamp-2 max-w-[120px]">
          Tổng tiền thanh toán
        </span>
        <div className="flex flex-col items-end">
          <span className="font-bold text-red-500 text-lg">
            {formatCurrency(totalPayment)}
          </span>
          <span className="text-sm text-green-500">
            Tiết kiệm: {formatCurrency(fakeDiscount)}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        (Giá đã bao gồm thuế GTGT, phí đóng gói, vận chuyển...)
      </p>

      <Button
        disabled={!items.length || !totalShippingFee}
        onClick={onCheckout}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded font-semibold"
      >
        Đặt Hàng
      </Button>
    </div>
  );
}
