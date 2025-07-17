import { ChevronDown, ChevronRight, FolderOpen } from "lucide-react";
import { FolderProps } from "@/pages/Seller/Media/media.type";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type FolderItemProps = {
  folder: FolderProps;
  level?: number;
  type?: "default" | "custom";
  parentPath?: FolderProps[];
  onFolderAdd?: (newFolder: FolderProps) => void;
  dataId: string | number;
  onClick?: (folder: FolderProps) => void; // 👉 optional event
};

export const FolderItem = ({
  folder,
  level = 0,
  type = "default",
  parentPath = [],
  onFolderAdd,
  dataId,
  onClick,
}: FolderItemProps) => {
  const [isOpen, setIsOpen] = useState(level === 0);

  const handleToggleOpen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  const handleClickFolder = useCallback(() => {
    onClick?.(folder);
  }, [onClick, folder]);

  return (
    <div data-id={dataId}>
      <div
        className={cn(
          type !== "custom"
            ? "flex items-center gap-2 px-2 py-1 rounded hover:bg-accent"
            : "flex flex-col items-center justify-center w-28 h-28 p-2 rounded cursor-pointer hover:bg-accent bg-primary-foreground"
        )}
        style={{ paddingLeft: `${level > 0 ? level * 16 : 8}px` }}
        onClick={handleClickFolder}
      >
        {type === "default" && (
          <>
            {folder.children && folder.children.length > 0 ? (
              <div onClick={handleToggleOpen} className="cursor-pointer">
                {isOpen ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
              </div>
            ) : (
              <div className="size-4" />
            )}
          </>
        )}

        <div
          className={cn(
            "flex items-center gap-2 flex-1",
            type === "custom" && "flex-col justify-center"
          )}
        >
          <FolderOpen
            className="text-yellow-500 fill-yellow-400"
            size={type === "custom" ? 68 : 16}
          />
          <span
            className={cn(
              "text-sm font-medium truncate",
              type === "custom" && "mt-1 text-xs text-center"
            )}
          >
            {folder.name}
          </span>
        </div>
      </div>

      {isOpen &&
        type !== "custom" &&
        folder.children?.map((child) => (
          <FolderItem
            key={child.id}
            dataId={child.id}
            folder={child}
            level={level + 1}
            parentPath={[...parentPath, folder]}
            onFolderAdd={onFolderAdd}
            type={type}
            onClick={onClick}
          />
        ))}
    </div>
  );
};
