import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ChevronRight, CircleSlash2, Pen, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

type Category = {
  id: number;
  name: string;
  slug: string;
  children?: Category[];
};

export default function CategorySelect({
  initCategories,
  open,
  onOpenChange,
  category,
  onConfirm,
}: {
  initCategories: Category[] | null;
  open: boolean;
  category: Category | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: (selected: { id: number; name: string; slug: string }) => void;
}) {
  const [level1, setLevel1] = useState<Category | null>(null);
  const [level2, setLevel2] = useState<Category | null>(null);
  const [level3, setLevel3] = useState<Category | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);

  const resetLowerLevels = (from: number) => {
    if (from <= 1) setLevel2(null);
    if (from <= 2) setLevel3(null);
  };

  const handleSearch = (search: string) => {
    if (!search) {
      setCategories(initCategories ?? []);
      return;
    }
    setCategories(
      (initCategories ?? []).filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (initCategories && category) {
      // Tìm đường dẫn category (level1 → level3)
      const findPath = (
        categories: Category[],
        targetId: number,
        path: Category[] = []
      ): Category[] | null => {
        for (const cat of categories) {
          const currentPath = [...path, cat];
          if (cat.id === targetId) {
            return currentPath;
          }
          if (cat.children) {
            const childPath = findPath(cat.children, targetId, currentPath);
            if (childPath) return childPath;
          }
        }
        return null;
      };

      const path = findPath(initCategories, category.id);
      if (path) {
        setLevel1(path[0] ?? null);
        setLevel2(path[1] ?? null);
        setLevel3(path[2] ?? null);
        setSelectedCategory(path[path.length - 1] ?? null);
      }
    } else {
      // 👇 Reset nếu không có category
      setLevel1(null);
      setLevel2(null);
      setLevel3(null);
      setSelectedCategory(null);
    }

    setCategories(initCategories ?? []);
  }, [initCategories, category]);

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  useEffect(() => {
    if (!open) {
      setSearch("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-between !bg-transparent")}
        >
          <p>
            {[level1?.name, level2?.name, level3?.name]
              .filter(Boolean)
              .join(" > ") || "Chọn ngành hàng"}
          </p>
          <Pen />
        </Button>
      </DialogTrigger>

      <DialogContent className="!max-w-4xl">
        <DialogHeader>
          <DialogTitle>Chọn ngành hàng phù hợp</DialogTitle>
        </DialogHeader>

        <div>
          <div className="mb-3">
            <Input
              placeholder="Tìm kiếm ngành hàng"
              className="w-60"
              endIcon={Search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {categories.length > 0 ? (
            <div className="grid grid-cols-3 bg-background p-2 border rounded">
              {/* Level 1 */}
              <div className="border-r h-80">
                <ScrollArea className="h-80">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setLevel1(cat);
                        resetLowerLevels(1);
                        setSelectedCategory(cat);
                      }}
                      className={`cursor-pointer p-2 rounded flex items-center justify-between text-sm ${
                        level1?.id === cat.id
                          ? "font-semibold text-primary"
                          : ""
                      }`}
                    >
                      <p>{cat.name}</p>
                      {cat.children && cat.children.length > 0 && (
                        <ChevronRight className="size-5" />
                      )}
                    </div>
                  ))}
                </ScrollArea>
              </div>

              {/* Level 2 */}
              <div className="border-r">
                {level1?.children?.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => {
                      setLevel2(sub);
                      resetLowerLevels(2);
                      setSelectedCategory(sub);
                    }}
                    className={`cursor-pointer p-2 rounded flex items-center justify-between text-sm ${
                      level2?.id === sub.id ? "font-semibold text-primary" : ""
                    }`}
                  >
                    <p>{sub.name}</p>
                    {sub.children && sub.children.length > 0 && (
                      <ChevronRight className="size-5" />
                    )}
                  </div>
                ))}
              </div>

              {/* Level 3 */}
              <div>
                {level2?.children?.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => {
                      setLevel3(sub);
                      setSelectedCategory(sub);
                    }}
                    className={`cursor-pointer p-2 text-sm ${
                      level3?.id === sub.id ? "font-semibold text-primary" : ""
                    }`}
                  >
                    {sub.name}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-80 w-full flex items-center justify-center flex-col gap-2">
              <CircleSlash2 className="size-25" />
              <p>Không tìm thấy kết quả phù hợp</p>
            </div>
          )}
        </div>

        <div className="text-md mt-4 flex items-center gap-1">
          <p>Đã chọn:</p>
          <span className="flex items-center font-medium">
            <p>
              {[level1?.name, level2?.name, level3?.name]
                .filter(Boolean)
                .join(" > ") || "Chưa chọn"}
            </p>
          </span>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <DialogClose asChild>
            <Button variant="ghost">Hủy</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              disabled={
                !selectedCategory ||
                (selectedCategory.children &&
                  selectedCategory.children.length > 0)
              }
              onClick={() =>
                selectedCategory &&
                onConfirm({
                  id: selectedCategory.id,
                  name: selectedCategory.name,
                  slug: selectedCategory.slug,
                })
              }
            >
              Xác nhận
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
