import { Shop } from "@/pages/Website/ProductDetails/productdetails.type";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useHandleGetShopDetail } from "@/services/seller";
interface ShopProps {
  shop: Shop;
}

export default function ShopInfo({ shop }: ShopProps) {
  const handleGetShopDetail = useHandleGetShopDetail();
  return (
    <div className="w-full">
      <div className="flex items-start gap-2">
        <img className="h-15 w-15 rounded-md object-contain border" src={shop.logo} alt="avatar" />
        <div>
          <Link onClick={(e)=>{
            e.preventDefault();
            handleGetShopDetail(shop.slug)
          }} to={`/cua-hang/${shop.slug}`} className="text-md font-medium ">{shop.name}</Link>
          <span className="flex items-center gap-1 text-gray-600">
           4.2 <Star className="fill-yellow-400 text-yellow-400 " size={16} /> (56 đánh giá)
          </span>
        </div>
      </div>
    </div>
  );
}
