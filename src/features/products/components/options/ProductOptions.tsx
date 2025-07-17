import { Input } from "@/components/ui/input";
import { Trash2, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Option } from "@/features/products/types/product.type";
type Attribute = {
  id: number;
  name: string;
  slug: string;
};
type ProductOptionsProps = {
  options: Option[];
  attributes: Attribute[];
  onChange: (options: Option[]) => void;
};

export default function ProductOptions({
  options,
  attributes,
  onChange,
}: ProductOptionsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    const updated = options.map((opt) => {
      const lastValue = opt.values[opt.values.length - 1];
      // Nếu chưa có ô rỗng ở cuối thì thêm
      if (lastValue?.trim() !== "") {
        return { ...opt, values: [...opt.values, ""] };
      }
      return opt;
    });

    // Chỉ gọi onChange nếu có sự thay đổi thực sự
    const hasChanged = JSON.stringify(options) !== JSON.stringify(updated);
    if (hasChanged) {
      onChange(updated);
    }
  }, [options, onChange]);
  const handleChangeOption = (index: number, slug: string) => {
    const selectedAttr = attributes.find((attr) => attr.slug === slug);
    if (!selectedAttr) return;
    const updatedOptions = [...options];
    updatedOptions[index] = {
      ...updatedOptions[index],
      id: selectedAttr.id,
      name: selectedAttr.name,
      slug: selectedAttr.slug,
    };
    onChange(updatedOptions);
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    onChange(updatedOptions);
  };

  const handleChangeValue = (
    optIndex: number,
    valueIndex: number,
    newValue: string
  ) => {
    const updatedOptions = [...options];
    updatedOptions[optIndex].values[valueIndex] = newValue;
    const trimmedValue = newValue.trim().toLowerCase();
    const values = updatedOptions[optIndex].values.map((v) =>
      v.trim().toLowerCase()
    );
    const errorMap: Record<string, string> = {};
    if (trimmedValue === "") {
      errorMap[optIndex + "-" + valueIndex] = "Không được để trống";
    }

    values.forEach((val, idx) => {
      const key = `${optIndex}-${idx}`;
      if (val !== "" && values.filter((v) => v === val).length > 1) {
        errorMap[key] = "Giá trị bị trùng";
      }
    });

    setErrors(errorMap);

    // Nếu là ô cuối và có giá trị hợp lệ thì tạo ô mới
    const isLast = valueIndex === updatedOptions[optIndex].values.length - 1;
    if (isLast && newValue.trim() !== "") {
      updatedOptions[optIndex].values.push("");
    }

    onChange(updatedOptions);
  };

  const handleRemoveValue = (optIndex: number, valueIndex: number) => {
    const updatedOptions = [...options];
    updatedOptions[optIndex].values.splice(valueIndex, 1);

    const key = `${optIndex}-${valueIndex}`;
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });

    if (updatedOptions[optIndex].values.length === 0) {
      updatedOptions[optIndex].values.push("");
    }
    onChange(updatedOptions);
  };

  return (
    <div className="space-y-4">
      {options.map((option, optIndex) => (
        <div key={optIndex} className="border p-4 rounded-md border-dashed">
          <div className="flex items-center justify-between mb-2">
            <Select
              value={option.slug}
              onValueChange={(value) => handleChangeOption(optIndex, value)}
            >
              <SelectTrigger className="p-2 border rounded-md min-w-40">
                <SelectValue placeholder="Chọn thuộc tính" />
              </SelectTrigger>
              <SelectContent className="max-h-40">
                {attributes.map((attr) => {
                  const isAlreadySelected = options.some(
                    (option) => option.slug === attr.slug
                  );
                  return (
                    <SelectItem
                      key={attr.id}
                      value={attr.slug}
                      disabled={isAlreadySelected}
                    >
                      {attr.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <X
              className="size-4 text-destructive cursor-pointer"
              onClick={() => handleRemoveOption(optIndex)}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {option.values.map((value, valueIndex) => {
              const key = `${optIndex}-${valueIndex}`;
              const error = errors[key];
              return (
                <div key={valueIndex} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Input
                      className={error ? "!ring-0 border-red-500" : ""}
                      value={value}
                      placeholder="Nhập giá trị"
                      onChange={(e) =>
                        handleChangeValue(optIndex, valueIndex, e.target.value)
                      }
                    />
                    <Trash2
                      className="size-4 cursor-pointer text-muted-foreground"
                      onClick={() => handleRemoveValue(optIndex, valueIndex)}
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-500 ml-1">{error}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
