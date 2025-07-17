import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { needs } from "./data";

interface NeedsFilterProps {
  selectedNeeds: string[];
  onNeedSelect: (need: string) => void;
}

const NeedsFilter: React.FC<NeedsFilterProps> = ({
  selectedNeeds,
  onNeedSelect,
}) => {
  return (
    <div className="space-y-2 grid grid-cols-2 gap-2">
      {needs.map((need) => (
        <div key={need.slug} className="flex items-center space-x-2">
          <Checkbox
            id={`need-${need}`}
            checked={selectedNeeds.includes(need.name)}
            onCheckedChange={() => onNeedSelect(need.name)}
          />
          <Label
            htmlFor={`need-${need.name}`}
            className="text-sm font-normal cursor-pointer"
            onClick={() => onNeedSelect(need.name)}
          >
            {need.name}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default NeedsFilter;