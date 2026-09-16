import { it } from "node:test";
import React from "react";

interface SelectBoxProps {
  label: string;
  onChange?: (value: string) => void;
  data: any;
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
        {data.map((item: any) => (
          <option key={item.id} value={item.id}>
            {String(item.klasifikasi).toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
