import React, { ReactNode } from "react";
 interface badgeProps{
    variant:badgeVariant
    children:ReactNode
}
 type badgeVariant="green"|"gray"|"red"
const variantClasses:Record<badgeVariant,string>={
    green:"bg-green-50 text-green-800",
    gray:"bg-gray-200 text-gray-800" ,
    red:"bg-red-50 text-red-800"
}

export default function Badge({ variant,children }: badgeProps) {
  return (
    <div
      className={` rounded-2xl p-2 inline-flex  font-medium ${variantClasses[variant]}`}
    >
      {children}
    </div>
  );
}
