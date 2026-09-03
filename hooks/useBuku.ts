import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BUKU_KEY = ["buku"];

export interface Buku {
  id: number;
  judul: string;
  list_kategori_id: number;
  stock: number;
  penulis: string;
}

export interface RequestBuku {
  judul: string;
  list_kategori_id: number;
  stock: number;
  penulis: string;
}



async function getBuku(): Promise<Buku[]> {
  const res = await api.get<Buku[] | null>("/buku");
  return res.data ?? [];
}

async function postBuku(payload: RequestBuku): Promise<void> {
  await api.post("/buku", payload);
}
async function updateBuku(id: number, payload: RequestBuku): Promise<void> {
  await api.put(`/buku/${id}`, payload);
}
async function deleteBuku(id: number): Promise<void> {
  await api.delete(`/buku/${id}`);
}

export function useBukuQuery() {
  return useQuery<Buku[]>({
    queryKey: BUKU_KEY,
    queryFn: getBuku,
  });
}
export function useCreateBukuMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RequestBuku) => postBuku(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BUKU_KEY }),
  });
}
export function useUpdateBukuMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: RequestBuku }) =>
      updateBuku(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BUKU_KEY }),
  });
}
export function useDeleteBukuMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteBuku(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BUKU_KEY }),
  });
}

export function useGetBukuId(id : number){
    return useQuery<Buku | undefined>({
      queryKey: [...BUKU_KEY, id],
      queryFn: async () => {
        const res = await api.get<Buku | null>(`/buku/${id}`);
        return res.data ?? undefined;
      },
    });
}