import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ProductDescriptions({
  descriptions,
}: {
  descriptions: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | "auto">(0);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setIsOverflowing(scrollHeight > 300);
      setContentHeight(scrollHeight);
    }
  }, [descriptions]);

  return (
    <div className="w-full space-y-5 bg-white p-5 rounded-md relative">
      <h2 className="text-lg font-semibold mb-4">Mô tả sản phẩm</h2>

      <motion.div
        animate={{
          height: expanded ? contentHeight : 300,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative overflow-hidden"
      >
        <div
          ref={contentRef}
          className="align-baseline prose max-w-none text-sm font-lexend"
          dangerouslySetInnerHTML={{ __html: descriptions }}
        />

        {!expanded && isOverflowing && (
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
        )}
      </motion.div>

      {isOverflowing && (
        <div className="flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 font-medium hover:underline"
          >
            {expanded ? "Thu gọn" : "Xem thêm"}
          </button>
        </div>
      )}
    </div>
  );
}
