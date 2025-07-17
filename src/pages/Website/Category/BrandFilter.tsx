import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { brands } from "./data";

interface BrandFilterProps {
  selectedBrands: string[];
  onBrandSelect: (brand: string) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({
  selectedBrands,
  onBrandSelect,
}) => {
  return (
    <div className="space-y-2 grid grid-cols-2 gap-2">
      {brands.map((brand) => (
        <div key={brand.slug} className="flex items-center space-x-2">
          <Checkbox
            id={`brand-${brand}`}
            checked={selectedBrands.includes(brand.name)}
            onCheckedChange={() => onBrandSelect(brand.name)}
          />
          <Label
            htmlFor={`brand-${brand.name}`}
            className="text-sm font-normal cursor-pointer"
            onClick={() => onBrandSelect(brand.name)}
          >
            {brand.name}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default BrandFilter;