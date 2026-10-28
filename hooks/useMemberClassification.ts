import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const MEMBER_CLASSIFICATION_KEY= ["member_classifications"];

export interface  MemberClassifications{
  id: string;
  classification: string;
  max_books: number;
  max_days: number;
}

async function getMemberClassification(): Promise<MemberClassifications[]> {
  const res = await api.get<MemberClassifications[] | null>(
    "/member-classifications",
  );
  return res.data ?? [];
}

export function useGetKlasifikasiAnggotaQuery() {
  return useQuery<MemberClassifications[]>({
    queryKey: MEMBER_CLASSIFICATION_KEY,
    queryFn: getMemberClassification,
  });
}
