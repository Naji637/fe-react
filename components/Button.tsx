import React, { ReactNode } from "react";

interface badgeButtonProps {
  variant: badgeVariant;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
type badgeVariant = "primary" | "secondary" | "warning";
const variantClasses: Record<badgeVariant, string> = {
  primary: "bg-accent text-white p-2 rounded-[6px]",
  secondary: "border border-muted rounded-xl py-2 px-4",
  warning: "bg-red-50 text-red-800 py-2 px-4 rounded-xl",
};

export default function Button({ variant, children, onClick, type, disabled }: badgeButtonProps) {
  return (
    <button
      className={` rounded-2xl p-2 inline-flex  font-medium ${variantClasses[variant]}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
