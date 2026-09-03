import React from 'react'
interface TextFieldProps {
  value: string|boolean|number;
  onChange?: (value: string|boolean|number) => void;
  label: string;
  type?: string;
  required?: boolean;

  
}
export default function TextField({ value, onChange, label, type, required}: TextFieldProps) {
  if (type === "checkbox") {
    return (
      <label className="flex gap-3">
        <input
          className="border-gray-100 border-2"
          type="checkbox"
          checked={value as boolean}
          onChange={(p) => onChange?.(p.target.checked)}
        />
        {label}
      </label>
    );
  }
  return (
    <label className="flex flex-col">
      {label}
      <input
        value={value as string}
        onChange={(e) => onChange?.(e.target.value)}
        className="border-gray-100 border-2"
        type={type}
        required={required}
        
      />
    </label>
  )
}
