import { memo } from "react";
import { Input } from "@/components/ui/input";
import { Variant } from "@/features/products/types/product.type";



interface Props {
  variant: Variant;
  onChange: (sku: string, price: number) => void;
}

const VariantPriceEditor = ({ variant, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(variant.sku, parseInt(e.target.value) || 0);
  };

  return (
    <tr className="border-b">
      <td className="px-4 py-2 flex flex-col gap-1 w-[200px]">
        <span className="text-primary">
          {variant.attributes.map((a) => a.value).join("-")}
        </span>
        <span className="text-xs text-muted-foreground">SKU: {variant.sku}</span>
      </td>
      <td className="px-4 py-2 w-full">
        <Input value={variant.price} onChange={handleChange} />
      </td>
    </tr>
  );
};

export default memo(VariantPriceEditor);
