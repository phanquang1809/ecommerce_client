import {  useEffect, useState } from "react";
import { CategoryGroup, Meta } from "@/types";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import {
  addCategory,
  deleteCategory,
  updateCategory,
  useCategoryGroupsForAdmin,
} from "@/services/admin/categories/categoryGroupServices";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableLoading } from "@/components/data-table/data-table-skeleton";
import AddEditCategoryGroup from "./CategoryGroupAddEdit";
import RefreshData from "@/components/refresh-data";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";

const CategoryGroups = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
    const [meta, setMeta] = useState<Meta | null>(null);
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const { data, isFetching, refetch } = useCategoryGroupsForAdmin(page,
    limit);
  console.log(selectedRows);

  useEffect(() => {
    if (data?.data) {
       setMeta(data.meta || null);
      setCategoryGroups(data.data);
    }
  }, [data]);
 const handlePageChange = (page: number) => {
    setPage(page);
    console.log("Page changed:", page);
  };
  const handleLimitChange = (limit: number) => {
    setLimit(limit);
    setPage(1);
    console.log("Limit changed:", limit);
  };

  const [open, setOpen] = useState(false);
  const [categoryGroup, setCategoryGroup] = useState<CategoryGroup | null>(
    null
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State cho dialog xác nhận xóa
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID của danh mục cần xóa

  const handleEdit = (categoryGroup: CategoryGroup) => {
    setCategoryGroup(categoryGroup);
    setOpen(true);
  };
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (data: {
    name: string;
    description: string;
    image: string|null;
    id?: number;
    status: string;
  }) => {
    setLoading(true);
    try {
      let response;
      if (data.id) {        
        response = await updateCategory(data); // Giả sử bạn có hàm update
      } else {
        response = await addCategory(data);
      }
       if (response?.data) {
        queryClient.setQueryData(
          ["categoryGroupsForAdmin",page,limit],
          (oldData?: {
            status?: string;
            message?: string;
            data?: CategoryGroup[];
          }) => {
            if (!oldData?.data) return oldData;
            const updatedData = data.id
              ? // Nếu là cập nhật
                oldData.data.map((item) =>
                  item.id === data.id ? response.data : item
                )
              : // Nếu là thêm mới
                [...oldData.data, response.data];
            return {
              ...oldData,
              data: updatedData,
            };
          }
        );
        toast.success(data.id ? "Cập nhật thành công!" : "Thêm mới thành công!");
        setOpen(false);
      }
    } catch{
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleDelete = async (id: number) => {
    setDeleteId(id); // Lưu ID cần xóa
    setOpenDeleteDialog(true);
  };
  const confirmDelete = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (deleteId) {
      setLoading(true);
      try {
        const response = await deleteCategory(deleteId);
        if (response) {
          setCategoryGroups((prev) =>
            prev ? prev.filter((item) => item.id !== deleteId) : []
          );
          setOpenDeleteDialog(false);
          setDeleteId(null);
          toast.success("Thành công", {
            description: "Ngành hàng đã được xóa.",
          });
        }
      } catch (e) {
        console.error("Lỗi khi xóa:", e);
        toast.error("Lỗi", {
          description: "Không thể xóa ngành hàng. Vui lòng thử lại!",
        });
      } finally {
        setLoading(false);
      }
    }
  };
  const status_options = [
    { value: "active", label: "Hoạt động" },
    { value: "inactive", label: "Bị khóa" },
  ];

  return (
    <div className="my-5">
      <div className="rounded-md">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-3xl font-bold">Danh sách ngành hàng</h1>
          <div className="flex items-center gap-2">
            <RefreshData getData={refetch} />
            <Button
              className="border-dashed !bg-accent-foreground"
              variant="default"
              size="sm"
              onClick={() => {
                handleOpenChange(true);
                setCategoryGroup(null);
              }}
            >
              Thêm mới
            </Button>
            <AddEditCategoryGroup
              open={open}
              setOpen={handleOpenChange}
              categoryGroup={categoryGroup}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
        {isFetching ? (
          <DataTableLoading
            columnCount={columns(handleEdit, handleDelete).length}
            rowCount={15}
          />
        ) : (
          <DataTable
            data={categoryGroups || []}
            columns={columns(handleEdit, handleDelete)}
            onRowSelectionChange={setSelectedRows}
            meta={meta}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            filterOptions={{ status: status_options }}
          />
        )}
      </div>

      {/* AlertDialog để xác nhận xóa */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Ngành hàng và các danh mục cũng
              như sản phẩm liên quan sẽ bị xóa vĩnh viễn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={loading}
            >
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={loading}
              onClick={confirmDelete}
              className="!bg-accent-foreground"
            >
              {loading && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryGroups;
