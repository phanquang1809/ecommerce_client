import { ReactNode } from "react";
import CountUp from "@/UI/CountUp";
import { Avatar, AvatarFallback } from "./ui/avatar";

type StatisticCardProps = {
  title: string;
  value: number;
  trend: ReactNode;
  trendText: string;
  icon: ReactNode;
};

export const StatisticCard = ({ title, value, trend, trendText, icon }: StatisticCardProps) => {
  return (
    <div className="p-6 bg-card transition-colors rounded-md flex flex-col gap-1 relative border border-accent shadow-xs">
      <div className="text-lg text-card-foreground font-light">{title}</div>
      <div className="text-2xl font-bold">
        <CountUp
          from={0}
          to={value}
          separator="."
          direction="up"
          duration={0.05}
          className="count-up-text"
        />
      </div>
      <div className="text-md flex items-center gap-1">
        {trend}
        <span className="font-light">{trendText}</span>
      </div>
      <Avatar>
        <AvatarFallback className="rounded-lg">{icon}</AvatarFallback>
      </Avatar>
    </div>
  );
};