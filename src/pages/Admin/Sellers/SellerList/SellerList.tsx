import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableLoading } from "@/components/data-table/data-table-skeleton";
import RefreshData from "@/components/refresh-data";
import { Shop } from "@/types";
import { getShops } from "@/services/admin/adminServices";
import { columns } from "./columns";

const SellerList = () => {
  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState<Shop[]>();
  const handleGetShops = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getShops();
      if (result.status === "success") {
        setShops(result.data);
      } else {
        console.log("Lỗi khi lấy dữ liệu", result.message);
      }
    } catch (error) {
      console.error("Lỗi không xác định:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetShops();
  }, [handleGetShops]);

  const statusOptions = [
    { label: "Hoạt động", value: "active" },
    {
      label: "Chờ duyệt",
      value: "pending",
    },
    { label: "Bị khóa", value: "banned" },
  ];

  const [selectedRows, setSelectedRows] = useState<(string|number)[]>([]);
  console.log(selectedRows);
  return (
    <div className="my-5">
      <div className=" rounded-md">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-3xl font-bold">Danh sách cửa hàng</h1>
          <div className="flex items-center gap-2">
            <RefreshData getData={handleGetShops} />
            <Button
              className="!bg-accent-foreground"
              variant="default"
              size="sm"
            >
              Thêm mới
            </Button>
          </div>
        </div>
        {loading ? (
          <DataTableLoading
            columnCount={columns().length}
            rowCount={15}
          />
        ) : (
          <DataTable
            data={shops || []}
            columns={columns()}
            onRowSelectionChange={setSelectedRows}
            filterOptions={{
              status: statusOptions,
            }}
            searchKey="name"
          />
        )}
      </div>
    </div>
  );
};
export default SellerList;
