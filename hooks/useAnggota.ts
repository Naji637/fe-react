import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ANGGOTA_KEY = ["anggota"];

export interface Anggota {
  id: number;
  no_anggota: string;
  nama: string;
  alumni: boolean;
}

export interface RequestAnggota {
  no_anggota: string;
  nama: string;
  alumni: boolean;
}

async function getAnggota(): Promise<Anggota[]> {
  const res = await api.get<Anggota[] | null>("/anggota");
  return res.data ?? [];
}

async function postAnggota(payload: RequestAnggota): Promise<void> {
  await api.post("/anggota", payload);
}

export function useAnggotaQuery() {
  return useQuery<Anggota[]>({
    queryKey: ANGGOTA_KEY,
    queryFn: getAnggota,
  });
}

export function useCreateAnggotaMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RequestAnggota) => postAnggota(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ANGGOTA_KEY }),
  });
}
