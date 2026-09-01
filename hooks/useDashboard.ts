import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const PINJAMAN_KEY = ["pinjaman"];

export interface Pinjaman {
  id: number;
  anggota_id: number;
  buku_id: number;
  tgl_pinjam: string;
  tgl_balik: string;
  status: string;
}

async function getPinjaman(): Promise<Pinjaman[]> {
  const res = await api.get<Pinjaman[] | null>("/pinjaman");
  return res.data ?? [];
}

export function usePinjamanQuery() {
  return useQuery<Pinjaman[]>({
    queryKey: PINJAMAN_KEY,
    queryFn: getPinjaman,
  });
}
