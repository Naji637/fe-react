import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BukuHub, CreateBukuHub } from "./useBukuHub";

const BOOK_KEY = ["books"];

export interface Books {
  id: string;
  title: string;
  category_id: string;
  stock: number;
  author: string;
}

export interface BookRequest {
  title: string;
  category_id: string;
  author: string;
}

async function getBooks(): Promise<Books[]> {
  const res = await api.get<Books[] | null>("/books");
  return res.data ?? [];
}

async function postBook(payload: BookRequest): Promise<void> {
  await api.post("/books", payload);
}
async function updateBook(id: string, payload: BookRequest): Promise<void> {
  await api.put(`/books/${id}`, payload);
}
async function deleteBook(id: string): Promise<void> {
  await api.delete(`/books/${id}`);
}
async function createBarcode(
  payload: CreateBukuHub,
  bookId: string,
): Promise<void> {
  await api.put(`/books/${bookId}/register`, payload);
}
async function getKondisiByBarcode(barcode: string): Promise<BukuHub> {
  const res = await api.get(`/books/kondisi/search?q=${barcode}`);
  return res.data;
}

export function useBooksQuery() {
  return useQuery<Books[]>({
    queryKey: BOOK_KEY,
    queryFn: getBooks,
  });
}
export function useCreateBookMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: BookRequest) => postBook(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOK_KEY }),
  });
}
export function useUpdateBookMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: BookRequest }) =>
      updateBook(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOK_KEY }),
  });
}
export function useDeleteBookMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBook(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOK_KEY }),
  });
}

export function useGetBookById(id: string) {
  return useQuery<Books | undefined>({
    queryKey: [...BOOK_KEY, id],
    queryFn: async () => {
      const res = await api.get<Books | null>(`/books/${id}`);
      return res.data ?? undefined;
    },
  });
}

export function useCreateBarcode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      bukuId,
      payload,
    }: {
      payload: CreateBukuHub;
      bukuId: string;
    }) => createBarcode(payload, bukuId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOK_KEY }),
  });
}
export function useGetKondisiByBarcode(barcode: string) {
  return useQuery<BukuHub>({
    queryKey: [...BOOK_KEY, barcode],
    queryFn: () => getKondisiByBarcode(barcode),
    enabled: barcode.length === 4,
  });
}

// async function testGetBooks(): Promise<Books[]> {
//   const res = await api.get<Books[] | null>("/books");
//   return res.data ?? [];
// }

// export function useTestGetBooks() {
//   return useQuery<Books[]>({
//     queryKey: BOOK_KEY,
//     queryFn: testGetBooks,
//   });
// }
