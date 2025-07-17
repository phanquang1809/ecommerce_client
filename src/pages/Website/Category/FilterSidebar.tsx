import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import MultiGroupCheckboxFilter from "./MultiGroupCheckboxFilter";
import { FilterGroup } from "./categorydetails.type";
import { Skeleton } from "@/components/ui/skeleton";

interface FilterSidebarProps {
  groups: FilterGroup[];
  onSelect: (groupSlug: string, valueSlug: string) => void;
  loading: boolean; // ✅ thêm loading
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ groups, onSelect, loading }) => {
  const initialExpanded = Object.fromEntries(groups.map((g) => [g.slug, true]));
  const [expandedSections, setExpandedSections] = useState(initialExpanded);

 useEffect(() => {
    if (Object.keys(expandedSections).length === 0 && groups.length > 0) {
      const initial = Object.fromEntries(groups.map((g) => [g.slug, true]));
      setExpandedSections(initial);
    }
  }, [groups, expandedSections]);;
  const toggleSection = (slug: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <div className="w-full rounded-lg bg-white p-4 space-y-2">
      {loading ? (
       Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-t pt-2 first:border-none first:pt-0 space-y-2">
            <Skeleton className="h-4 w-2/3 mb-2 rounded" /> {/* Tiêu đề giả */}
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-full mt-2 rounded" /> // mỗi value
              ))}
            </div>
          </div>
        ))
      ) : groups.length === 0 ? (
        <div className="text-sm h-20 flex items-center justify-center">Không có bộ lọc phù hợp</div>
      ) : (
        groups.map((group) => (
          <div key={group.slug} className="border-t pt-2 first:border-none first:pt-0">
            <div
              className="flex justify-between items-center mb-2 cursor-pointer"
              onClick={() => toggleSection(group.slug)}
            >
              <h3 className="font-medium text-blue-900">{group.title}</h3>
              {expandedSections[group.slug] ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedSections[group.slug]
                  ? "max-h-60 opacity-100 mb-4"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="filter-scroll max-h-48 overflow-y-auto pr-2">
                <MultiGroupCheckboxFilter groups={[group]} onSelect={onSelect} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FilterSidebar;
