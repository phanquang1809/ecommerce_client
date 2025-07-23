import { useEffect } from "react";
import echo from "@/lib/echo";

export type VariantStockUpdatedEvent = {
  variant_id: number;
  available_stock: number;
  quantity: number;
};

interface Props {
  userId: number;
  onStockUpdate?: (event: VariantStockUpdatedEvent) => void;
}

export default function VariantStockUpdatedListener({ userId, onStockUpdate }: Props) {
  useEffect(() => {
    const channel = echo.private(`cart.${userId}`);

    const listener = (event: VariantStockUpdatedEvent) => {
      console.log("Tồn kho biến thể đã cập nhật:", event);
      if (onStockUpdate) onStockUpdate(event);
    };

    channel.listen(".VariantStockUpdated", listener);
     channel.subscribed(() => {
      console.log("📡 Đã kết nối đến kênh private-cart." + userId);
    });

    return () => {
      echo.leave(`cart.${userId}`);
    };
  }, [userId, onStockUpdate]);

  return null;
}
