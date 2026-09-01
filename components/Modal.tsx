"use client";

import { Anggota, RequestAnggota } from "@/hooks/useAnggota";
import React, { ReactNode, useState } from "react";
import TextField from "./TextField";
import Button from "./Button";

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
  const [nama, setNama] = useState(initial ? initial.nama : "");
  const [alumni, setAlumni] = useState(initial ? initial.alumni : false);
  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    onSubmit({
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
                <TextField
                  value={nama}
                  onChange={(value) => setNama(value as string)}
                  label="Nama"
                />
                <TextField
                  value={alumni}
                  onChange={(value) => setAlumni(value as boolean)}
                  label="Alumni"
                  type="checkbox"
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
