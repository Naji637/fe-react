"use client";

import Button from "@/components/Button";
import { BukuCard } from "@/components/CardBuku";
import Modal from "@/components/Modal";
import ModalBuku from "@/components/ModalBuku";
import {
  Buku,
  RequestBuku,
  useBukuQuery,
  useCreateBukuMutation,
  useDeleteBukuMutation,
  useUpdateBukuMutation,
  // useUpdateBukuMutation,
} from "@/hooks/useBuku";
import React, { useState } from "react";

export default function Page() {
  const { data, isLoading } = useBukuQuery();
  const deleteMutation = useDeleteBukuMutation();
  const [dataBuku, setDataBuku] = useState<Buku | null | undefined>(undefined);
  const createMutation = useCreateBukuMutation();
  const updateMutation = useUpdateBukuMutation();
  console.log("data buku",dataBuku)
  if (isLoading) {
    return <div className="p-4 text-center">Memuat data buku...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        <div className="flex items-center ">
          <Button onClick={() => setDataBuku(null)} variant="primary">
            + Tambah Anggota
          </Button>
        </div>
        {data?.map((buku) => (
          <BukuCard
            key={buku.id}
            buku={buku}
            onDelete={(id) => deleteMutation.mutate(id)}
          />
        ))}
      </div>
      {dataBuku !== undefined && (
        <ModalBuku
          initial={dataBuku}
          isSubmiting={createMutation.isPending || updateMutation.isPending}
          onClose={() => setDataBuku(undefined)}
          onSubmit={(payload) => {
            if (dataBuku) {
              updateMutation.mutate(
                {
                  id: dataBuku.id,
                  payload,
                },
                {
                  onSuccess: () => setDataBuku(undefined),
                },
              );
            } else {
              createMutation.mutate(payload, {
                onSuccess: () => setDataBuku(undefined),
              });
            }
          }}
        />
      )}
    </div>
  );
}
