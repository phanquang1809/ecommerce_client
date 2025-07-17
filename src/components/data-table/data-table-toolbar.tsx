"use client";

import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Search, X } from "lucide-react";
import RefreshData from "../refresh-data";

interface FacetedFilterOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterOptions?: {
    [columnId: string]: FacetedFilterOption[];
  };
  refreshData?: () => Promise<unknown>;
  searchKey?: string;
}

export function DataTableToolbar<TData>({
  table,
  filterOptions,
  refreshData,
  searchKey = "name",
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const isSorted = table.getState().sorting.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Tìm theo ${
            (table.getColumn(searchKey)?.columnDef.meta as { label: string })
              ?.label.toLocaleLowerCase() ?? ""
          }`}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="h-8 w-60"
          endIcon={Search}
        />
      </div>
      <div className="flex items-center space-x-2">
        {table.getAllColumns().map((column) => {
          const options = filterOptions?.[column.id];
          if (options && column.getCanFilter()) {
            return (
              <DataTableFacetedFilter
                key={column.id}
                column={column}
                title={
                  (column.columnDef.meta as { label?: string })?.label ??
                  column.id
                }
                options={options}
              />
            );
          }
          return null;
        })}
        {refreshData && <RefreshData getData={refreshData} />}
       {
        table.getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          ).length > 0 && (
          <DataTableViewOptions table={table} />
        )
       }
        {(isFiltered || isSorted) && (
          <Button
            aria-label="Reset filters"
            variant="outline"
            size="sm"
            className="border-dashed"
            onClick={() => {
              table.resetColumnFilters();
              table.resetSorting();
            }}
          >
            <X />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
