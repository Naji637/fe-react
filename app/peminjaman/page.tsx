"use client";

import Button from "@/components/Button";
// import ModalPinjaman from "@/components/ModalPinjaman";
import Table from "@/components/Table";
import TextField from "@/components/TextField";

import {
  Buku,
  useBukuHubQuery,
  useCreatePinjamanMutation,
  usePinjamanQuery,
  useUpdateTglBalik,
} from "@/hooks/usePinjaman";
import { reverse } from "dns";
import React, { useState } from "react";
import { showDate } from "../helper/dateIndo";
export default function Page() {
  const [noAnggota, setNoAnggota] = useState<string>("");
  const [id, setId] = useState(0);
  const { data, isLoading } = usePinjamanQuery(noAnggota);
  const [barcode, setBarcode] = useState<string>("");
  const { data: dataBuku } = useBukuHubQuery(barcode);
  const createPinjaman = useCreatePinjamanMutation();
  const { data: updateTanggalBalik } = useUpdateTglBalik(id);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-5 ">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-medium ">Pinjaman</h1>
          <p className="text-muted">Kelola data pinjaman perpustaakan.</p>
        </div>
        <div className="flex items-center "></div>
      </div>
      {isLoading && (
        <div>
          <h1>sedang menunggu data</h1>
        </div>
      )}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5 w-screen">
          <div className="flex items-end gap-4">
            <TextField
              label="No. Anggota"
              value={noAnggota}
              onChange={(value) => {
                setNoAnggota(value as string);
              }}
            />
            <div className="text-xl font-medium ">
              {data?.nama !== undefined && <div>{data.nama}</div>}
            </div>
          </div>
          <div className="flex items-end gap-20">
            <div className="flex items-end gap-4">
              {" "}
              <TextField
                label="Kode Buku"
                value={barcode}
                onChange={(value) => {
                  setBarcode(value as string);
                }}
              />
              <div className="text-xl font-medium ">
                {dataBuku?.judul !== undefined && <div>{dataBuku.judul}</div>}
              </div>
            </div>

            <Button
              onClick={() =>
                createPinjaman.mutate({
                  anggota_id: data!.id,
                  buku_id: dataBuku!.id,
                  petugas_pinjam_id: null,
                  petugas_balik_id: null,
                  kondisi_awal_id: 1,
                  kondisi_akhir_id: 1,
                  status: "dipinjam",
                })
              }
              type="submit"
              variant="primary"
            >
              + Tambah Buku
            </Button>
          </div>

          <div className="w-screen">
            <Table<Buku>
              data={data?.buku ?? []}
              keyFor={(p) => String(p.id)}
              column={[
                { header: "No", content: (_, i) => i + 1 },
                { header: "Judul", content: (c, _) => c.judul },
                {
                  header: "Tanggal Pinjam",
                  content: (c, _) => showDate(c.tgl_pinjam),
                },
                {
                  header: "Tanggal Balik",
                  content: (c, _) => (
                    <Button onClick={() => setId(c.id)} variant="primary">
                      Dikembalikan
                    </Button>
                  ),
                },
              ]}
            ></Table>
          </div>
        </div>
      </div>
    </div>
  );
}
