import { ReactNode } from "react";
import CountUp from "@/UI/CountUp";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

type ActionCardProps = {
  title: string;
  value: number;
  trend: ReactNode;
  trendText: string;
  icon: ReactNode;
  onClick?: () => void;
};

export const ActionCard = ({ title, value, trend, trendText, icon, onClick }: ActionCardProps) => {
  return (
    <div className="p-4 bg-card transition-colors rounded-md flex gap-2 relative border border-accent shadow-xs items-center">
      <Avatar>
        <AvatarFallback className="rounded-lg">{icon}</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex flex-col gap-1">
        <div className="text-md">{title}</div>
        <div className="font-bold text-2xl">
          <CountUp
            from={0}
            to={value}
            separator="."
            direction="up"
            duration={0.05}
            className="count-up-text"
          />
        </div>
        <hr className="w-full" />
        <div className="flex items-center justify-between">
          <div className="text-md flex items-center gap-1">
            {trend}
            <span className="font-light">{trendText}</span>
          </div>
          {onClick ? (
            <button onClick={onClick}>
              <Send className="size-5" />
            </button>
          ) : (
            <Send className="size-5" />
          )}
        </div>
      </div>
    </div>
  );
};