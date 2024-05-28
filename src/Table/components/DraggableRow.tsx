import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  type ColumnPinningPosition,
  flexRender,
  type Row,
  type Table,
} from "@tanstack/react-table";
import { type Dictionary } from "lodash";
import { type ReactElement } from "react";
import { twMerge } from "tailwind-merge";

import { type TableColumnProps } from "../Table";

const columnAlignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const columnWrapClass = {
  true: "break-words",
  false: "whitespace-nowrap",
};

interface DraggableRowProps<T> {
  row: Row<T>;
  rowKey?: keyof T;
  table: Table<T>;
  columnsPinnedInfo: Dictionary<
    Array<{
      direction: ColumnPinningPosition;
      size: number;
    }>
  >;
  getColumnPinedOffset: (
    pinnedIndex: number,
    direction: "left" | "right",
  ) => number | undefined;
  onRow?: (record: T) => {
    onClick?: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  };
}

export function DraggableRow<T>({
  row,
  rowKey,
  table,
  columnsPinnedInfo,
  getColumnPinedOffset,
  onRow,
}: DraggableRowProps<T>): ReactElement {
  const { transform, setNodeRef, isDragging } = useSortable({
    id: typeof rowKey !== "undefined" ? (row.original[rowKey] as string) : "id",
  });

  return (
    <tr
      className={twMerge(
        "bg-white group hover:bg-gray-50 relative",
        onRow != null && "cursor-pointer",
        isDragging && "relative cursor-grabbing z-[999]",
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
      onClick={(e) => {
        onRow?.(row.original)?.onClick?.(e);
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <td
          className={twMerge(
            "break-words group-hover:bg-gray-50 bg-white px-3 py-4 text-sm text-gray-500",
            typeof (cell.column.columnDef as TableColumnProps<T>)?.align !==
              "undefined" &&
              columnAlignClass[
                (cell.column.columnDef as TableColumnProps<T>)
                  .align as keyof typeof columnAlignClass
              ],
            typeof (cell.column.columnDef as TableColumnProps<T>)?.wordWrap !==
              "undefined" &&
              columnWrapClass[
                (cell.column.columnDef as TableColumnProps<T>)
                  .wordWrap as unknown as keyof typeof columnWrapClass
              ],
            cell.column.getIsPinned() !== false && "sticky z-[1]",
            cell.column.getIsPinned() === "left" &&
              cell.column.getPinnedIndex() ===
                table.getLeftLeafColumns().length - 1 &&
              "drop-shadow-[1px_0_0_#e5e7eb]",
            cell.column.getIsPinned() === "right" &&
              cell.column.getPinnedIndex() ===
                table.getRightLeafColumns().length - 1 &&
              "drop-shadow-[-1px_0_0_#e5e7eb]",
          )}
          key={cell.id}
          style={{
            width: cell.column.getSize(),
            left:
              cell.column.getIsPinned() === "left" &&
              columnsPinnedInfo.left?.length > 0
                ? getColumnPinedOffset(cell.column.getPinnedIndex(), "left")
                : undefined,
            right:
              cell.column.getIsPinned() === "right" &&
              columnsPinnedInfo.right?.length > 0
                ? getColumnPinedOffset(cell.column.getPinnedIndex(), "right")
                : undefined,
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
}
