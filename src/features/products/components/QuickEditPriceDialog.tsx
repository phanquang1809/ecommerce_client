import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadingCircle from "@/components/ui/loading-circle";
import { Product } from "@/features/products/types/product.type";
import VariantPriceEditor from "./VariantPriceEditor";

interface QuickEditPriceDialogProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  product: Product | null;
  onPriceChange: (sku: string, price: number) => void;
  allPrices: number;
  setAllPrices: (price: number) => void;
  onApplyAllPrices: () => void;
  onSubmit: () => void;
}

export default function QuickEditPriceDialog({
  open,
  onClose,
  loading,
  product,
  onPriceChange,
  allPrices,
  setAllPrices,
  onApplyAllPrices,
  onSubmit,
}: QuickEditPriceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-2">
            <h1>Cập nhật giá</h1>
          </DialogTitle>
        </DialogHeader>
        {!loading && product ? (
          <>
            <DialogDescription>
              <h2 className="text-sm">{product.name}</h2>
              {product.type === "variants" ? (
                <div className="space-y-2 mt-2">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Chỉnh sửa hàng loạt
                    </span>
                    <div className="flex items-center gap-2">
                      <Input
                        value={allPrices}
                        onChange={(e) =>
                          setAllPrices(parseInt(e.target.value) || 0)
                        }
                      />
                      <Button
                        variant="outline"
                        className="!text-xs !px-2 !py-1 !rounded-md !border-gray-300 dark:!border-gray-600"
                        onClick={onApplyAllPrices}
                      >
                        Áp dụng cho tất cả
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border overflow-hidden">
                    <table className="w-full table-fixed">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-2 text-left w-[200px]">
                            Phân loại hàng
                          </th>
                          <th className="px-4 py-2 text-left w-full">Giá</th>
                        </tr>
                      </thead>
                    </table>
                    <ScrollArea className="h-71">
                      <table className="w-full">
                        <tbody>
                          {product.variants.map((variant) => (
                            <VariantPriceEditor
                              key={variant.sku}
                              variant={variant}
                              onChange={onPriceChange}
                            />
                          ))}
                        </tbody>
                      </table>
                    </ScrollArea>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-2">
                  <span>Giá</span>
                  <Input value={product.variants[0].price} />
                </div>
              )}
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Hủy</Button>
              </DialogClose>
              <Button
                className="bg-blue-600 hover:bg-blue-500 !text-white"
                onClick={onSubmit}
              >
                Cập nhật giá
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="flex items-center justify-center h-20">
            <LoadingCircle />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
