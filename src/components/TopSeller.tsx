import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
export default function TopSeller() {
  return (
    <Card className="flex flex-col !rounded-md border-accent shadow-xs">
    <CardHeader className="items-center pb-0">
      <CardTitle>Top 10 cửa hàng có doanh thu cao nhất</CardTitle>
      <CardDescription>Tuần này</CardDescription>
    </CardHeader>
    <CardContent className="flex-1 pb-0"></CardContent>
  </Card>
  )
}
