import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import NProgress from "nprogress";

export default function CartButton() {
  const { items,getCart } = useCartStore();
  const navigate = useNavigate();
  const handleGetCard=async()=>{
       NProgress.start();
    const res=await getCart();
    if(res.status==="success"){
      navigate("/cart");
       NProgress.done();
    }
  }
  return (
    <Button
      size="icon"
      className="relative flex items-center gap-2 hover:bg-blue-500 bg-transparent  text-white p-2 rounded-md"
      onClick={handleGetCard}
    >
      <div className="relative">
        <ShoppingBagIcon className="size-6 text-white" />
        {items.length > 0 && (
          <Badge className="absolute -top-0.5 -right-1.5 text-[10px] size-4 rounded-full bg-red-500 text-white flex items-center justify-center">
            {items.length}
          </Badge>
        )}
      </div>
    </Button>
  );
}
