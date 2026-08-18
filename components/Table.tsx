import React, { type ReactNode } from "react";
interface Column<T> {
  header: string;
  content: (row: T) => ReactNode;
}
interface TableProps<T> {
  column: Column<T>[];
  data: T[];
  keyFor: (row: T) => string;
}

export default function Table<T>({ column, data, keyFor }: TableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white ">
      <table className="border border-bg text-muted w-full">
        <thead>
          <tr className="text-left bg-surface border border-gray-200 p-2 ">
            {column.map((items) => (
              <th className="p-2 " key={items.header}>
                {items.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={keyFor(row)} className="border border-gray-200">
              {column.map((col) => (
                <td key={col.header} className="p-3">
                  {col.content(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
