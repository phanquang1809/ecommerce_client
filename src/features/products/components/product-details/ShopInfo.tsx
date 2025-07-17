import { Shop } from "@/pages/Website/ProductDetails/productdetails.type";
import { Link, useNavigate } from "react-router-dom";
import  NProgress  from "nprogress";
import { getShopBySlug } from "@/services/shopServices";
import { Star } from "lucide-react";
interface ShopProps {
  shop: Shop;
}

export default function ShopInfo({ shop }: ShopProps) {
  const navigate = useNavigate();

 const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
     e.preventDefault(); // Ngăn Link chuyển trang mặc định
     try {
       NProgress.start();
       const res = await getShopBySlug(shop.slug || "");
       if (res?.status === "success") {
         navigate(`/shops/${shop.slug}`, {
           state: { shop: res.data },
         });
       }
     } catch (error) {
       console.error("Không lấy được dữ liệu sản phẩm", error);
     } finally {
       NProgress.done();
     }
   };
  return (
    <div className="w-full">
      <div className="flex items-start gap-2">
        <img className="h-15 w-15 rounded-md object-contain bg-gray-100" src={shop.logo} alt="avatar" />
        <div>
          <Link onClick={handleLinkClick} to={`/shops/${shop.slug}`} className="text-md font-medium ">{shop.name}</Link>
          <span className="flex items-center gap-1 text-gray-600">
           4.2 <Star className="fill-yellow-400 text-yellow-400 " size={16} /> (56 đánh giá)
          </span>
        </div>
      </div>
    </div>
  );
}
