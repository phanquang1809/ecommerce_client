import { cn } from "@/lib/utils";

interface Config {
  name: string;
  value: string;
}


export default function ProductConfig({
  configs,
}: {
  configs: Config[];
}) {
  return (
    <div className="w-full space-y-5 bg-white p-5 rounded-md relative">
      <h2 className="text-md font-semibold mb-4">Thông tin chi tiết</h2>
      <div
        className="relative overflow-hidden"
      >
        <div>
          <table className="w-full table-auto border-gray-200 text-sm">
            <tbody>
              {configs.map((item, index) => (
                <tr key={index} className={cn("border-b border-gray-200", index===configs.length-1 && "border-b-0")}>
                  <td className="p-3 text-gray-400 w-1/2">
                    {item.name}
                  </td>
                  <td className="p-3 text-gray-800">{item.value || "--"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
