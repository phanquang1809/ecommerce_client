import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import OrderTabContent from "./OrderTabContent";
import { useState } from "react";
const ORDER_TABS = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: "Chờ xác nhận" },
  { key: "processing", label: "Đang xử lý" },
  { key: "shipping", label: "Đang giao" },
  { key: "completed", label: "Giao hàng thành công" },
  { key: "cancelled", label: "Đã hủy" },
];

export default function OrderHistory() {
  const [selectedTab, setSelectedTab] = useState("all");

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Lịch sử đơn hàng</h2>
      <Tabs
        value={selectedTab}
        onValueChange={(value) => {
          setSelectedTab(value);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="w-full relative"
      >
        <TabsList className="flex flex-wrap gap-2 w-full !bg-white rounded-none h-12 p-0 !sticky top-16 shadow z-10">
          {ORDER_TABS.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="!p-0 text-md border-0 data-[state=active]:border-b-3 data-[state=active]:text-blue-900 rounded-none border-blue-900 !shadow-none"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {ORDER_TABS.map((tab) => (
          <TabsContent key={tab.key} value={tab.key}>
            {selectedTab === tab.key && <OrderTabContent status={tab.key} />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
