import React, { use, useState } from "react";

import {
  Buku,
  useBukuQuery,
  useCreateBarcode,
  useGetBukuId,
} from "@/hooks/useBuku";
import { useListKategoriQuery } from "@/hooks/useListKategori";
import Button from "./Button";
import ModalBarcode from "./ModalBarcode";
import { BukuHub } from "@/hooks/useBukuHub";
import { useAnggotaQuery } from "@/hooks/useAnggota";

interface BukuCardProps {
  buku: Buku;
  updateBukuHub?: (bukuId:number) => void;
  updateBuku?: (buku: Buku) => void;
  hapusBuku?: (id: number) => void;
}

export function BukuCard({
  buku,
  updateBuku,
  hapusBuku,
  updateBukuHub,
}: BukuCardProps) {
  const { id, judul, list_kategori_id, stock, penulis } = buku;
  const { data: dataListKategori } = useListKategoriQuery();
  const kategori = dataListKategori?.find(
    (value) => value.id === list_kategori_id,
  );

  return (
    <div className="max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
          {judul}
        </h3>
        <span
          className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
            stock > 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {stock > 0 ? `Stok: ${stock}` : "Habis"}
        </span>
      </div>

      <div className="space-y-1.5 text-sm text-gray-600 mb-4">
        <p>
          <span className="font-medium text-gray-500">Penulis:</span> {penulis}
        </p>
        <p>
          <span className="font-medium text-gray-500">Kategori:</span>{" "}
          <span className="inline-block bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">
            {kategori?.kategori}
          </span>
        </p>
      </div>

      <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 ">
        <Button onClick={() => updateBukuHub?.(id)} variant="primary">
          Create Barcode
        </Button>

        {updateBuku && (
          <button
            onClick={() => updateBuku(buku)}
            className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Edit
          </button>
        )}
        {hapusBuku && (
          <button
            onClick={() => hapusBuku(id)}
            className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            Hapus
          </button>
        )}
      </div>
    </div>
  );
}
