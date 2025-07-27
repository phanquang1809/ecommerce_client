import { formatCurrency } from "@/utils/format";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/product.type";
import NProgress from "nprogress";
import { getProductByShop } from "@/services/website/productServices";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

interface ProductCardProps {
  product: Product;
  hasBorder?: boolean;
  hiddenOptions?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, hasBorder=false,hiddenOptions=false }) => {
  const navigate = useNavigate();
const queryClient = useQueryClient();

 const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const queryKey = ["product-by-shop", product.shop_slug, product.slug];
  try {
    // Prefetch nếu chưa có trong cache
    if (!queryClient.getQueryData(queryKey)) {
      NProgress.start();
      await queryClient.prefetchQuery({
        queryKey,
        queryFn: () => getProductByShop(product.slug!, product.shop_slug!),
        staleTime: 1000 * 60 * 5,
      });
    }
    navigate(`/products/${product.shop_slug}/${product.slug}`);
  } catch (error) {
    console.error("Lỗi khi prefetch sản phẩm", error);
  }finally
  {
    NProgress.done();
  }
};

  const preferredVariant = product.variants.reduce((min, curr) => {
    const currPrice = Number(curr.discountPrice ?? curr.price);
    const minPrice = Number(min.discountPrice ?? min.price);
    return currPrice < minPrice ? curr : min;
  });

  const { price } = preferredVariant;

  // const finalPrice = discountPrice > 0 ? discountPrice : price;

  // const discountPercent =
  //   discountPrice > 0 ? Math.round(((price - discountPrice) / price) * 100) : 0;

  return (
    <Link
      to={`/products/${product.shop_slug}/${product.slug}`}
      onClick={handleLinkClick}
      className={cn("flex flex-col h-full rounded-md overflow-hidden group cursor-pointer no-underline text-inherit bg-white",hasBorder && "border")}
    >
      <div className="relative aspect-square mb-4 overflow-hidden rounded-t-md">
        {/* Container for scaling both images */}
        <div className="w-full h-full transition-transform duration-500 transform group-hover:scale-105 relative">
          {/* First image */}
          <img
            src={product.images[0]}
            alt={product.name}
            // onError={(e) => {
            //   e.currentTarget.onerror = null;
            //   e.currentTarget.src = "/image/cat_may_choi_game.png";
            // }}
            loading="lazy"
            className="object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-500 opacity-100 group-hover:opacity-0"
          />
          {/* Hover image */}
          <img
            src={product.images[1] || product.images[0]}
            alt={product.name}
            loading="lazy"
            className="object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          />
        </div>

        {/* Discount badge */}
        {/* <div className="absolute top-2 left-2">
          {discountPercent > 0 && (
            <Badge className="bg-red-500 text-white flex items-center gap-1 text-xs rounded">
              -{discountPercent}%
            </Badge>
          )}
        </div> */}
      </div>
      <div className="p-2">
        <h3 className="font-medium text-gray-800 mb-2 leading-tight line-clamp-2 min-h-8 text-sm group-hover:underline">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-md text-red-600">
            {formatCurrency(price)}
          </span>
          <span className="text-xs">Đã bán {product.total_sold}</span>
        </div>
        {!hiddenOptions && (
           product.options && product.options.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-1">
            {product.options.map((option) => (
              <Badge
                key={option.id}
                variant="outline"
                className="rounded py-1.5"
              >
                {option.values.length} {option.name}
              </Badge>
            ))}
          </div>
        )
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
