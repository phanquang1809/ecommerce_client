import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Attribute,
  Option,
  Variant,
} from "@/features/products/types/product.type";
import { useEffect, useMemo, useState } from "react";

type VariantTableProps = {
  options: Option[];
  toggleVariantWeight?: boolean;
  initVariants: Variant[];
  onVariantsChange: (
    variants: Variant[],
    errors: Record<number, { price?: string; stock?: string; weight?: string }>
  ) => void;
};

export default function VariantsTable({
  options,
  initVariants,
  toggleVariantWeight,
  onVariantsChange,
}: VariantTableProps) {
  const [variants, setVariants] = useState<Variant[]>(initVariants || []);
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>(
    {}
  );
  const [priceAll, setPriceAll] = useState(0);
  const [stockAll, setStockAll] = useState(0);
  const [skuAll, setSkuAll] = useState("");
  const [errors, setErrors] = useState<
    Record<number, { price?: string; stock?: string; weight?: string }>
  >({});

  const handleImageUpload = (imageUrl: string | null, groupKey: string) => {
    setImagePreviews((prev) => ({
      ...prev,
      [groupKey]: imageUrl || "",
    }));

    setVariants((prevVariants) => {
      const updatedVariants = prevVariants.map((variant, idx) => {
        if (combinations[idx][0]?.value === groupKey) {
          return { ...variant, image: imageUrl || "" };
        }
        return variant;
      });
      onVariantsChange(updatedVariants, errors);
      return updatedVariants;
    });
  };

  const createCombinations = (options: Option[]): Attribute[][] => {
    const allCombinations: Attribute[][] = [];
    const valuesArrays = options.map((option) =>
      option.values.filter((value) => value !== "")
    );

    const generateCombinations = (
      currentCombination: Attribute[],
      level: number
    ) => {
      if (level === options.length) {
        allCombinations.push([...currentCombination]);
        return;
      }
      for (let i = 0; i < valuesArrays[level].length; i++) {
        const attribute: Attribute = {
          id: options[level].id,
          value: valuesArrays[level][i],
          color_code: "",
        };
        generateCombinations([...currentCombination, attribute], level + 1);
      }
    };

    generateCombinations([], 0);
    return allCombinations;
  };
  const combinations = useMemo(() => createCombinations(options), [options]);
  useEffect(() => {
  const previews: Record<string, string> = {};

  combinations.forEach((combination) => {
    const variant = initVariants.find((v) =>
      attributesEqual(v.attributes, combination)
    );
    if (variant?.image) {
      const groupKey = combination[0]?.value ?? "";
      if (!previews[groupKey]) {
        previews[groupKey] = variant.image;
      }
    }
  });

  setImagePreviews(previews);
}, [combinations, initVariants]);
  useEffect(() => {
    const newVariants = combinations.map((combination) => {
      const existingVariant = variants.find((variant) =>
        attributesEqual(variant.attributes, combination)
      );
      return (
        existingVariant || {
          attributes: combination,
          price: 0,
          stock: 0,
          sku: "",
          weight: 0,
        }
      );
    });
    setVariants(newVariants);
    setErrors({});
    onVariantsChange(newVariants, {});
  }, [combinations]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    combinationIndex: number,
    field: keyof Variant
  ) => {
    const value = e.target.value;
    if (["price", "stock", "weight"].includes(field)) {
      if (!/^\d*$/.test(value)) {
        return; // Không làm gì nếu không phải số nguyên
      }
    }
    const updatedVariants = [...variants];
    updatedVariants[combinationIndex] = {
      ...updatedVariants[combinationIndex],
      [field]: value,
    };

    const newErrors = { ...errors };
    if (!newErrors[combinationIndex]) {
      newErrors[combinationIndex] = {};
    }

    if (field === "price") {
      if (!value) {
        newErrors[combinationIndex].price = "Giá không được để trống";
      } else if (Number(value) < 1000) {
        newErrors[combinationIndex].price = "Giá tối thiểu là 1.000đ";
      } else {
        delete newErrors[combinationIndex].price;
      }
    } else if (field === "weight") {
      if (!value) {
        newErrors[combinationIndex].weight = "Cân nặng không được để trống";
      } else if (Number(value) <= 0) {
        newErrors[combinationIndex].weight = "Cân nặng phải từ 1g trở lên";
      } else {
        delete newErrors[combinationIndex].weight;
      }
    }
    if (Object.keys(newErrors[combinationIndex]).length === 0) {
      delete newErrors[combinationIndex];
    }

    setErrors(newErrors);
    setVariants(updatedVariants);
    onVariantsChange(updatedVariants, newErrors);
  };

  const attributesEqual = (a: Attribute[], b: Attribute[]) => {
    if (a.length !== b.length) return false;
    return a.every((attrA) => {
      const match = b.find(
        (attrB) => attrB.id === attrA.id && attrB.value === attrA.value
      );
      return !!match;
    });
  };

  const applyToAllVariants = () => {
    const updatedVariants = variants.map((variant) => ({
      ...variant,
      price: priceAll,
      stock: stockAll,
      sku: skuAll,
    }));

    const newErrors: Record<
      number,
      { price?: string; stock?: string; sku?: string }
    > = {};
    updatedVariants.forEach((variant, index) => {
      if (!variant.price) {
        newErrors[index] = {
          ...newErrors[index],
          price: "Giá không được để trống",
        };
      }
    });
    setErrors(newErrors);
    setVariants(updatedVariants);
    onVariantsChange(updatedVariants, newErrors);
  };

  return (
    <div>
      <h3 className="font-bold mb-3">Danh sách phân loại</h3>
      <div className="flex items-center gap-5 mb-5">
        <div className="flex-1 grid grid-cols-3">
          <Input
            value={priceAll}
            placeholder="Giá"
            className="rounded-r-none"
            onChange={(e) => setPriceAll(Number(e.target.value))}
          />
          <Input
            value={stockAll}
            placeholder="Kho hàng"
            className="rounded-l-none rounded-r-none"
            onChange={(e) => setStockAll(Number(e.target.value))}
          />
          <Input
            value={skuAll}
            placeholder="SKU phân loại"
            className="rounded-l-none"
            onChange={(e) => setSkuAll(e.target.value)}
          />
        </div>
        <Button
          variant="secondary"
          size="sm"
          disabled={variants.length === 0}
          onClick={applyToAllVariants}
        >
          Áp dụng cho tất cả phân loại
        </Button>
      </div>
      {variants.length > 0 &&
        options.some((option) => option.values.some((value) => value !== "")) &&
        options.some((option) => option.name !== "") && (
          <div className="rounded-md overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr>
                  {options.map((option, index) => (
                    <th
                      key={index}
                      className="border border-dashed px-4 py-2 align-top"
                    >
                      {option.name}
                    </th>
                  ))}
                  <th className="border border-dashed px-4 py-2 align-top">
                    Giá
                  </th>
                  <th className="border border-dashed px-4 py-2 align-top">
                    Tồn kho
                  </th>
                  {toggleVariantWeight && (
                    <th className="border border-dashed px-4 py-2 align-top">
                      Cân nặng - gram (Sau khi đóng gói)
                    </th>
                  )}
                  <th className="border border-dashed px-4 py-2 align-top">
                    SKU
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(
                  combinations.reduce((acc, combination, index) => {
                    const key = combination[0]?.value ?? "";
                    if (!acc[key]) acc[key] = [];
                    acc[key].push(index);
                    return acc;
                  }, {} as Record<string, number[]>)
                ).flatMap(([groupKey, indexes]) =>
                  indexes.map((index, i) => (
                    <tr key={index}>
                      {i === 0 ? (
                        <td
                          rowSpan={indexes.length}
                          className="border border-dashed px-4 py-2 align-top text-center"
                        >
                          {combinations[index][0]?.value}
                          <div className="flex items-center justify-center pt-2">
                          <div className="w-20 h-20 flex items-center justify-center">
                            <ImageUpload
                              defaultImage={imagePreviews[groupKey] || ""}
                              onImageUpload={(url) =>
                                handleImageUpload(url, groupKey)
                              }
                            />
                          </div>
                          </div>
                        </td>
                      ) : null}
                      {combinations[index]
                        .slice(1)
                        .map((attribute, valueIndex) => (
                          <td
                            key={valueIndex}
                            className="border border-dashed px-4 py-2 align-top text-center"
                          >
                            {attribute.value}
                          </td>
                        ))}
                      <td className="border border-dashed px-4 py-2 align-top">
                        <Input
                          type="text"
                          placeholder="Nhập giá"
                          value={variants[index]?.price.toString() || ""}
                          onChange={(e) => handleChange(e, index, "price")}
                          className={
                            errors[index]?.price ? "border-red-500 !ring-0" : ""
                          }
                        />
                        {errors[index]?.price && (
                          <span className="text-red-500 text-xs block mt-1">
                            {errors[index].price}
                          </span>
                        )}
                      </td>
                      <td className="border border-dashed px-4 py-2 align-top">
                        <Input
                          type="text"
                          placeholder="Nhập tồn kho"
                          value={variants[index]?.stock.toString() || ""}
                          onChange={(e) => handleChange(e, index, "stock")}
                          className={
                            errors[index]?.stock ? "border-red-500 !ring-0" : ""
                          }
                        />
                        {errors[index]?.stock && (
                          <span className="text-red-500 text-xs block mt-1">
                            {errors[index].stock}
                          </span>
                        )}
                      </td>
                      {toggleVariantWeight && (
                        <td className="border border-dashed px-4 py-2 align-top">
                          <Input
                            type="text"
                            placeholder="Nhập cân nặng"
                            value={variants[index]?.weight.toString() || ""}
                            onChange={(e) => handleChange(e, index, "weight")}
                            className={
                              errors[index]?.weight
                                ? "border-red-500 !ring-0"
                                : ""
                            }
                          />
                          {errors[index]?.weight && (
                            <span className="text-red-500 text-xs block mt-1">
                              {errors[index].weight}
                            </span>
                          )}
                        </td>
                      )}
                      <td className="border border-dashed px-4 py-2 align-top">
                        <Input
                          type="text"
                          placeholder="Nhập SKU"
                          value={variants[index]?.sku || ""}
                          onChange={(e) => handleChange(e, index, "sku")}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
}
