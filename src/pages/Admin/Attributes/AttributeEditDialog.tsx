import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Check, Loader, XCircle } from "lucide-react";
import {
  createAttributeWithValues,
  updateAttributeWithValues,
} from "@/services/admin/attributes/attributesService";
import { toast } from "sonner";
import { useCategoriesForProduct } from "@/services/admin/adminServices";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Attribute, AttributeValue } from "./Attribute.type";
interface Props {
  open: boolean;
  onClose: () => void;
  attribute: Attribute | null;
  onUpdated: () => void;
}

export default function AttributeEditDialog({
  open,
  onClose,
  attribute,
  onUpdated,
}: Props) {
 useEffect(() => {
  if (open) {
    if (attribute) {
      setName(attribute.name || "");
      setValues(attribute.values || []);
      setCategories(attribute.categories || []);
      setType(attribute.type || "variant");
    } else {
      setName("");
      setValues([]);
      setCategories([]);
      setType("variant");
    }
    setInput("");
  }
}, [attribute, open]); 
  console.log(attribute);
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState<"variant" | "spec">("variant");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<AttributeValue[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const filterCategories = (categories: Category[]): Category[] => {
    return categories
      .map((cat) => {
        const match = cat.name.toLowerCase().includes(searchText.toLowerCase());
        const filteredChildren = cat.children
          ? filterCategories(cat.children)
          : [];

        if (match || filteredChildren.length) {
          return {
            ...cat,
            children: filteredChildren,
          };
        }

        return null;
      })
      .filter(Boolean) as Category[];
  };
  const handleRemoveValue = (index: number) => {
    console.log(index);

    const newValues = [...values];
    newValues.splice(index, 1);
    setValues(newValues);
  };
  const handleAddValue = () => {
    if (!input.trim()) return;
    setValues([...values, { value: input.trim() }]);
    setInput("");
  };
  const [categoryOptionsOpen, setCategoryOptionsOpen] = useState(false);
  const { data: categoryData, isLoading: categoryLoading } =
    useCategoriesForProduct(categoryOptionsOpen);
  const handleUpdate = async () => {
    setLoading(true);
    let res;

    if (!attribute) {
      res = await createAttributeWithValues(name, values, categories, type);
    } else {
      res = await updateAttributeWithValues(
        attribute.id,
        name,
        values,
        categories,
        type
      );
    }

    setLoading(false);

    if (res.status === "success") {
      toast.success(attribute ? "Cập nhật thành công" : "Tạo thành công");
      onUpdated();
      onClose();
    } else {
      toast.error(
        res.message || (attribute ? "Cập nhật thất bại" : "Tạo thất bại")
      );
      if (attribute) {
        setValues(attribute.values || []);
      }
    }
  };
  type Category = {
    id: number;
    name: string;
    slug?: string;
    children?: Category[];
  };
  const renderCategoryOptions = (
    categoryList: Category[],
    level = 0
  ): React.ReactNode[] => {
    return categoryList.flatMap((cat: Category) => {
      const isSelected = !!categories.find((c) => c.id === cat.id);

      const item = (
        <DropdownMenuItem
          key={cat.id}
          onClick={(e) => {
            e.stopPropagation();
            if (loading) return;
            if (!isSelected) {
              setCategories([...categories, { id: cat.id, name: cat.name }]);
            }
          }}
          className="justify-between"
          style={{ paddingLeft: 12 + level * 12 }}
        >
          {cat.name}
          {isSelected && <Check className="w-4 h-4 ml-2" />}
        </DropdownMenuItem>
      );

      const children = cat.children?.length
        ? renderCategoryOptions(cat.children, level + 1)
        : [];

      return [item, ...children];
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật thuộc tính </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <label className="text-sm font-medium">Tên thuộc tính</label>
          <Input
            value={name}
            className="rounded"
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          <label className="text-sm font-medium">Loại thuộc tính</label>
          <RadioGroup
            value={type}
            onValueChange={(value) => setType(value as "variant" | "spec")}
            className="flex gap-6"
            disabled={loading}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="variant" id="variant" />
              <Label htmlFor="variant" className="text-sm">
                Biến thể
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="spec" id="spec" />
              <Label htmlFor="spec" className="text-sm">
                Cấu hình
              </Label>
            </div>
          </RadioGroup>
          <label className="text-sm font-medium">Giá trị</label>
          <div className="flex flex-wrap gap-2 border p-2 min-h-20 rounded">
            {values.map((val, index) => (
              <div className="text-xs font-semibold flex items-center gap-1 border rounded-full h-fit  p-1">
                <span key={index}>{val.value}</span>
                <XCircle
                  className="w-4 h-4 cursor-pointer hover:text-destructive"
                  onClick={(e) => {
                    if (loading) return;
                    e.stopPropagation();
                    handleRemoveValue(index);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Thêm giá trị mới"
              value={input}
              className="rounded"
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <Button
              disabled={loading}
              className="rounded"
              size="sm"
              onClick={handleAddValue}
            >
              Thêm
            </Button>
          </div>
          <div>
            <label className="text-sm font-medium">Danh mục</label>
            <div>
              <div className="flex flex-wrap gap-2 p-2 border min-h-20 rounded">
                {categories.length > 0 ? (
                  categories.map((cat, index) => (
                    <div
                      key={cat.id}
                      className="text-xs font-semibold flex items-center gap-1 border rounded-full p-1 h-fit"
                    >
                      <span>{cat.name}</span>
                      <XCircle
                        className="w-4 h-4 cursor-pointer hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation(); // rất quan trọng
                          setCategories((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <span className="text-muted-foreground text-sm">
                    Chọn danh mục...
                  </span>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      if (!loading) setCategoryOptionsOpen(true);
                    }}
                  >
                    Chọn danh mục
                  </Button>
                </DropdownMenuTrigger>

                {categoryOptionsOpen && (
                  <DropdownMenuContent align="start" side="top"  className="w-60 p-2" loop={false}>
                    {/* Input KHÔNG nằm trong vùng scroll */}
                    <Input
                      placeholder="Tìm danh mục..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="mb-2 h-8 text-sm"
                    />

                    {/* Chỉ phần này được scroll */}
                    <div className="max-h-56 overflow-y-auto">
                      {categoryLoading ? (
                        <div className="px-2 py-1 text-sm text-muted-foreground">
                          Đang tải...
                        </div>
                      ) : (
                        renderCategoryOptions(
                          filterCategories(categoryData?.data || [])
                        )
                      )}
                    </div>
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            className="rounded"
            size="sm"
            variant="outline"
            onClick={onClose}
          >
            Hủy
          </Button>
          <Button
            disabled={loading}
            className="rounded"
            size="sm"
            onClick={handleUpdate}
          >
            {loading && <Loader className="h-4 w-4 animate-spin" />}
            {attribute ? "Cập nhật" : "Thêm mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
