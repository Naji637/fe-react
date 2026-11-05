import React, { ReactNode } from "react";
interface cardProps {
  title: string;
  sum: number;
}

export default function CardCount({ title, sum }: cardProps) {
  return (
    <div className="flex items-center justify-start bg-surface w-1/4 h-23 rounded-2xl border border-bg">
      <div className="flex flex-col p-5">
        <div className="text-muted">{title}</div>
        <div className="text-2xl font-bold">{sum}</div>
      </div>
    </div>
  );
}
