import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MEMBERS_KEY = ["members"];

export interface Members {
  id: string;
  membership_number: string;
  name: string;
  alumni: boolean;
  member_classification_id: string;
}

export interface MemberRequest {
  name: string;
  alumni: boolean;
  member_classification_id: string;
}

async function getMembers(): Promise<Members[]> {
  const res = await api.get<Members[] | null>("/members");
  return res.data ?? [];
}
async function getMemberById (id:string):Promise<Members|undefined> {
      const res = await api.get<Members | null>(`/anggota/${id}`);
      return res.data ?? undefined;
    }
async function postMember(payload: MemberRequest): Promise<void> {
  await api.post("/members", payload);
}
async function updateMember(
  id: string,
  payload: MemberRequest,
): Promise<void> {
  await api.put(`/members/${id}`, payload);
}
async function deleteMember(id: string): Promise<void> {
  await api.delete(`/members/${id}`);
}

export function useMembersQuery() {
  return useQuery<Members[]>({
    queryKey: MEMBERS_KEY,
    queryFn: getMembers,
  });
}

export function useCreateMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: MemberRequest) => postMember(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MEMBERS_KEY }),
  });
}
export function useUpdateMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: MemberRequest }) =>
      updateMember(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MEMBERS_KEY }),
  });
}
export function useDeleteMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMember(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MEMBERS_KEY }),
  });
}

export function useGetMemberId(id: string) {
  return useQuery<Members | undefined>({
    queryKey: [...MEMBERS_KEY, id],
    queryFn:()=>getMemberById(id)
  });
}

async function getMembershipNumber(membershipNumber: string): Promise<Members | null> {
  const res = await api.get(`/members/search?q=${membershipNumber}`);
  return res.data;
}
export function useGetMembershipNumberQuery(membershipNumber: string) {
  return useQuery<Members | null>({
    queryKey: [...MEMBERS_KEY, membershipNumber],
    queryFn: () => getMembershipNumber(membershipNumber),
    enabled: membershipNumber.length === 4,
  });
}
