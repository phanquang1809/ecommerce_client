import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MultiGroupCheckboxFilterProps } from "./categorydetails.type";

const MultiGroupCheckboxFilter: React.FC<MultiGroupCheckboxFilterProps> = ({
  groups,
  onSelect,
}) => {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.slug} className="space-y-2">
          <div className="grid grid-cols-2 space-y-2">
            {group.options.map((option) => (
              <div key={option.slug} className="flex items-center space-x-2 " onClick={() => onSelect(group.slug, option.slug)}>
                <Checkbox
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  id={`filter-${group.slug}-${option.slug}`}
                  checked={group.selectedValues.includes(option.slug)}
                />
                <Label
                  htmlFor={`filter-${group.slug}-${option.slug}`}
                  className="text-sm  cursor-pointer"
                  onClick={() => onSelect(group.slug, option.slug)}
                >
                  {option.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiGroupCheckboxFilter;
