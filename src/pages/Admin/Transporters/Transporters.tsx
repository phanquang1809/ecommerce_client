import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableLoading } from "@/components/data-table/data-table-skeleton";
import RefreshData from "@/components/refresh-data";
import { columns } from "./columns";
import { Transporter } from "../../../features/transporters/types/transporter.type";
import { getTransporters, updateTransporterStatus } from "@/services/admin/transporters/transporterServices";
import TransportersDialog from "@/features/transporters/components/TransportersDialog";

const Transporters = () => {
  const [loading, setLoading] = useState(false);
  const [transporters, setTransporters] = useState<Transporter[]>();
  const handleGetTransporters = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getTransporters();
      if (result.status === "success") {
        setTransporters(result.data);
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
    handleGetTransporters();
  }, [handleGetTransporters]);

  const statusOptions = [
    { label: "Hoạt động", value: "active" },
    {
      label: "Bị khóa",
      value: "inactive",
    },
  ];
  const [selectedRows, setSelectedRows] = useState<(string|number)[]>([]);
  const [transporter, setTransporter] = useState<Transporter | null>(null);
  const [open, setOpen] = useState(false);
  console.log(selectedRows);
  const handleEdit = (transporter: Transporter) => {
    setTransporter(transporter);
    setOpen(true);
    // Thực hiện hành động chỉnh sửa tại đây
  };
  const handleAddTransporter = () => {
    setTransporter(null);
    setOpen(true);
  };
  const handleCloseTransporterDialog = () => {
    setOpen(false);
  };
const handleSubmit = (data: Transporter) => {
  setTransporters((prev) => {
    const exists = prev?.some((item) => item.id === data.id);
    if (exists) {
      return prev?.map((item) => (item.id === data.id ? data : item));
    } else {
      return [...(prev ?? []), data];
    }
  });
  handleCloseTransporterDialog();
};
const handleUpdateTranporterStatus = async(id:string, status: "active" | "inactive") => {
  const response = await updateTransporterStatus(parseInt(id), status);
  if(response.status === "success") {
    setTransporters((prev) => prev?.map((item) => item.id === id ? {...item, status} : item));
  }
};
  return (
    <div className="my-5">
      <div className=" rounded-md">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-3xl font-bold">Danh sách đơn vị vận chuyển</h1>
          <div className="flex items-center gap-2">
            <RefreshData getData={handleGetTransporters} />
            <Button
              className="!bg-accent-foreground"
              variant="default"
              size="sm"
              onClick={handleAddTransporter}
            >
              Thêm mới
            </Button>
          </div>
        </div>
        {loading ? (
          <DataTableLoading
            columnCount={columns(handleEdit,handleUpdateTranporterStatus).length}
            rowCount={15}
          />
        ) : (
          <DataTable
            data={transporters || []}
            columns={columns(handleEdit,handleUpdateTranporterStatus)}
            onRowSelectionChange={setSelectedRows}
            filterOptions={{
              status: statusOptions,
            }}
            searchKey="name"
          />
        )}
      </div>
      <TransportersDialog
        onSubmit={handleSubmit}
        transporter={transporter}
        open={open}
        onClose={() => handleCloseTransporterDialog()}
      />
    </div>
  );
};
export default Transporters;
