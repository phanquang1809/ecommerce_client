import { useCallback, useMemo, useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableLoading } from "@/components/data-table/data-table-skeleton";
import RefreshData from "@/components/refresh-data";
import {
  useOrderList,
  updateOrderStatus,
  Order,
} from "@/services/seller/orderServices";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { columns } from "./columns";

const OrderList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isFetching } = useOrderList({ page, limit });
  const orders = useMemo(() => data?.data ?? [], [data]);
  const meta = data?.meta ?? null;
  const queryClient = useQueryClient();
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  const navigate = useNavigate();

  const handleEdit = useCallback(
    (order: Order) => {
      navigate("/seller/orders/" + order.order_number);
    },
    [navigate]
  );

  const handleUpdateStatus = useCallback(
  async (number: string | number, status: string) => {
    if (number) {
      const response = await updateOrderStatus(String(number), status);
      if (response.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["orders"] });           // Danh sách đơn
        queryClient.invalidateQueries({ queryKey: ["order", number] });    // Chi tiết đơn hiện tại
        toast.success("Cập nhật trạng thái đơn hàng thành công!");
        setSelectedRows([]);
      }
    }
  },
  [queryClient]
);
  const memoizedColumns = useMemo(
    () => columns(handleEdit, handleUpdateStatus),
    [handleEdit, handleUpdateStatus]
  );

  return (
    <div className="my-5">
      <div className="rounded-md">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-3xl font-bold">Danh sách đơn hàng</h1>
          <RefreshData
            getData={() =>
              queryClient.invalidateQueries({ queryKey: ["orders"] })
            }
          />
        </div>
        {isLoading || isFetching ? (
          <DataTableLoading columnCount={memoizedColumns.length} rowCount={15} />
        ) : (
          <DataTable
            data={orders}
            columns={memoizedColumns}
            selectedRows={selectedRows}
            meta={meta}
            onPageChange={setPage}
            onLimitChange={setLimit}
            searchKey="order_number"
          />
        )}
      </div>
    </div>
  );
};

export default OrderList;
