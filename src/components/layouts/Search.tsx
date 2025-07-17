import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";

export default function SearchTerm({isScrolled}: {isScrolled: boolean}) {
      const { ref, isOutside } = useClickOutside<HTMLDivElement>(false);
     useEffect(() => {
        // Nếu nhấp ra ngoài thì đóng dropdown
        if (isOutside) {
          setOpen(false);
        }
      }, [isOutside]);
      const [open, setOpen] = useState(false);
  return (
    <div className="flex-1 mx-5" ref={ref}>
    <div className="flex items-center h-10 rounded-md overflow-hidden border border-blue-300 bg-white">
      <Input
        placeholder="Nhập tên điện thoại, máy tính, phụ kiện... cần tìm"
        className="flex-1 h-10  border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        onClick={() => setOpen(true)}
      />
      <Button
        type="submit"
        size="icon"
        className="flex items-center justify-center rounded-md bg-blue-100 hover:bg-blue-200 mr-1 size-8"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4 text-blue-600" />
      </Button>
    </div>
    {/* Overlay mờ */}
    <div
    className={cn(
      "fixed left-0 w-full h-[calc(100vh-56px)] bg-black/30 z-20 transition-opacity duration-300",
      isScrolled ? "top-[63px]" : "top-[103px]",
      open ? "opacity-100 visible" : "opacity-0 invisible"
    )}
    onClick={() => setOpen(false)}
  />
    {/* Dropdown content */}
    <div
      className={`absolute left-0 top-full z-50 w-full bg-white shadow-lg border-t border-gray-200 rounded-b-md overflow-hidden transition-all duration-300 transform ${
        open
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 translate-y-2 invisible"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 h-96">aaa</div>
    </div>
  </div>
  );
}
