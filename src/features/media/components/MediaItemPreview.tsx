import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MediaItemProps } from "@/pages/Seller/Media/media.type"
import { Download, Copy } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"

export function MediaItemPreview({
  open,
  setOpen,
  selectedImage,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  selectedImage: MediaItemProps | null
}) {
  const [copied, setCopied] = useState(false)

  if (!selectedImage) return null

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedImage.url)
      toast.success("Đã sao chép URL ảnh!")
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error("Không thể sao chép URL.")
    }
  }

 const handleDownload = async () => {
  try {
    const response = await fetch(selectedImage.url, { mode: "cors" });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = selectedImage.name || "downloaded-image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Lỗi khi tải ảnh", error);
    toast.error("Không thể tải ảnh xuống.");
  }
};
  console.log(copied);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] rounded-xl p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-lg font-semibold">Xem ảnh</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Xem chi tiết ảnh đã chọn
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="p-4 space-y-4  max-h-[calc(90vh-100px)]">
          <div className="w-full overflow-hidden flex items-center justify-center">
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              className="w-[300px] h-[300px] object-contain "
            />
          </div>

          <div className="space-y-2">
            <div>
              <Label className="text-xs">Tên ảnh</Label>
              <Input
                value={selectedImage.name}
                readOnly
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Kích thước</Label>
              <Input
                value={formatSize(selectedImage.size)}
                readOnly
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">URL ảnh</Label>
              <div className="flex gap-2 mt-1">
                <Input value={selectedImage.url} readOnly className="flex-1" />
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={handleCopy}
                  title="Sao chép URL"
                  className="size-8"
                >
                  <Copy />
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <Button variant="secondary" onClick={handleDownload}>
              <Download className="mr-2" size={16} /> Tải xuống
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Đóng</Button>
            </DialogClose>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
