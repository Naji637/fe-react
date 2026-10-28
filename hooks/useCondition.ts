import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const CONDITIONS_KEY = ["conditions"];

export interface Conditions {
  id: string;
  condition: string;
}

async function getConditions(): Promise<Conditions[]> {
  const res = await api.get<Conditions[] | null>("/conditions");
  return res.data ?? [];
}

export function useConditionsQuery() {
  return useQuery<Conditions[]>({
    queryKey: CONDITIONS_KEY,
    queryFn: getConditions,
  });
}

