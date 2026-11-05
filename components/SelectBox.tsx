import { it } from "node:test";
import React from "react";

export interface DataProps {
  value: string;
  label: string;
}

interface SelectBoxProps {
  label: string;
  onChange?: (value: string) => void;
  data: DataProps[];
  value: string;
}

export default function SelectBox({
  label,
  onChange,
  data,
  value,
}: SelectBoxProps) {
  return (
    <label className="flex flex-col ">
      {label}
      <select
        className="border-gray-100 border-2 rounded-md px-2 py-1 "
        value={value}
        onChange={(p) => {
          onChange?.(p.target.value);
        }}
      >
        {data.map((item: DataProps) => (
          <option key={item.value} value={item.value}>
            {String(item.label).toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
