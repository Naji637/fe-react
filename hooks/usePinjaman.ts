import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const PINJAMAN_KEY = ["pinjaman"];

export interface Buku {
  id: number;
  judul: string;
  tgl_pinjam: string;
}

export interface Pinjaman {
  id: number;
  no_anggota: string;
  nama: string;
  boleh_pinjam: boolean;
  buku: Buku[];
}
export interface RequestPinjaman {
  anggota_id: number;
  buku_id: number;
  petugas_pinjam_id: number | null;
  petugas_balik_id: number | null;
  kondisi_awal_id: number;
  kondisi_akhir_id: number;
  status: string;
}

async function getPinjamanByNoAnngota(
  noAnggota: string,
): Promise<Pinjaman | null> {
  const res = await api.get<Pinjaman | null>(`/pinjaman/${noAnggota}`);
  return res.data ?? null;
}
async function getBukuByBarcode(barcode: string): Promise<Buku | null> {
  const res = await api.get<Buku | null>(`/buku/search?q=${barcode}`);
  return res.data ?? null;
}
async function postPinjaman(payload: RequestPinjaman): Promise<void> {
  await api.post("/pinjaman", payload);
}
export function usePinjamanQuery(noAnggota: string) {
  return useQuery<Pinjaman | null>({
    queryKey: [...PINJAMAN_KEY, noAnggota],
    queryFn: () => getPinjamanByNoAnngota(noAnggota),
    enabled: noAnggota.length === 4,
  });
}
export function useBukuHubQuery(barcode: string) {
  return useQuery<Buku | null>({
    queryKey: [...PINJAMAN_KEY, barcode],
    queryFn: () => getBukuByBarcode(barcode),
    enabled: barcode.length === 4,
  });
}
export function useCreatePinjamanMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RequestPinjaman) => postPinjaman(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PINJAMAN_KEY }),
  });
}

// export interface DisplayPinjaman {
//   id: number;
//   nama: string;
//   judul: string;
//   tgl_pinjam: string;
//   tgl_balik: string;
//   status: string;
// }

// export interface RequestPinjaman {
//   anggota_id: number;
//   buku_id: number;
//   tgl_pinjam: string;
//   tgl_balik: string;
//   status: string;
// }

async function getPinjaman(): Promise<RequestPinjaman[]> {
  const res = await api.get<RequestPinjaman[] | null>("/pinjaman");
  return res.data ?? [];
}

export function usePinjamanQueryy() {
  return useQuery<RequestPinjaman[]>({
    queryKey: PINJAMAN_KEY,
    queryFn: getPinjaman,
  });
}

// async function updatePinjaman(
//   id: number,
//   payload: RequestPinjaman,
// ): Promise<void> {
//   await api.put(`/pinjaman/${id}`, payload);
// }
// async function deletePinjaman(id: number): Promise<void> {
//   await api.delete(`/pinjaman/${id}`);
// }

// export function useUpdatePinjamanMutation() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ id, payload }: { id: number; payload: RequestPinjaman }) =>
//       updatePinjaman(id, payload),
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: PINJAMAN_KEY }),
//   });
// }
// export function useDeletePinjamanMutation() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (id: number) => deletePinjaman(id),
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: PINJAMAN_KEY }),
//   });
// }

// export function useGetIdPinjaman(id: number) {
//   return useQuery<Pinjaman | undefined>({
//     queryKey: [...PINJAMAN_KEY, id],
//     queryFn: async () => {
//       const res = await api.get<Pinjaman | null>(`/pinjaman/${id}`);
//       return res.data ?? undefined;
//     },
//   });
// }
