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
import { toast } from "sonner";
import { useCategoriesForProduct } from "@/services/admin/adminServices";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Brand } from "./Brand.type";
import {
  createBrand,
  updateBrand,
} from "@/services/admin/brands/brandsServices";
import ImageUpload from "@/components/ImageUpload";

type Category = {
  id: number;
  name: string;
  slug?: string;
  children?: Category[];
};

interface Props {
  open: boolean;
  onClose: () => void;
  brand: Brand | null;
  onUpdated: () => void;
}

export default function BrandEditDialog({
  open,
  onClose,
  brand,
  onUpdated,
}: Props) {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<string>("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [searchText, setSearchText] = useState("");
  const [categoryOptionsOpen, setCategoryOptionsOpen] = useState(false);

  const { data: categoryData, isLoading: categoryLoading } =
    useCategoriesForProduct(categoryOptionsOpen);

  useEffect(() => {
    if (brand) {
      setName(brand.name || "");
      setLogo(brand.logo || "");
      setDescription(brand.description || "");
      setUrl(brand.url || "");
      setCategories(brand.categories || []);
    } else {
      setName("");
      setLogo("");
      setDescription("");
      setUrl("");
      setCategories([]);
    }
  }, [brand]);

  const handleUpdate = async () => {
    setLoading(true);

    const payload = {
      name,
      logo,
      description,
      url,
      categories,
    };

    const res = brand
      ? await updateBrand(brand.id, payload)
      : await createBrand(payload);

    setLoading(false);

    if (res.status === "success") {
      toast.success(brand ? "Cập nhật thành công" : "Tạo thành công");
      onUpdated();
      onClose();
    } else {
      toast.error(res.message || "Thao tác thất bại");
    }
  };

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
  const handleImageUpload = (image: string | null) => {
    setLogo(image || ""); // Cập nhật ảnh khi ảnh được tải lên thành công
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {brand ? "Cập nhật thương hiệu" : "Thêm thương hiệu"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {/* Logo bên trái, thông tin bên phải */}
          <div className="flex flex-col md:flex-row gap-2">
            {/* Logo */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">
                  Tên thương hiệu
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className="rounded"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Mô tả</label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                  className="rounded"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Danh mục</label>
                <div>
                  <div className="flex flex-wrap gap-2 p-2 border min-h-20  rounded">
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
                              e.preventDefault();
                              e.stopPropagation();
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
                      <DropdownMenuContent
                        align="start"
                        side="top"
                        className="w-60 p-2"
                        loop={false}
                      >
                        <Input
                          placeholder="Tìm danh mục..."
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                          onKeyDown={(e) => e.stopPropagation()}
                          className="mb-2 h-8 text-sm"
                        />
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
            <div className="w-80">
              <label className="text-sm font-medium block mb-2">Logo</label>
              <ImageUpload
                onImageUpload={handleImageUpload}
                defaultImage={logo}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            className="rounded"
            variant="outline"
            onClick={onClose}
            size="sm"
          >
            Hủy
          </Button>
          <Button onClick={handleUpdate} disabled={loading}
          className="rounded" size="sm">
            {loading && <Loader className="h-4 w-4 animate-spin mr-2" />}
            {brand ? "Cập nhật" : "Thêm mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
