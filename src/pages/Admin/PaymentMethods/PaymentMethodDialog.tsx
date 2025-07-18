import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import {
  createPaymentMethod,
  updatePaymentMethod,
} from "@/services/admin/payment-methods/paymentMethodServices";

import { PaymentMethod } from "./PaymentMethod.type";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"; // ✅ shadcn switch

interface Props {
  open: boolean;
  onClose: () => void;
  method: PaymentMethod | null;
  onUpdated: () => void;
}

export default function PaymentMethodDialog({
  open,
  onClose,
  method,
  onUpdated,
}: Props) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true); // ✅ trạng thái bật/tắt
  const [loading, setLoading] = useState(false);
const resetForm = () => {
  setName("");
  setCode("");
  setDescription("");
  setIsActive(true);
};
  useEffect(() => {
    if (method) {
      setName(method.name || "");
      setCode(method.code || "");
      setDescription(method.description || "");
      setIsActive(method.is_active); // ✅ load trạng thái từ method
    } else {
      setName("");
      setCode("");
      setDescription("");
      setIsActive(true); // mặc định active khi thêm mới
    }
  }, [method]);

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      name,
      code,
      description,
      is_active: isActive, // ✅ gửi trạng thái bật/tắt
    };

    const res = method
      ? await updatePaymentMethod(method.id, payload)
      : await createPaymentMethod(payload);

    setLoading(false);

    if (res.status === "success") {
      toast.success(method ? "Cập nhật thành công" : "Tạo mới thành công");
      onUpdated();
resetForm(); // ✅ thêm dòng này để xóa dữ liệu
onClose();
    } else {
      toast.error(res.message || "Thao tác thất bại");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {method ? "Cập nhật phương thức thanh toán" : "Thêm phương thức mới"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label className="block mb-2">Tên</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              placeholder="Ví dụ: Chuyển khoản ngân hàng"
            />
          </div>

          <div>
            <Label className="block mb-2">Mã code</Label>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={loading}
              placeholder="Ví dụ: bank_transfer, momo, cod"
            />
          </div>

          <div>
            <Label className="block mb-2">Mô tả</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              placeholder="Ghi chú hiển thị cho người dùng"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Trạng thái</Label>
            <Switch
              checked={isActive}
              onCheckedChange={(checked) => setIsActive(checked)}
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={onClose}
            variant="outline"
            disabled={loading}
            size="sm"
            className="rounded"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            size="sm"
            className="rounded"
          >
            {loading && <Loader className="w-4 h-4 animate-spin mr-2" />}
            {method ? "Cập nhật" : "Thêm mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
