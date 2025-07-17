import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MediaItemProps } from "@/pages/Seller/Media/media.type";
import { Eye } from "lucide-react";
import { toast } from "sonner";

export default function MediaItem({
  item,
  onView,
  onSelect,
  selected = false,
  disabled = false,
  maxItems,
}: {
  item: MediaItemProps;
  selected?: boolean;
  onView?: (item: MediaItemProps) => void;
  onSelect?: (item: MediaItemProps) => void;
  disabled?: boolean;
  maxItems?: number;
}) {
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSelect = () => {
    if (disabled) {
      toast.warning("Bạn chỉ có thể chọn tối đa " + maxItems + " ảnh");
      return;
    }
    if (onSelect) onSelect(item);
  };
  return (
    <div className="border rounded-md flex flex-col  gap-4 hover:shadow-sm transition relative cursor-pointer" onClick={handleSelect}>
      <Checkbox
        checked={selected}
        onCheckedChange={handleSelect}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 left-2 bg-white/90 dark:bg-white border border-gray-300 rounded shadow-md"
      />
      <img
        src={item.url}
        alt={item.name}
        loading="lazy"
        className=" bg-accent aspect-square object-contain rounded-t-md"
      />
      <div className="space-y-3 p-2">
        <p className="text-sm font-medium truncate">{item.name}</p>
        <p className="text-xs text-muted-foreground">{formatSize(item.size)}</p>
      </div>
      <Button
        size="icon"
        variant="outline"
        className="size-6 rounded absolute bottom-2 right-2"
        onClick={(e) => {
          e.stopPropagation();
          if (onView) onView(item);
        }}
      >
        <Eye />
      </Button>
    </div>
  );
}
