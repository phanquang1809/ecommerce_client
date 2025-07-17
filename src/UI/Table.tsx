// import React, { useState, useMemo } from "react";
// import { Checkbox, Spin } from "antd";
// import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { LoadingOutlined } from "@ant-design/icons";
// import { CircleOff } from "lucide-react";

// // Định nghĩa interface cho Sorter
// interface Sorter<T> {
//   compare: (a: T, b: T) => number;
//   multiple?: number;
// }

// // Định nghĩa interface cho Column
// export interface Column<T> {
//   title: string;
//   dataIndex: keyof T | "";
//   render?: (
//     value: T[keyof T] | undefined,
//     record: T,
//     index: number
//   ) => React.ReactNode;
//   sorter?: Sorter<T>;
//   key?: string;
// }

// // Định nghĩa props cho Table
// interface TableProps<T> {
//   columns: Column<T>[];
//   rows?: T[];
//   className?: string;
//   rowKey: keyof T;
//   loading?: boolean;
//   onSelectionChange?: (selectedRows: T[]) => void;
//   pageSize?: number;
//   currentPage?: number;
//   onPageChange?: (page: number) => void;
//   showCheckbox?: boolean; // Thêm prop mới để kiểm soát hiển thị checkbox
// }

// const Table = <T,>({
//   columns,
//   rows = [],
//   className = "",
//   rowKey,
//   loading = false,
//   onSelectionChange,
//   pageSize = 10,
//   currentPage = 1,
//   onPageChange,
//   showCheckbox = false, // Mặc định là true (hiển thị checkbox)
// }: TableProps<T>) => {
//   // State để theo dõi cột đang sắp xếp và hướng sắp xếp
//   const [sortField, setSortField] = useState<keyof T | "">("");
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc" | "none">(
//     "none"
//   );

//   // State để theo dõi các hàng được chọn
//   const [selectedRowKeys, setSelectedRowKeys] = useState<Set<string | number>>(
//     new Set()
//   );

//   // Hàm xử lý khi nhấp vào tiêu đề cột để sắp xếp
//   const handleSort = (column: Column<T>) => {
//     if (!column.sorter) return;

//     const field = column.dataIndex;
//     if (sortField === field) {
//       if (sortDirection === "none") {
//         setSortDirection("asc");
//       } else if (sortDirection === "asc") {
//         setSortDirection("desc");
//       } else {
//         setSortDirection("none");
//         setSortField("");
//       }
//     } else {
//       setSortField(field);
//       setSortDirection("asc");
//     }
//     onPageChange?.(1);
//   };

//   // Dữ liệu đã sắp xếp
//   const sortedRows = useMemo(() => {
//     if (
//       !sortField ||
//       sortDirection === "none" ||
//       !columns.find((c) => c.dataIndex === sortField)?.sorter
//     ) {
//       return rows;
//     }

//     const sorter = columns.find((c) => c.dataIndex === sortField)!.sorter!;
//     return [...rows].sort((a, b) =>
//       sortDirection === "asc" ? sorter.compare(a, b) : -sorter.compare(a, b)
//     );
//   }, [rows, sortField, sortDirection, columns]);

//   // Dữ liệu phân trang
//   const paginatedRows = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     return sortedRows.slice(startIndex, endIndex);
//   }, [sortedRows, currentPage, pageSize]);

//   // Tổng số trang
//   const totalPages = Math.ceil(sortedRows.length / pageSize);

//   // Hàm chọn/bỏ chọn tất cả (chỉ khi showCheckbox = true)
//   const handleSelectAll = (checked: boolean) => {
//     if (!showCheckbox) return;

//     const newSelectedRowKeys = checked
//       ? new Set(sortedRows.map((row) => row[rowKey] as string | number))
//       : new Set<string | number>();

//     setSelectedRowKeys(newSelectedRowKeys);
//     const selectedRows = sortedRows.filter((r) =>
//       newSelectedRowKeys.has(r[rowKey] as string | number)
//     );
//     onSelectionChange?.(selectedRows);
//   };

//   // Hàm chọn/bỏ chọn từng hàng (chỉ khi showCheckbox = true)
//   const handleSelectRow = (row: T, checked: boolean) => {
//     if (!showCheckbox) return;

//     const key = row[rowKey] as string | number;
//     const newSelectedRowKeys = new Set(selectedRowKeys);
//     if (checked) {
//       newSelectedRowKeys.add(key);
//     } else {
//       newSelectedRowKeys.delete(key);
//     }
//     setSelectedRowKeys(newSelectedRowKeys);

//     const selectedRows = sortedRows.filter((r) =>
//       newSelectedRowKeys.has(r[rowKey] as string | number)
//     );
//     onSelectionChange?.(selectedRows);
//   };

