import { Books, BookRequest } from "@/hooks/useBook";
import { Categories, useCategoriesQuery } from "@/hooks/useCategory";
import React, { useEffect, useState } from "react";
import TextField from "./TextField";
import Button from "./Button";
import SelectBox, { DataProps } from "./SelectBox";

interface ModalBukuProps {
  initial: Books | null | undefined;
  onClose: () => void;
  isSubmiting: boolean;
  onSubmit: (payload: BookRequest) => void;
}

function convertToDataSelect(data: Categories[]): DataProps[] {
  const dataSelectBox: DataProps[] = [];
  data.map((item) => {
    dataSelectBox.push({ label: item.category, value: item.id });
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
  const { data: dataCategories, isLoading } = useCategoriesQuery();

  const [CategoriesId, setCategoriesId] = useState("");
  useEffect(() => {
    (function setInitialCategoriesId() {
      setCategoriesId(() => String(dataCategories?.[0].id));
    })();
  }, [dataCategories]);
  const [author, setAuthor] = useState(initial ? initial.author : "");

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    onSubmit({
      title: title,
      category_id: CategoriesId,
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
                  value={CategoriesId}
                  onChange={(value) => {
                    setCategoriesId(value);
                  }}
                  data={convertToDataSelect(dataCategories!)}
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
