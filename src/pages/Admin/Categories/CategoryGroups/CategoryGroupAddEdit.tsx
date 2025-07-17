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
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CategoryGroup } from "@/types";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AddEditCategoryGroupProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  categoryGroup: CategoryGroup | null;
  onSubmit: (data: {
    name: string;
    description: string;
    image: string | null;
    id?: number;
    status: string;
  }) => void;
  loading?: boolean;
}

export default function CategoryGroupAddEdit({
  open,
  setOpen,
  categoryGroup,
  onSubmit,
  loading,
}: AddEditCategoryGroupProps) {
  const [image, setImage] = useState<string | null>(null);
  const handleImageUpload = (image: string | null) => {
    setImage(image); // Cập nhật ảnh khi ảnh được tải lên thành công
  };
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [errors, setErrors] = useState({
    name: "",
    image: "",
  });
  useEffect(() => {
    if (open) {
      setImage(null); // Gỡ bỏ ảnh
      setErrors({
        name: "",
        image: "",
      });
      setName("");
      setDescription("");
      setStatus("active");
      if (categoryGroup) {
        setName(categoryGroup.name);
        setDescription(categoryGroup.description || "");
        setImage(categoryGroup.image || "");
        setStatus(categoryGroup.status);
      }
    }
  }, [categoryGroup, open]);
  const handleSubmit = () => {
    const nameError = name.trim() === "" ? "Tên không được để trống" : "";
    const imageError = !image ? "Vui lòng tải lên ảnh" : "";
    const newErrors = {
      name: nameError,
      image: imageError,
    };
    setErrors(newErrors);
    if (nameError || imageError) return;
    const data = {
      name,
      description,
      image,
      status,
      ...(categoryGroup?.id && { id: categoryGroup.id }),
    };
    onSubmit(data);
  };
  useEffect(() => {
    if (image) {
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  }, [image]);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="overflow-y-auto custom-scrollbar">
        <SheetHeader>
          <SheetTitle>
            {categoryGroup ? "Cập nhật ngành hàng" : "Thêm ngành hàng mới"}
          </SheetTitle>
          <SheetDescription>
            {categoryGroup
              ? "Dữ liệu ngành hàng sẽ được thay đổi tương ứng trên website"
              : "Ngành hàng mới sẽ được hiển thị trên giao diện của website"}
          </SheetDescription>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="cat_name">Tên ngành hàng</Label>
            <Input
              type="text"
              id="cat_name"
              placeholder="Điện tử"
              defaultValue={categoryGroup?.name}
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
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              placeholder="Mô tả cho ngành hàng."
              id="description"
              value={description}
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
              disabled={loading}
            >
              Đóng
            </Button>
            <Button
              className="w-20 !bg-accent-foreground"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading && (
                <svg
                  className="text-accent-foreground animate-spin"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                >
                  <path
                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent"
                  ></path>
                </svg>
              )}
              Lưu
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
