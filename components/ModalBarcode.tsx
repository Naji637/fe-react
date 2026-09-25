import { BukuHub, CreateBukuHub } from "@/hooks/useBukuHub";
import { useState } from "react";
import TextField from "./TextField";
import SelectBox, { DataProps } from "./SelectBox";
import { ListKondisi, useListKondisiQuery } from "@/hooks/useListKondisi";
import { init } from "next/dist/compiled/webpack/webpack";
import Button from "./Button";
import { useGetNoAnggotaQuery } from "@/hooks/useAnggota";

interface ModalBarcodeProps {
  initial: BukuHub | null | undefined;
  onClose: () => void;
  isSubmiting: boolean;
  onSubmit: (payload: CreateBukuHub) => void;
}

function convertToDataSelect(data: ListKondisi[]): DataProps[] {
  const dataSelectBox: DataProps[] = [];
  data.map((item) => {
    dataSelectBox.push({ label: item.kondisi, value: String(item.id) });
  });
  return dataSelectBox;
}

export default function ModalBarcode({
  isSubmiting,
  initial,
  onClose,
  onSubmit,
}: ModalBarcodeProps) {
  const [listKondisiId, setListKondisiId] = useState(
    initial ? String(initial.list_kondisi_id) : "1",
  );
  const [rakId, setRakId] = useState(initial ? initial.rak_id : 1);
  const [noAnggota, setNoAnggota] = useState(initial ? initial.no_anggota : "");
  const { data: dataListKondisi, isLoading } = useListKondisiQuery();

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    let tampung = null;
    if (noAnggota !== "") {
      tampung = noAnggota;

    }
    onSubmit({
      list_kondisi_id: Number(listKondisiId),
      rak_id: Number(rakId),
      no_anggota: tampung,
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
                <SelectBox
                  value={listKondisiId}
                  onChange={(value) => {
                    setListKondisiId(value);
                  }}
                  data={convertToDataSelect(dataListKondisi!)}
                  label="Kondisi Buku"
                />
                <TextField
                  value={rakId}
                  onChange={(value) => setRakId(value as number)}
                  label="Rak Buku"
                />
                <TextField
                  value={noAnggota}
                  onChange={(value) => setNoAnggota(value as string)}
                  label="No. Anggota"
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
