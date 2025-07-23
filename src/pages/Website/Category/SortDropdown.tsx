import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortDropdownProps {
  onSortChange: (value: string) => void;
  value: string;
}
const sortOptions = [
  { value: "newest", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "featured", label: "Nổi bật nhất" },
  { value: "sale", label: "Bán chạy" },
  { value: "price-asc", label: "Giá thấp → cao" },
  { value: "price-desc", label: "Giá cao → thấp" },
];
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