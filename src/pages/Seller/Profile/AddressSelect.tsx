import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, CircleSlash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useVietnamProvinces } from "@/services/admin/adminServices";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Address = {
  label: string;
  value: string;
  children?: Address[];
};

export default function AddressSelect({
  title,
  open,
  onOpenChange,
  onConfirm,
  address,
}: {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (selected: {
    province: Address;
    district: Address;
    ward: Address;
    addressDetail: string;
  }) => void;
  address: {
    province: Address;
    district: Address;
    ward: Address;
    addressDetail: string;
  };
}) {
  const [province, setProvince] = useState<Address | null>(null);
  const [district, setDistrict] = useState<Address | null>(null);
  const [ward, setWard] = useState<Address | null>(null);
  const [search, setSearch] = useState<string>("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [fullAddresses, setFullAddresses] = useState<Address[]>([]);

  // Thêm các trạng thái để lưu họ tên và số điện thoại
 
  const [addressDetail, setAddressDetail] = useState<string>("");
  
  const resetLowerLevels = (from: number) => {
    if (from <= 1) setDistrict(null);
    if (from <= 2) setWard(null);
  };
  
  const { data, isLoading, error } = useVietnamProvinces();
  useEffect(() => {
    if (!isLoading && !error && data) {
      setAddresses(data); // Hiển thị
      setFullAddresses(data); // Gốc
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    if (!open) {
      setAddressDetail("");
      setSearch("");
      setProvince(null);
      setDistrict(null);
      setWard(null);
    } else {
      if (address) {
        setProvince(address.province);
        setDistrict(address.district);
        setWard(address.ward);
        setAddressDetail(address.addressDetail);

        setTimeout(() => {
          // Scroll to province
          const provinceIndex = fullAddresses.findIndex(
            (item) => item.value === address.province.value
          );
          if (provinceIndex !== -1 && provinceRefs.current[provinceIndex]) {
            provinceRefs.current[provinceIndex].scrollIntoView({
              behavior: "auto",
              block: "start",
            });
          }
          // Scroll to district
          const districts = address.province.children || [];
          const districtIndex = districts.findIndex(
            (d) => d.value === address.district.value
          );
          if (districtIndex !== -1 && districtRefs.current[districtIndex]) {
            districtRefs.current[districtIndex].scrollIntoView({
              behavior: "auto",
              block: "start",
            });
          }

          // Scroll to ward
          const wards = address.district.children || [];
          const wardIndex = wards.findIndex(
            (w) => w.value === address.ward.value
          );
          if (wardIndex !== -1 && wardRefs.current[wardIndex]) {
            wardRefs.current[wardIndex].scrollIntoView({
              behavior: "auto",
              block: "start",
            });
          }
        }, 100);
      }
    }
  }, [open, address, fullAddresses]);
  const provinceRefs = useRef<HTMLDivElement[]>([]);
  const districtRefs = useRef<HTMLDivElement[]>([]);
  const wardRefs = useRef<HTMLDivElement[]>([]);

  const handleSearch = (search: string) => {
    if (!search) {
      setAddresses(data ?? []);
    } else {
      const filtered = fullAddresses.filter((addr) =>
        addr.label.toLowerCase().includes(search.toLowerCase())
      );
      setAddresses(filtered);
    }
  };
  useEffect(() => {
    handleSearch(search);
  }, [search]);
  const isFormValid =
    !!ward &&
    !!addressDetail
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="">
            <Input
              placeholder="Tìm tỉnh/thành phố"
              className="w-60"
              endIcon={Search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {addresses.length > 0 ? (
            <div className="grid grid-cols-3 bg-background p-2 border rounded">
              {/* Provinces */}
              <ScrollArea className="h-60 border-r">
                {addresses.map((item, index) => (
                  <div
                    key={item.value}
                    onClick={() => {
                      setProvince(item);
                      resetLowerLevels(1);
                    }}
                    ref={(el) => {
                      provinceRefs.current[index] = el!;
                    }}
                    className={`cursor-pointer p-2 text-sm flex justify-between items-center rounded ${
                      province?.value === item.value
                        ? "font-semibold text-primary"
                        : ""
                    }`}
                  >
                    {item.label}
                    <ChevronRight className="size-4" />
                  </div>
                ))}
              </ScrollArea>

              {/* Districts */}
              <ScrollArea className="h-60 border-r">
                {province?.children?.map((item, index) => (
                  <div
                    key={item.value}
                    onClick={() => {
                      setDistrict(item);
                      resetLowerLevels(2);
                    }}
                    ref={(el) => {
                      districtRefs.current[index] = el!;
                    }}
                    className={`cursor-pointer p-2 text-sm flex justify-between items-center rounded ${
                      district?.value === item.value
                        ? "font-semibold text-primary"
                        : ""
                    }`}
                  >
                    {item.label}
                    <ChevronRight className="size-4" />
                  </div>
                ))}
              </ScrollArea>

              {/* Wards */}
              <ScrollArea className="h-60 ">
                {district?.children?.map((item, index) => (
                  <div
                    key={item.value}
                    onClick={() => setWard(item)}
                    ref={(el) => {
                      wardRefs.current[index] = el!;
                    }}
                    className={`cursor-pointer p-2 text-sm rounded ${
                      ward?.value === item.value
                        ? "font-semibold text-primary"
                        : ""
                    }`}
                  >
                    {item.label}
                  </div>
                ))}
              </ScrollArea>
            </div>
          ) : (
            <div className="h-60 w-full flex items-center justify-center flex-col gap-2">
              <CircleSlash2 className="size-25" />
              <p>Không tìm thấy kết quả phù hợp</p>
            </div>
          )}

          <div className="">
            <Label className="font-semibold mb-1">
              {" "}
              <span className="text-rose-400">*</span>Địa chỉ cụ thể
            </Label>
            <Textarea
              placeholder="Số nhà, tên đường, thôn xóm..."
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
              className="!ring-0"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <DialogClose asChild>
            <Button className="rounded" size="sm" variant="ghost">Hủy</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
            className="rounded"
            size="sm"
              disabled={!isFormValid}
              onClick={() =>
                onConfirm({
                  province: province!,
                  district: district!,
                  ward: ward!,
                  addressDetail: addressDetail,
                })
              }
            >
              Xác nhận
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
