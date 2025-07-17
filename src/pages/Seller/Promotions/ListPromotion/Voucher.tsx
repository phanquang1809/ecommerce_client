import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/DateTimePicker";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Product } from "@/features/products/types/product.type";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SimpleProductSelectorDialog from "./SimpleProductSelectorDialog";
import { createPromotion } from "@/services/promotionService";

export default function Voucher() {
  const getNextHourDate = (value: number) => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    now.setHours(now.getHours() + value);
    return now;
  };

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState<"percent" | "amount">("percent");
  const [scope, setScope] = useState<"shop" | "specific">("shop");
  const [discountValue, setDiscountValue] = useState("5");
  const [maxDiscount, setMaxDiscount] = useState("100000");
  const [minOrderValue, setMinOrderValue] = useState("50000");
  const [usageLimit, setUsageLimit] = useState("10");
  const [usageLimitPerUser, setUsageLimitPerUser] = useState("1");
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSelectProducts = (products: Product[]) => {
    setErrors((prev) => ({ ...prev, scope: "" }));
    setSelectedProducts(products); 
  };

  useEffect(() => {
    setStartDate(getNextHourDate(1));
    setEndDate(getNextHourDate(2));
  }, []);

  const validateField = (
  field: string,
  value: string,
  context?: { discountType?: string }
): string => {
  const number = Number(value);
  const isInvalidNumber = isNaN(number);

  switch (field) {
    case "code":
      return value.trim() ? "" : "Mã khuyến mãi không được để trống";

    case "name":
      return value.trim() ? "" : "Tên chương trình không được để trống";

    case "discountValue":
      if (context?.discountType === "percent" && (number < 1 || number > 99)) {
        return "Giá trị phần trăm phải từ 1 đến 99";
      }
      return "";

    case "maxDiscount":
      if (isInvalidNumber) {
        return "Không được bỏ trống";
      }
      if (number > 100_000_000) {
        return "Không vượt quá 100 triệu";
      }
      return "";

    case "minOrderValue":
      return isInvalidNumber || number < 0
        ? "Không được bỏ trống"
        : "";

    case "usageLimit":
      return isInvalidNumber || number < 1
        ? "Lượt sử dụng phải lớn hơn 1"
        : "";
    case "usageLimitPerUser":
      if (isInvalidNumber || number < 1) {
        return "Lượt sử dụng tối đa mỗi khách hàng phải lớn hơn 1";
      }
      if (number > 5) {
        return "Lượt sử dụng tối đa mỗi khách hàng không được vượt quá 5";
      }
      return "";
    default:
      return "";
  }
};
  const handleInputChange = (
    field: string,
    value: string,
    setter: (val: string) => void
  ) => {
    const numericFields = [
    "discountValue",
    "maxDiscount",
    "minOrderValue",
    "usageLimit",
    "usageLimitPerUser",
  ];

  if (numericFields.includes(field)) {
    // Nếu là số âm hoặc chữ thì chặn
    if (!/^\d*$/.test(value)) return;
  }
    setter(value);
    const error = validateField(field, value, { discountType });

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) newErrors[field] = error;
      else delete newErrors[field];
      return newErrors;
    });
  };
  const handleSubmit = async() => {
    const payload = {
      id: Date.now(),
      name,
      code,
      description,
      discount_type: discountType,
      scope,
      products: scope === "specific" ? selectedProducts.map((p) => p.id) : [],
      discount_value: Number(discountValue),
      max_discount: Number(maxDiscount),
      min_order_value: Number(minOrderValue),
      usage_limit: Number(usageLimit),
      usage_limit_per_user: Number(usageLimitPerUser),
      start_date: startDate?.toISOString(),
      end_date: endDate?.toISOString(),
      is_active: isActive,
    };
    const respone = await createPromotion(payload);
    if(respone.status === "success") {
        console.log("Dữ liệu gửi về backend:", respone.data);
    }
  };
  return (
    <div className="my-5 space-y-5">
      <h2 className="text-2xl font-bold">Thêm mã khuyến mãi</h2>
      <div className="flex w-full gap-5">
        <div className="flex-1 space-y-5">
          <div className="p-5 rounded border">
            <h2 className="text-2xl text-primary mb-5">Thông tin cơ bản</h2>
            <div className="space-y-10 mb-5">
              <div className="space-y-3">
                <Label>Mã khuyến mãi</Label>
                <Input
                  className="w-80 uppercase"
                  value={code}
                  onChange={(e) =>
                    handleInputChange(
                      "code",
                      e.target.value.toUpperCase(),
                      setCode
                    )
                  }
                  placeholder="GIAMGIA5%"
                />
                {errors.code && (
                  <p className="text-sm text-red-500">{errors.code}</p>
                )}
                <Label>Tên chương trình khuyến mãi</Label>
                <Input
                  className="w-80"
                  value={name}
                  placeholder="Giảm giá 5%"
                  onChange={(e) =>
                    handleInputChange("name", e.target.value, setName)
                  }
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
                <Label>Mô tả chương trình</Label>
                <Textarea
                  placeholder="Chương trình giảm giá 5% cho toàn bộ sản phẩm trong cửa hàng"
                  value={description}
                  onChange={(e) =>
                    handleInputChange(
                      "description",
                      e.target.value,
                      setDescription
                    )
                  }
                />
              </div>
            </div>
          </div>

          <div className="p-5 rounded border space-y-5">
            <h2 className="text-2xl text-primary mb-5">Cài đặt khuyến mãi</h2>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-3">
                <Label>Loại khuyến mãi</Label>
                <Select value={discountType} onValueChange={(e:"amount" | "percent")=> setDiscountType(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn loại khuyến mãi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amount">
                      Giảm theo số tiền (VND)
                    </SelectItem>
                    <SelectItem value="percent">
                      Giảm theo phần trăm (%)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label>Phạm vi áp dụng</Label>
                <Select value={scope} onValueChange={(e:"shop" | "specific")=> setScope(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn phạm vi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shop">Toàn bộ sản phẩm</SelectItem>
                    <SelectItem value="specific">Sản phẩm cụ thể</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Áp dụng cho</p>
              {scope === "specific" ? (
                <>
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
                            <th className="px-4 py-2 text-center w-40">
                              Hành động
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedProducts.map((product) => (
                            <tr
                              key={product.id}
                              className="border-t  border-dashed"
                            >
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
                    <p className="text-sm my-2 text-red-500">
                      Chưa chọn sản phẩm nào.
                    </p>
                  )}

                  {errors.selectedProducts && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.selectedProducts}
                    </p>
                  )}
                  <SimpleProductSelectorDialog
                    selected={selectedProducts}
                    onSelect={handleSelectProducts}
                  />
                </>
              ) : (
                <span className="text-muted-foreground text-sm">
                  Toàn bộ sản phẩm
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-3">
                <Label>
                  Giá trị ({discountType === "percent" ? "%" : "VND"})
                </Label>
                <Input
                  value={discountValue}
                  onChange={(e) =>
                    handleInputChange(
                      "discountValue",
                      e.target.value,
                      setDiscountValue
                    )
                  }
                />
                {errors.discountValue && (
                  <p className="text-sm text-red-500">{errors.discountValue}</p>
                )}
              </div>
              <div className="space-y-3">
                <Label>Giảm tối đa (VND)</Label>
                <Input
                  value={maxDiscount}
                  onChange={(e) =>
                    handleInputChange(
                      "maxDiscount",
                      e.target.value,
                      setMaxDiscount
                    )
                  }
                />
                {errors.maxDiscount && (
                  <p className="text-sm text-red-500">{errors.maxDiscount}</p>
                )}
              </div>
            </div>
          </div>

          <div className="p-5 rounded border">
            <h2 className="text-2xl text-primary mb-5">
              Điều kiện & số lượng sử dụng
            </h2>
            <div className="grid grid-cols-3 gap-5">
              <div className="space-y-3">
                <Label>Giá trị đơn hàng tối thiểu (VND)</Label>
                <Input
                  value={minOrderValue}
                  onChange={(e) =>
                    handleInputChange(
                      "minOrderValue",
                      e.target.value,
                      setMinOrderValue
                    )
                  }
                />
                {errors.minOrderValue && (
                  <p className="text-sm text-red-500">{errors.minOrderValue}</p>
                )}
              </div>
              <div className="space-y-3">
                <Label>Lượt sử dụng</Label>
                <Input
                  value={usageLimit}
                  onChange={(e) =>
                    handleInputChange(
                      "usageLimit",
                      e.target.value,
                      setUsageLimit
                    )
                  }
                />
                {errors.usageLimit && (
                  <p className="text-sm text-red-500">{errors.usageLimit}</p>
                )}
              </div>
              <div className="space-y-3">
                <Label>Lượt sử dụng tối đa/Khách hàng</Label>
                <Input
                  value={usageLimitPerUser}
                  onChange={(e) =>
                    handleInputChange(
                      "usageLimitPerUser",
                      e.target.value,
                      setUsageLimitPerUser
                    )
                  }
                />
                {errors.usageLimitPerUser && (
                  <p className="text-sm text-red-500">
                    {errors.usageLimitPerUser}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-65 space-y-5 flex flex-col items-end">
          <div className="w-full h-fit p-5 border rounded-md space-y-5">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">Hoạt động</h2>
              <Switch checked={isActive} onCheckedChange={setIsActive} />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Ngày bắt đầu</div>
              <DateTimePicker
                value={startDate}
                onChange={setStartDate}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Ngày kết thúc</div>
              <DateTimePicker
                value={endDate}
                onChange={setEndDate}
                className="w-full"
              />
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date}</p>
              )}
            </div>
          </div>
          <Button
            variant="default"
            className="!bg-blue-600 !text-white"
            onClick={handleSubmit}
            disabled={Object.keys(errors).length > 0 && (scope==="specific"?selectedProducts.length===0:false)}
          >
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
}
