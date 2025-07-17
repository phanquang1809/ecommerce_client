import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortOptions } from "./data";

interface SortDropdownProps {
  onSortChange: (value: string) => void;
  value: string;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange, value }) => {
  return (
    <Select onValueChange={onSortChange} value={value}>
      <SelectTrigger className="w-[150px] focus:!ring-0 bg-white !border-none">
        <SelectValue placeholder="Sắp xếp theo"/>
      </SelectTrigger>
      <SelectContent className="bg-white" >
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value} className="text-sm">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortDropdown;