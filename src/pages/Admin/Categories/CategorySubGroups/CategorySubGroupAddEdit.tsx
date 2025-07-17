import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  // SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CategorySubGroup } from "@/types";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import CategorySelectCombobox from "@/features/categories/components/CategorySelectCombobox";
import ImageUpload from "@/components/ImageUpload";
interface AddEditCategorySubGroupProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  categorySubGroup: CategorySubGroup | null;
  onSubmit: (data: {
    name: string;
    description: string;
    id?: number;
    parentId: number;
    status: string;
  }) => void;
  parents?: { id: number; name: string }[];
}

export default function CategorySubGroupAddEdit({
  open,
  setOpen,
  categorySubGroup,
  onSubmit,
  parents,
}: AddEditCategorySubGroupProps) {
  const [selectedParentId, setSelectedParentId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [errors, setErrors] = useState({
    name: "",
    image: "",
  });
  useEffect(() => {
    if (open) {
      setName("");
      setDescription("");
      setSelectedParentId("");
      setStatus("active");
      setErrors({
        name: "",
        image: "",
      });
      if (categorySubGroup) {
        setName(categorySubGroup.name);
        setDescription(categorySubGroup.description || "");
        setSelectedParentId(categorySubGroup?.parent.id.toString());
        setStatus(categorySubGroup.status);
      }
    }
  }, [categorySubGroup, open]);
  const [image, setImage] = useState<string | null>(null);
  const handleImageUpload = (image: string | null) => {
    setImage(image); // Cập nhật ảnh khi ảnh được tải lên thành công
  };
  const handleSubmit = () => {
    const nameError = name.trim() === "" ? "Tên không được để trống" : "";

    const newErrors = {
      name: nameError,
      image: "",
    };

    setErrors(newErrors);
    if (nameError) return;

    const data = {
      name,
      description,
      parentId: Number(selectedParentId),
      status,
      ...(categorySubGroup?.id && { id: categorySubGroup.id }),
    };
    onSubmit(data);
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="overflow-y-auto custom-scrollbar">
        <SheetHeader>
          <SheetTitle>
            {categorySubGroup ? "Cập nhật danh mục" : "Thêm ngành hàng mới"}
          </SheetTitle>
          <SheetDescription>
            {categorySubGroup
              ? "Dữ liệu danh mục sẽ được thay đổi tương ứng trên website"
              : "Ngành hàng mới sẽ được hiển thị trên giao diện của website"}
          </SheetDescription>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="cat_name">Tên danh mục</label>
            <Input
              type="text"
              id="cat_name"
              placeholder="Điện tử"
              defaultValue={categorySubGroup?.name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              className={
                errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
              }
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="category-status">Trạng thái</Label>
            <div className="flex items-center gap-1.5">
              <Switch
                checked={status === "active"}
                onCheckedChange={(checked) =>
                  setStatus(checked === true ? "active" : "inactive")
                }
                id="category-status"
              />
              <Label
                htmlFor="category-status"
                className="text-xs text-muted-foreground"
              >
                {status === "active" ? "Hoạt động" : "Bị khóa"}
              </Label>
            </div>
          </div>
          <div className="grid w-full gap-1.5">
            <label htmlFor="cat_name">Ngành hàng</label>
            <CategorySelectCombobox
              options={parents || []}
              selectedId={selectedParentId}
              onChange={(id) => setSelectedParentId(id)}
              placeholder="Chọn danh mục"
            />
          </div>
          <div className="grid w-full gap-1.5">
            <label htmlFor="description">Mô tả</label>
            <Textarea
              placeholder="Mô tả cho ngành hàng."
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Hình ảnh</Label>
            <ImageUpload
              onImageUpload={handleImageUpload}
              defaultImage={image}
            />
            {errors.image && (
              <p className="text-sm text-red-500">{errors.image}</p>
            )}
          </div>
        </SheetHeader>
        <SheetFooter>
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              className="w-20"
              onClick={() => setOpen(false)}
            >
              Đóng
            </Button>
            <Button
              className="w-20 !bg-accent-foreground"
              onClick={handleSubmit}
            >
              Lưu
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
