import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Định nghĩa interface cho dữ liệu của mỗi tab
interface TabItem {
  id: string | number;
  label: string; // Tên hiển thị của tab
  value: string; // Giá trị để lọc dữ liệu
}

// Định nghĩa props cho Tabs
interface TabsProps {
  tabs: TabItem[]; // Danh sách các tab
  defaultIndex?: number; // Chỉ số tab mặc định được chọn
  className?: string; // Class tùy chỉnh cho container
  tabListClassName?: string; // Class tùy chỉnh cho TabList
  tabClassName?: string; // Class tùy chỉnh cho mỗi Tab
  activeTabClassName?: string; 
  backgroundClassName?:string
  onTabChange?: (value: string) => void; // Callback khi tab thay đổi, trả về value
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultIndex = 0,
  className = "",
  tabListClassName = "",
  tabClassName = "",
  backgroundClassName="",
  onTabChange,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const [tabSize, setTabSize] = useState({ width: 0, height: 0, left: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Cập nhật kích thước và vị trí của tab đang được chọn
  useEffect(() => {
    const currentTab = tabRefs.current[selectedIndex];
    if (currentTab) {
      const { width, height, left } = currentTab.getBoundingClientRect();
      const parentLeft = currentTab.parentElement?.getBoundingClientRect().left || 0;
      setTabSize({
        width,
        height,
        left: left - parentLeft, // Tính vị trí tương đối so với TabList
      });
    }
  }, [selectedIndex]);

  // Xử lý khi chọn tab
  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
    onTabChange?.(tabs[index].value); // Trả về value của tab được chọn
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex">
        <div className="relative">
          {/* Hiệu ứng nền hoạt động với Framer Motion */}
          <motion.div
            className={`absolute top-1 z-1 left-0 bg-primary shadow-xl rounded-md hidden sm:block ${backgroundClassName}`}
            animate={{
              width: tabSize.width,
              height: tabSize.height,
              x: tabSize.left, // Sử dụng x thay cho translateX
            }}
            initial={false} // Ngăn chạy animation khi mount lần đầu
            transition={{
              type: "spring", // Hiệu ứng đàn hồi
              stiffness: 300, // Độ cứng của lò xo
              damping: 30, // Độ giảm chấn
            }}
          />
          {/* Danh sách các tab */}
          <div
            className={`relative bg-primary-foreground rounded-md p-1 hidden sm:flex ${tabListClassName}`}
          >
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={(el: HTMLButtonElement | null) => {
                    tabRefs.current[index] = el;
                  }}
                className={`relative focus:outline-none z-10 rounded-md py-2 px-4 text-sm font-bold transition-colors duration-300 ease-in-out cursor-pointer ${
                  selectedIndex === index ? "text-primary-foreground" : "text-primary"
                } ${tabClassName}`}
                onClick={() => handleTabChange(index)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;