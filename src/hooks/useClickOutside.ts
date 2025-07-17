import { useState, useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(initialState: boolean = false) {
  const [isOutside, setIsOutside] = useState(initialState);
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Kiểm tra nếu click ra ngoài phần tử ref
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOutside(true); // Nếu click ngoài, thay đổi trạng thái
      } else {
        setIsOutside(false); // Nếu click bên trong, giữ nguyên
      }
    };

    // Thêm sự kiện khi click vào bất kỳ đâu trong cửa sổ
    document.addEventListener("mousedown", handleClickOutside);

    // Dọn dẹp sự kiện khi component bị hủy
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { ref, isOutside };
}
