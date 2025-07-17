// components/DragHandle.tsx
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";

export const DragHandle = ({
  id,
  isSorting = false,
}: {
  id: number;
  isSorting: boolean;
}) => {
  const { attributes, listeners } = useSortable({
    id,
    disabled: isSorting,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      disabled={isSorting}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVertical className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
};
