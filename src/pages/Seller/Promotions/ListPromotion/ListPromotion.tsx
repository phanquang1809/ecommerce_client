import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { BadgePercent } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Promotion } from "../promotion.type";
import { getPromotions } from "@/services/promotionService";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";

export default function ListPromotion() {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [loading, setLoading] = useState(false);
console.log(loading);


  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const res = await getPromotions();
      setPromotions(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách khuyến mãi:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleEdit = (promotion: Promotion) => {
    navigate(`/seller/promotions/discount/edit/${promotion.id}`);
  };

  const memoizedColumns = useMemo(() => columns(handleEdit), []);

  return (
    <div className="my-5 space-y-5">
      {/* --- Tạo khuyến mãi --- */}
      <div className="border p-5 rounded">
        <h2 className="text-2xl font-bold text-primary">Tạo khuyến mãi</h2>
        <p className="text-muted-foreground">
          Thiết lập các chương trình khuyến mãi riêng của Shop để tăng Doanh số
          và cải thiện tỉ lệ chuyển đổi.
        </p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex-1 border border-dashed border-primary rounded p-3">
            <h2 className="flex text-xl items-center text-primary">
              <BadgePercent className="mr-1" />
              Chương Trình Của Shop
            </h2>
            <p className="text-muted-foreground mt-3">
              Tạo chương trình giảm giá sản phẩm theo thời gian
            </p>
            <div className="flex mt-3">
              <Button
                className="ml-auto rounded"
                size="lg"
                onClick={() => navigate("/seller/promotions/discount/create")}
              >
                Tạo
              </Button>
            </div>
          </div>
          <div className="flex-1 border border-dashed border-primary rounded p-3">
            <h2 className="flex text-xl items-center text-primary">
              <BadgePercent className="mr-1" />
              Mã giảm giá
            </h2>
            <p className="text-muted-foreground mt-3">
              Tạo mã giảm giá để người mua nhập khi thanh toán
            </p>
            <div className="flex mt-3">
              <Button
                className="ml-auto rounded"
                size="lg"
                onClick={() => navigate("/seller/promotions/voucher/create")}
              >
                Tạo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Danh sách khuyến mãi --- */}
      <div className="border p-5 rounded">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Danh sách chương trình
        </h2>
        <DataTable
          data={promotions || []}
          columns={memoizedColumns}
          selectedRows={selectedRows}
          onRowSelectionChange={setSelectedRows}
          searchKey="name"
        />
      </div>
    </div>
  );
}
