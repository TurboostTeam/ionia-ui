import omit from "lodash-es/omit";
import { type ReactElement, useMemo } from "react";
import { useTable } from "react-table";

import { type Field } from "../common";

export interface TableColumnProps<T> {
  title: string;
  field: Field<T>;
}

export interface TableProps<T> {
  columns: Array<TableColumnProps<T>>;
  data: T[];
}

export function Table<T>({
  columns: _columns,
  data,
  ...props
}: TableProps<T>): ReactElement {
  const columns = useMemo(() => {
    return _columns.map((column) => ({
      Header: column.title,
      accessor: column.field,
    }));
  }, [_columns]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<any>({ columns, data });

  return (
    <table
      className="min-w-full table-fixed divide-y divide-gray-300"
      {...props}
      {...getTableProps()}
    >
      <thead>
        {headerGroups.map((headerGroup) => {
          const headerGroupProps = headerGroup.getHeaderGroupProps();

          return (
            <tr key={headerGroupProps.key} {...omit(headerGroupProps, ["key"])}>
              {headerGroup.headers.map((column) => {
                const headerProps = column.getHeaderProps();

                return (
                  <th
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    key={headerProps.key}
                    {...omit(headerProps, ["key"])}
                  >
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>

      <tbody
        className="divide-y divide-gray-200 bg-white"
        {...getTableBodyProps()}
      >
        {rows.map((row) => {
          prepareRow(row);

          const rowProps = row.getRowProps();

          return (
            <tr key={rowProps.key} {...omit(rowProps, "key")}>
              {row.cells.map((cell) => {
                const cellProps = cell.getCellProps();

                return (
                  <td
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    key={cellProps.key}
                    {...omit(cellProps, ["key"])}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
