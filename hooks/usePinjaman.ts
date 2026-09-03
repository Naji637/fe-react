import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const PINJAMAN_KEY = ["pinjaman"];

export interface Pinjaman {
  id: number;
  anggota_id: number;
  buku_id: number;
  tgl_pinjam: string;
  tgl_balik: string;
  status: string;
}

// export interface DisplayPinjaman {
//   id: number;
//   nama: string;
//   judul: string;
//   tgl_pinjam: string;
//   tgl_balik: string;
//   status: string;
// }

export interface RequestPinjaman {
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
async function postPinjaman(payload: RequestPinjaman): Promise<void> {
  await api.post("/pinjaman", payload);
}
async function updatePinjaman(
  id: number,
  payload: RequestPinjaman,
): Promise<void> {
  await api.put(`/pinjaman/${id}`, payload);
}
async function deletePinjaman(id: number): Promise<void> {
  await api.delete(`/pinjaman/${id}`);
}

export function usePinjamanQuery() {
  return useQuery<Pinjaman[]>({
    queryKey: PINJAMAN_KEY,
    queryFn: getPinjaman,
  });
}
export function useCreatePinjamanMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RequestPinjaman) => postPinjaman(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PINJAMAN_KEY }),
  });
}
export function useUpdatePinjamanMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: RequestPinjaman }) =>
      updatePinjaman(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PINJAMAN_KEY }),
  });
}
export function useDeletePinjamanMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePinjaman(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PINJAMAN_KEY }),
  });
}

export function useGetIdPinjaman(id: number) {
  return useQuery<Pinjaman | undefined>({
    queryKey: [...PINJAMAN_KEY, id],
    queryFn: async () => {
      const res = await api.get<Pinjaman | null>(`/pinjaman/${id}`);
      return res.data ?? undefined;
    },
  });
}
