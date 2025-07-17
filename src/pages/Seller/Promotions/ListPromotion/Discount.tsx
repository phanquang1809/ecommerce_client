import { useEffect, useState } from "react";
import { DateTimePicker } from "@/components/ui/DateTimePicker";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

import { Product } from "@/features/products/types/product.type";
import SimpleProductSelectorDialog from "./SimpleProductSelectorDialog";

export default function Discount() {
  const getNextHourDate = (value: number) => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    now.setHours(now.getHours() + value);
    return now;
  };

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  console.log(selectedProducts);

  const handleSelectProducts = (products: Product[]) => {
    setSelectedProducts(products); // Đồng bộ trực tiếp với danh sách sản phẩm được chọn
  };
  useEffect(() => {
    setStartDate(getNextHourDate(1));
    setEndDate(getNextHourDate(2));
  }, []);

  return (
    <div className="my-5 space-y-5">
      {/* Thông tin cơ bản */}
      <div className="p-5 rounded border">
        <h2 className="text-2xl text-primary mb-5">Thông tin cơ bản</h2>

        <div className="space-y-10 mb-5">
          {/* Tên chương trình */}
          <div className="flex items-center gap-5">
            <label className="min-w-60">Tên chương trình khuyến mãi</label>
            <div className="w-full relative">
              <Input className="w-full max-w-md" />
              <span className="text-sm text-muted-foreground absolute -bottom-5 left-0">
                Tên chương trình khuyến mãi sẽ không hiển thị với người mua.
              </span>
            </div>
          </div>

          {/* Thời gian khuyến mãi */}
          <div className="flex items-center gap-5">
            <label className="min-w-60">Thời gian khuyến mãi</label>
            <div className="w-full relative">
              <div className="flex w-full max-w-md">
                <DateTimePicker
                  value={startDate}
                  onChange={setStartDate}
                  className="w-1/2 rounded-r-none"
                />
                <DateTimePicker
                  value={endDate}
                  onChange={setEndDate}
                  className="w-1/2 rounded-l-none border-l-0"
                />
              </div>
              <span className="text-sm text-muted-foreground absolute -bottom-5 left-0">
                Thời gian của chương trình không được quá 180 ngày
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sản phẩm khuyến mãi */}
      <div className="p-5 rounded border">
        <h2 className="text-2xl text-primary mb-5">Sản phẩm khuyến mãi</h2>
        <p className="text-muted-foreground">
          Thêm sản phẩm vào chương trình khuyến mãi và thiết lập giá khuyến mãi.
        </p>
        {selectedProducts.length > 0 ? (
          <div className="overflow-x-auto my-2 border  border-dashed rounded">
            <table className="min-w-full text-sm">
              <thead className="">
                <tr>
                  <th className="px-4 py-2 text-left border-r border-dashed">
                    Tên sản phẩm
                  </th>
                  <th className="px-4 py-2 text-left border-r border-dashed w-50">
                    Giá
                  </th>
                  <th className="px-4 py-2 text-center w-40">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product) => (
                  <tr key={product.id} className="border-t  border-dashed">
                    <td className="px-4 py-2 border-r border-dashed">
                      {product.name}
                    </td>
                    <td className="px-4 py-2 border-r border-dashed">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.variants?.[0]?.price ?? 0)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        className="text-red-500"
                        onClick={() =>
                          setSelectedProducts((prev) =>
                            prev.filter((p) => p.id !== product.id)
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm my-2 text-red-500">Chưa chọn sản phẩm nào.</p>
        )}
        <SimpleProductSelectorDialog
          selected={selectedProducts}
          onSelect={handleSelectProducts}
        />
      </div>
    </div>
  );
}
