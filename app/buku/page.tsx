"use client";

import Button from "@/components/Button";
import { BukuCard } from "@/components/CardBuku";
import ModalBarcode from "@/components/ModalBarcode";
import ModalBuku from "@/components/ModalBuku";
import { useAnggotaQuery, useGetNoAnggotaQuery } from "@/hooks/useAnggota";
import {
  Buku,
  useBukuQuery,
  useCreateBarcode,
  useCreateBukuMutation,
  useDeleteBukuMutation,
  useUpdateBukuMutation,
} from "@/hooks/useBuku";
import { BukuHub } from "@/hooks/useBukuHub";
import React, { useState } from "react";

export default function Page() {
  const createBarcode = useCreateBarcode();
  const { data, isLoading } = useBukuQuery();
  const deleteMutation = useDeleteBukuMutation();
  const createMutation = useCreateBukuMutation();
  const updateMutation = useUpdateBukuMutation();
  const [dataBuku, setDataBuku] = useState<Buku | null | undefined>(undefined);
  const [dataBukuHub, setDataBukuHub] = useState<BukuHub | null | undefined>(
    undefined,
  );
  const [bukuId, setBukuId] = useState<number | null>(null);
  // const [noAnggota, setNoAnggota] = useState("");
  // const dataAnggota = useGetNoAnggotaQuery(noAnggota);

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center text-sm font-medium text-slate-500">
        Memuat data buku...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Daftar Buku
          </h1>
        </div>
        <Button onClick={() => setDataBuku(null)} variant="primary">
          + Tambah Buku
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((buku) => (
          <BukuCard
            key={buku.id}
            buku={buku}
            updateBukuHub={(bukuId) => {
              (setBukuId(bukuId), setDataBukuHub(null));
            }}
            updateBuku={(item) => setDataBuku(item)}
            hapusBuku={(id) => deleteMutation.mutate(id)}
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
                { id: dataBuku.id, payload },
                { onSuccess: () => setDataBuku(undefined) },
              );
            } else {
              createMutation.mutate(payload, {
                onSuccess: () => setDataBuku(undefined),
              });
            }
          }}
        />
      )}
      {dataBukuHub !== undefined && (
        <ModalBarcode
          initial={dataBukuHub}
          isSubmiting={createBarcode.isPending}
          onClose={() => setDataBukuHub(undefined)}
          onSubmit={(payload) => {
            {
              createBarcode.mutate(
                {
                  payload,
                  bukuId: Number(bukuId),
                },
                { onSuccess: () => setDataBukuHub(undefined) },
              );
            }
          }}
        />
      )}
    </div>
  );
}
