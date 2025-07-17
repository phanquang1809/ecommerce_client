import {
  ColumnDef,
  ColumnFiltersState,
  Row,
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
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";
import { ComponentType, useEffect, useId, useMemo, useState } from "react";
interface BaseData {
  id: string | number; // Hoặc chỉ string/number tùy theo yêu cầu thực tế
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
  meta?:{total:number,current_page:number,last_page:number,per_page:number}|null;
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
function DraggableRow<TData extends BaseData>({ row, }: { row: Row<TData>}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable<TData extends BaseData, TValue>({
  columns,
  data: initialData,
  selectedRows,
  meta,
  onLimitChange,
  onPageChange,
  onRowSelectionChange,
  onOrderChange,
  onSortingChange,
  filterOptions,
  refreshData,
  version,
  searchKey,
}: DataTableProps<TData, TValue>) {
  
  const [data, setData] = useState<TData[]>(initialData);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );
  useEffect(() => {
    setData(initialData);
  }, [initialData,version]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const sortableId = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );
  const dataIds = useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  );
 
  const currentPage = meta?.current_page || 1;
  const pageSize = meta?.per_page || 10;
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

  // Lấy danh sách id từ dữ liệu gốc (original.id)
  const selectedIds = table
    .getRowModel()
    .rows.filter((row) => newRowSelection[row.id])
    .map((row) => row.original.id);

  if (onRowSelectionChange) {
    onRowSelectionChange(selectedIds);
  }
},
    onSortingChange: (updater) => {
      const newSorting = updater instanceof Function ? updater(sorting) : updater;
      setSorting(newSorting);
      if (onSortingChange) {
        onSortingChange(newSorting.length>0);
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
  //  useEffect(() => {
  //     setRowSelection({});
  //     if (onRowSelectionChange) 
  //     onRowSelectionChange([]);
  // },[currentPage])
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((prevData) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        const newData = arrayMove(prevData, oldIndex, newIndex);
        if (onOrderChange) {
          onOrderChange(newData);
        }
        return newData;
      });
    }
  }
  return (
    <div className="space-y-4">
        <DataTableToolbar 
        table={table} 
        filterOptions={filterOptions}
        refreshData={refreshData}
        searchKey={searchKey}
        />
      <div className="overflow-hidden rounded-md border">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
             {table.getRowModel().rows?.length ? (
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                  key={version}
                >
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row}/>
                  ))}
                </SortableContext>
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
        </DndContext>
      </div>
      <DataTablePagination meta={meta} onLimitChange={onLimitChange} onPageChange={onPageChange} table={table} />
    </div>
  );
}
