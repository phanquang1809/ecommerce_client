import useUserStore from "@/store/userStore";
import { UserDropdown } from "../user-dropdown";
import {   User2 } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import CartButton from "@/features/cart/cartMenu";

export default function UserSection() {
    const {user}=useUserStore();
    const navigate=useNavigate();
  return (
    <div className="flex items-center gap-2">
        {(user && user.role!=="admin") ?
            <UserDropdown role="customer" user={user} />
     :
           <div className="flex items-center gap-2 hover:bg-blue-500 rounded-md p-2 cursor-pointer" onClick={()=>navigate("/customer/account/login")}>
             <Button size="icon" className="shadow-none !bg-blue-900 size-6  rounded" >
                <User2 className="size-4 text-white" />
            </Button>
           <span className="text-white font-semibold text-sm"> Đăng nhập</span>
           </div>
        }
        <CartButton/>
    </div>
  )
}
