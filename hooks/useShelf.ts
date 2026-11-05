import { api } from "@/lib/axios";
import { QueryClient, useQuery } from "@tanstack/react-query";

const SHELVES_KEY = ["shelves"];

export interface Shelves {
  id: string;
  shelf_number: string;
}

async function getShelves(): Promise<Shelves[]> {
  const res = await api.get<Shelves[] | null>("/shelves");
  return res.data ?? [];
}

export function useShelvesQuery() {
  return useQuery<Shelves[]>({
    queryKey: SHELVES_KEY,
    queryFn: getShelves,
  });
}