//   // Kiểm tra trạng thái chọn trên toàn bộ dữ liệu (chỉ khi showCheckbox = true)
//   const selectedOverall = showCheckbox
//     ? sortedRows.filter((row) =>
//         selectedRowKeys.has(row[rowKey] as string | number)
//       ).length
//     : 0;
//   const isAllSelected =
//     showCheckbox && selectedOverall === sortedRows.length && sortedRows.length > 0;
//   const isIndeterminate =
//     showCheckbox && selectedOverall > 0 && selectedOverall < sortedRows.length;

//   // Hàm chuyển trang
//   const goToPage = (page: number) => {
//     const totalPages = Math.ceil(sortedRows.length / pageSize);
//     if (page >= 1 && page <= totalPages) {
//       onPageChange?.(page);
//     }
//   };

//   // Tính toán thông tin phân trang
//   const startRow = (currentPage - 1) * pageSize + 1;
//   const endRow = Math.min(currentPage * pageSize, sortedRows.length);

//   return (
//     <div className="flex flex-col">
//       <div
//         className={`w-full  overflow-x-auto rounded-xl bg-background ${className}`}
//       >
//         {loading ? (
//           <div className="flex items-center justify-center h-[650px]">
//             <Spin indicator={<LoadingOutlined spin />} size="large" />
//           </div>
//         ) : (
//           <table className="w-full table-auto">
//             {/* Tiêu đề bảng */}
//             <thead className=" bg-background border-b ">
//               <tr>
//                 {showCheckbox && (
//                   <th className="p-2 text-center font-medium  w-12 ">
//                     <Checkbox
//                       checked={isAllSelected}
//                       indeterminate={isIndeterminate}
//                       onChange={(e) => handleSelectAll(e.target.checked)}
//                     />
//                   </th>
//                 )}
//                 {columns.map((column, index) => (
//                   <th
//                     key={column.key || String(column.dataIndex) || index}
//                     className={`p-2 text-center font-medium  ${
//                       column.sorter ? "cursor-pointer" : ""
//                     }`}
//                     onClick={() => handleSort(column)}
//                   >
//                     <div className="flex items-center gap-1">
//                       {column.title}
//                       {sortField === column.dataIndex &&
//                         sortDirection !== "none" &&
//                         (sortDirection === "asc" ? (
//                           <HiArrowNarrowUp className="size-5" />
//                         ) : (
//                           <HiArrowNarrowDown className="size-5" />
//                         ))}
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             {/* Nội dung bảng */}
//             <tbody>
//               {paginatedRows.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={columns.length + (showCheckbox ? 1 : 0)} // Điều chỉnh colSpan dựa trên showCheckbox
//                     className="p-2 border-b h-50"
//                   >
//                    <div className="flex items-center justify-center gap-2 ">
//                    <CircleOff/>
//                    <p>Không tìm thấy dữ liệu</p>
//                    </div>
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedRows.map((row, rowIndex) => (
//                   <tr
//                     key={row[rowKey] as string | number}
//                     className="border-b border-gray-200 dark:border-gray-300/20"
//                   >
//                     {showCheckbox && (
//                       <td className="p-2 text-center w-12">
//                         <Checkbox
//                           checked={selectedRowKeys.has(
//                             row[rowKey] as string | number
//                           )}
//                           onChange={(e) => handleSelectRow(row, e.target.checked)}
//                         />
//                       </td>
//                     )}
//                     {columns.map((column, colIndex) => {
//                       const value = column.dataIndex
//                         ? row[column.dataIndex]
//                         : undefined;
//                       return (
//                         <td
//                           key={
//                             column.key || String(column.dataIndex) || colIndex
//                           }
//                           className="p-2"
//                         >
//                           {column.render
//                             ? column.render(value, row, rowIndex)
//                             : value !== undefined
//                             ? String(value)
//                             : ""}
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         )}
//         {/* Phân trang */}
//         <div className="flex justify-end items-center p-2">
//           <div className="flex items-center gap-2">
//             <span>
//               {sortedRows.length === 0
//                 ? "0-0 of 0"
//                 : `${startRow}-${endRow} of ${sortedRows.length}`}
//             </span>
//             <button
//               onClick={() => goToPage(currentPage - 1)}
//               disabled={currentPage === 1 || sortedRows.length === 0}
//               className="p-1 disabled:opacity-50 disabled:!cursor-default"
//             >
//               <IoIosArrowBack className="size-5" />
//             </button>
//             <button
//               onClick={() => goToPage(currentPage + 1)}
//               disabled={currentPage === totalPages || sortedRows.length === 0}
//               className="p-1 disabled:opacity-50 disabled:!cursor-default"
//             >
//               <IoIosArrowForward className="size-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Table;