import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col h-full  w-full  border rounded-xl overflow-hidden bg-white">
      {/* Hình ảnh sản phẩm (aspect-square) */}
      <div className="relative aspect-square mb-4 overflow-hidden">
        <Skeleton className="aspect-square rounded-none rounded-t-md" />
      </div>
      {/* Nội dung */}
      <div className="p-2 space-y-4">
        {/* Tên sản phẩm */}
        <div className="space-y-1">
        <Skeleton className="h-3 w-2/4" />
        <Skeleton className="h-3 w-3/4" />
        </div>
        {/* Giá sản phẩm */}
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
