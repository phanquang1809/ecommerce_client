import { Checkbox } from "@/components/ui/checkbox"; // ✅ Thêm Checkbox từ ShadCN
import { useCartStore } from "@/store/cartStore";
import { AlertTriangle, Loader, Loader2, Trash2 } from "lucide-react";
import CartItemByShop from "@/features/cart/CartItemByShop";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { formatCurrency } from "@/utils/format";
import useUserStore from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import VariantStockUpdatedListener, {
  VariantStockUpdatedEvent,
} from "./VariantStockUpdatedListener";
import ShippingAddress from "./ShippingAddress ";
export default function Cart() {
  const navigate = useNavigate();
  const {
    items,
    shop_info,
    selectAll,
    selectedItems,
    toggleSelectItem,
    loading,
    removeFromCart,
    updateItemStock,
  } = useCartStore();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const { user } = useUserStore();
  const [selectedAddress, setSelectedAddress] = useState(user?.address);

  if (loading && items.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-blue-600 font-medium">
          Đang tải giỏ hàng...
        </span>
      </div>
    );
  }
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.shopId]) acc[item.shopId] = [];
    acc[item.shopId].push(item);
    return acc;
  }, {} as Record<number, typeof items>);

  const getShop = (shopId: number) =>
    shop_info.find((shop) => shop.id === shopId);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      selectAll(items.map((item) => item.variantId));
    } else {
      selectAll([]);
    }
  };
  const handleConfirmDelete = async () => {
    const res = await removeFromCart(selectedItems);
    if (res.status === "success") {
      setConfirmDeleteOpen(false);
    }
  };
  const handleCheckout = () => {
    navigate("/checkout");
  };
  const totalPrice = items
    .filter((item) => selectedItems.includes(item.variantId))
    .reduce((acc, item) => acc + item.unitPriceAtTime * item.quantity, 0);

  const handleStockUpdate = (event: VariantStockUpdatedEvent) => {
    const { variant_id, quantity, available_stock } = event;
    updateItemStock(variant_id, quantity, available_stock);

    const item = items.find((item) => item.variantId === variant_id);

    if (!item) return;

    if (available_stock === 0) {
      toast.warning(`Sản phẩm “${item.productName}” đã tạm hết hàng`);
      toggleSelectItem(variant_id);
    } else if (item.quantity > available_stock) {
      toast.warning(
        `Số lượng của sản phẩm “${item.productName}” đã bị thay đổi`
      );
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-5">GIỎ HÀNG</h2>
      {items.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 space-y-4">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-gray-600 px-5 py-3 bg-white rounded-md">
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    checked={selectedItems.length === items.length}
                    onCheckedChange={(checked) => handleSelectAll(!!checked)}
                  />
                  <span>Tất cả ({items.length} sản phẩm)</span>
                </div>
                <div className="text-sm grid grid-cols-4 w-1/2 text-center items-center text-gray-600">
                  <span>Đơn giá</span>
                  <span>Số lượng</span>
                  <span>Thành tiền</span>
                  <div
                    className="w-full flex justify-end cursor-pointer"
                    onClick={() => {
                      if (selectedItems.length === 0) {
                        toast.error("Vui lòng chọn sản phẩm để xóa");
                        return;
                      }
                      setConfirmDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="size-5" />
                  </div>
                </div>
              </div>
              {Object.entries(grouped).map(([shopId, products]) => {
                const shop = getShop(Number(shopId));
                return (
                  <CartItemByShop
                    key={shopId}
                    shopId={Number(shopId)}
                    products={products}
                    shop={shop}
                    selectedItems={selectedItems}
                    selectAll={selectAll}
                    toggleSelectItem={toggleSelectItem}
                  />
                );
              })}
            </div>
          </div>
          <div className="w-full lg:w-[300px] space-y-3">
            {/* <div className="bg-white rounded-md p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold mb-2">Giao tới</h3>
                <Link
                  to="/profile"
                  className="font-semibold mb-2 text-blue-600"
                >
                  Thay đổi
                </Link>
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1.5 font-semibold">
                  <p className="">
                    {user?.address?.customer_name || user?.user_name}
                  </p>
                  <Separator orientation="vertical" className="!h-4" />
                  <p>
                    {user?.address?.customer_phone_number ||
                      user?.phone}
                  </p>
                </div>
                <p className="text-gray-600">
                  {user?.address?.address +
                    ", " +
                    user?.address?.ward +
                    ", " +
                    user?.address?.district +
                    ", " +
                    user?.address?.province}
                </p>
              </div>
            </div> */}
            <ShippingAddress
              setSelectedAddress={setSelectedAddress}
              selectedAddress={selectedAddress}
            />
            <div className="bg-white rounded-md p-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Tổng tiền hàng</span>
                {loading && selectedItems.length > 0 ? (
                  <Loader className="h-4 w-4 animate-spin text-blue-600" />
                ) : (
                  <span>{formatCurrency(totalPrice)}</span>
                )}
              </div>
              <div className="flex justify-between font-semibold text-lg text-red-600 mb-4">
                <span>Tổng thanh toán</span>
              </div>
              <Button
                onClick={handleCheckout}
                disabled={
                  selectedItems.length === 0 ||
                  items
                    .filter((item) => selectedItems.includes(item.variantId))
                    .some((item) => item.quantity === 0)
                }
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded font-semibold"
              >
                Mua Hàng ({selectedItems.length})
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 min-h-[400px] text-center p-5 bg-white rounded-lg">
          <div className="w-40 h-40">
            <svg
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M13.1194 61.3954H66.8805"
                stroke="#2339FF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.7442 19.3489H63.2558L67.5587 69.2618C67.746 71.4348 66.0325 73.3024 63.8515 73.3024H16.1484C13.9674 73.3024 12.2539 71.4348 12.4413 69.2618L16.7442 19.3489Z"
                stroke="#121331"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M52.093 26.0465V15.814C52.093 9.13527 46.6789 3.72095 40 3.72095C33.3211 3.72095 27.907 9.13527 27.907 15.814V26.0465"
                stroke="#2339FF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-xl font-bold">Giỏ hàng trống</span>
          <span className="text-sm text-gray-600">
            Hãy thoải mái lựa chọn sản phẩm bạn nhé
          </span>
        </div>
      )}
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
      {user?.id && (
        <VariantStockUpdatedListener
          userId={user.id}
          onStockUpdate={handleStockUpdate}
        />
      )}
    </div>
  );
}
