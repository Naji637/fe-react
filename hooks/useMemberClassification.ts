import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const MEMBER_CLASSIFICATION_KEY= ["member_classifications"];

<<<<<<< HEAD
export interface MemberClassifications{
=======
export interface  MemberClassifications{
>>>>>>> origin/main
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

<<<<<<< HEAD
export function useGetMemberClassificationsQuery() {
=======
export function useGetKlasifikasiAnggotaQuery() {
>>>>>>> origin/main
  return useQuery<MemberClassifications[]>({
    queryKey: MEMBER_CLASSIFICATION_KEY,
    queryFn: getMemberClassification,
  });
}
