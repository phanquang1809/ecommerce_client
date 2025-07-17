import { useEffect, useMemo, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useProductList } from "@/services/seller/productServices";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/features/products/types/product.type";
import { Input } from "@/components/ui/input"; // dùng input của shadcn
import { debounce } from "lodash";

export default function SimpleProductSelectorDialog({
  selected,
  onSelect,
}: {
  selected: Product[];
  onSelect: (products: Product[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debounceSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value);
    }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceSearch(e.target.value);
  };

  const { data, isLoading } = useProductList({
    page: 1,
    limit: 100,
    search: debouncedSearch,
  });

  const products = useMemo(() => data?.data ?? [], [data]);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    if (open) {
      setSearch("");
      setSelectedIds(selected.map((p) => p.id));
    }
  }, [open, selected]);

  const toggleSelect = (product: Product) => {
    setSelectedIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const allIds = useMemo(() => products.map((p) => p.id), [products]);
  const isAllSelected =
    selectedIds.length === allIds.length && allIds.length > 0;

  const toggleSelectAll = () => {
    setSelectedIds(isAllSelected ? [] : allIds);
  };

  const handleConfirm = () => {
    const selectedProducts = products.filter((p) =>
      selectedIds.includes(p.id)
    );
    onSelect(selectedProducts);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Thêm sản phẩm</Button>
      </DialogTrigger>
      <DialogContent className="!max-w-5xl">
        <DialogHeader>
          <DialogTitle>Chọn sản phẩm</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={handleSearchChange}
            className="w-60"
          />
        </div>

        {isLoading ? (
          <div>Đang tải...</div>
        ) : (
          <div className="max-h-[400px] overflow-auto rounded">
            <table className="min-w-full text-sm border border-dashed">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-center border-r border-dashed">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-2 text-left border-r border-dashed">
                    Tên sản phẩm
                  </th>
                  <th className="px-4 py-2 text-left">Giá bán</th>
                </tr>
              </thead>
              <tbody>
                {products && products.length>0 ?products.map((product) => (
                  <tr key={product.id} className="border-t border-dashed">
                    <td className="px-4 py-2 border-r border-dashed text-center">
                      <Checkbox
                        checked={selectedIds.includes(product.id)}
                        onCheckedChange={() => toggleSelect(product)}
                      />
                    </td>
                    <td className="px-4 py-2 border-r border-dashed">
                      {product.name}
                    </td>
                    <td className="px-4 py-2 ">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.variants?.[0]?.price ?? 0)}
                    </td>
                  </tr>
                )):
                <tr>
                  <td colSpan={3} className="text-center border-t border-dashed h-30 font-semibold text-lg">Không tìm thấy sản phẩm</td>
                </tr>
                }
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-end mt-4">
          <Button onClick={handleConfirm}>Xác nhận</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
