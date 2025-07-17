import { ShoppingBasket } from "lucide-react";
import { Button } from "./ui/button";

export default function SellButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      className=""
     onClick={() => window.open("/admin/sale", "_blank")}

    >
      <ShoppingBasket className="h-[1.2rem] w-[1.2rem] transition-all" />
      <span className="sr-only">Sell button</span>
    </Button>
  );
}
