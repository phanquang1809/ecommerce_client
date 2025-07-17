import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { CategoryRevenue } from "@/types";

type CategoriesRevenue = {
  data: CategoryRevenue[];
};

const categoryChartConfig: ChartConfig = {
  revenue: { label: "Doanh thu" },
  "Quần áo": { label: "Quần áo", color: "var(--chart-1)" },
  "Đồ điện tử": { label: "Đồ điện tử", color: "var(--chart-2)" },
  "Nội thất": { label: "Nội thất", color: "var(--chart-3)" },
  "Dịch vụ": { label: "Dịch vụ", color: "var(--chart-4)" },
  Khác: { label: "Khác", color: "var(--chart-5)" },
};

export default function TopRevenueByCategory({ data }: CategoriesRevenue) {
  const getFillColor = (category: string) => {
    return categoryChartConfig[category]?.color || "#ccc";
  };

  const revenueData = useMemo(() => {
    return [...data]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 6)
      .map((item) => ({
        ...item,
        fill: getFillColor(item.name),
      }));
  }, [data]);

  const totalrevenue = useMemo(() => {
    return revenueData.reduce((acc, curr) => acc + curr.revenue, 0);
  }, [revenueData]);
  if (revenueData.length === 0) {
    return (
      <Card>
        <CardContent>Không có dữ liệu doanh thu.</CardContent>
      </Card>
    );
  }
  return (
    <Card className="flex flex-col !rounded-md border-accent shadow-xs">
      <CardHeader className="items-center pb-0">
        <CardTitle>Doanh thu theo ngành hàng</CardTitle>
        <CardDescription>Tháng này</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={categoryChartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent indicator="line" labelFormatter={(value) => value} />
              }
            />
            <Pie
              data={revenueData}
              dataKey="revenue"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          {totalrevenue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          nghìn đồng
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Tăng 5.2% so với tháng trước <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Doanh thu 6 ngành hàng nổi bật
        </div>
      </CardFooter>
    </Card>
  );
}
