"use client";

import {  Pinjaman, RequestPinjaman } from "@/hooks/usePinjaman";
import React, { ReactNode, useState } from "react";
import TextField from "./TextField";
import Button from "./Button";
import { Anggota, useAnggotaQuery, useGetAnggotaId } from "@/hooks/useAnggota";
import { useBukuQuery, useGetBukuId } from "@/hooks/useBuku";

interface ModalProps {
  initial: Pinjaman | null;
  onClose: () => void;
  isSubmiting: boolean;
  onSubmit: (payload: RequestPinjaman) => void;
}

export default function ModalPinjaman({
  onClose,
  initial,
  isSubmiting,
  onSubmit,
}: ModalProps) {
  const [anggotaId, setAnggotaId] = useState(initial ? initial.anggota_id : 0);
  const [bukuId, setBukuId] = useState(initial ? initial.buku_id : 0);

  const [status, setStatus] = useState(initial ? initial.status : "");
  const [tglBalik, setTglBalik] = useState(initial ? initial.tgl_balik : "");
  const [tglPinjam, setTglPinjam] = useState(initial ? initial.tgl_pinjam : "");
  const currentAnggota = useGetAnggotaId(anggotaId);
  const currentBuku = useGetBukuId(bukuId);

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    onSubmit({
      anggota_id: anggotaId,
      buku_id: bukuId,
      status: status,
      tgl_pinjam: tglPinjam,
      tgl_balik: tglBalik,
    });
  }
  return (
    <div className="p-5 ">
      {
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/40 ">
          <div className="bg-white p-5 rounded-[8px] min-w-75 ">
            <button onClick={() => onClose()}>X</button>
            <div className="flex flex-col gap-7 px-8 py-5">
              <div className="grid grid-cols-2 w-full gap-5">
                <div className="grid">
                  <div className="self-center">ID Anggota</div>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    value={anggotaId}
                    onChange={(e) => setAnggotaId(Number(e.target.value))}
                  />

                  <div className="self-center">Barcode</div>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    value={bukuId}
                    onChange={(e) => setBukuId(Number(e.target.value))}
                  />
                </div>
                <div className="grid self-end gap-6">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-fit"
                    placeholder="nama anggota"
                    value={currentAnggota?.data?.nama}
                    readOnly
                  />
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-fit"
                    placeholder="nama buku"
                    value={currentBuku?.data?.judul}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex gap-7 bg-bg w-full h-30"></div>
            </div>
            <div className="gap-7 px-8 py-5">
              <form className="flex flex-col gap-7 " onSubmit={handleSubmit}>
                <TextField
                  value={String(currentAnggota.data?.nama)}
                  label="Nama Anggota"
                />
                <TextField
                  value={currentBuku.data?.judul as string}
                  label="Judul"
                />
                <TextField
                  value={tglPinjam}
                  onChange={(value) => setTglPinjam(value as string)}
                  label="Tanggal Pinjam"
                />
                <TextField
                  value={tglBalik}
                  onChange={(value) => setTglBalik(value as string)}
                  label="Tanggal Balik"
                />
                <TextField
                  value={status}
                  onChange={(value) => setStatus(value as string)}
                  label="Status"
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmiting}
                    variant="primary"
                  >
                    {isSubmiting ? "Menyimpan..." : "Simpan"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
