import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableLoading } from "@/components/data-table/data-table-skeleton";
import RefreshData from "@/components/refresh-data";
import { PaymentMethod } from "./PaymentMethod.type";
import PaymentMethodDialog from "./PaymentMethodDialog";
import { columns } from "./columns";
import { usePaymentMethods } from "@/services/admin/payment-methods/paymentMethodServices";

const PaymentMethodList = () => {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [editOpen, setEditOpen] = useState(false);

  const { data, isFetching, refetch } = usePaymentMethods(page, limit);

  const handleEdit = useCallback((method: PaymentMethod) => {
    setMethod(method);
    setEditOpen(true);
  }, []);

  const statusOptions = [
    { label: "Hoạt động", value: "active" },
    { label: "Ngừng hoạt động", value: "inactive" },
  ];

  const memoizedColumns = useMemo(() => columns(handleEdit), [handleEdit]);

  return (
    <div className="my-5">
      <div className="rounded-md">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-3xl font-bold">Phương thức thanh toán</h1>
          <div className="flex items-center gap-2">
            <RefreshData getData={refetch} />
            <Button
              className="!bg-accent-foreground"
              variant="default"
              size="sm"
              onClick={() => {
                setMethod(null);
                setEditOpen(true);
              }}
            >
              Thêm mới
            </Button>
          </div>
        </div>

        {isFetching || !data ? (
          <DataTableLoading columnCount={memoizedColumns.length} rowCount={15} />
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

      <PaymentMethodDialog
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          if (!method) setMethod(null);
        }}
        method={method}
        onUpdated={refetch}
      />
    </div>
  );
};

export default PaymentMethodList;
