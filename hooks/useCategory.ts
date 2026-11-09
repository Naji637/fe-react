import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const CATEGORIES_KEY = ["categories"];


export interface Categories {
  id: string;
  category: string;
}

async function GetCategories(): Promise<Categories[]> {
  const res = await api.get<Categories[] | null>("/categories");
  return res.data ?? [];
}

async function GetCategoryById(id: string): Promise<Categories>{
  const res = await api.get<Categories>(`/categories/${id}`)
  return res.data
}

export function useCategoriesQuery() {
  return useQuery<Categories[]>({
    queryKey: CATEGORIES_KEY,
    queryFn: GetCategories,
  });
}

export function useGetCategoryById(id: string) {
  return useQuery<Categories>({
    queryKey: [...CATEGORIES_KEY,id],
    queryFn: ()=>GetCategoryById(id),
  });

}
