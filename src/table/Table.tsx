import { type ReactElement, useMemo } from "react";
import { useTable } from "react-table";

export interface TableColumnProps<T extends object> {
  title: string;
  field: keyof T;
}

export interface TableProps<T extends object> {
  /**
   * Is this the principal call to action on the page?
   */
  columns: Array<TableColumnProps<T>>;
  /**
   * Is this the principal call to action on the page?
   */
  data: T[];
  /**
   * Is this the principal call to action on the page?
   */
  selectedRows?: T[];
  /**
   * Is this the principal call to action on the page?
   */
  onSelectedRowsChange: (rows: T[]) => void;
}

/**
 * Table
 * 表格
 */
export function Table<T extends Record<string, any>>({
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
    useTable<T>({ columns, data });

  return (
    <table
      className="min-w-full table-fixed divide-y divide-gray-300"
      {...props}
      {...getTableProps()}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // eslint-disable-next-line react/jsx-key
              <th
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody
        className="divide-y divide-gray-200 bg-white"
        {...getTableBodyProps()}
      >
        {rows.map((row) => {
          prepareRow(row);
          return (
            // eslint-disable-next-line react/jsx-key
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <td
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    {...cell.getCellProps()}
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
