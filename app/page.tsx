import Badge from "@/components/Badge";
import CardCount from "@/components/CardCountDashboard";
import { checkStatus } from "./helper/checkStatus";
import Card from "@/components/CardCountDashboard";
import Table from "@/components/Table";
import { header } from "@/data/tableData";
import Image from "next/image";
import { title } from "process";
// const header = ["anggota", "buku", "tgl pinjam", "jatuh tempo", "status"];

interface peminjamProps {
  id: number;
  anggota: string;
  buku: string;
  tgl_pinjam: string;
  jatuh_tempo: string;
  status: string;
}

const data: peminjamProps[] = [
  {
    id: 1,
    anggota: "Rina marlina",
    buku: "clean code",
    tgl_pinjam: "5 agustus 2026",
    jatuh_tempo: "19 agustus 2026",
    status: "dipinjam",
  },
  {
    id: 2,
    anggota: "budi santoso",
    buku: "atomic habit",
    tgl_pinjam: "1 agustus 2026",
    jatuh_tempo: "15 agustus 2026",
    status: "dipinjam",
  },
  {
    id: 3,
    anggota: "siti nurhaliza",
    buku: "laskar pelangi",
    tgl_pinjam: "20 juli 2026",
    jatuh_tempo: "3 agustus 2026",
    status: "terlambat",
  },
  {
    id: 4,
    anggota: "dewi lestari",
    buku: "sapiens",
    tgl_pinjam: "15 juli 2026",
    jatuh_tempo: "29 juli 2026",
    status: "dikembalikan",
  },
  {
    id: 5,
    anggota: "siti nurhaliza",
    buku: "rongeng duku paruk",
    tgl_pinjam: "10 juli 2026",
    jatuh_tempo: "24 juli 2026",
    status: "terlambat",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted">Ringkasan aktivitas perpustakaan hari ini</p>
      </div>

      <div className="flex gap-5">
        <CardCount title={"Total Angota"} sum={8} />
        <CardCount title={"Total Buku"} sum={8} />
        <CardCount title={"Buku Sedang Dipinjam"} sum={8} />
        <CardCount title={"Pinjaman Terlamabat"} sum={8} />
      </div>
      <Table<peminjamProps>
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
        data={data}
        keyFor={(p) => String(p.id)}
      ></Table>
    </div>
  );
}
