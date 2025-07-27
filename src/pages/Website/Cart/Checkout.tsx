import { useCartStore } from "@/store/cartStore";
import OrderSummary from "./OrderSummary";
import { CartItem } from "@/types";
import CheckoutShopGroup from "./CheckoutShopGroup";
import { useEffect, useMemo, useState } from "react";
import useUserStore from "@/store/userStore";
import { createOrders, OrderGroup } from "@/services/website/orderServices";
import { getShippingFee } from "@/services/website/cartServices";
import ShippingAddress from "./ShippingAddress ";
import { useNavigate } from "react-router-dom";
import PaymentMethod from "./PaymentMethod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import VariantStockUpdatedListener, {
  VariantStockUpdatedEvent,
} from "./VariantStockUpdatedListener";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items, shop_info, selectedItems, setCart, clearSelection } =
    useCartStore();
  const { user } = useUserStore();
  const [selectedAddress, setSelectedAddress] = useState(user?.address);
  // Lọc ra các sản phẩm được chọn để thanh toán
  const selectedProducts = useMemo(
    () =>
      items.filter(
        (item) => selectedItems.includes(item.variantId) && item.quantity > 0
      ),
    [items, selectedItems]
  );

  const [shippingFees, setShippingFees] = useState<Record<number, number>>({});

  // Nhóm theo shop
  const grouped = useMemo(() => {
    return selectedProducts.reduce((acc, item) => {
      if (!acc[item.shopId]) acc[item.shopId] = [];
      acc[item.shopId].push(item);
      return acc;
    }, {} as Record<number, CartItem[]>);
  }, [selectedProducts]);

  // Tạo chuỗi địa chỉ để theo dõi thay đổi
  const addressString = useMemo(() => {
    if (!selectedAddress) return "";
    const { province, district, address } = selectedAddress;
    return `${province}-${district}-${address}`;
  }, [selectedAddress]);
  const [openDialog, setOpenDialog] = useState(false);
  const { updateItemStock, toggleSelectItem } = useCartStore();

  useEffect(() => {
    const fetchShippingFees = async () => {
      if (!addressString || Object.keys(grouped).length === 0) return; // Bỏ qua nếu không có địa chỉ hoặc giỏ hàng rỗng

      const result: Record<number, number> = {};

      await Promise.all(
        Object.entries(grouped).map(async ([shopIdStr, items]) => {
          const shopId = Number(shopIdStr);
          const shop = shop_info.find((s) => s.id === shopId);
          const addressData = selectedAddress;
          if (!shop || !addressData) return;

          try {
            const res = await getShippingFee({
              shop_id: shopId,
              province: addressData.province,
              district: addressData.district,
              address: addressData.address,
              weight: items.reduce((sum, i) => sum + i.weight * i.quantity, 0),
              value: items.reduce(
                (sum, i) => sum + i.unitPriceAtTime * i.quantity,
                0
              ),
            });

            result[shopId] = res.fee;
          } catch {
            result[shopId] = 0;
          }
        })
      );
      setShippingFees(result);
    };
    fetchShippingFees();
  }, [grouped, addressString]); // Chỉ gọi lại khi grouped hoặc địa chỉ thay đổi
  const navigate = useNavigate();
  const getShop = (shopId: number) =>
    shop_info.find((shop) => shop.id === shopId);

  const handleCheckout = async () => {
    const groupedOrders = selectedProducts.reduce((acc, item) => {
      const shopId = item.shopId;
      if (!acc[shopId]) {
        acc[shopId] = {
          shop_id: shopId,
          items: [],
          shipping_fee: shippingFees[shopId] ?? 0,
          total_amount: 0,
          discount_amount: 100000,
          final_amount: 0,
          payment_method: selectedMethod,
          address_id: user?.address?.id ?? 0,
        };
      }

      const itemTotal = item.quantity * Number(item.unitPriceAtTime);
      acc[shopId].items.push({
        product_id: item.productId,
        product_name: item.productName,
        variant_id: item.variantId,
        image: item.image,
        variant_name: item.variantOptions,
        quantity: item.quantity,
        price: Number(item.unitPriceAtTime),
        total_price: itemTotal,
      });

      acc[shopId].total_amount += itemTotal;
      acc[shopId].final_amount +=
        itemTotal + acc[shopId].shipping_fee - acc[shopId].discount_amount;

      return acc;
    }, {} as Record<number, OrderGroup>);

    const orders = Object.values(groupedOrders);
    try {
      const response = await createOrders(orders);
      if (response.status === "success") {
        const updatedItems = items.filter(
          (item) => !selectedItems.includes(item.variantId)
        );

        setCart(updatedItems);
        // 2. Xoá danh sách selectedItems
        clearSelection();
        navigate("/customer/order/history");
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
    }
  };
  const handleStockUpdate = (event: VariantStockUpdatedEvent) => {
    const { variant_id, quantity, available_stock } = event;
    updateItemStock(variant_id, quantity, available_stock);

    const item = items.find((item) => item.variantId === variant_id);

    if (!item) return;

    if (available_stock === 0) {
      setOpenDialog(true);
      toggleSelectItem(variant_id);
    } else if (item.quantity > available_stock) {
      toast.warning(
        `Số lượng của sản phẩm “${item.productName}” đã bị thay đổi`
      );
    }
  };
  const [selectedMethod, setSelectedMethod] = useState<string>("cod");
  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-5">Thanh toán</h1>
      <div className="w-full flex gap-4">
        <div className="flex-1 ">
          {selectedProducts.length === 0 ? (
            <div className="flex items-center justify-center h-full text-red-500 rounded font-semibold">
              Bạn chưa chọn sản phẩm trong giỏ hàng. Vui lòng thực hiện lại.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded p-4">
                <div className="grid grid-cols-5 gap-4 font-semibold text-gray-500 text-sm p-2 mb-2">
                  <span className="col-span-2">Sản phẩm</span>
                  <span className="text-center">Đơn giá</span>
                  <span className="text-center">Số lượng</span>
                  <span className="text-right">Thành tiền</span>
                </div>
                {Object.entries(grouped).map(([shopId, items]) => {
                  const shop = getShop(Number(shopId));
                  return (
                    <CheckoutShopGroup
                      key={shopId}
                      shop={shop}
                      items={items}
                      shippingFee={shippingFees[Number(shopId)] || 0}
                    />
                  );
                })}
              </div>
              <PaymentMethod
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
              />
            </div>
          )}
        </div>
        <div className="w-[300px]">
          <div className="flex flex-col gap-4 sticky top-20">
            <ShippingAddress
              setSelectedAddress={setSelectedAddress}
              selectedAddress={selectedAddress}
            />
            <OrderSummary
              shippingFees={shippingFees}
              shopInfo={shop_info}
              items={selectedProducts}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="">Thông báo</DialogTitle>
            <DialogDescription>
              Một số sản phẩm trong đơn hàng của bạn đã bị thay đổi. Vui lòng
              cập nhật lại giỏ hàng trước khi tiếp tục thanh toán.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              className="rounded"
              onClick={() => setOpenDialog(false)}
            >
              Hủy
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-500 text-white rounded"
              onClick={() => navigate("/cart")}
            >
              Quay lại giỏ hàng
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
