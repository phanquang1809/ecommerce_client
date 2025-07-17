import { motion } from "framer-motion";
import { CircleX, CloudAlert, Fullscreen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ImageUploadSlotProps {
  slotId: string;
  index: number;
  preview: string | null;
  fileName: string | null;
  isLoading: boolean;
  error: string | null;
  removeImage?: (slotId: string) => void;
  openFullscreen?: (preview: string, fileName: string) => void;
  isOverlay?: boolean; // Thêm prop để xác định khi render trong DragOverlay
}

const ImageUploadSlot = ({
  slotId,
  index,
  preview,
  fileName,
  isLoading,
  error,
  removeImage,
  openFullscreen,
  isOverlay = false, // Mặc định không phải DragOverlay
}: ImageUploadSlotProps) => {
  // Ngăn sự kiện kéo thả lan truyền từ button
  const handleButtonDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div className="relative w-20 h-20 rounded-md group overflow-hidden bg-background">
      <div
        className={`w-full h-full border  rounded-md flex justify-center items-center cursor-move transition hover:border-primary overflow-hidden ${
          preview && !isLoading ? "border-solid !border-muted" : "border-dashed"
        } 
        ${error ? "!border-red-500" : "border-muted-foreground"} `}
      >
        {isLoading ? (
          <div className="w-6 h-6 flex justify-center items-center">
            <svg
              className="text-background animate-spin"
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
                className="text-primary"
              ></path>
            </svg>
          </div>
        ) : preview ? (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            src={preview}
            alt={`Preview ${index}`}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 !bg-accent h-full w-full">
            <CloudAlert className="size-5  text-red-500" />
            {error && (
              <div className="flex flex-col items-center justify-center gap-1 text-center">
                <p className="text-red-500 text-xs max-w-[4.5rem]">
                 Lỗi tải ảnh
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-5 text-red-500 hover:text-red-600"
                  onClick={() => removeImage?.(slotId)}
                >
                  <CircleX className="size-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      {preview &&
        !isLoading &&
        !isOverlay && ( // Ẩn button trong DragOverlay
          <div className="absolute bottom-0 w-full left-0 border border-transparent rounded-b">
            <div className="bg-background/80 items-center justify-evenly py-1 hidden group-hover:flex ">
              <Button
                variant="link"
                size="icon"
                className="size-4"
                onClick={() =>
                  openFullscreen?.(preview, fileName || `Image ${index + 1}`)
                }
                onDragStart={handleButtonDragStart} // Ngăn kéo thả trên button
              >
                <Fullscreen className="size-4" />
              </Button>
              <Separator
                orientation="vertical"
                className="!h-3 bg-muted-foreground"
              />
              <Button
                variant="link"
                size="icon"
                className="size-4"
                onClick={() => removeImage?.(slotId)}
                onDragStart={handleButtonDragStart} // Ngăn kéo thả trên button
              >
                <CircleX className="size-4" />
              </Button>
            </div>
            {index === 0 && (
              <div className="bg-background/80 items-center justify-center gap-1 py-1 flex group-hover:hidden text-xs">
                <span className="text-rose-400">*</span>
                <p> Ảnh bìa</p>
              </div>
            )}
          </div>
        )}
    </div>
  );
};
export default ImageUploadSlot;
