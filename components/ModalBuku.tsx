import { Buku, RequestBuku } from "@/hooks/useBuku";
import { ListKategori, useListKategoriQuery } from "@/hooks/useListKategori";
import React, { useState } from "react";
import TextField from "./TextField";
import Button from "./Button";
import SelectBox, { DataProps } from "./SelectBox";

interface ModalBukuProps {
  initial: Buku | null | undefined;
  onClose: () => void;
  isSubmiting: boolean;
  onSubmit: (payload: RequestBuku) => void;
}

function convertToDataSelect(data: ListKategori[]): DataProps[] {
  const dataSelectBox: DataProps[] = [];
  data.map((item) => {
    dataSelectBox.push({ label: item.kategori, value: String(item.id) });
  });
  return dataSelectBox;
}

export default function ModalBuku({
  isSubmiting,
  initial,
  onClose,
  onSubmit,
}: ModalBukuProps) {
  const [judul, setJudul] = useState(initial ? initial.judul : "");
  const [listKategoriId, setListKategoriId] = useState(
    initial ? String(initial.list_kategori_id) : "0",
  );
  const [penulis, setPenulis] = useState(initial ? initial.penulis : "");
  const { data: dataListKategori, isLoading } = useListKategoriQuery();

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    onSubmit({
      judul: judul,
      list_kategori_id: Number(listKategoriId),
      penulis: penulis,
    });
    console.log({
      judul: judul,
      list_kategori_id: Number(listKategoriId),
      penulis: penulis,
    });
  }
  if (isLoading) {
    return <div>loading...</div>;
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
                  value={judul}
                  onChange={(value) => setJudul(value as string)}
                  label="Judul"
                />
                <SelectBox
                  value={listKategoriId}
                  onChange={(value) => {
                    setListKategoriId(value);
                  }}
                  data={convertToDataSelect(dataListKategori!)}
                  label="Kategori"
                />
                <TextField
                  value={penulis}
                  onChange={(value) => setPenulis(value as string)}
                  label="Penulis"
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
