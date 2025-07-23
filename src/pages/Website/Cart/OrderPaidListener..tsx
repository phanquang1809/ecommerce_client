import { useEffect } from "react";
import echo from "@/lib/echo";

export type OrderPaidEvent ={
  order_number: string;
  status: string;
  message: string;
}

interface Props {
  orderNumber: string;
  onPaid?: (event: OrderPaidEvent) => void;
}

export default function OrderPaidListener({ orderNumber, onPaid }: Props) {
  useEffect(() => {
    const channel = echo.private(`orders.${orderNumber}`);

    const listener = (event: OrderPaidEvent) => {
      console.log("Đơn hàng thanh toán thành công:", event);
      if (onPaid) onPaid(event);
    };

    channel.listen('.OrderPaid', listener);

    return () => {
      echo.leave(`orders.${orderNumber}`);
    };
  }, [orderNumber, onPaid]);

  return null;
}
