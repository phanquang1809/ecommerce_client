// import Badge from "@/UI/Badge";
// import Table, { Column } from "@/UI/Table";
// import { Link } from "react-router-dom";
// import { useMemo, useState } from "react";
// import { Crown, Gift, Search, Star, Wallet } from "lucide-react";

// type Order = {
//   id: number;
//   customer_id: number;
//   total: number;
//   status: string;
//   created_at: string;
// };
// function Info() {
//   const columns: Column<Order>[] = [
//     {
//       title: "Đơn hàng",
//       dataIndex: "id",
//       render: (id) => <Link to={`/admin/orders/details/${id}`}>#{id}</Link>,
//       sorter: {
//         compare: (a, b) => a.id - b.id,
//         multiple: 1,
//       },
//     },
//     {
//       title: "Ngày tạo",
//       dataIndex: "created_at",
//       sorter: {
//         compare: (a, b) =>
//           new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
//         multiple: 1,
//       },
//     },
//     {
//       title: "Trị giá",
//       dataIndex: "total",
//       render: (total) => (
//         <span>
//           {total?.toLocaleString("vi-VN", {
//             style: "currency",
//             currency: "VND",
//           })}
//         </span>
//       ),
//       sorter: {
//         compare: (a, b) => a.total - b.total,
//         multiple: 1,
//       },
//     },
//     {
//       title: "Trạng thái",
//       dataIndex: "status",
//       render: (status) => (
//         <Badge
//           color={
//             status === "inactive"
//               ? "purple"
//               : status === "active"
//               ? "lime"
//               : "rose"
//           }
//         >
//           {status === "inactive"
//             ? "Chưa kích hoạt"
//             : status === "active"
//             ? "Hoạt động"
//             : "Bị khóa"}
//         </Badge>
//       ),
//       sorter: {
//         compare: (a, b) => (a.status ?? "").localeCompare(b.status ?? ""),
//         multiple: 1,
//       },
//     },
//   ];
//   const [searchValue, setSearchValue] = useState("");
//   const filteredData = useMemo(() => {
//     const orders: Order[] = [
//       {
//         id: 1,
//         customer_id: 1,
//         total: 100000,
//         status: "active",
//         created_at: "2022-01-01",
//       },
//       {
//         id: 2,
//         customer_id: 2,
//         total: 200000,
//         status: "inactive",
//         created_at: "2022-02-01",
//       },
//       {
//         id: 3,
//         customer_id: 3,
//         total: 300000,
//         status: "pending",
//         created_at: "2022-03-01",
//       },
//       {
//         id: 4,
//         customer_id: 4,
//         total: 400000,
//         status: "pending",
//         created_at: "2022-04-01",
//       },
//     ];
//     return (
//       orders?.filter((item) =>
//         item.status?.toLowerCase().includes(searchValue.toLowerCase())
//       ) || []
//     );
//   }, [searchValue]);
//   return (
//     <div className="grid grid-cols-2 gap-5">
//       <div className="p-5 rounded-md bg-accent flex flex-col gap-2 ">
//         <div className="h-10 w-10 rounded bg-purple-500/20 flex items-center justify-center">
//           <Wallet className="size-6 text-purple-700" /> {/* Icon ví */}
//         </div>
//         <p>Số Dư Ví Walmart</p>
//         <p className="text-purple-700 font-bold">19.995.000đ</p>
//         <button className="py-1 bg-purple-500/20 max-w-40 rounded text-purple-700">
//           Nạp thêm
//         </button>
//       </div>
//       <div className="p-5 rounded-md bg-accent flex flex-col gap-2 ">
//       <div className="h-10 w-10 rounded bg-green-500/20 flex items-center justify-center">
//           <Gift className="size-6 text-green-700" /> {/* Icon ví */}
//         </div>
//         <p>Hạng Thành Viên</p>
//         <Badge color="yellow">Platinum Member</Badge>
//         <p>Còn 300 điểm để thăng hạng tiếp theo</p>
//       </div>
//       <div className="p-5 rounded-md bg-accent flex flex-col gap-2">
//         <div className="h-10 w-10 rounded bg-yellow-500/20 flex items-center justify-center">
//           <Star className="size-6 text-yellow-500" /> {/* Icon ví */}
//         </div>
//         <p>Yêu Thích</p>
//         <div className="flex gap-1">
//           <p className="text-yellow-500 font-bold">15</p>
//           <p>sản phẩm nằm trong yêu thích</p>
//         </div>
//         <p>Nhận thông báo khi giá giảm</p>
//       </div>
//       <div className="p-5 rounded-md bg-accent flex flex-col gap-2">
//          <div className="h-10 w-10 rounded bg-blue-500/20 flex items-center justify-center">
//           <Crown className="size-6 text-blue-500" /> {/* Icon ví */}
//         </div>
//         <p>Mã giảm giá</p>
//         <div className="flex gap-1">
//           <p className="text-blue-500 font-bold">21</p>
//           <p>mã giảm giá đã lưu</p>
//         </div>
//         <p>Có thể sử dụng cho lần mua tiếp theo</p>
//       </div>
//       <div className="col-span-full  rounded-md overflow-hidden ">
//         <div className="p-2 flex items-center justify-between">
//           <div className="text-xl font-bold">Danh sách đơn hàng</div>
//           <div className="w-[250px] relative">
//             <div className="relative">
//               <input
//                 value={searchValue}
//                 onChange={(e) => setSearchValue(e.target.value)}
//                 type="text"
//                 className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 dark:text-white text-sm border border-slate-700 dark:border-slate-200  rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
//                 placeholder="Tìm kiếm"
//               />
//               <div className="absolute left-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow  focus:shadow-none ctive:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
//                 <Search className="size-4" />
//               </div>
//             </div>
//           </div>
//         </div>
//         <Table
//           columns={columns}
//           rows={filteredData}
//           // loading={loading}
//           pageSize={10}
//           rowKey="id"
//           className="!rounded-none"
//           // currentPage={currentPage}
//           // onPageChange={(page) => setCurrentPage(page)}
//           // onSelectionChange={(selected) => setSelectedRows(selected)}
//         />
//       </div>
//     </div>
//   );
// }

// export default Info;
