import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HTMLAttributes, useState } from "react";

// Hàm giả lập gọi API
const mockApiCall = async (startDate: Date, endDate: Date) => {
  // Giả lập delay như một cuộc gọi API thực tế
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = {
        start: format(startDate, "yyyy-MM-dd"),
        end: format(endDate, "yyyy-MM-dd"),
        data: `Dữ liệu giả lập từ ${format(startDate, "dd/MM/yyyy")} đến ${format(endDate, "dd/MM/yyyy")}`,
      };
      console.log("Dữ liệu từ API giả lập:", mockData);
      resolve(mockData);
    }, 1000); // Giả lập delay 1 giây
  });
};

export function DatePickerWithRange({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  // Hàm xử lý khi chọn khoảng ngày
  const handleDateSelect = async (newDate: DateRange | undefined) => {
    setDate(newDate);

    if (newDate?.from && newDate.to) {
      // Gọi API giả lập với khoảng ngày đã chọn
      try {
        await mockApiCall(newDate.from, newDate.to);
      } catch (error) {
        console.error("Lỗi khi gọi API giả lập:", error);
      }
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] h-8 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Chọn mốc thời gian</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect} // Sử dụng hàm xử lý mới
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}