import { useEffect, useState } from "react";
import { CategorySubGroup, Meta } from "@/types";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { useCategorySubGroupsForAdmin } from "@/services/admin/adminServices";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableLoading } from "@/components/data-table/data-table-skeleton";
import AddEditCategorySubGroup from "./CategorySubGroupAddEdit";
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
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "@/services/admin/categories/categoryGroupServices";
import { useQueryClient } from "@tanstack/react-query";
const CategorySubGroups = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [categorySubGroups, setCategorySubGroups] = useState<
    CategorySubGroup[]
  >([]);
  const [parentOptions, setParentOptions] = useState<
    {
      value: string;
      label: string;
      count: number;
    }[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const { data, isFetching, refetch } = useCategorySubGroupsForAdmin(
    page,
    limit
  );
  useEffect(() => {
    if (data?.data) {
      setCategorySubGroups(data.data);
      setMeta(data.meta || null);
      // Lọc ra danh sách parent không trùng
      const parentCountMap: Map<string, number> = new Map();
      data.data.forEach((item: CategorySubGroup) => {
        if (item.parent && item.parent.id) {
          const parentId = item.parent.id.toString();
          parentCountMap.set(parentId, (parentCountMap.get(parentId) || 0) + 1);
        }
      });

      // Lọc ra danh sách parent không trùng và thêm số lượng
      const uniqueParents = Array.from(
        new Map(
          data.data
            .filter((item: CategorySubGroup) => item.parent)
            .map((item) => [item.parent!.id, item.parent!])
        ).values()
      );

      const options = uniqueParents.map((item) => ({
        value: item.id.toString(),
        label: item.name,
        count: parentCountMap.get(item.id.toString()) || 0, // Thêm số lượng
      }));

      setParentOptions(options);
    }
  }, [data]);
  const [open, setOpen] = useState(false);
  const [categorySubGroup, setCategorySubGroup] =
    useState<CategorySubGroup | null>(null);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State cho dialog xác nhận xóa
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Khi mở sheet từ columns
  const handleEdit = (categorySubGroup: CategorySubGroup) => {
    setCategorySubGroup(categorySubGroup);
    setOpen(true);
  };
  console.log(selectedRows);
  const queryClient = useQueryClient();

  const handleSubmit = async (data: {
    name: string;
    description: string;
    id?: number;
    parentId: number;
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
          ["categorySubGroupsForAdmin",page,limit],
          (oldData?: {
            status?: string;
            message?: string;
            data?: CategorySubGroup[];
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
        toast.success(
          data.id ? "Cập nhật thành công!" : "Thêm mới thành công!"
        );
        setOpen(false);
      }
    } catch {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };
  const status_options = [
    {
      value: "active",
      label: "Hoat động",
    },
    {
      value: "inactive",
      label: "Bị khóa",
    },
  ];
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
          refetch();
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
  const handlePageChange = (page: number) => {
    setPage(page);
    console.log("Page changed:", page);
  };
  const handleLimitChange = (limit: number) => {
    setLimit(limit);
    setPage(1);
    console.log("Limit changed:", limit);
  };
  return (
    <div className="my-5">
      <div className="rounded-md">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-3xl font-bold">Danh sách danh mục</h1>
          <div className="flex items-center gap-2">
            <RefreshData getData={refetch} />
            <Button
              className="border-dashed !bg-accent-foreground "
              variant="default"
              size="sm"
              onClick={() => {
                handleOpenChange(true);
                setCategorySubGroup(null);
              }}
            >
              Thêm mới
            </Button>
            <AddEditCategorySubGroup
              open={open}
              setOpen={handleOpenChange}
              categorySubGroup={categorySubGroup}
              onSubmit={handleSubmit}
              parents={data?.parents} // Truyền props parents vào sheet
            />
          </div>
        </div>
        {isFetching ? (
          <DataTableLoading
            columnCount={columns(handleEdit, handleDelete).length}
            rowCount={10}
            filterCount={3}
          />
        ) : (
          <DataTable
            data={categorySubGroups || []}
            columns={columns(handleEdit, handleDelete)}
            onRowSelectionChange={setSelectedRows}
            meta={meta}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            filterOptions={{
              status: status_options,
              parent: parentOptions,
            }}
            // refreshData={refetch}
          />
        )}
      </div>
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
            <AlertDialogCancel disabled={loading}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              disabled={loading}
              onClick={confirmDelete}
              className="!bg-accent-foreground"
            >
              {loading && (
                <svg
                  className="text-accent-foreground animate-spin"
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
                    className="text-accent"
                  ></path>
                </svg>
              )}
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategorySubGroups;
