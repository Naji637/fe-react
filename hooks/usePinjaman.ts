import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const PINJAMAN_KEY = ["pinjaman"];

export interface Book {
  id: string;
  judul: string;
  tgl_pinjam: string;
  tgl_balik: string;
}

export interface Pinjaman {
  id: number;
  no_anggota: string;
  nama: string;
  boleh_pinjam: boolean;
  book: Book[];
}
export interface RequestPinjaman {
  anggota_id: string;
  buku_id: string;
  petugas_pinjam_id: string | null;
  petugas_balik_id: string | null;
  kondisi_awal_id: string;
  kondisi_akhir_id: string;
  status: string;
}
export interface RequestUpdateTglBalik {
  kondisi_akhir_id: string;
  status: string;
}
async function getPinjamanByNoAnngota(
  noAnggota: string,
): Promise<Pinjaman | null> {
  const res = await api.get<Pinjaman | null>(`/pinjaman/${noAnggota}`);
  return res.data ?? null;
}
async function getBukuByBarcode(barcode: string): Promise<Book | null> {
  const res = await api.get<Book | null>(`/buku/search?q=${barcode}`);
  return res.data ?? null;
}
async function postPinjaman(payload: RequestPinjaman): Promise<void> {
  await api.post("/pinjaman", payload);
}
async function updateTglBalik(
  id: string,
  payload: RequestUpdateTglBalik,
): Promise<void> {
  await api.put(`/pinjaman/balik/${id}`, payload);
}

export function useUpdateTglBalikMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: RequestUpdateTglBalik;
    }) => updateTglBalik(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PINJAMAN_KEY }),
  });
}

export function usePinjamanQuery(noAnggota: string) {
  return useQuery<Pinjaman | null>({
    queryKey: [...PINJAMAN_KEY, noAnggota],
    queryFn: () => getPinjamanByNoAnngota(noAnggota),
    enabled: noAnggota.length === 4,
  });
}

export function useBukuHubQuery(barcode: string) {
  return useQuery<Book | null>({
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

export function usePinjamanDashboard() {
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
