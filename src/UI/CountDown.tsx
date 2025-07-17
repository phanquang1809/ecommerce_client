import { useEffect, useState } from "react";

interface CountUpProps {
    from?: number; // Giá trị bắt đầu
    to: number; // Giá trị kết thúc
    direction?: "up" | "down"; // Hướng đếm
    duration?: number; // Tổng thời gian chạy (giây)
    className?: string;
    onEnd?: () => void; // Callback khi kết thúc
}

export default function Count({
    from = 0,
    to,
    direction = "up",
    duration = 5, // Mặc định chạy trong 5 giây
    className = "",
    onEnd,
}: CountUpProps) {
    const [count, setCount] = useState(from);
    const totalSteps = Math.abs(to - from);
    const interval = duration > 0 ? (duration * 1000) / totalSteps : 1000;

    useEffect(() => {
        if ((direction === "up" && count >= to) || (direction === "down" && count <= to)) {
            if (onEnd) onEnd();
            return; // Dừng khi đạt đến `to`
        }

        const timer = setInterval(() => {
            setCount((prev) => {
                if (direction === "up") {
                    return prev + 1 > to ? to : prev + 1;
                } else {
                    return prev - 1 < to ? to : prev - 1;
                }
            });
        }, interval);

        return () => clearInterval(timer);
    }, [count, direction, to, interval, onEnd]);

    return <span className={className}>{count}</span>;
}
