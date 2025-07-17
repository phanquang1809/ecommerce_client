import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/utils/format";
import { Trash2, Minus, Plus, AlertTriangle, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { getProductByShop } from "@/services/productServices";
import NProgress from "nprogress";
import { CartItem as CartItemType } from "@/types";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";

interface CartItemProps {
  item: CartItemType;
  selectedItems: number[];
  toggleSelectItem: (variantId: number) => void;
}

export default function CartItem({
  item,
  selectedItems,
  toggleSelectItem,
}: CartItemProps) {
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const { removeFromCart, loading, updateQuantity } = useCartStore();
  const debouncedUpdateQuantity = useCallback(
    debounce((qty: number) => {
      updateQuantity(item.variantId, qty);
    }, 400),
    [item.variantId, updateQuantity]
  );
  const handleChangeQuantity = (qty: number) => {
    if (qty > item.product_stock) {
      toast.error("Số lượng còn lại là " + item.product_stock);
      return;
    }

    if (qty < 1) {
      setConfirmDeleteOpen(true);
      return;
    }

    const newQty = Math.min(Math.max(qty, 1), item.product_stock);
    setLocalQuantity(newQty);
    debouncedUpdateQuantity(newQty);
  };

  const handleConfirmDelete = async () => {
    const res = await removeFromCart([item.variantId]);
    if (res.status === "success") {
      setConfirmDeleteOpen(false);
    }
  };

  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      NProgress.start();
      const res = await getProductByShop(
        item.product_slug || "",
        item.shop_slug || ""
      );
      if (res?.status === "success") {
        navigate(
          `/products/${item.shop_slug}/${item.product_slug}?sku=${item.sku}`,
          {
            state: { data: res.data },
          }
        );
      }
    } catch (error) {
      console.error("Không lấy được dữ liệu sản phẩm", error);
    } finally {
      NProgress.done();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-3 w-1/2">
          <Checkbox
            checked={selectedItems.includes(item.variantId)}
            onCheckedChange={() => toggleSelectItem(item.variantId)}
            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <div className="flex gap-3">
            <img
              src={item.image}
              alt={item.productName}
              className="w-25 h-25 object-cover"
            />
            <div>
              <Link
                to={item.product_url}
                onClick={handleLinkClick}
                className="hover:text-blue-600"
              >
                {item.productName}
              </Link>
              <p className="text-sm text-gray-500">{item.variantOptions}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 items-start text-center w-1/2">
          <span>{formatCurrency(item.unitPriceAtTime)}</span>
          <div>
            <div className="flex items-center justify-center">
              <Button
                size="icon"
                variant="outline"
                className="size-8 rounded-r-none !bg-white"
                onClick={() => handleChangeQuantity(localQuantity - 1)}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <Input
                min={1}
                max={item.product_stock}
                value={localQuantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value)) {
                    handleChangeQuantity(value);
                  }
                }}
                className="w-10 h-8 text-center px-0 text-sm font-semibold rounded-none border-l-0 border-r-0"
              />
              <Button
                size="icon"
                variant="outline"
                className="size-8 rounded-l-none !bg-white"
                onClick={() => handleChangeQuantity(localQuantity + 1)}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            {item.product_stock <= 5 && (
              <span className="text-xs text-orange-400">
                Còn {item.product_stock} sản phẩm
              </span>
            )}
          </div>
          <span className="text-red-500 font-semibold">
            {formatCurrency(item.unitPriceAtTime * localQuantity)}
          </span>
          <div
            className="w-full flex justify-end text-gray-600 cursor-pointer"
            onClick={() => setConfirmDeleteOpen(true)}
          >
            <Trash2 className="size-5" />
          </div>
        </div>
      </div>

      {/* Dialog Xác nhận xoá */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent className="!max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-orange-500" />
              Xóa sản phẩm
            </DialogTitle>
            <DialogDescription>
              Bạn có muốn xóa sản phẩm đang chọn?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="rounded"
              variant="outline"
              disabled={loading}
              onClick={handleConfirmDelete}
            >
              {loading && <Loader className="animate-spin" />}
              Xác nhận
            </Button>
            <Button
              disabled={loading}
              className="rounded !bg-blue-600"
              onClick={() => setConfirmDeleteOpen(false)}
            >
              Hủy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
