import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { CloudUpload } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/services/authServices";

export default function AvatarUploadDialog({
  open,
  onOpenChange,
  onSubmit,
  loading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (url: string) => void;
  loading?: boolean;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadAndPreview = async (file: File) => {
    setIsUploading(true);
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    try {
      const res = await uploadImage(file);
      if (res.url) {
        setUploadedUrl(res.url);
      } else {
        toast.error(res.message || "Tải ảnh thất bại");
        setPreviewUrl(null);
      }
    } catch {
      toast.error("Đã xảy ra lỗi khi tải ảnh");
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      uploadAndPreview(droppedFile);
    } else {
      toast.error("Vui lòng thả tệp ảnh hợp lệ");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setUploadedUrl(null);
    setPreviewUrl(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      uploadAndPreview(selectedFile);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="!max-w-[550px] rounded">
        <DialogHeader>
          <DialogTitle>Cập nhật ảnh đại diện</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex flex-col items-center">
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={handleDrop}
            className={cn(
              "w-80 aspect-square border-2 border-dashed rounded-full flex flex-col justify-center items-center cursor-pointer transition overflow-hidden",
              isDragging
                ? "border-blue-500  text-blue-500 bg-blue-50"
                : "border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary",
            )}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <>
                <CloudUpload className="w-6 h-6" />
                <p className="text-sm mt-1">Kéo thả hoặc chọn ảnh</p>
              </>
            )}
          </div>

          <Input
            ref={fileRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" className="rounded" onClick={handleClose}>
            Hủy bỏ
          </Button>
          <Button
            className="rounded bg-blue-600 hover:bg-blue-500"
            onClick={() => {
              if (uploadedUrl)
                {
                     onSubmit(uploadedUrl)
                     setPreviewUrl(null)
                }
              else toast.error("Ảnh chưa được tải lên thành công");
            }}
            disabled={isUploading || !uploadedUrl || loading}
          >
            {isUploading || loading ? "Đang tải..." : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
