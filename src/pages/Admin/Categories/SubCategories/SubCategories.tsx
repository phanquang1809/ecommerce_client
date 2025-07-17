import { useCallback, useEffect, useState } from "react";
import { CategorySubGroup } from "@/types";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import {
  updateCategorySubGroupOrder,
  useSubCategoriesForAdmin,
} from "@/services/admin/adminServices";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableLoading } from "@/components/data-table/data-table-skeleton";
import AddEditCategorySubGroup from "./SubCategoryAddEdit";
import RefreshData from "@/components/refresh-data";
import { Separator } from "@/components/ui/separator";
import { CircleCheck, Trash2, X } from "lucide-react";
import {
  addCategory,
  updateCategory,
} from "@/services/admin/categories/categoryGroupServices";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const SubCategories = () => {
  const [tableVersion, setTableVersion] = useState(0);
  const [categorySubGroups, setCategorySubGroups] =
    useState<CategorySubGroup[]>();
  const [parentOptions, setParentOptions] = useState<
    {
      value: string;
      label: string;
      // count: number; // Thêm count để lưu số lượng
    }[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState<{
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
  } | null>(null);
  const handlePageChange = (page: number) => {
    setPage(page);
    setTableVersion((prev) => prev + 1);
    console.log("Page changed:", page);
  };
  const handleLimitChange = (limit: number) => {
    setLimit(limit);
    setPage(1);
    setTableVersion((prev) => prev + 1);
    console.log("Limit changed:", limit);
  };
  const { data, isFetching, refetch } = useSubCategoriesForAdmin(page, limit);
  useEffect(() => {
    if (data?.data) {
      setCategorySubGroups(data.data);
      setMeta(data.meta || null);
      setTableVersion((prev) => prev + 1);
      const options = data.parents?.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      }));
      setParentOptions(options || []);
    }
  }, [data]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const handeSortChange = (value: boolean) => {
    setIsSorting(value);
    setTableVersion((prev) => prev + 1);
  };
  const handleOrderChange = useCallback((newData: CategorySubGroup[]) => {
    const sortedIds = newData.map((item) => item.id);
    updateCategorySubGroupOrder(sortedIds);
    setCategorySubGroups(newData);
    setTableVersion((prev) => prev + 1);
  }, []);
  const [open, setOpen] = useState(false);
  const [categorySubGroup, setCategorySubGroup] =
    useState<CategorySubGroup | null>(null);

  // Khi mở sheet từ columns
  const handleEdit = (categorySubGroup: CategorySubGroup) => {
    setCategorySubGroup(categorySubGroup);
    setOpen(true);
  };
  console.log(selectedRows);
  const [loading, setLoading] = useState(false);
  console.log(loading);
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
        response = await updateCategory(data);
      } else {
        response = await addCategory(data);
      }
      if (response?.data) {
        queryClient.setQueryData(
          ["subCategoriesForAdmin",page,limit],
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
        setTableVersion((prev) => prev + 1);
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
    setTableVersion((prev) => prev + 1); // Tăng version khi sheet thay đổi
  };
  const handleClearSelection = () => {
    setSelectedRows([]);
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
            columnCount={columns(handleEdit, isSorting).length}
            rowCount={limit}
            filterCount={3}
          />
        ) : (
          <DataTable
            data={categorySubGroups || []}
            meta={meta}
            selectedRows={selectedRows}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            columns={columns(handleEdit, isSorting)}
            onRowSelectionChange={setSelectedRows}
            onOrderChange={handleOrderChange}
            onSortingChange={handeSortChange}
            filterOptions={{
              status: status_options,
              parent: parentOptions,
            }}
            // refreshData={refetch}
            version={tableVersion}
          />
        )}
      </div>
      {selectedRows.length > 0 && (
        <div className="fixed inset-x-0 bottom-6 z-50 mx-auto flex w-fit flex-wrap items-center justify-center gap-2 rounded-md border bg-background p-2 text-foreground shadow-sm">
          <div className="flex h-7 items-center rounded-md border pr-1 pl-2.5">
            <span className="whitespace-nowrap text-xs">
              {selectedRows.length} đã chọn
            </span>
            <Separator
              orientation="vertical"
              className="!h-4 mr-1 ml-2 text-muted-foreground"
            />
            <Button
              variant="ghost"
              className="h-6 w-6"
              onClick={handleClearSelection}
            >
              <X />
            </Button>
          </div>
          <Separator
            orientation="vertical"
            className="!h-4 text-muted-foreground"
          />
          <div className="flex items-center gap-1.5">
            <Button variant="outline" className="h-7 w-7">
              <CircleCheck />
            </Button>
            <Button
              variant="outline"
              className="h-7 w-7"
              onClick={() => handleClearSelection()}
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubCategories;
