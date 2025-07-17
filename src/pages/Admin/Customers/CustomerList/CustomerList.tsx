import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableLoading } from "@/components/data-table/data-table-skeleton";
import RefreshData from "@/components/refresh-data";
import { Customer } from "@/types";
import { getCustomers } from "@/services/adminServices";
import { CustomerAddEdit } from "../CustomerAddEdit/CustomerAddEdit";
import { columns } from "./columns";

const CustomerList = () => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>();
  const handleGetCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getCustomers();
      if (result.status === "success") {
        setCustomers(result.data);
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
    handleGetCustomers();
  }, [handleGetCustomers]);

  const statusOptions = [
    { label: "Hoạt động", value: "active" },
    {
      label: "Chưa kích hoạt",
      value: "inactive",
    },
    { label: "Bị khóa", value: "ban" },
  ];

  const [selectedRows, setSelectedRows] = useState<(string|number)[]>([]);
  console.log(selectedRows);
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const handleEdit = (customer: Customer) => {
    setCustomer(customer);
    setOpen(true);
  };
  return (
    <div className="my-5">
      <div className=" rounded-md">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-3xl font-bold">Danh sách khách hàng</h1>
          <div className="flex items-center gap-2">
            <RefreshData getData={handleGetCustomers} />

            <Button
              className="!bg-accent-foreground"
              variant="default"
              size="sm"
              onClick={() => {
                setOpen(true);
                if (customer) {
                  setCustomer(null);
                }
              }}
            >
              Thêm mới
            </Button>
            <CustomerAddEdit
              customer={customer}
              open={open}
              // onSubmit={handleCustomerSubmit}
              setOpen={setOpen}
            />
          </div>
        </div>
        {loading ? (
          <DataTableLoading
            columnCount={columns(handleEdit).length}
            rowCount={15}
          />
        ) : (
          <DataTable
            data={customers || []}
            columns={columns(handleEdit)}
            onRowSelectionChange={setSelectedRows}
            filterOptions={{
              status: statusOptions,
            }}
            searchKey="full_name"
          />
        )}
      </div>
    </div>
  );
};
export default CustomerList;
