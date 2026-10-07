"use client";

import React, { useState } from "react";
import TextField from "./TextField";
import Button from "./Button";

import { RequestUpdateTglBalik } from "@/hooks/usePinjaman";

interface ModalProps {
  initial: RequestUpdateTglBalik | null;
  onClose: () => void;
  isSubmiting: boolean;
  onSubmit: (payload: RequestUpdateTglBalik) => void;
}

// function convertToDataSelect(data: []): DataProps[] {
//   let dataSelectBox: DataProps[] = [];
//   data.map((item) => {
//     dataSelectBox.push({ label: item.klasifikasi, value: String(item.id) });
//   });
//   return dataSelectBox;
// }

export default function ModalTglBalik({
  onClose,
  initial,
  isSubmiting,
  onSubmit,
}: ModalProps) {
  const [kondisiAkhir, setKondisiAkhir] = useState(
    initial ? initial.kondisi_akhir_id : 1,
  );
  const [status, setStatus] = useState(initial ? initial.status : "");

  // const [klasifikasiAnggotaId,setKlasifikasiAnggotaId]=useState("2")

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    onSubmit({
      kondisi_akhir_id: Number(kondisiAkhir),
      status: status,
    });
  }

  return (
    <div className="p-5 ">
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/40 ">
        <div className="bg-white p-5 rounded-[8px] min-w-75 ">
          <button onClick={() => onClose()}>X</button>
          <div className="gap-7 px-8 py-5">
            <form className="flex flex-col gap-7 " onSubmit={handleSubmit}>
              <TextField
                value={kondisiAkhir}
                onChange={(value) => setKondisiAkhir(value as number)}
                label="kondisi akhir"
              />
              <TextField
                value={status}
                onChange={(value) => setStatus(value as string)}
                label="status"
              />
              {/* <SelectBox
                value={klasifikasiAnggotaId}
                onChange={(value) => {
                  setKlasifikasiAnggotaId(value);
                }}
                data={convertToDataSelect(data!)}
                label="Klasifikasi Anggota"
              /> */}
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmiting} variant="primary">
                  {isSubmiting ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
