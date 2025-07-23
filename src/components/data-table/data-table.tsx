import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";
import { ComponentType, useEffect, useState } from "react";

interface BaseData {
  id: string | number;
}

interface FacetedFilterOption {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
}

interface DataTableProps<TData extends BaseData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectedRows?: (string | number)[];
  meta?: {
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
  } | null;
  onLimitChange?: (limit: number) => void;
  onPageChange?: (page: number) => void;
  onRowSelectionChange?: (rows: (string | number)[]) => void;
  onOrderChange?: (newData: TData[]) => void;
  onSortingChange?: (sorting: boolean) => void;
  resetSort?: boolean;
  onResetSortDone?: () => void;
  filterOptions?: {
    [columnId: string]: FacetedFilterOption[];
  };
  refreshData?: () => Promise<unknown>;
  version?: number;
  searchKey?: string;
}

export function DataTable<TData extends BaseData, TValue>({
  columns,
  data: initialData,
  selectedRows,
  meta,
  onLimitChange,
  onPageChange,
  onRowSelectionChange,
  onSortingChange,
  filterOptions,
  refreshData,
  version,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState<TData[]>(initialData);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const currentPage = meta?.current_page || 1;
  const pageSize = meta?.per_page || 10;

  useEffect(() => {
    setData(initialData);
  }, [initialData, version]);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: (updater) => {
      const newRowSelection =
        typeof updater === "function" ? updater(rowSelection) : updater;

      setRowSelection(newRowSelection);

      const selectedIds = table
        .getRowModel()
        .rows.filter((row) => newRowSelection[row.id])
        .map((row) => row.original.id);

      if (onRowSelectionChange) {
        onRowSelectionChange(selectedIds);
      }
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);
      if (onSortingChange) {
        onSortingChange(newSorting.length > 0);
      }
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    if (selectedRows) {
      const selection: Record<string, boolean> = {};
      table.getRowModel().rows.forEach((row) => {
        if (selectedRows.includes(row.original.id)) {
          selection[row.id] = true;
        }
      });
      setRowSelection(selection);
    }
  }, [selectedRows, table]);

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        filterOptions={filterOptions}
        refreshData={refreshData}
        searchKey={searchKey}
      />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan} className="px-4 py-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="align-top p-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        meta={meta}
        onLimitChange={onLimitChange}
        onPageChange={onPageChange}
        table={table}
      />
    </div>
  );
}
