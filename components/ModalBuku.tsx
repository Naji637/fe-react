import { Books, BookRequest } from "@/hooks/useBook";
import { ListKategori, useListKategoriQuery } from "@/hooks/useListKategori";
import React, { useState } from "react";
import TextField from "./TextField";
import Button from "./Button";
import SelectBox, { DataProps } from "./SelectBox";

interface ModalBukuProps {
  initial: Books | null | undefined;
  onClose: () => void;
  isSubmiting: boolean;
  onSubmit: (payload: BookRequest) => void;
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
  const [title, setTitle] = useState(initial ? initial.title : "");
  const [listKategoriId, setListKategoriId] = useState(
    initial ? String(initial.category_id) : "0",
  );
  const [author, setAuthor] = useState(initial ? initial.author : "");
  const { data: dataListKategori, isLoading } = useListKategoriQuery();

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    onSubmit({
      title: title,
      category_id: listKategoriId,
      author: author,
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
                  value={title}
                  onChange={(value) => setTitle(value as string)}
                  label="Title"
                />
                <SelectBox
                  value={listKategoriId}
                  onChange={(value) => {
                    setListKategoriId(value);
                  }}
                  data={convertToDataSelect(dataListKategori!)}
                  label="Category"
                />
                <TextField
                  value={author}
                  onChange={(value) => setAuthor(value as string)}
                  label="Author"
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmiting}
                    variant="primary"
                  >
                    {isSubmiting ? "Saving..." : "Save"}
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
