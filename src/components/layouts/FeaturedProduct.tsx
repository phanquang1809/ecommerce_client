import { Product  } from "../../types";

// Định nghĩa kiểu cho props
type FeaturedProductProps ={
  product: Product;
}
  export default function FeaturedProduct({ product }:FeaturedProductProps) {
    return (
      <div className="p-2 border-1 border-gray-300 gap-2 flex items-start rounded-2xl my-2">
        <img src={product.imageSrc} alt={product.name} className="aspect-square w-18 rounded-lg bg-gray-100 object-cover group-hover:opacity-75"/>
        <div>
        <p>{product.name}</p>
        <span>{product.price}$</span>
        </div>
      </div>
    );
  }
  