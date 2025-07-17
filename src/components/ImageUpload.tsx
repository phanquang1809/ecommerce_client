import { useState, useEffect } from "react";
import { CloudUpload, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import Media from "@/pages/Seller/Media/Media";

interface ImageUploadProps {
  onImageUpload: (image: string | null) => void;
  defaultImage: string | null;
}

const ImageUpload = ({ onImageUpload, defaultImage }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(defaultImage);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setPreview(defaultImage);
  }, [defaultImage]);

  const handleConfirm = () => {
    if (selectedImage) {
      setPreview(selectedImage);
      onImageUpload(selectedImage);
    }
    setDialogOpen(false);
  };

  const handleRemove = () => {
    setPreview(null);
    setSelectedImage(null);
    onImageUpload(null);
  };

  return (
    <>
      <div className="relative w-full">
        {preview ? (
          <div className="relative group border rounded">
            <img
              src={preview}
              alt="Preview"
              className=" aspect-square w-full object-contain rounded"
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleRemove}
              className="absolute top-2 right-2"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div
            onClick={() => setDialogOpen(true)}
            className="w-full aspect-square border-2 border-dashed border-muted-foreground rounded-lg flex flex-col justify-center items-center cursor-pointer hover:border-primary text-muted-foreground hover:text-primary transition"
          >
            <CloudUpload className="w-6 h-6" />
            {/* <p className="text-sm mt-1">Chọn ảnh từ thư viện</p> */}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="!max-w-7xl h-[calc(100vh-100px)]">
            <DialogHeader className="hidden">
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
          <Media
            onSelectImages={(images: string[]) =>
              setSelectedImage(images[0] || null)
            }
            selectedImages={selectedImage ? [selectedImage] : []}
            maxSelectedImages={1}
          />
         <DialogFooter className="">
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleConfirm} className="bg-blue-600 text-white">
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
