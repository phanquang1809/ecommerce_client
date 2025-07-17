import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageUploadMultiple from "./ImageUploadMultiple";
import { useEffect, useRef, useState } from "react";
import { FolderProps, MediaItemProps } from "@/pages/Seller/Media/media.type";
import { Loader } from "lucide-react";
import { uploadImage } from "@/services/mediaServices";
import { AxiosError } from "axios";

interface ImageItem {
  file: File;
  preview: string;
  queued?: boolean; // Chỉ ảnh mới chọn được đưa vào hàng đợi upload
  loading?: boolean;
  failed?: boolean;
  uploaded?: boolean;
  uploadedData?: MediaItemProps;
  errorMessage?: string;
}

const MAX_IMAGE: number = 10;

export default function AddMediaFile({
  open,
  setOpen,
  folder,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  folder: FolderProps | null;
}) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const isUploadingRef = useRef(false);
  const processedImagesRef = useRef<Set<string>>(new Set()); // Lưu trữ các ảnh đã được xử lý

  // Xử lý khi chọn ảnh mới
  const handleImagesChange = (newImages: ImageItem[]) => {
    const withQueue = newImages.map((img) => {
      const isProcessed = processedImagesRef.current.has(img.file.name);
      return {
        ...img,
        queued: !isProcessed, // Chỉ queued nếu chưa được xử lý
      };
    });
    setImages(withQueue);
  };

  // Reset trạng thái
  const handleReset = () => {
    setImages([]);
    processedImagesRef.current.clear();
  };

  // Upload ảnh đồng thời với cập nhật trạng thái từng ảnh
  useEffect(() => {
    const uploadImageIndependently = async (img: ImageItem, index: number) => {
      // Đánh dấu ảnh đã được xử lý
      processedImagesRef.current.add(img.file.name);

      // Cập nhật trạng thái loading cho ảnh cụ thể
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = { ...img, loading: true, queued: false };
        return newImages;
      });

      try {
        const res = await uploadImage(folder?.id || null, img.file);
        // Cập nhật trạng thái uploaded cho ảnh cụ thể
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[index] = {
            ...img,
            loading: false,
            uploaded: true,
            queued: false,
            uploadedData: {
              ...res.data,
              name: img.file.name,
            },
          };
          return newImages;
        });
      } catch (error) {
        const axiosError = error as AxiosError<{
          errors?: { image?: string[] };
          message?: string;
        }>;
        const errorMessage =
          axiosError?.response?.data?.errors?.image?.[0] ||
          axiosError?.response?.data?.message ||
          "Tải lên thất bại";
        // Cập nhật trạng thái failed cho ảnh cụ thể
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[index] = {
            ...img,
            loading: false,
            failed: true,
            queued: false,
            errorMessage,
          };
          return newImages;
        });
      }
    };
    
    const uploadQueuedImages = async () => {
      if (isUploadingRef.current) return; // Ngăn upload đồng thời nhiều đợt
      isUploadingRef.current = true;

      const queuedImages = images.filter(
        (img) =>
          img.queued &&
          !img.uploaded &&
          !img.loading &&
          !img.failed &&
          !processedImagesRef.current.has(img.file.name)
      );

      if (queuedImages.length === 0) {
        isUploadingRef.current = false;
        return;
      }

      // Khởi chạy upload đồng thời cho từng ảnh
      queuedImages.forEach((img) => {
        const index = images.indexOf(img);
        uploadImageIndependently(img, index);
      });

      isUploadingRef.current = false;
    };

    if (images.some((img) => img.queued)) {
      uploadQueuedImages();
    }
  }, [images, folder]);

  // Xác nhận thêm ảnh
  const handleContinueUpload = () => {
   handleReset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        handleReset();
      }}
    >
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Thêm ảnh</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <ImageUploadMultiple
              images={images}
              folder={folder}
              maxImages={MAX_IMAGE}
              onImagesChange={handleImagesChange}
              upLoading={images.some((img) => img.loading)} // Truyền trạng thái loading
            />
          </div>
        </div>
         {images.length > 0 && (
        <DialogFooter>
          <div className="flex items-center justify-between w-full">
          <div>
          Hoàn tất đăng tải {images.filter((img) => img.uploaded).length}/{images.length} ảnh
         </div>
          <div className="flex items-center gap-2">
              <Button
            type="button"
            variant="outline"
            className="rounded"
            disabled={images.some((img) => img.loading)}
            onClick={() => {
              setOpen(false);
              handleReset();}}
          >
            Đóng
          </Button>
            <Button
            type="button"
            variant="default"
            className="rounded"
            disabled={images.some((img) => img.loading)}
            onClick={handleContinueUpload}
          >
            {images.some((img) => img.loading) ? (
              <span className="flex items-center gap-2">
                <Loader className="animate-spin" size={16} />
                Đang tải lên...
              </span>
            ) : (
              "Thêm ảnh"
            )}
          </Button>
          </div>
          </div>
        </DialogFooter>
         )}
      </DialogContent>
    </Dialog>
  );
}