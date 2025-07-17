import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductDetails } from "@/pages/Website/ProductDetails/productdetails.type";
import { formatCurrency } from "@/utils/format";
import { Circle, CircleCheckBig } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Ratings } from "@/components/Ratings";
import { Badge } from "@/components/ui/badge";

interface ProductInfoProps {
  product: ProductDetails;
  onChangeVariant: (index: number) => void;
}

export default function ProductInfo({
  product,
  onChangeVariant,
}: ProductInfoProps) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string>
  >({});
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  // Gán giá trị mặc định theo biến thể đầu tiên
  useEffect(() => {
    const skuFromUrl = searchParams.get("sku");
    if (skuFromUrl && product?.variants?.length > 0) {
      const matchIndex = product.variants.findIndex(
        (v) => v.sku === skuFromUrl
      );
      if (matchIndex !== -1) {
        setSelectedVariantIndex(matchIndex);
        const matchedVariant =
          product.variants[matchIndex].stock > 0
            ? product.variants[matchIndex]
            : product.variants.find((v) => v.stock > 0) || product.variants[0];
        const matchedOptions: Record<number, string> = {};
        matchedVariant.attributes.forEach((attr) => {
          matchedOptions[attr.id] = attr.value;
        });
        setSelectedOptions(matchedOptions);
        return;
      }
    }

    // Nếu không có sku hoặc không tìm thấy thì lấy biến thể đầu tiên
    if (product?.variants?.length > 0) {
      const initialVariant =
        product.variants.find((v) => v.stock > 0) || product.variants[0];
      const initialOptions: Record<number, string> = {};
      initialVariant.attributes.forEach((attr) => {
        initialOptions[attr.id] = attr.value;
      });
      setSelectedOptions(initialOptions);
      setSelectedVariantIndex(0);
    }
  }, [product, searchParams]);

  // Tìm variant khớp với option đã chọn
  useEffect(() => {
    if (!product) return;
    const matchIndex = product.variants.findIndex((variant) =>
      variant.attributes.every(
        (attr) => selectedOptions[attr.id] === attr.value
      )
    );
    if (matchIndex !== -1) {
      setSelectedVariantIndex(matchIndex);
      onChangeVariant(selectedVariantIndex);
    }
  }, [selectedOptions, product, selectedVariantIndex, onChangeVariant]);

  const handleOptionClick = (optionId: number, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }));
  };

  const currentVariant = product?.variants[selectedVariantIndex];

  useEffect(() => {
    if (currentVariant?.sku) {
      // Cập nhật query param `sku`
      searchParams.set("sku", currentVariant.sku);
      setSearchParams(searchParams, { replace: true }); // replace = true để không thêm lịch sử
    }
  }, [currentVariant, searchParams, setSearchParams]);
  const discountPercent = useMemo(() => {
    const { price, discountPrice } = currentVariant || {};
    if (!price || !discountPrice || price <= 0) return 0;

    const rawDiscount = ((price - discountPrice) / price) * 100;

    return parseFloat(rawDiscount.toFixed(1)); // Giữ 1 số thập phân
  }, [currentVariant]);

  return (
    <div className="w-full flex flex-col gap-5 bg-white p-5 rounded-md">
      <div>
       {product.brand &&  <div className="flex items-center gap-1  mb-2">
        <p className="text-sm ">Thương hiệu: </p>
        <p className="text-sm text-blue-600 ">{product?.brand}</p>
        </div>}
        <h2 className="text-xl font-semibold mb-2">{product?.name}</h2>
        {/* Đánh giá */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="">4.5</span>
            <Ratings rating={4.5} size={18} variant="yellow" />
          </div>
          <div className="flex items-center gap-1">(12 Đánh giá)</div>-
          <span>Đã bán 40</span>
        </div>
      </div>
      <div className="text-blue-600 rounded flex items-end">
        <span className="text-2xl font-semibold ">
          {formatCurrency(
            currentVariant?.discountPrice ?? currentVariant?.price ?? 0
          )}
        </span>
        {currentVariant?.discountPrice && (
          <div>
            <Badge
              className="ml-2 bg-gray-50 rounded text-black border-none"
              variant="default"
            >
              -{discountPercent}%
            </Badge>
            <span className="text-md ml-2  line-through">
              {formatCurrency(currentVariant?.price ?? 0)}
            </span>
          </div>
        )}
      </div>
      {/* Hiển thị từng nhóm thuộc tính (option) */}
      {product?.options?.map((option) => (
        <div key={option.id} className="flex flex-col gap-2">
          <p className="text-md font-semibold">{option.name}</p>
          <div className="flex gap-2 flex-wrap">
            {option.values.map((value, index) => {
              const isActive = selectedOptions[option.id] === value;
              const selectedEntries = Object.entries(selectedOptions).filter(
                ([key]) => key !== option.id.toString() // bỏ qua option hiện tại để xét tổ hợp trước đó
              );

              const matchedVariant = product?.variants?.find((variant) => {
                // Kiểm tra xem biến thể có đầy đủ option đang chọn + option hiện tại không
                const hasAllSelected = selectedEntries.every(([optId, val]) =>
                  variant.attributes.some(
                    (o) => o.id.toString() === optId && o.value === val
                  )
                );
                const hasThisOption = variant.attributes.some(
                  (o) => o.id === option.id && o.value === value
                );
                return hasAllSelected && hasThisOption && variant.stock > 0;
              });

              const isDisabled = !matchedVariant;
              const isColor = option.slug === "mau-sac";
              return (
                <Button
                  key={index}
                  variant="outline"
                  disabled={isDisabled}
                  onClick={() => handleOptionClick(option.id, value)}
                  className={cn(
                    "rounded !bg-white !shadow-none flex items-center gap-1",
                    isActive && "!text-blue-600 border-blue-600"
                  )}
                >
                  {/* Nếu có ảnh thì hiển thị ảnh + tên */}
                  {isColor &&matchedVariant?.image ? (
                    <>
                      <img
                        src={matchedVariant.image}
                        alt={value}
                        className="w-4 h-4 object-cover"
                      />
                      <span>{value}</span>
                    </>
                  ) : (
                    <>
                      {/* Nếu không có ảnh thì hiển thị icon + tên */}
                      {isActive ? (
                        <CircleCheckBig className="w-4 h-4" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                      <span>{value}</span>
                    </>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
