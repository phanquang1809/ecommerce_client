import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { createAttributeValueByShop } from "@/services/seller";
import { Plus, XCircle } from "lucide-react";
// import { authApi } from "@/services/apiServices";

export default function ProductConfig({
  configs,
  onChange,
  initConfigs,
}: {
  configs: {
    id?: number;
    name: string;
    type: "attribute" | "brand";
    can_add_new?: boolean;
    values: { id: number; value: string; from_shop: boolean }[];
  }[];
  initConfigs?: { name: string; value: string }[];
  onChange?: (brandId: number | null, attrValueIds: number[]) => void;
}) {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [addingConfig, setAddingConfig] = useState<{
    id: number;
    name: string;
    type: "brand" | "attribute";
    value?: string;
  } | null>(null);
  console.log(configs);

  useEffect(() => {
    if (initConfigs && initConfigs.length > 0) {
      const initialSelected: Record<string, number> = {};
      for (const config of initConfigs) {
        initialSelected[config.name] = Number(config.value);
      }
      setSelected(initialSelected);
    }
  }, [initConfigs]);

  const handleChange = (
    config_id: number,
    type: "attribute" | "brand",
    configName: string,
    selectedId: string
  ) => {
    if (selectedId === "__add__") {
      setAddingConfig({ id: config_id, name: configName, type });
      setOpenDialog(true);
      return;
    }

    const id = Number(selectedId);
    const newSelected = { ...selected, [configName]: id };
    setSelected(newSelected);

    const brandId = configs.find((c) => c.type === "brand")?.name;
    const brand = brandId ? newSelected[brandId] : null;

    const attribute_value = configs
      .filter((c) => c.type === "attribute")
      .map((c) => newSelected[c.name])
      .filter(Boolean);
    onChange?.(brand ?? null, attribute_value);
  };

  const handleAddNew = async () => {
    if (!addingConfig || !newValue.trim()) return;

    if (addingConfig.type === "attribute") {
      const res = await createAttributeValueByShop({
        attributeId: addingConfig.id,
        value: newValue,
      });

      if (res.status === "success") {
        // Cập nhật configs tại chỗ
        configs
          .find((c) => c.id === addingConfig.id)
          ?.values.push({
            id: res.data.id,
            from_shop: true,
            value: newValue,
          });

        // Gán giá trị vừa thêm vào selected
        setSelected({ ...selected, [addingConfig.name]: res.data.id });

        // Lấy lại brand hiện tại nếu có
        const brandConfig = configs.find((c) => c.type === "brand")?.name;
        const brandId = brandConfig ? selected[brandConfig] : null;

        // Truyền lại brandId và toàn bộ attribute value hiện tại (bao gồm cái mới)
        const attribute_value = configs
          .filter((c) => c.type === "attribute")
          .map((c) => {
            if (c.name === addingConfig.name) {
              return res.data.id; // cái vừa thêm
            }
            return selected[c.name];
          })
          .filter(Boolean);

        onChange?.(brandId ?? null, attribute_value);

        setNewValue("");
        setOpenDialog(false);
      }
    }

    // Nếu sau này thêm brand, bạn có thể xử lý thêm ở đây
  };
  const handleClear = (configName: string) => {
    const newSelected = { ...selected };
    delete newSelected[configName];
    setSelected(newSelected);

    const brandId = configs.find((c) => c.type === "brand")?.name;
    const brand = brandId ? newSelected[brandId] : null;

    const attribute_value = configs
      .filter((c) => c.type === "attribute")
      .map((c) => newSelected[c.name])
      .filter(Boolean);

    onChange?.(brand ?? null, attribute_value);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {configs.map((config) => (
          <div key={config.name} className="flex flex-col gap-1">
            <label className="font-medium text-sm">{config.name}</label>
            <div className="relative group">
              <Select
                onValueChange={(val) =>
                  handleChange(config.id ?? 0, config.type, config.name, val)
                }
                value={selected[config.name]?.toString() ?? ""}
              >
                <SelectTrigger className="w-full !border-muted !ring-0">
                  <SelectValue
                    placeholder={`Chọn ${config.name.toLowerCase()}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {config.values
                    .filter((item) => !item.from_shop)
                    .map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.value}
                      </SelectItem>
                    ))}
                  {config.values.some((item) => item.from_shop) && (
                    <>
                      <div className="my-1" />
                      <div className="px-2 py-1 text-xs text-muted-foreground">
                        Tự điền
                      </div>
                      {config.values
                        .filter((item) => item.from_shop)
                        .map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.value}
                          </SelectItem>
                        ))}
                    </>
                  )}
                  {config.type=="attribute" && config.can_add_new && (
                    <>
                      <SelectItem value="__add__" className="flex items-center border-t">
                        <Plus className="size-4" /> Thêm thuộc tính mới
                      </SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              {selected[config.name] && (
                <XCircle
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Clearing", config.name); // Debug
                    handleClear(config.name);
                  }}
                  className="group-hover:opacity-100 opacity-0 duration-100 absolute right-10 top-1/2 -translate-y-1/2 hover:text-red-500 h-4 w-4 cursor-pointer"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm {addingConfig?.name}</DialogTitle>
          </DialogHeader>
          <Input
            placeholder={`Nhập ${addingConfig?.name}`}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddNew}>Thêm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
