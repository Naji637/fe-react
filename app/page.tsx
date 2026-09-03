"use client";

import Badge from "@/components/Badge";
import CardCount from "@/components/CardCountDashboard";
import { checkStatus } from "./helper/checkStatus";
import Table from "@/components/Table";

import { useBukuQuery } from "@/hooks/useBuku";
import { usePinjamanQuery } from "@/hooks/usePinjaman";
import { useAnggotaQuery } from "@/hooks/useAnggota";
import { useMemo } from "react";

export interface TableData {
  id: number;
  anggota: string;
  buku: string;
  tgl_pinjam: string;
  jatuh_tempo: string;
  status: string;
}

export default function Home() {
  const {
    data: dataAnggota,
   
  } = useAnggotaQuery();
  const { data: dataBuku} = useBukuQuery();
  const {
    data: dataPinjaman,
    
  } = usePinjamanQuery();
  const tableData = useMemo<TableData[]>(() => {
    if (!dataPinjaman) return [];

    return dataPinjaman.map((p, index) => ({
      id: index + 1,
      anggota: dataAnggota?.find((a) => a.id === p.anggota_id)?.nama || "",
      buku: dataBuku?.find((b) => b.id === p.buku_id)?.judul || "",
      tgl_pinjam: p.tgl_pinjam || "",
      jatuh_tempo: p.tgl_balik || "",
      status: p.status || "",
    }));
  }, [dataPinjaman, dataAnggota, dataBuku]);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted">Ringkasan aktivitas perpustakaan hari ini</p>
      </div>

      <div className="flex gap-5">
        <CardCount title="Total Anggota" sum={dataAnggota?.length || 0} />

        <CardCount title="Total Buku" sum={dataBuku?.length || 0} />

        <CardCount
          title="Buku Sedang Dipinjam"
          sum={dataPinjaman?.filter((p) => p.status === "Dipinjam").length || 0}
        />

        <CardCount
          title="Pinjaman Terlambat"
          sum={
            dataPinjaman?.filter((p) => p.status === "Terlambat").length || 0
          }
        />
      </div>

      <Table<TableData>
        data={tableData}
        keyFor={(p) => String(p.id)}
        column={[
          {
            header: "No",
            content: (w) => w.id,
          },
          {
            header: "Anggota",
            content: (w) => w.anggota,
          },
          {
            header: "Buku",
            content: (w) => w.buku,
          },
          {
            header: "Tgl Pinjam",
            content: (w) => w.tgl_pinjam,
          },
          {
            header: "Jatuh Tempo",
            content: (w) => w.jatuh_tempo,
          },
          {
            header: "Status",
            content: (w) => (
              <Badge variant={checkStatus(w.status)}>{w.status}</Badge>
            ),
          },
        ]}
      />
    </div>
  );
}