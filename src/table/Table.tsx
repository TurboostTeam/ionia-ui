import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type ReactElement } from "react";
import { twMerge } from "tailwind-merge";

const columnAlignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export type TableColumnProps<T> = ColumnDef<T> & {
  align?: "left" | "center" | "right";
};

export interface TableProps<T> {
  columns: Array<TableColumnProps<T>>;
  data: T[];
}

export function Table<T>({ columns, data }: TableProps<T>): ReactElement {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="min-w-full table-fixed divide-y divide-gray-300">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th
                  className={twMerge(
                    "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
                    typeof (header.column.columnDef as TableColumnProps<T>)
                      ?.align !== "undefined" &&
                      columnAlignClass[
                        (header.column.columnDef as TableColumnProps<T>)
                          .align as keyof typeof columnAlignClass
                      ]
                  )}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                className={twMerge(
                  "break-words px-3 py-4 text-sm text-gray-500",
                  typeof (cell.column.columnDef as TableColumnProps<T>)
                    ?.align !== "undefined" &&
                    columnAlignClass[
                      (cell.column.columnDef as TableColumnProps<T>)
                        .align as keyof typeof columnAlignClass
                    ]
                )}
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>

      {table.getAllColumns().filter((item) => item.columnDef?.footer).length >
        0 && (
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th
                  className={twMerge(
                    "break-words px-3 py-4 text-sm text-gray-500",
                    typeof (header.column.columnDef as TableColumnProps<T>)
                      ?.align !== "undefined"
                      ? columnAlignClass[
                          (header.column.columnDef as TableColumnProps<T>)
                            .align as keyof typeof columnAlignClass
                        ]
                      : columnAlignClass.left
                  )}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      )}
    </table>
  );
}
