"use client";

import Badge from "@/components/Badge";
import Table from "@/components/Table";
import React, { useState } from "react";
import {
  Anggota,
  useAnggotaQuery,
  useCreateAnggotaMutation,
} from "@/hooks/useAnggota";
import { data } from "@/data/tableData";
import { checkStatusAnggota } from "../helper/checkStatus";
import Modal from "@/components/Modal";
// import { checkStatusAnggota } from "../helper/checkStatus";

export default function page() {
  const [dataAnggota, setDataAnggota] = useState<Anggota | null | undefined>(
    undefined,
  );
  const createMutation = useCreateAnggotaMutation();

  const { data, isLoading, isError } = useAnggotaQuery();
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-5 ">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-medium ">Anggota</h1>
          <p className="text-muted">Kelola data anggota perpustaakan.</p>
        </div>
        <div className="flex items-center ">
          <button
            onClick={() => setDataAnggota(null)}
            className="bg-accent text-white px-4 py-2 rounded-xl"
          >
            + Tambah Anggota
          </button>
          {dataAnggota !== undefined && (
            <Modal
              isSubmiting={createMutation.isPending}
              initial={dataAnggota}
              onClose={() => setDataAnggota(undefined)}
              onSubmit={(payload)=>createMutation.mutate(payload,{
                onSuccess:()=>setDataAnggota(undefined)
              })}
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
                  <button
                    onClick={() => alert(c.id)}
                    className="border border-muted rounded-xl py-2 px-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => alert(c.id)}
                    className="bg-red-50 text-red-800 py-2 px-4 rounded-xl"
                  >
                    Hapus
                  </button>
                </div>
              ),
            },
          ]}
        ></Table>
      )}
    </div>
  );
}
