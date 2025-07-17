import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ProgressCircleProps = {
  className?: string;
  value?: number;
  size?: number;
  strokeWidth?: number;
};

export function ProgressCircle({
  className,
  value = 0,
  size = 120,
  strokeWidth = 6,
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max(value, 0), 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className={cn("relative text-primary", className)} // text-primary để stroke sử dụng màu hiện tại
      viewBox={`0 0 ${size} ${size}`}
    >
      {/* Vòng tròn nền */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        className="text-accent"
      />

      {/* Vòng tròn tiến trình */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        className="text-primary"
        animate={{ strokeDashoffset: offset }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
      />

      {/* Text hiển thị phần trăm */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-sm fill-primary font-semibold"
      >
        {percentage.toFixed(0)}%
      </text>
    </svg>
  );
}
