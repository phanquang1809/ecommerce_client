import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ShopDetails as ShopDetailsType, useShopDetails } from "@/services/seller";
import { formatDay } from "@/utils/format";
import {
  Box,
  MessageCircle,
  Star,
  UserRound,
  UserRoundCheck,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ShopContent } from "./ShopContent";
import { useQueryClient } from "@tanstack/react-query";
import { handleChatWithShop } from "@/services/website/chatServices";
import { checkFollow, toggleFollow } from "@/services/website/followService";
import { ShopProducts } from "./ShopProducts";
const NAV_TABS = [
  { key: "store", label: "Cửa Hàng" },
  { key: "products", label: "Tất cả sản phẩm" },
];

export const ShopDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const queryClient = useQueryClient();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const urlTab = query.get("tab");
  const navigate = useNavigate();
  const { data, isLoading, error } = useShopDetails(slug || "");
  const shop = data || null;
  const [selectedTab, setSelectedTab] = useState(urlTab);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  setSelectedTab(urlTab || "store"); // fallback về store nếu không có
}, [urlTab]);
  const handleChangeTab = (tabKey: string) => {
    setSelectedTab(tabKey);
    const params = new URLSearchParams();
    params.set("tab", tabKey);
    navigate({ search: params.toString() }); // 👈 cập nhật URL
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    if (!shop?.user_id) return;
    const fetchFollow = async () => {
      try {
        const followed = await checkFollow(shop.user_id);
        setIsFollowing(followed);
      } catch (err) {
        console.error("Lỗi kiểm tra theo dõi:", err);
      }
    };
    fetchFollow();
  }, [shop?.user_id]);
  if (isLoading) return <p>Đang tải thông tin shop...</p>;
  if (error) return <p>Lỗi: {(error as Error).message}</p>;

  const handleToggleFollow = async () => {
    setLoading(true);
    try {
      await toggleFollow(shop?.user_id || 0);
      setIsFollowing((prev) => !prev);
      queryClient.setQueryData(["shopDetails", slug], (oldData: ShopDetailsType) => {
        if (!oldData) return null;
        return {
          ...oldData,
            followers: (oldData.followers || 0) + (!isFollowing ? 1 : -1),
        };
      });
    } catch (err) {
      console.error("Lỗi theo dõi:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <div className="w-full p-5 bg-white pb-0">
        <div className="grid grid-cols-3 gap-5 container mx-auto">
          <div className="border rounded-md p-4 space-y-4">
            <div className="flex items-start gap-2">
              <Avatar className="h-20 w-20 bg-white border !object-contain rounded">
                <AvatarImage
                  src={shop?.logo}
                  alt={shop?.name}
                  className="!object-contain"
                />
                <AvatarFallback className="bg-blue-900 text-white">
                  <UserRound className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-lg ">{shop?.name}</div>
                <div className="font-medium text-sm text-gray-500">
                  Online 5 phút trước
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="flex-1 rounded"
                size="sm"
                onClick={handleToggleFollow}
                disabled={loading}
              >
                {isFollowing ? "Đang theo dõi" : "Theo dõi"}
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded"
                size="sm"
                onClick={() =>
                  handleChatWithShop(shop?.user_id || 0, queryClient)
                }
              >
                <MessageCircle className="w-4 h-4" />
                Chat ngay
              </Button>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Box className="size-5" />
              <span>
                Sản phẩm:{" "}
                <span className="font-semibold text-blue-600">
                  {shop?.total_products}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UserRoundPlus className="size-5" />
              <span>
                Người theo dõi:{" "}
                <span className="font-semibold text-blue-600">
                  {shop?.followers}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UsersRound className="size-5" />
              <span>
                Đang theo dõi:{" "}
                <span className="font-semibold text-blue-600">
                  {shop?.following}
                </span>
              </span>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="size-5" />
              <span>
                Đánh giá:{" "}
                <span className="font-semibold text-blue-600">
                  5.0 (199 Đánh giá)
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UserRoundCheck className="size-5" />
              <span>
                Tham gia:{" "}
                <span className="font-semibold text-blue-600">
                  {formatDay(shop?.created_at || "")}
                </span>
              </span>
            </div>
          </div>
          <div className="col-span-full flex w-[70%]">
            {NAV_TABS.map((tab) => (
              <Button
                variant="ghost"
                key={tab.key}
                className={cn(
                  "!bg-white rounded-none border-b-3 border-transparent w-50",
                  selectedTab === tab.key &&
                    " !border-blue-600 font-semibold !text-blue-600"
                )}
                onClick={() => handleChangeTab(tab.key)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 container mx-auto">
        {selectedTab === "store" && (
          <ShopContent highlightProducts={shop?.highlight_products || []} />
        )}
        {selectedTab==="products" && <ShopProducts categories={shop?.categories || []}/> }
      </div>
    </div>
  );
};
