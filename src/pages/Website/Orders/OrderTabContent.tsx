import { useRef, useEffect } from "react";
import { useOrdersInfinite } from "@/services/website/orderServices";
import { Loader } from "lucide-react";
import { OrderCard } from "./OrderCard";

export default function OrderTabContent({ status }: { status: string }) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useOrdersInfinite(status === "all" ? "" : status);

  const orders = data?.pages.flatMap((page) => page.orders) || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader className="animate-spin mr-2" />
      </div>
    );
  }

  if (isError || orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        Không có đơn hàng nào.
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
      {hasNextPage && <div ref={loaderRef} className="mt-6"></div>}
    </div>
  );
}
