import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Customer } from "@/types";
interface AddEditCustomerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  customer: Customer | null;
}
export function CustomerAddEdit({
    open,
    setOpen,
    customer,
  }: AddEditCustomerProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{customer?"Cập nhật thông tin":"Thêm khách hàng"}</DialogTitle>
          <DialogDescription>
            Lưu ý thông tin thay đổi sẽ được hiển thị với khách hàng tương ứng
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Họ tên
            </Label>
            <Input id="name" value={customer?.full_name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Tên tài khoản
            </Label>
            <Input id="username" value={customer?.user_name} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button className="!bg-accent-foreground" type="submit">{customer?"Lưu thay đổi":"Thêm mới"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
