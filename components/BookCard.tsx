import React, { use, useState } from "react";

import { Books, useBooksQuery } from "@/hooks/useBook";
import { useListKategoriQuery } from "@/hooks/useListKategori";
import Button from "./Button";

interface BookCardProps {
  book: Books;
  updateBookHub?: (bookId: string) => void;
  updateBook?: (books: Books) => void;
  deleteBook?: (id: string) => void;
}

export default function BookCard({
  book,
  deleteBook,
  updateBook,
  updateBookHub,
}: BookCardProps) {

  return (
    <div className="max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="mb-3 flex items-start justify-between">
            {book.title}
          </div>
          <div
            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
              book.stock > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {book.stock > 0 ? `Stock: ${book.stock}` : "0"}
          </div>
          <div className="space-y-1.5 text-sm text-gray-600 mb-4">
            <div>
              <div className="font-medium text-gray-500">{book.author}</div>
              <div className="inline-block bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">
                {/* {categories} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 ">
        <Button onClick={() => updateBookHub?.(book.id)} variant="primary">
          Create Barcode
        </Button>

        {updateBook && (
          <button
            onClick={() => updateBook(book)}
            className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Edit
          </button>
        )}
        {deleteBook && (
          <button
            onClick={() => deleteBook(book.id)}
            className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
