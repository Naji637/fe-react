"use client";

import { Anggota, RequestAnggota } from "@/hooks/useAnggota";
import React, { ReactNode, useState } from "react";

interface ModalProps {
  initial: Anggota | null;
  onClose: () => void;
  isSubmiting: boolean;
  onSubmit: (payload: RequestAnggota) => void;
}

export default function Modal({
  onClose,
  initial,
  isSubmiting,
  onSubmit,
}: ModalProps) {
  const [noAnggota, setNoAnggota] = useState("");
  const [nama, setNama] = useState("");
  const [alumni, setAlumni] = useState(false);
  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    onSubmit({
      no_anggota: noAnggota,
      nama: nama,
      alumni: alumni,
    });
  }
  return (
    <div className="p-5 ">
      {
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/40 ">
          <div className="bg-white p-5 rounded-[8px] min-w-75 ">
            <button onClick={() => onClose()}>X</button>
            <div className="gap-7 px-8 py-5">
              <form className="flex flex-col gap-7 " onSubmit={handleSubmit}>
                <label className="flex flex-col " htmlFor="">
                  No. Anggota
                  <input
                    className="border-gray-100 border-2 "
                    type="text"
                    required
                    onChange={(p) => setNoAnggota(p.target.value)}
                  />
                </label>
                <label className="flex flex-col ">
                  Nama
                  <input
                    className="border-gray-100 border-2"
                    type="text"
                    required
                    onChange={(p) => setNama(p.target.value)}
                  />
                </label>
                <label className="flex gap-3">
                  <input
                    className="border-gray-100 border-2"
                    type="checkbox"
                    checked={alumni}
                    onClick={() => setAlumni(!alumni)}
                  />
                  Alumni
                </label>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmiting}
                    className="bg-accent text-white p-2 rounded-[6px]"
                  >
                    {isSubmiting ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
