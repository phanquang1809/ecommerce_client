import { useInfiniteShopProducts } from "@/services/seller";
import { useRef, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductList from "@/features/products/components/ProductList";
import { Skeleton } from "@/components/ui/skeleton";
import SortDropdown from "../Category/SortDropdown";
import { cn } from "@/lib/utils";

export const ShopProducts = ({
  categories,
}: {
  categories: { id: number; name: string; slug: string }[];
}) => {
  const { slug } = useParams();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";
  const [sortBy, setSortBy] = useState("newest");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteShopProducts(slug ?? "", sortBy, currentCategory);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const products = data?.pages.flatMap((page) => page.data) || [];
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-1 justify-between">
        <div>
          <h2 className="text-xl font-semibold">Trang chủ cửa hàng</h2>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          {isLoading ? (
            <Skeleton className="h-8 w-[150px]" />
          ) : (
            <SortDropdown
              value={sortBy}
              onSortChange={(value) => {
                setSortBy(value);
              }}
            />
          )}
        </div>
      </div>
      <div className="flex flex-1 gap-4">
        {categories.length > 0 && (
          <div className="w-1/5 p-5 bg-white rounded-md h-fit">
            <h2 className="text-lg font-semibold">Danh mục sản phẩm</h2>
              <ul className="space-y-2 mt-2">
                {categories.map((category) => (
                  <li key={category.id} className="text-md cursor-pointer">
                    <span
                      onClick={() => {
                        const newParams = new URLSearchParams(searchParams);
                        if (newParams.get("category") === category.slug) {
                          newParams.delete("category"); // nếu click lại thì bỏ lọc
                        } else {
                          newParams.set("category", category.slug);
                        }
                        setSearchParams(newParams); // ✅ cập nhật URL
                      }}
                      className={cn("cursor-pointer", {
                        "text-blue-600 font-semibold":
                          currentCategory === category.slug,
                      })}
                    >
                      {category.name}
                    </span>
                  </li>
                ))}
              </ul>
          </div>
        )}
        <div className="flex-1">
          <ProductList
            loading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            products={products}
            title={null}
            limit={5}
          />
          {hasNextPage && <div ref={observerRef} className="h-10 mt-4" />}
        </div>
      </div>
    </div>
  );
};
