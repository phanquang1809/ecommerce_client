import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableLoading } from "@/components/data-table/data-table-skeleton";
import RefreshData from "@/components/refresh-data";
import {
  getProductForQuickEdit,
  updateProductStatus,
  updateProductStatusAll,
  useProductList,
} from "@/services/seller/productServices";
import { useNavigate } from "react-router-dom";
import { Product } from "@/features/products/types/product.type";
import { columns } from "./columns";
import QuickEditPriceDialog from "@/features/products/components/QuickEditPriceDialog";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Loader, Trash2, X } from "lucide-react";
import useUserStore from "@/store/userStore";
import { useQueryClient } from "@tanstack/react-query";



const ProductList = () => {
  const { user } = useUserStore();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isFetching } = useProductList({ page, limit });
  const products = useMemo(() => data?.data ?? [], [data]);
  const meta = data?.meta ?? null;
  const queryClient = useQueryClient();
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  
  const categories = useMemo(() => {
    const uniqueMap = new Map<string, { label: string; value: string }>();
    products.forEach((p) => {
      const id = p.category?.id?.toString();
      const name = p.category?.name;
      if (id && !uniqueMap.has(id)) {
        uniqueMap.set(id, { label: name || "", value: id });
      }
    });
    return Array.from(uniqueMap.values());
  }, [products]);

  // Khởi tạo selectedRows từ selectedProductsInit
 
  
  // Gửi danh sách sản phẩm được chọn qua onSelectProducts khi người dùng thay đổi
  

  // Cập nhật selectedRows khi người dùng chọn/bỏ chọn
  const handleRowSelectionChange = useCallback(
    (newSelectedRows: (string | number)[]) => {
      setSelectedRows(newSelectedRows);
    },
    []
  );

  const [openDialogQuickEdit, setOpenDialogQuickEdit] = useState(false);
  const [productsForQuickEdit, setProductsForQuickEdit] =
    useState<Product | null>(null);
  const [loadingQuickEdit, setLoadingQuickEdit] = useState(false);
  const [allPrices, setAllPrices] = useState<number>(0);

  const navigate = useNavigate();

  const handleEdit = useCallback(
    (product: Product) => {
      navigate("/seller/products/edit/" + product.slug, {
        state: { product },
      });
    },
    [navigate]
  );

  const handlePriceChange = useCallback((sku: string, price: number) => {
    if (price < 0) return;
    setProductsForQuickEdit((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        variants: prev.variants.map((v) =>
          v.sku === sku ? { ...v, price: isNaN(price) ? 0 : price } : v
        ),
      };
    });
  }, []);

  const handleEditPrice = useCallback(async (product: Product) => {
    setOpenDialogQuickEdit(true);
    setLoadingQuickEdit(true);
    const response = await getProductForQuickEdit(product.slug || "");
    if (response.status === "success") {
      setProductsForQuickEdit(response.data);
    } else {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", response.message);
    }
    setLoadingQuickEdit(false);
  }, []);

  const handleQuickEdit = async () => {};

  const handleUpdateStatus = useCallback(
    async (slug: string, status: string) => {
      if (slug) {
        const response = await updateProductStatus(slug, status);
        if (response.status === "success") {
          queryClient.invalidateQueries({ queryKey: ["products"] });
          toast.success("Cập nhật trạng thái thành công!");
          setSelectedRows([]);
        }
      }
    },
    [queryClient]
  );

  const handleView = useCallback(
    (slug: string) => {
      window.open(`/products/${user?.shop?.slug}/${slug}`, "_blank");
    },
    [user?.shop?.slug]
  );

  const memoizedColumns = useMemo(
    () =>
      columns(
        handleEdit,
        handleView,
        handleEditPrice,
        handleUpdateStatus,
      ),
    [handleEdit, handleView, handleEditPrice, handleUpdateStatus, ]
  );

  const handleClearSelection = () => {
    setSelectedRows([]);
  };

  const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>(
    {
      active: false,
      inactive: false,
      delete: false,
    }
  );

  const handleUpdateStatusAll = async (status: string) => {
    if (selectedRows.length > 0) {
      try {
        setLoadingActions((prev) => ({ ...prev, [status]: true }));
        const response = await updateProductStatusAll(selectedRows, status);
        if (response.status === "success") {
          queryClient.invalidateQueries({ queryKey: ["products"] });
          toast.success("Cập nhật trạng thái thành công!");
          setSelectedRows([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingActions((prev) => ({ ...prev, [status]: false }));
      }
    }
  };
  
  return (
    <div className="my-5">
      <div className="rounded-md">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-3xl font-bold">Danh sách sản phẩm</h1>
          {(
            <div className="flex items-center gap-2">
              <RefreshData
                getData={() =>
                  queryClient.invalidateQueries({ queryKey: ["products"] })
                }
              />
              <Button
                className="!bg-accent-foreground"
                variant="default"
                size="sm"
                onClick={() => navigate("/seller/products/add")}
              >
                Thêm mới
              </Button>
            </div>
          )}
        </div>
        {isLoading || isFetching ? (
          <DataTableLoading
            columnCount={memoizedColumns.length}
            rowCount={15}
          />
        ) : (
          <DataTable
            data={products || []}
            columns={memoizedColumns}
            selectedRows={selectedRows}
            meta={meta}
            onPageChange={setPage}
            onLimitChange={setLimit}
            onRowSelectionChange={handleRowSelectionChange}
            filterOptions={{ category: categories }}
            searchKey="name"
          />
        )}
      </div>
      <QuickEditPriceDialog
        open={openDialogQuickEdit}
        onClose={() => setOpenDialogQuickEdit(false)}
        loading={loadingQuickEdit}
        product={productsForQuickEdit}
        onPriceChange={handlePriceChange}
        allPrices={allPrices}
        setAllPrices={setAllPrices}
        onApplyAllPrices={() => {
          setProductsForQuickEdit((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              variants: prev.variants.map((v) => ({ ...v, price: allPrices })),
            };
          });
        }}
        onSubmit={handleQuickEdit}
      />
      {selectedRows.length > 0  && (
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
            {products.some(
              (p) => p.status === "inactive" && selectedRows.includes(p.id)
            ) && (
              <Button
                variant="outline"
                className="h-7 w-7 !bg-primary"
                onClick={() => handleUpdateStatusAll("active")}
              >
                {loadingActions["active"] ? (
                  <Loader className="animate-spin" />
                ) : (
                  <Eye className="text-background" />
                )}
              </Button>
            )}
            {products.some(
              (p) => p.status === "active" && selectedRows.includes(p.id)
            ) && (
              <Button
                variant="outline"
                className="h-7 w-7"
                onClick={() => handleUpdateStatusAll("inactive")}
              >
                {loadingActions["inactive"] ? (
                  <Loader className="animate-spin" />
                ) : (
                  <EyeOff />
                )}
              </Button>
            )}
            <Button variant="outline" className="h-7 w-7">
              <Trash2 />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
