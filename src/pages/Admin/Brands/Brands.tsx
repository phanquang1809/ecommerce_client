import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableLoading } from "@/components/data-table/data-table-skeleton";
import RefreshData from "@/components/refresh-data";
import { Brand } from "./Brand.type";
import { columns as brandColumns } from "./columns"; // hoặc "./brandColumns"
import BrandEditDialog from "./BrandEditDialog";
import { useBrands } from "@/services/admin/brands/brandsServices";

const BrandList = () => {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [editOpen, setEditOpen] = useState(false);

  const { data, isFetching, refetch } = useBrands(page, limit);

  const handleEdit = useCallback((brand: Brand) => {
    setBrand(brand);
    setEditOpen(true);
  }, []);

  const statusOptions = [
    { label: "Hoạt động", value: "active" },
    { label: "Ngừng hoạt động", value: "inactive" },
  ];

  const memoizedColumns = useMemo(() => brandColumns(handleEdit), [handleEdit]);

  return (
    <div className="my-5">
      <div className="rounded-md">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-3xl font-bold">Danh sách thương hiệu</h1>
          <div className="flex items-center gap-2">
            <RefreshData getData={refetch} />
            <Button
              className="!bg-accent-foreground"
              variant="default"
              size="sm"
              onClick={() => {
                setBrand(null); // 👉 reset để mở form thêm mới
                setEditOpen(true);
              }}
            >
              Thêm mới
            </Button>
          </div>
        </div>

        {isFetching || !data ? (
          <DataTableLoading
            columnCount={memoizedColumns.length}
            rowCount={15}
          />
        ) : (
          <DataTable
            data={data.data || []}
            columns={memoizedColumns}
            onRowSelectionChange={setSelectedRows}
            selectedRows={selectedRows}
            filterOptions={{ status: statusOptions }}
            onPageChange={setPage}
            onLimitChange={setLimit}
            meta={data.meta}
            searchKey="name"
          />
        )}
      </div>

      <BrandEditDialog
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          if (!brand) setBrand(null);
        }}
        brand={brand}
        onUpdated={() => {
          refetch();
        }}
      />
    </div>
  );
};

export default BrandList;
