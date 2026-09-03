import React, { use } from 'react';

// Interface sesuai kolom database
import { Buku } from '@/hooks/useBuku';

interface BukuCardProps {
  buku: Buku;
  onEdit?: (buku: Buku) => void;
  onDelete?: (id: number) => void;
}

export const BukuCard: React.FC<BukuCardProps> = ({ buku, onEdit, onDelete }) => {
  const { id, judul, list_kategori_id, stock, penulis } = buku;

  // Format kategori ID (baik single ID maupun array ID)
  const kategoriDisplay = Array.isArray(list_kategori_id)
    ? list_kategori_id.join(', ')
    : list_kategori_id;

  return (
    <div className="max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{judul}</h3>
        <span
          className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
            stock > 0
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {stock > 0 ? `Stok: ${stock}` : 'Habis'}
        </span>
      </div>

      <div className="space-y-1.5 text-sm text-gray-600 mb-4">
        <p>
          <span className="font-medium text-gray-500">Penulis:</span> {penulis}
        </p>
        <p>
          <span className="font-medium text-gray-500">ID Kategori:</span>{' '}
          <span className="inline-block bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">
            {kategoriDisplay}
          </span>
        </p>
      </div>

      {(onEdit || onDelete) && (
        <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
          {onEdit && (
            <button
              onClick={() => onEdit(buku)}
              className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(id)}
              className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              Hapus
            </button>
          )}
        </div>
      )}
    </div>
  );
};