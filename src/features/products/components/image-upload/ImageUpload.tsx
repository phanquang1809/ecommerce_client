import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useSensor,
  useSensors,
  MouseSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCallback, useEffect, useState } from "react";
import ImageUploadSlot from "./ImageUploadSlot";
import { CloudUpload } from "lucide-react";
import Media from "@/pages/Seller/Media/Media";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageUpload: (images: string[]) => void;
  images: string[];
}

interface ImageItem {
  id: string;
  url: string;
}

const SortableItem = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const ImageUpload = ({ onImageUpload, images }: ImageUploadProps) => {
  const [imageList, setImageList] = useState<ImageItem[]>([]);
  const [tempImageList, setTempImageList] = useState<ImageItem[]>([]);
  const [addImagesOpen, setAddImagesOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [fullscreenFileName, setFullscreenFileName] = useState<string | null>(
    null
  );

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    // Khởi tạo danh sách ảnh từ props `images`
    const list = images.map((url, idx) => ({
      id: `${url}-${idx}`,
      url,
    }));
    setImageList(list);
    setTempImageList(list);
  }, [images]);

  const handleRemoveImage = useCallback((id: string) => {
    setImageList((prev) => {
      const newList = prev.filter((item) => item.id !== id);
      onImageUpload(newList.map((item) => item.url));
      return newList;
    });
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over?.id) {
      setImageList((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over?.id);
        const newList = arrayMove(prev, oldIndex, newIndex);
        onImageUpload(newList.map((item) => item.url));
        return newList;
      });
    }
  };

  const openFullscreen = (url: string, fileName: string) => {
    setFullscreenImage(url);
    setFullscreenFileName(fileName);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    setFullscreenFileName(null);
  };

  const activeSlot = imageList.find((item) => item.id === activeId);
  const handleSelectImages = (newImages: string[]) => {
    const mergedList = newImages.map((url, idx) => ({
      id: `${url}-${idx}`,
      url,
    }));
    setTempImageList(mergedList);
  };

  const handleConfirm = () => {
    setImageList(tempImageList);
    onImageUpload(tempImageList.map((item) => item.url));
    setAddImagesOpen(false);
  };
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={imageList.map((img) => img.id)}>
          <div className="flex items-center gap-2 flex-wrap">
            {imageList.map((img, index) => (
              <SortableItem key={img.id} id={img.id}>
                <ImageUploadSlot
                  slotId={img.id}
                  index={index}
                  preview={img.url}
                  fileName={`Image ${index + 1}`}
                  isLoading={false}
                  error={null}
                  removeImage={handleRemoveImage}
                  openFullscreen={openFullscreen}
                />
              </SortableItem>
            ))}

            {/* Slot hiển thị thêm hình ảnh nếu chưa đủ 9 ảnh */}
            {imageList.length < 9 && (
              <div
                onClick={() => setAddImagesOpen(true)}
                className={`group w-20 h-20 border-1 border-dashed border-muted-foreground rounded-md flex justify-center items-center cursor-default transition p-1 hover:border-primary`}
              >
                <div className="flex flex-col items-center gap-1">
                  <CloudUpload className="size-5 text-muted-foreground group-hover:text-primary" />
                  <p className="text-xs text-muted-foreground group-hover:text-primary text-center">
                    Thêm hình ảnh ({imageList.length}/9)
                  </p>
                </div>
              </div>
            )}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId && activeSlot && (
            <ImageUploadSlot
              slotId={activeSlot.id}
              index={0}
              preview={activeSlot.url}
              fileName="Xem ảnh"
              isLoading={false}
              error={null}
              isOverlay
            />
          )}
        </DragOverlay>

        <Dialog open={!!fullscreenImage} onOpenChange={closeFullscreen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="truncate">
                {fullscreenFileName}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Xem ảnh toàn màn hình
              </DialogDescription>
            </DialogHeader>
            <img
              src={fullscreenImage!}
              alt={fullscreenFileName!}
              className="max-w-full h-auto"
            />
          </DialogContent>
        </Dialog>
      </DndContext>
      <Dialog open={addImagesOpen} onOpenChange={setAddImagesOpen}>
        <DialogContent className="!max-w-7xl">
          <DialogHeader className="hidden">
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
          <Media
            onSelectImages={handleSelectImages}
            selectedImages={images}
            maxSelectedImages={9}
            isDialog
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="bg-blue-600 hover:bg-blue-500 !text-white"
                onClick={handleConfirm}
              >
                Xác nhận
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageUpload;
