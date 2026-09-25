import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const LIST_KONDISI_KEY = ["list_kondisi"];

export interface ListKondisi {
  id: number;
  kondisi: string;
}

async function getListKondisi(): Promise<ListKondisi[]> {
  const res = await api.get<ListKondisi[] | null>("/list-kondisi");
  return res.data ?? [];
}

export function useListKondisiQuery() {
  return useQuery<ListKondisi[]>({
    queryKey: LIST_KONDISI_KEY,
    queryFn: getListKondisi,
  });
}
