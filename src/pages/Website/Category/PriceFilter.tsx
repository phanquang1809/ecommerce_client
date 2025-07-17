import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { priceRanges } from "./data";

interface PriceFilterProps {
  selectedPriceRanges: string[];
  onPriceRangeSelect: (priceRange: string) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  selectedPriceRanges,
  onPriceRangeSelect,
}) => {
  return (
    <div className="space-y-2  grid grid-cols-2 gap-2">
      {priceRanges.map((priceRange) => (
        <div key={priceRange.slug} className="flex items-center space-x-2">
          <Checkbox
            id={`price-${priceRange}`}
            checked={selectedPriceRanges.includes(priceRange.name)}
            onCheckedChange={() => onPriceRangeSelect(priceRange.name)}
          />
          <Label
            htmlFor={`price-${priceRange.name}`}
            className="text-sm font-normal cursor-pointer"
            onClick={() => onPriceRangeSelect(priceRange.name)}
          >
            {priceRange.name}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default PriceFilter;
