import { Category, Product } from "@/features/products/types/product.type";

export type CategoryDetailsProps = {
    category: Category;
    products: Product[];
    category_tree: Category[];
    filters: FilterGroup[]
};

export interface FilterOption {
  slug: string;
  name: string;
}

export interface FilterGroup {
  slug: string; // slug của nhóm
  title: string;
  options: FilterOption[];
  selectedValues: string[]; // mảng slug đã chọn
}

export interface MultiGroupCheckboxFilterProps {
  groups: FilterGroup[];
  onSelect: (groupSlug: string, optionSlug: string) => void;
}
