import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ANGGOTA_KEY = ["anggota"];

export interface Anggota {
  id: number;
  no_anggota: string;
  nama: string;
  alumni: boolean;
  klasifikasi_anggota_id: number;
}

export interface RequestAnggota {
  nama: string;
  alumni: boolean;
  klasifikasi_anggota_id: number;
}

async function getAnggota(): Promise<Anggota[]> {
  const res = await api.get<Anggota[] | null>("/anggota");
  return res.data ?? [];
}

async function postAnggota(payload: RequestAnggota): Promise<void> {
  await api.post("/anggota", payload);
}
async function updateAnggota(
  id: number,
  payload: RequestAnggota,
): Promise<void> {
  await api.put(`/anggota/${id}`, payload);
}
async function deleteAnggota(id: number): Promise<void> {
  await api.delete(`/anggota/${id}`);
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
export function useUpdateAnggotaMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: RequestAnggota }) =>
      updateAnggota(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ANGGOTA_KEY }),
  });
}
export function useDeleteAnggotaMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteAnggota(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ANGGOTA_KEY }),
  });
}

export function useGetAnggotaId(id: number) {
  return useQuery<Anggota | undefined>({
    queryKey: [...ANGGOTA_KEY, id],
    queryFn: async () => {
      const res = await api.get<Anggota | null>(`/anggota/${id}`);
      return res.data ?? undefined;
    },
  });
}

async function getNoAnggota(noAnggota: string): Promise<Anggota | null> {
  const res = await api.get(`/anggota/search?q=${noAnggota}`);
  return res.data;
}
export function useGetNoAnggotaQuery(noAnggota: string) {
  return useQuery<Anggota | null>({
    queryKey: [...ANGGOTA_KEY, noAnggota],
    queryFn: () => getNoAnggota(noAnggota),
    enabled: noAnggota.length === 4,
  });
}
