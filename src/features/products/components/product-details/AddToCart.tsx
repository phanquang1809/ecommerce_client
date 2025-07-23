import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/utils/format";
import { Loader, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Variant } from "../../types/product.type";
import { ProductDetails } from "@/pages/Website/ProductDetails/productdetails.type";
import useUserStore from "@/store/userStore";
import { useNavigate } from "react-router-dom";

export default function AddToCart({
  disabled = false,
  outOfStock,
  product,
  variant,
}: {
  disabled?: boolean;
  outOfStock?: boolean;
  product: ProductDetails;
  variant: Variant;
}) {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, clearSelection, selectAll } = useCartStore();
  const loading = useCartStore((state) => state.loading);
  const handleAddToCart = () => {
    if (!user) {
      navigate("/customer/login");
    }
    addToCart({
      productId: product.id,
      variantId: variant.id || 0,
      quantity,
      shopId: product.shop.id,
      unitPriceAtTime: variant.price,
    });
  };
  const handleBuyNow = async () => {
    if (!user) {
      navigate("/customer/login");
    }
    clearSelection();
    addToCart({
      productId: product.id,
      variantId: variant.id || 0,
      quantity,
      shopId: product.shop.id,
      unitPriceAtTime: variant.price,
    });
    selectAll([variant.id || 0]);
    setTimeout(() => {
      navigate("/checkout");
    }, 100);
  };
  return (
    <div className="w-full flex items-center gap-2 border-t pt-2">
      {outOfStock ? (
        <Button
          className="rounded !flex-1 bg-yellow-400 !text-black hover:bg-blue-500"
          disabled
        >
          Hết hàng
        </Button>
      ) : (
        <div className="w-full space-y-2">
          <div className="text-md font-semibold ">Số lượng</div>
        
          <div className="flex w-full items-center gap-1  !bg-white border-gray-300">
            <Button
              size="icon"
              variant="outline"
              className="rounded size-8"
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            >
              <Minus className="w-3 h-3 group-hover:text-white " />
            </Button>
            {/* <Separator orientation="vertical" className="!h-8" /> */}
            <Input
              className="w-10 text-center font-semibold h-8 rounded px-0"
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value)) {
                  setQuantity(value);
                }
                if (value < 1) {
                  setQuantity(1);
                }
                if (value > 999) {
                  setQuantity(999);
                }
              }}
            />
            <Button
              size="icon"
              variant="outline"
              className="rounded size-8"
              onClick={() => setQuantity((prev) => Math.min(prev + 1, 999))}
            >
              <Plus className="w-3 h-3 group-hover:text-white" />
            </Button>
          </div>
           
          <div className="text-md font-semibold">Tạm tính</div>
          <div className="font-semibold text-lg">
            {variant.price &&
              formatCurrency(variant.discountPrice ?? variant.price * quantity)}
          </div>

          {!disabled && (
              variant.stock > 0 ? 
            <div className="flex items-center gap-2">
              <Button
                className="rounded !flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-70 flex items-center justify-center gap-2"
                disabled={disabled || loading}
                onClick={handleAddToCart}
              >
                {loading && <Loader className="w-4 h-4 animate-spin" />}
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant="outline"
                className="rounded !flex-1 "
                disabled={disabled || loading}
                onClick={handleBuyNow}
              >
                Mua ngay
              </Button>
            </div>
             :
              <Button
                className="rounded !bg-blue-600 w-full !cursor-not-allowed"
              >
                Hết hàng
              </Button>
          
          )}
        </div>
      )}
    </div>
  );
}
