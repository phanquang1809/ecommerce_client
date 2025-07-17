import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { CloudUpload, CheckCircle, Loader2, XCircle } from "lucide-react";
import { FolderProps, MediaItemProps } from "@/pages/Seller/Media/media.type";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ImageItem {
  file: File;
  preview: string;
  loading?: boolean;
  failed?: boolean;
  uploaded?: boolean;
  uploadedData?: MediaItemProps;
  errorMessage?: string;
}

interface ImageUploadProps {
  images: ImageItem[];
  onImagesChange: (images: ImageItem[]) => void;
  error?: string | null;
  upLoading?: boolean;
  maxImages: number;
  folder?: FolderProps | null; // Thêm folder nếu cần
}

const ImageUploadMultiple = ({
  images,
  onImagesChange,
  error,
  upLoading,
  maxImages,
  folder
}: ImageUploadProps) => {
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter(
        (file) =>
          file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024
      );
      const newItems: ImageItem[] = validFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        failed: false,
      }));

      const unique = newItems.filter(
        (newImg) => !images.some((img) => img.file.name === newImg.file.name)
      );

      const combined = [...unique, ...images];
      if (combined.length > maxImages) {
        toast.error(`Chỉ cho phép tối đa ${maxImages} ảnh mỗi lần tải lên.`);
      }
      onImagesChange(combined.slice(0, maxImages));
    },
    [images, maxImages, onImagesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: upLoading ? () => {} : onDrop,
    accept: { "image/*": [] },
    multiple: true,
    disabled: upLoading || images.length >= maxImages,
  });

  return (
    <div className="w-full">
      {images.length === 0 && (
        <div
          {...getRootProps()}
          className={`w-full h-[400px] border-2 border-dashed hover:border-primary bg-accent border-muted-foreground rounded-lg flex justify-center items-center transition
    ${
      isDragActive
        ? "border-primary"
        : error || images.some((img) => img.failed)
        ? "border-red-500"
        : "border-accent"
    }
    ${
      upLoading || images.length >= maxImages
        ? "cursor-not-allowed opacity-50"
        : "cursor-pointer"
    }
  `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center text-muted-foreground">
            <CloudUpload className="w-10 h-10 mb-2" />
            <p className="font-semibold">
              Kéo ảnh vào hoặc bấm để chọn (tối đa {maxImages})
            </p>
            <p className="text-center">
              Kích thước ảnh tối đa: 2Mb; Định dạng ảnh: JPEG/JPG/PNG
            </p>
            <Button className="mt-5 rounded">
              Chọn hình ảnh
            </Button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {images.length > 0 && (
        <div className="mt-4 border border-b-0 rounded-md">
          <table className="w-full table-auto text-sm ">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">File</th>
                <th className="text-left px-4 py-2">Kích thước</th>
                <th className="text-left px-4 py-2">Thư mục</th>
                <th className="text-left px-4 py-2">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {images.map((img, index) => (
                <tr key={`${img.file.name}-${index}`} className="border-b">
                  <td className="flex items-center gap-2 px-4 py-2">
                    <img
                      src={img.preview}
                      alt="preview"
                      className="w-12 h-12 rounded object-cover bg-accent"
                    />
                    <span className="line-clamp-2 max-w-[250px] break-words">
                      {img.file.name}
                    </span>
                  </td>
                  <td className="px-4 py-2">{formatSize(img.file.size)}</td>
                  <td className="px-4 py-2">{folder?.name}</td>
                  <td className="px-4 py-2">
                    {img.loading ? (
                      <span className="flex items-center gap-1 text-gray-500">
                        <Loader2 className="w-4 h-4 animate-spin" /> Đang tải
                      </span>
                    ) : img.uploaded ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" /> Thành công
                      </span>
                    ) : img.failed ? (
                      <span className="flex items-center gap-1">
                        <XCircle className="w-4 h-4 text-red-500" />
                        {img.errorMessage || "Thất bại"}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ImageUploadMultiple;
