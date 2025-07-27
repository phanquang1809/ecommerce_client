// components/CartItemByShop.tsx

import { Checkbox } from "@/components/ui/checkbox";
import { Store } from "lucide-react";
import { Link } from "react-router-dom";
import CartItem from "@/features/cart/cartItem";
import { CartItem as CartItemType } from "@/types";
import { useHandleGetShopDetail } from "@/services/seller";

interface CartItemByShopProps {
  shopId: number;
  products: CartItemType[]; // có thể thay bằng kiểu `CartItemType[]` nếu bạn có
  shop:
    | {
        id: number;
        name: string;
        slug: string;
      }
    | undefined;
  selectedItems: number[];
  selectAll: (variantIds: number[]) => void;
  toggleSelectItem: (variantId: number) => void;
}

export default function CartItemByShop({
  products,
  shop,
  selectedItems,
  selectAll,
  toggleSelectItem,
}: CartItemByShopProps) {
  const shopVariantIds = products.map((item) => item.variantId);
  const allChecked = products.every((item) =>
    selectedItems.includes(item.variantId)
  );

  const handleShopCheckChange = (checked: boolean) => {
    if (checked) {
      const newSelected = Array.from(
        new Set([...selectedItems, ...shopVariantIds])
      );
      selectAll(newSelected);
    } else {
      const newSelected = selectedItems.filter(
        (id) => !shopVariantIds.includes(id)
      );
      selectAll(newSelected);
    }
  };
  const handleGetShopDetail = useHandleGetShopDetail();
  return (
    <div className="bg-white px-5 py-3 rounded-md">
      <div className="flex items-center gap-3 text-gray-600 font-bold pb-5">
        <Checkbox
          className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          checked={allChecked}
          onCheckedChange={(checked) => handleShopCheckChange(!!checked)}
        />
        <Store className="size-5" />
        <Link
          onClick={(e) => {
            e.preventDefault();
            handleGetShopDetail(shop?.slug ?? "");
          }}
          to={`/cua-hang/${shop?.slug}`}
          className="hover:underline"
        >
          {shop?.name ?? "Shop không xác định"}
        </Link>
      </div>

      {products.map((item) => (
        <CartItem
          key={item.variantId}
          item={item}
          selectedItems={selectedItems}
          toggleSelectItem={toggleSelectItem}
        />
      ))}
    </div>
  );
}
