import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import { BuyerProps } from "@/types";
import { Link } from "react-router-dom";

type TopBuyerProps = {
  topBuyer: BuyerProps[];
};
const columns: ColumnDef<BuyerProps>[] = [
  {
    accessorKey: "full_name",
    header: "Khách hàng",
    cell: ({ row }) => (
      <Link to={"/admin/customers/details/"+row.original.id} className="flex items-center gap-3">
        <img
          src={row.original.avatar}
          alt={row.getValue("full_name")}
          className="size-10 rounded-md object-cover"
          // onError={(e) => (e.currentTarget.src = "/image/cat_may_choi_game.png")}
        />
        <span className="text-primary font-medium">
          {row.getValue("full_name")}
        </span>
      </Link>
    ),
  },
  {
    accessorKey: "total_order",
    header: "Đơn hàng",
    cell: ({ row }) => (
      <div className="flex items-center">{row.getValue("total_order")}</div>
    ),
  },
  {
    accessorKey: "total_spent",
    header: "Chi tiêu",
    cell: ({ row }) => (
      <div className="flex items-center">{row.getValue("total_spent")}</div>
    ),
  },
];

export default function TopBuyer({ topBuyer }: TopBuyerProps) {
  return (
    <Card className="flex flex-col !rounded-md border-accent shadow-xs">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top 10 khách hàng chi tiêu nhiều nhất</CardTitle>
        <CardDescription>Tuần này</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <DataTable className="border-0" columns={columns} data={topBuyer} />
      </CardContent>
    </Card>
  );
}
