import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";

// Định nghĩa type cho TopSaleProduct
type TopSaleProduct = {
  id: number;
  name: string;
  sold: number;
  image: string;
};

// Dữ liệu mẫu (có thể thay bằng dữ liệu thực từ API)
const sampleData: TopSaleProduct[] = [
  {
    id: 1,
    name: "PlayStation 5 Pro/ PS5 Pro",
    sold: 150,
    image:
      "https://haloshop.vn/image/cache/catalog/products/may-game/sony-playstation/ps5_pro/playstation_5_pro-700x700.jpg",
  },
  {
    id: 2,
    name: "PS5 Dualsense Monster Hunter Wilds Limited Edition - Wireless Game Controller",
    sold: 120,
    image:
      "https://haloshop.vn/image/cache/catalog/products/DUALSENSE%20EDGE%20/ps5_dualsense_monster_hunter_wilds_limited_edition_wireless_game_controller-700x700.jpg",
  },
  {
    id: 3,
    name: "Macbook Air 15.3inch M4 2025 10CPU/10GPU/16GB/256GB",
    sold: 90,
    image:
      "https://haloshop.vn/image/cache/catalog/products/apple/macbook/macbook_air_13_6_2025_m4_silver-700x700.jpg",
  },
  {
    id: 4,
    name: "Asus ROG Ally X - 1TB AMD Ryzen Z1 Extreme",
    sold: 85,
    image:
      "https://haloshop.vn/image/cache/catalog/products/may-game/asus/asus_rog_ally_x-700x700.jpg",
  },
  {
    id: 5,
    name: "Nintendo Switch 2",
    sold: 70,
    image:
      "https://haloshop.vn/image/cache/catalog/products/may-game/nintendo/may_nintendo_switch_2_bh_3_thang_000-700x700.jpg",
  },
  {
    id: 1,
    name: "PlayStation 5 Pro/ PS5 Pro",
    sold: 150,
    image:
      "https://haloshop.vn/image/cache/catalog/products/may-game/sony-playstation/ps5_pro/playstation_5_pro-700x700.jpg",
  },
  {
    id: 2,
    name: "PS5 Dualsense Monster Hunter Wilds Limited Edition - Wireless Game Controller",
    sold: 120,
    image:
      "https://haloshop.vn/image/cache/catalog/products/DUALSENSE%20EDGE%20/ps5_dualsense_monster_hunter_wilds_limited_edition_wireless_game_controller-700x700.jpg",
  },
  {
    id: 3,
    name: "Macbook Air 15.3inch M4 2025 10CPU/10GPU/16GB/256GB",
    sold: 90,
    image:
      "https://haloshop.vn/image/cache/catalog/products/apple/macbook/macbook_air_13_6_2025_m4_silver-700x700.jpg",
  },
  {
    id: 4,
    name: "Asus ROG Ally X - 1TB AMD Ryzen Z1 Extreme",
    sold: 85,
    image:
      "https://haloshop.vn/image/cache/catalog/products/may-game/asus/asus_rog_ally_x-700x700.jpg",
  },
  {
    id: 5,
    name: "Nintendo Switch 2",
    sold: 70,
    image:
      "https://haloshop.vn/image/cache/catalog/products/may-game/nintendo/may_nintendo_switch_2_bh_3_thang_000-700x700.jpg",
  },
];

// Định nghĩa các cột cho bảng
const columns: ColumnDef<TopSaleProduct>[] = [
  {
    accessorKey: "name",
    header: "Sản phẩm",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img
          src={row.original.image}
          alt={row.getValue("name")}
          className="size-10 rounded-md object-cover"
          onError={(e) =>
            (e.currentTarget.src = "/image/cat_may_choi_game.png")
          }
        />
        <span className="text-primary font-medium max-w-[200px] truncate inline-block align-middle" title={row.getValue("name")}> 
          {row.getValue("name")}
        </span>{" "}
      </div>
    ),
  },
  {
    accessorKey: "sold",
    header: "Số lượng bán",
    cell: ({ row }) => (
      <div className="flex items-center">{row.getValue("sold")}</div>
    ),
  },
];

export default function TopSaleProduct() {
  return (
    <Card className="flex flex-col !rounded-md border-accent shadow-xs h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top 10 sản phẩm bán chạy nhất</CardTitle>
        <CardDescription>Tuần này</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <DataTable
          className="!border-none"
          columns={columns}
          data={sampleData}
        />
      </CardContent>
    </Card>
  );
}
