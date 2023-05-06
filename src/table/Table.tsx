import { ReactElement, useMemo } from "react";
import { useTable } from "react-table";

export interface TableColumnProps<T extends object> {
  title: string;
  field: keyof T;
}

export interface TableProps<T extends object> {
  /**
   * Is this the principal call to action on the page?
   */
  columns: TableColumnProps<T>[];
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
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    {...column.getHeaderProps()}
                  >
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody
        className="divide-y divide-gray-200 bg-white"
        {...getTableBodyProps()}
      >
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        {...cell.getCellProps()}
                      >
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}
