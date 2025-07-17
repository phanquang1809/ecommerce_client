import { Switch } from "@/components/ui/switch";

export default function TransporterTable() {
  return (
    <div className="rounded-md overflow-hidden">
            <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left border border-dashed px-4 py-2">Đơn vị</th>
            <th className="text-left border border-dashed px-4 py-2">
              Trạng thái
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-dashed px-4 py-2">
              Giao hàng tiết kiệm
            </td>
            <td className="border border-dashed px-4 py-2">
              <Switch />
            </td>
          </tr>
          <tr>
            <td className="border border-dashed px-4 py-2">
              Giao hàng nhanh
            </td>
            <td className="border border-dashed px-4 py-2">
              <Switch />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
