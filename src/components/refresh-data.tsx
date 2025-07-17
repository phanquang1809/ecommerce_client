import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface RefreshDataProps {
  getData: () => Promise<unknown>;
}

export default function RefreshData({ getData }: RefreshDataProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // thêm state hover

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await getData();
    } catch (error) {
      console.error("Lỗi khi refresh dữ liệu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={isLoading}
      size="sm"
      className="w-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RefreshCw
        className={`size-4 transition-transform ${
          isLoading || isHovered ? "animate-spin" : ""
        }`}
      />
      <span className="sr-only">Refresh data</span>
    </Button>
  );
}
