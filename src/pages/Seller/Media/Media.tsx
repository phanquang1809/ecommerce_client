import { useCallback, useEffect, useState } from "react";
import {
  Trash2,
  Upload,
  Loader,
  FolderPlus,
  ChevronsUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import MediaItem from "@/features/media/components/MediaItem";
import { MediaItemPreview } from "@/features/media/components/MediaItemPreview";
import { FolderItem } from "@/features/media/components/FolderItem";
import { FolderProps, MediaItemProps } from "./media.type";
import {
  createMediaFolder,
  deleteImages,
  deleteMediaFolder,
  getMediaItemsByUrls,
  useMediaFolderDetails,
  useMediaFolders,
} from "@/services/mediaServices";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import AddMediaFile from "@/features/media/components/AddMediaFile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Media = ({
  onSelectImages,
  selectedImages,
  maxSelectedImages,
}: {
  onSelectImages?: (images: string[]) => void;
  selectedImages?: string[];
  maxSelectedImages?: number;
}) => {
  const [breadcrumb, setBreadcrumb] = useState<{ id: number; name: string }[]>(
    []
  );
  const [currentFolder, setCurrentFolder] = useState<FolderProps | null>(null);
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<MediaItemProps[]>([]);
  const [currentMediaItem, setCurrentMediaItem] = useState<MediaItemProps>();
  const [openMediaItemPreview, setOpenMediaItemPreview] = useState(false);
  const [openAddMediaFolder, setOpenAddMediaFolder] = useState(false);
  const [folderName, setFolderName] = useState<string>("");
  const [addFolderLoading, setAddFolderLoading] = useState(false);
  const [openAddMediaFile, setOpenAddMediaFile] = useState(false);

  const queryClient = useQueryClient();

  // Use React Query hooks
  const { data: rootData, isLoading: isRootLoading } = useMediaFolders();

  const { data: folderDetails, isLoading: isFolderDetailsLoading } =
    useMediaFolderDetails(currentFolderId || 0);
  useEffect(() => {
    const fetchSelectedItems = async () => {
      if (selectedImages?.length) {
        const response = await getMediaItemsByUrls(selectedImages); // API trả về list MediaItemProps

        const items: MediaItemProps[] = response.data || [];

        // Sort lại theo đúng thứ tự của selectedImages
        const sorted = selectedImages
          .map((url) => items.find((item) => item.url === url))
          .filter(Boolean) as MediaItemProps[];

        setSelectedItems(sorted);
      }
    };

    fetchSelectedItems();
  }, [selectedImages]);
  useEffect(() => {
    if (folderDetails?.folder) {
      setBreadcrumb(folderDetails?.breadcrumb || []);
      setCurrentFolder(folderDetails.folder);
    }
  }, [folderDetails]);
  const handleMediaItemView = useCallback((mediaItem: MediaItemProps) => {
    setCurrentMediaItem(mediaItem);
    setOpenMediaItemPreview(true);
  }, []);

  const handleMediaItemSelect = useCallback(
    (item: MediaItemProps) => {
      setSelectedItems((prev) => {
        const isSelected = prev.some((i) => i.id === item.id);
        let nextItems: MediaItemProps[];

        if (isSelected) {
          nextItems = prev.filter((i) => i.id !== item.id);
        } else {
          if (maxSelectedImages && prev.length >= maxSelectedImages) {
            toast.warning(
              `Bạn chỉ có thể chọn tối đa ${maxSelectedImages} ảnh.`
            );
            return prev;
          }
          nextItems = [...prev, item];
        }

        if (selectedImages && selectedImages.length > 0) {
          // Chỉ áp dụng sort nếu đang trong chế độ giữ thứ tự
          const inSelectedImages: MediaItemProps[] = [];
          const newImages: MediaItemProps[] = [];

          nextItems.forEach((i) => {
            if (selectedImages.includes(i.url)) {
              inSelectedImages.push(i);
            } else {
              newImages.push(i);
            }
          });

          const sortedOld = selectedImages
            .map((url) => inSelectedImages.find((i) => i.url === url))
            .filter(Boolean) as MediaItemProps[];

          const finalList = [...sortedOld, ...newImages];

          onSelectImages?.(finalList.map((i) => i.url));
          return finalList;
        } else {
          // Nếu không cần giữ thứ tự, cứ theo thứ tự chọn
          onSelectImages?.(nextItems.map((i) => i.url));
          return nextItems;
        }
      });
    },
    [onSelectImages, maxSelectedImages, selectedImages]
  );
  const handleFolderSelect = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      const folderId = target.closest("[data-id]")?.getAttribute("data-id");
      if (!folderId) return;
      setCurrentFolderId(Number(folderId));
    },
    []
  );
  const handleBreadcrumbClick = useCallback((id: number) => {
    if (id === 0) {
      setCurrentFolderId(null);
      setCurrentFolder(null);
      setBreadcrumb([]);
      return;
    }
    setCurrentFolderId(id);
  }, []);

  const createFolderMutation = useMutation({
    mutationFn: createMediaFolder,
    onSuccess: (response) => {
      if (response.status === "success") {
        toast.success("Tạo folder thành công!");
        queryClient.invalidateQueries({ queryKey: ["mediaFolders"] });
        queryClient.invalidateQueries({
          queryKey: ["mediaFolderDetails", currentFolder?.id],
        });
      } else {
        toast.error("Không thể tạo thư mục!");
      }
    },
    onError: () => {
      toast.error("Lỗi khi tạo thư mục!");
    },
    onSettled: () => {
      setAddFolderLoading(false);
      setOpenAddMediaFolder(false);
      setFolderName("");
    },
  });

  const deleteFolderMutation = useMutation({
    mutationFn: deleteMediaFolder,
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success("Xóa thư mục thành công!");

        const newBreadcrumb = breadcrumb.slice(0, -1); // loại bỏ folder hiện tại
        const parent = newBreadcrumb.at(-1); // lấy thư mục cha

        setBreadcrumb(newBreadcrumb);
        setCurrentFolder(parent || null);
        setCurrentFolderId(parent?.id ?? null);

        // Làm mới danh sách folder cha
        queryClient.invalidateQueries({
          queryKey: ["mediaFolderDetails", parent?.id || 0],
        });
        queryClient.invalidateQueries({ queryKey: ["mediaFolders"] });
      } else {
        toast.error("Xóa thư mục thất bại!");
      }
    },
    onError: () => {
      toast.error("Lỗi khi xóa thư mục!");
    },
  });

  const handleAddMediaFolder = useCallback(() => {
    if (!folderName.trim()) return;
    setAddFolderLoading(true);
    createFolderMutation.mutate({
      name: folderName,
      parent_id: currentFolder?.id || null,
    });
  }, [folderName, currentFolder, createFolderMutation]);
  console.log(currentFolder);

  const handleDeleteMediaFolder = useCallback(() => {
    if (!currentFolder) {
      toast.warning("Không có thư mục để xoá.");
      return;
    }
    deleteFolderMutation.mutate(currentFolder.id);
  }, [currentFolder, deleteFolderMutation]);

  const handleClose = useCallback(
  () => {
    setOpenAddMediaFile(false);
    if (currentFolder === null) {
      // Nếu ở thư mục gốc, làm invalidate query thư mục gốc
      queryClient.invalidateQueries({
        queryKey: ["mediaFolders"],
      });
    } else {
      // Invalidate folder hiện tại để fetch lại từ API
      queryClient.invalidateQueries({
        queryKey: ["mediaFolderDetails", currentFolder.id],
      });
    }
  },
  [currentFolder, queryClient]
);
  const handleDeleteImages = useCallback(async() => {
    if (selectedItems.length === 0) {
      toast.warning("Không có ảnh nào được chọn để xóa.");
      return;
    }
    const response = await deleteImages(selectedItems.map((item) => item.id));

    if (response.status === "success") {
      toast.success("Xóa ảnh thành công!");
      // Cập nhật lại danh sách ảnh đã chọn
      setSelectedItems([]);
      // Làm mới danh sách ảnh trong thư mục hiện tại
       if (currentFolder === null) {
      // Nếu ở thư mục gốc, làm invalidate query thư mục gốc
      queryClient.invalidateQueries({
        queryKey: ["mediaFolders"],
      });
    } else {
      // Invalidate folder hiện tại để fetch lại từ API
      queryClient.invalidateQueries({
        queryKey: ["mediaFolderDetails", currentFolder.id],
      });
    }
    } else {
      toast.error("Xóa ảnh thất bại!");
    }
  }, [selectedItems, queryClient, currentFolder]);

  const isLoading = isRootLoading || isFolderDetailsLoading;

  return (
    <div className="h-full flex flex-col pt-5 overflow-auto">
      <div className="border rounded-md p-5 flex flex-col flex-1 h-full">
        {/* Header */}
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-3xl font-bold">Thư viện ảnh</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpenAddMediaFile(true)}
          >
            <Upload className="mr-2" />
            Thêm file
          </Button>
        </div>

        <Separator />

        {/* Filter */}
        <div className="flex items-center gap-2 py-4">
          <Input className="w-60 h-8" placeholder="Tìm kiếm hình ảnh" />
          <Select>
            <SelectTrigger className="w-[120px] !h-8">
              <SelectValue placeholder="Sắp xếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Tên</SelectItem>
              <SelectItem value="date">Ngày tạo</SelectItem>
              <SelectItem value="size">Kích thước</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="!m-0" />

        <div className="flex flex-1 min-h-0 gap-2">
          {/* Sidebar */}
          <div
            className="w-60 pt-2 pr-2 border-r overflow-auto"
            onClick={(e) => handleFolderSelect(e)}
          >
            {rootData ? (
              rootData.folders.length > 0 ? (
                rootData.folders.map((folder) => (
                  <FolderItem
                    key={folder.id}
                    dataId={folder.id}
                    type="default"
                    folder={folder}
                  />
                ))
              ) : (
                "Không có thư mục nào"
              )
            ) : (
              <div className="space-y-2">
                {[1, 2, 3].map((_, i) => (
                  <Skeleton key={i} className="w-full h-6" />
                ))}
              </div>
            )}
          </div>

          {/* Main Content */}

          <ScrollArea className="flex-1 p-4">
            <div className="flex items-center justify-between">
              {/* Breadcrumb */}
              {!isLoading ? (
                <Breadcrumb>
                  <BreadcrumbList>
                    {[{ id: 0, name: "Thư mục gốc" }, ...breadcrumb].map(
                      (folder, index, arr) => (
                        <div
                          key={folder.id ?? "root"}
                          className="flex items-center gap-2"
                        >
                          <BreadcrumbItem>
                            <BreadcrumbLink
                              onClick={() =>
                                handleBreadcrumbClick(folder.id ?? 0)
                              }
                              className={cn(
                                "cursor-pointer",
                                index === arr.length - 1 &&
                                  "text-primary font-bold"
                              )}
                            >
                              {folder.name}
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          {index !== arr.length - 1 && <BreadcrumbSeparator />}
                        </div>
                      )
                    )}
                  </BreadcrumbList>
                </Breadcrumb>
              ) : (
                <Skeleton className="w-40 h-6" />
              )}
              {!isLoading && (
                <div className="flex items-center gap-2">
                  <Input
                    className="w-60 !ring-0"
                    placeholder={
                      "Tìm kiếm trong " +
                      (folderDetails
                        ? folderDetails.folder.name
                        : "thư mục gốc")
                    }
                  />
                  <Button variant="outline" size="sm" onClick={handleDeleteImages}>
                    <Trash2 />
                    Xóa Files
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 gap-1 flex items-center"
                      >
                        Thao tác
                        <ChevronsUpDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                      <DropdownMenuItem
                        onClick={() => setOpenAddMediaFolder(true)}
                      >
                        <FolderPlus className="w-4 h-4 mr-2" />
                        Thêm thư mục
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDeleteMediaFolder}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Xóa thư mục
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
            <div className="grid grid-cols-5 md:grid-cols-6  gap-4 mt-4">
              {/* Subfolders */}
              {!isLoading ? (
                <>
                  <div className="col-span-full flex items-center gap-2">
                    <h3 className="text-lg font-bold w-fit">
                      Thư mục (
                      {currentFolderId === null
                        ? rootData?.folders.length || 0
                        : folderDetails?.folder?.children?.length || 0}
                      )
                    </h3>
                    <Separator className="flex-1" />
                  </div>
                  <div
                    className="col-span-full flex gap-4 flex-wrap"
                    onClick={(e) => handleFolderSelect(e)}
                  >
                    {(currentFolderId === null
                      ? rootData?.folders || []
                      : folderDetails?.folder.children || []
                    ).map((folder) => (
                      <FolderItem
                        key={folder.id}
                        dataId={folder.id}
                        type="custom"
                        folder={folder}
                        parentPath={breadcrumb}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="col-span-full flex flex-col gap-4">
                  <Skeleton className="w-full h-6" />
                  <div className="col-span-full flex gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="w-24 h-24" />
                    ))}
                  </div>
                </div>
              )}

              {/* Media Items */}
              {!isLoading ? (
                <>
                  <div className="col-span-full flex items-center gap-2">
                    <h3 className="text-lg font-bold w-fit">
                      Hình ảnh (
                      {currentFolderId === null
                        ? rootData?.media_files.length || 0
                        : folderDetails?.media_files.length || 0}
                      )
                    </h3>
                    <Separator className="flex-1" />
                  </div>

                  {(currentFolderId === null
                    ? rootData?.media_files || []
                    : folderDetails?.media_files || []
                  ).map((item) => (
                    <MediaItem
                      maxItems={maxSelectedImages}
                      selected={selectedItems.some((i) => i.url === item.url)}
                      key={item.id}
                      item={item}
                      onSelect={handleMediaItemSelect}
                      onView={handleMediaItemView}
                      disabled={
                        !selectedItems.some((i) => i.url === item.url) &&
                        !!maxSelectedImages &&
                        selectedItems.length >= maxSelectedImages
                      }
                    />
                  ))}
                </>
              ) : (
                <div className="col-span-full flex flex-col gap-4">
                  <Skeleton className="w-full h-6" />
                  <div className="grid grid-cols-5 md:grid-cols-6 gap-4">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <div key={index} className="aspect-square">
                        <Skeleton className="w-full h-full" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Media Preview */}
            <MediaItemPreview
              open={openMediaItemPreview}
              setOpen={setOpenMediaItemPreview}
              selectedImage={currentMediaItem || null}
            />
          </ScrollArea>
        </div>
      </div>
      <Dialog open={openAddMediaFolder} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thêm thư mục mới</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="folder-name" className="sr-only">
                Tên thư mục
              </Label>
              <Input
                id="folder-name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="default"
              className="w-full"
              onClick={handleAddMediaFolder}
              disabled={addFolderLoading}
            >
              {addFolderLoading && <Loader className="h-4 w-4 animate-spin" />}
              Tạo thư mục
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AddMediaFile
        folder={currentFolder || null}
        open={openAddMediaFile}
        setOpen={handleClose}
      />
    </div>
  );
};

export default Media;
