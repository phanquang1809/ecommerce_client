import ProductSlider from '@/features/products/components/ProductSlider';
import { Product } from '@/features/products/types/product.type';

type ShopContentProps = {
  highlightProducts: Product[];
};

export const ShopContent = ({ highlightProducts }: ShopContentProps) => {
  return (
    <div>
      <div className="p-5 bg-white rounded-md">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Gợi ý cho bạn
        </h2>
        <ProductSlider products={highlightProducts||[]} hasBorder />
      </div>
    </div>
  );
};
