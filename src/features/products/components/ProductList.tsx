import { Product } from "../types/product.type";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

type ProductListProps = {
  products: Product[];
  title: string | null;
  limit: number;
  loading?: boolean;
  isFetchingNextPage?: boolean;
};

export default function ProductList({
  products,
  title,
  limit,
  loading,
  isFetchingNextPage
}: ProductListProps) {
  // Ensure limit is a positive integer, default to 4 if invalid
  const safeLimit = Math.max(1, Math.floor(limit));

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
      )}

      {!loading && products.length === 0 ? (
        <div className="w-full h-[500px] flex flex-col gap-4 items-center justify-center bg-white rounded-xl">
          <svg
            fill="none"
            height="80"
            viewBox="0 0 80 80"
            width="80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M54.6418 16.6327C65.1906 27.1815 65.1906 44.2792 54.6418 54.828C44.0929 65.3769 26.9953 65.3769 16.4464 54.828C5.89758 44.2792 5.89758 27.1629 16.4464 16.6327C26.9953 6.10245 44.0929 6.08384 54.6418 16.6327Z"
              stroke="#121331"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="14"
              strokeWidth="2.23256"
            ></path>
            <path
              d="M15.2743 27.4419C16.3348 24.8186 17.9162 22.3628 20.0557 20.2419C22.6045 17.693 25.6185 15.9256 28.8185 14.9023"
              stroke="#2339FF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="14"
              strokeWidth="2.23256"
            ></path>
            <path
              d="M55.0883 55.1816L71.4604 71.2747"
              stroke="#121331"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="14"
              strokeWidth="2.60465"
            ></path>
          </svg>
          <p className="font-bold text-2xl text-transparent bg-clip-text animate-gradient bg-gradient-to-r from-blue-900 via-blue-500 to-violet-500">
            Không tìm thấy sản phẩm phù hợp
          </p>
        </div>
      ) : (
        <div
          className={`grid grid-cols-3 gap-3 sm:grid-cols-${
            Math.min(safeLimit, 3)
          } md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-${safeLimit}`}
        >
          {!loading
            ? products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            : Array.from({ length: safeLimit*3 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
              {isFetchingNextPage && (
                Array.from({ length: safeLimit*3 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
              )}
        </div>
      )}
    </div>
  );
}