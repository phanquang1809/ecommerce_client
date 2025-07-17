import { Label } from "@/components/ui/label";
import { Transporter } from "../types/transporter.type";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import {
  createTransporter,
  updateTransporter,
} from "@/services/admin/transporters/transporterServices";
import { cn } from "@/lib/utils";

interface TransportersDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (transporter: Transporter) => void;
  transporter?: Transporter | null;
}

export default function TransportersDialog({
  open,
  onClose,
  onSubmit,
  transporter,
}: TransportersDialogProps) {
  const [currentTransporter, setCurrentTransporter] =
    useState<Transporter | null>(null);

  const [errors, setErrors] = useState({
    name: "",
    api_url: "",
    api_token: "",
  });

  useEffect(() => {
    if (transporter) {
      setCurrentTransporter(transporter);
    } else {
      setCurrentTransporter({
        id: "",
        name: "",
        api_url: "",
        api_token: "",
        status: "active",
      });
      setErrors({ name: "", api_url: "", api_token: "" });
    }
  }, [transporter]);
  console.log(currentTransporter);
  
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Transporter
  ) => {
    const value = e.target.value;
    setErrors((prev) => ({
      ...prev,
      [field]: value.trim() ? "" : "Dữ liệu không được trống",
    }));

    setCurrentTransporter((prev) =>
      prev ? { ...prev, [field]: value } : prev
    );
  };

  const handleStatusChange = (checked: boolean) => {
    setCurrentTransporter((prev) =>
      prev ? { ...prev, status: checked ? "active" : "inactive" } : prev
    );
  };

  const handleSubmit = async () => {
    if (!currentTransporter) return;

    const formData = new FormData();
    formData.append("name", currentTransporter.name);
    formData.append("api_url", currentTransporter.api_url);
    formData.append("api_token", currentTransporter.api_token);
    formData.append("status", currentTransporter.status);
    if (currentTransporter.id) {
      formData.append("_method", "PUT");
    }
    const response =
      currentTransporter.id === ""
        ? await createTransporter(formData)
        : await updateTransporter(formData, parseInt(currentTransporter.id));

    if (response.status === "success") {
      onSubmit(response.data);
    }
  };
const isFormValid = () => {
  return (
    currentTransporter &&
    currentTransporter.name.trim() !== "" &&
    currentTransporter.api_url.trim() !== "" &&
    currentTransporter.api_token.trim() !== "" &&
    Object.values(errors).every((error) => error === "")
  );
};
  const handleClose = () => {
    if(currentTransporter?.id==="")
    {
      setCurrentTransporter({
        id: "",
        name: "",
        api_url: "",
        api_token: "",
        status: "active",
      });
    }
    setErrors({ name: "", api_url: "", api_token: "" });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {currentTransporter?.id
              ? "Cập nhật đơn vị vận chuyển"
              : "Thêm đơn vị vận chuyển"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Tên đơn vị */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Tên đơn vị</Label>
            <Input
              id="name"
              value={currentTransporter?.name || ""}
              className={cn(errors.name && "!ring-red-500 !border-red-500")}
              onChange={(e) => handleTextChange(e, "name")}
            />
            <span className="text-red-500 text-xs min-h-[16px]">
              {errors.name}
            </span>
          </div>

          {/* API URL */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="api_url">Đường dẫn kết nối</Label>
            <Input
              id="api_url"
              value={currentTransporter?.api_url || ""}
              className={cn(errors.api_url && "!ring-red-500 !border-red-500")}
              onChange={(e) => handleTextChange(e, "api_url")}
            />
            <span className="text-red-500 text-xs min-h-[16px]">
              {errors.api_url}
            </span>
          </div>

          {/* API Token */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="api_token">API Token</Label>
            <Input
              id="api_token"
              value={currentTransporter?.api_token || ""}
              className={cn(errors.api_token && "!ring-red-500 !border-red-500")}
              onChange={(e) => handleTextChange(e, "api_token")}
            />
            <span className="text-red-500 text-xs min-h-[16px]">
              {errors.api_token}
            </span>
          </div>

          {/* Trạng thái */}
          <div className="flex items-center gap-2">
            <Label htmlFor="status">Trạng thái:</Label>
            <Switch
              id="status"
              defaultChecked={currentTransporter?.status === "active"}
              onCheckedChange={handleStatusChange}
            />
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={handleClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid()}>
            {currentTransporter?.id ? "Lưu thay đổi" : "Thêm mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
