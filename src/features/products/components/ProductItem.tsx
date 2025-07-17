// import { StarIcon } from "@heroicons/react/20/solid";
import { Product } from "@/types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type ProductItemProps = {
  product: Product;
};

export default function ProductItem({ product }: ProductItemProps) {
  const [imgSrc, setImgSrc] = useState(product.imageSrc);
  const [isHover, setIsHover] = useState(false);
  return (
    <Link
      to={`/${product.category}/${product.slug}`}
      className="group relative rounded-2xl border-0 border-gray-300  cursor-pointer h-full block"
    >
      <div
        className="relative aspect-square overflow-hidden rounded-md "
        onMouseEnter={() => {
          setImgSrc(
            product.imageHoverSrc ? product.imageHoverSrc : product.imageSrc
          );
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setImgSrc(product.imageSrc);
          setIsHover(false);
        }}
      >
        <img
          alt={product.imageAlt}
          src={imgSrc}
          className={`w-full h-full object-contain rounded-md transition-all duration-500 ease-in-out transform ${
            isHover ? "scale-105" : "scale-100"
          }`}
        />
      </div>

      <div className="px-2 pb-3 mt-2 space-y-1 text-center">
        <h3 className="text-sm text-black group-hover:underline line-clamp-1">
          {product.name}
        </h3>
        <p className="text-black font-medium text-sm">{product.price}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => e.preventDefault()}
          className="text-center text-xs !text-blue-700 !border-blue-700 !bg-transparent rounded-full !py-1"
        >
          Thêm giỏ hàng
        </Button>
      </div>
    </Link>
  );
}
