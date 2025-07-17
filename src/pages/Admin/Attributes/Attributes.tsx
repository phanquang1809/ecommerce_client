import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableLoading } from "@/components/data-table/data-table-skeleton";
import RefreshData from "@/components/refresh-data";
import { Attribute } from "./Attribute.type";
import { useAttributes } from "@/services/admin/attributes/attributesService";
import { columns } from "./columns";
import AttributeEditDialog from "./AttributeEditDialog";

const AttributeList = () => {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [attribute, setAttribute] = useState<Attribute | null>(null);
  console.log(attribute);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isFetching, refetch } = useAttributes(page, limit);
  const [editOpen, setEditOpen] = useState(false);

  const handleEdit = (attribute: Attribute) => {
    setAttribute(attribute);
    setEditOpen(true);
  };
  const statusOptions = [
    { label: "Hoạt động", value: "active" },
    { label: "Chưa kích hoạt", value: "inactive" },
    { label: "Bị khóa", value: "ban" },
  ];
  return (
    <div className="my-5">
      <div className="rounded-md">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-3xl font-bold">Danh sách thuộc tính</h1>
          <div className="flex items-center gap-2">
            <RefreshData getData={refetch} />
            <Button
              className="!bg-accent-foreground"
              variant="default"
              size="sm"
              onClick={() => {
                setAttribute(null); // 👉 reset về null để form là thêm mới
                setEditOpen(true);
              }}
            >
              Thêm mới
            </Button>
          </div>
        </div>
        {isFetching || !data ? (
          <DataTableLoading
            columnCount={columns(handleEdit).length}
            rowCount={15}
          />
        ) : (
          <DataTable
            data={data.data || []}
            columns={columns(handleEdit)}
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
      <AttributeEditDialog
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          if(!attribute) setAttribute(null);
        }}
        attribute={attribute}
        onUpdated={() => {
          refetch();
        }}
      />
    </div>
  );
};

export default AttributeList;
