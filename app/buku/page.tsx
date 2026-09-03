"use client";

import { BukuCard } from "@/components/CardBuku";
import {
  useBukuQuery,
  useDeleteBukuMutation,
  // useUpdateBukuMutation,
} from "@/hooks/useBuku";
import React from "react";

export default function Page() {
  const { data: dataBuku, isLoading } = useBukuQuery();
  const deleteMutation = useDeleteBukuMutation();
  // const editMutation = useUpdateBukuMutation();

  if (isLoading) {
    return <div className="p-4 text-center">Memuat data buku...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {dataBuku?.map((buku) => (
        <BukuCard
          key={buku.id}
          buku={buku}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      ))}
    </div>
  );
}
