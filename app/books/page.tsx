"use client";

import BookCard from "@/components/BookCard";
import Button from "@/components/Button";
import ModalBarcode from "@/components/ModalBarcode";
import BookModal from "@/components/BookModal";
import {
  Books,
  useBooksQuery,
  useCreateBarcode,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} from "@/hooks/useBook";
import { CreateBarcode} from "@/hooks/useBookHub";
import React, { useState } from "react";

export default function Page() {
  const createBarcode = useCreateBarcode();
  const { data, isLoading } = useBooksQuery();
  const deleteMutation = useDeleteBookMutation();
  const createMutation = useCreateBookMutation();
  const updateMutation = useUpdateBookMutation();
  const [bookIdBarcode,setBookIdBarcode]=useState<string|undefined>(undefined)
  const [bookData, setBookData] = useState<Books | null | undefined>(undefined)
  const [bookHubData, setBookHubData] = useState<CreateBarcode| null | undefined>(
    undefined,
  );

  // const [booksId, setBooksId] = useState<string | null>(null);
  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center text-sm font-medium text-slate-500">
        Memuat data buku...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Books List
            {bookIdBarcode}
          </h1>
        </div>
        <Button onClick={() => setBookData(null)} variant="primary">
          + Add Books
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            createBarcode={(item) => setBookIdBarcode(item.id)}


            updateBook={(item) => setBookData(item)}
            deleteBook={(id) => deleteMutation.mutate(id)}
          />
        ))}
      </div>

      {bookData !== undefined && (
        <BookModal
          initial={bookData}
          isSubmiting={createMutation.isPending || updateMutation.isPending}
          onClose={() => setBookData(undefined)}
          onSubmit={(payload) => {
            if (bookData) {
              updateMutation.mutate(
                { id: bookData.id, payload },
                { onSuccess: () => setBookData(undefined) },
              );
            } else {
              createMutation.mutate(payload, {
                onSuccess: () => setBookData(undefined),
              });
            }
          }}
        />
      )}
      {bookIdBarcode !== undefined && (
        <ModalBarcode
          bookId={String(bookIdBarcode)}
          isSubmiting={createBarcode.isPending}
          onClose={() => setBookIdBarcode(undefined)}
          onSubmit={(payload) => {
            {
              createBarcode.mutate(
                {
                  payload,

                },
                { onSuccess: () => setBookIdBarcode(undefined) },
              );
            }
          }}
        />
      )}
    </div>
  );
}
