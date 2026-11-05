import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BORROWINGS_KEY = ["borrowings"];

export interface Book {
  id: string;
 title: string;
  borrow_date: string;
  return_date: string;
}

export interface Borrowings {
  id: string;
  membership_number: string;
  name: string;
  isAllowed: boolean;
  book: Book[];
}
export interface BorrowingRequest {
  member_id: string;
  book_id: string;
  borrow_officer_id: string | null;
  return_officer_id: string | null;
  borrow_condition_id: string;
  return_condition_id: string;
  status: string;
}
export interface RequestUpdateReturnDate {
  return_condition_id: string;
  status: string;
}
async function getBorrowingsByMembershipNumber(
  membershipNumber: string,
): Promise<Borrowings | null> {
  const res = await api.get<Borrowings | null>(`/borrowings/${membershipNumber}`);
  return res.data ?? null;
}
async function getBukuByBarcode(barcode: string): Promise<Book | null> {
  const res = await api.get<Book | null>(`/books/search?q=${barcode}`);
  return res.data ?? null;
}
async function postBorrowing(payload: BorrowingRequest): Promise<void> {
  await api.post("/borrowings", payload);
}
async function updateReturnDate(
  id: string,
  payload: RequestUpdateReturnDate,
): Promise<void> {
  await api.put(`/borrowings/return/${id}`, payload);
}

export function useUpdateReturnDateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: RequestUpdateReturnDate;
    }) => updateReturnDate(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BORROWINGS_KEY }),
  });
}

export function useBorrowingsQuery(membershipNumber: string) {
  return useQuery<Borrowings| null>({
    queryKey: [...BORROWINGS_KEY, membershipNumber],
    queryFn: () => getBorrowingsByMembershipNumber(membershipNumber),
    enabled: membershipNumber.length === 4,
  });
}

export function useBookHubQuery(barcode: string) {
  return useQuery<Book | null>({
    queryKey: [...BORROWINGS_KEY, barcode],
    queryFn: () => getBukuByBarcode(barcode),
    enabled: barcode.length === 4,
  });
}
export function useCreateBorrowingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: BorrowingRequest) => postBorrowing(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BORROWINGS_KEY }),
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

// export interface BorrowingRequest {
//   anggota_id: number;
//   buku_id: number;
//   tgl_pinjam: string;
//   tgl_balik: string;
//   status: string;
// }

async function getBorrowings(): Promise<BorrowingRequest[]> {
  const res = await api.get<BorrowingRequest[] | null>("/borrowings");
  return res.data ?? [];
}

export function useBorrowingsDashboard() {
  return useQuery<BorrowingRequest[]>({
    queryKey: BORROWINGS_KEY,
    queryFn: getBorrowings,
  });
}

// async function updatePinjaman(
//   id: number,
//   payload: BorrowingRequest,
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
