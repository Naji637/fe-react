import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const KLASIFIKASIANGGOTA = ["klasifikasi_anggota"];

export interface KlasifikasiAnggota {
  id: number;
  klasifikasi: string;
  maksBuku: number;
  maksHari: number;
}

async function getKlasifikasiAnggota(): Promise<KlasifikasiAnggota[]> {
  const res = await api.get<KlasifikasiAnggota[] | null>(
    "/klasifikasi-anggota",
  );
  return res.data ?? [];
}

export function useGetKlasifikasiAnggotaQuery() {
  return useQuery<KlasifikasiAnggota[]>({
    queryKey: KLASIFIKASIANGGOTA,
    queryFn: getKlasifikasiAnggota,
  });
}
