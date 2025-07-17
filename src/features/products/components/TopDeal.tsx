import { Product } from "../types/product.type";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductSlider from "./ProductSlider";

type ProductListProps = {
  products: Product[];
   isLoading: boolean;
  error: Error | null;
};

export default function TopDeal({ products, isLoading, error }: ProductListProps) {

  if (error) {
    return <div className="text-red-500">Lỗi khi tải sản phẩm.</div>;
  }
  return (
    <div className="w-full p-5 rounded-lg bg-white">
      <h2 className="text-2xl font-medium tracking-tight text-rose-500 mb-2">
        Top Deal - Siêu Rẻ
      </h2>
     {isLoading ? (
      <div className="flex gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
) : (
  <ProductSlider products={products} />
)}
    </div>
  );
}
