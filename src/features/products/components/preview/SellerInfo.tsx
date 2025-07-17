import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "@/store/userStore";

export default function SellerInfo() {
  const { user } = useUserStore();
  return (
    <div className="flex items-center space-x-2 p-2 bg-accent mb-2">
      <Avatar className="h-8 w-8 rounded">
        <AvatarImage className="object-contain" src={user?.shop?.logo} alt={user?.full_name} />
        <AvatarFallback className="rounded-lg">{user?.user_name}</AvatarFallback>
      </Avatar>
      <p className="text-md font-semibold">{user?.shop?.name}</p>
    </div>
  );
}
