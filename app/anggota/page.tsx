"use client";

import Badge from "@/components/Badge";
import Table from "@/components/Table";
import React, { useState } from "react";
import {
  Anggota,
  useAnggotaQuery,
  useCreateAnggotaMutation,
  useDeleteAnggotaMutation,
  useUpdateAnggotaMutation,
} from "@/hooks/useAnggota";

import { checkStatusAnggota } from "../helper/checkStatus";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
// import { checkStatusAnggota } from "../helper/checkStatus";

export default function Page() {
  const [dataAnggota, setDataAnggota] = useState<Anggota | null | undefined>(
    undefined,
  );
  const createMutation = useCreateAnggotaMutation();
  const updateMutation = useUpdateAnggotaMutation();
  const deleteMutation = useDeleteAnggotaMutation();
  const { data, isLoading } = useAnggotaQuery();
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-5 ">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-medium ">Anggota</h1>
          <p className="text-muted">Kelola data anggota perpustaakan.</p>
        </div>
        <div className="flex items-center ">
         
          <Button onClick={() => setDataAnggota(null)} variant="primary">
            + Tambah Anggota
          </Button>
          {dataAnggota !== undefined && (
            <Modal
              isSubmiting={createMutation.isPending || updateMutation.isPending}
              initial={dataAnggota}
              onClose={() => setDataAnggota(undefined)}
              onSubmit={(payload) => {
                if (dataAnggota) {
                  updateMutation.mutate(
                    {
                      id: dataAnggota.id,
                      payload,
                    },
                    { onSuccess: () => setDataAnggota(undefined) },
                  );
                } else {
                  createMutation.mutate(
                    payload,

                    { onSuccess: () => setDataAnggota(undefined) },
                  );
                }
              }}
            />
          )}
        </div>
      </div>
      {isLoading && (
        <div>
          <h1>sedang menunggu data</h1>
        </div>
      )}
      {!isLoading && (
        <Table<Anggota>
          data={data ?? []}
          keyFor={(p) => String(p.id)}
          column={[
            {
              header: "No",
              content: (c) => c.id,
            },
            {
              header: "No. Anggota",
              content: (c) => c.no_anggota,
            },
            {
              header: "Nama",
              content: (c) => c.nama,
            },
            {
              header: "Alumni",
              content: (c) => (
                <Badge variant={checkStatusAnggota(c.alumni)}>
                  {c.alumni ? "Alumni" : "Non Alumni"}
                </Badge>
              ),
            },

            {
              header: "Aksi",
              content: (c) => (
                <div className="flex gap-3">
                  <Button onClick={() => setDataAnggota(c)} variant="secondary">
                    Edit
                  </Button>

                  <Button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Apakah Anda yakin ingin menghapus anggota ini?",
                        )
                      ) {
                        deleteMutation.mutate(c.id);
                      }
                    }}
                    variant="warning"
                  >
                    Hapus
                  </Button>
                </div>
              ),
            },
          ]}
        ></Table>
      )}
    </div>
  );
}
