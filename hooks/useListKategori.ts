import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const LIST_KATEGORI_KEY = ["list_kategori"];

export interface ListKategori {
  id: number;
  kategori: string;
}

async function GetListKategori(): Promise<ListKategori[]> {
  const res = await api.get<ListKategori[] | null>("/list-kategori");
  return res.data ?? [];
}

export function useListKategoriQuery() {
  return useQuery<ListKategori[]>({
    queryKey: LIST_KATEGORI_KEY,
    queryFn: GetListKategori,
  });
}
