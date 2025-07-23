import { useEffect } from "react";
import echo from "@/lib/echo";

export type OrderEventPayload = {
  title: string;
  message: string;
};

interface Props {
  shopId: number;
  onEvent?: (event: OrderEventPayload) => void;
}

export default function ShopOrderListener({ shopId, onEvent }: Props) {
  useEffect(() => {
    const channel = echo.private(`shop.${shopId}`);

    const eventTypes = [
      "OrderCreated",
      "OrderConfirmed",
      "OrderCancelled",
      "OrderShipping",
      "OrderCompleted",
    ];

    eventTypes.forEach((eventType) => {
      channel.listen(`.${eventType}`, (event: OrderEventPayload) => {
        console.log(`📦 ${eventType}:`, event);
        if (onEvent) {
          onEvent(event);
        }
      });
    });

    return () => {
      echo.leave(`shop.${shopId}`);
    };
  }, [shopId, onEvent]);

  return null;
}
