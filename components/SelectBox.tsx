import { it } from "node:test";
import React from "react";

interface SelectBoxProps {
  label: string;
  onChange?: (value: string | number) => void;
  data: any;
}

export default function SelectBox({
  label,
  onChange,
  data,
}: SelectBoxProps) {
  return (
    <label className="flex flex-col">
      {label}
      <select>
        {data.map((item: any) => (
          <option value={item.id}>{item.klasifikasi}</option>
        ))}
      </select>
    </label>
  );
}
