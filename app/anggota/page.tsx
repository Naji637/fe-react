"use client";

import Badge from "@/components/Badge";
import Table from "@/components/Table";
import React from "react";
import { checkStatusAnggota } from "../helper/checkStatus";

interface anggotaProps {
  id: number;
  nama: string;
  email: string;
  no_anggota: string;
  tgl_daftar: string;
  status: string;
}
const data: anggotaProps[] = [
  {
    id: 1,
    nama: "Siti Nurhalizha",
    email: "siti.nurhalizha@gmail.com",
    no_anggota: "AG-001",
    tgl_daftar: "10 Januari 2024",
    status: "aktif",
  },
  {
    id: 2,
    nama: "Budi Santoso",
    email: "budi.santoso@gmail.com",
    no_anggota: "AG-002",
    tgl_daftar: "15 Februari 2024",
    status: "aktif",
  },
  {
    id: 3,
    nama: "Agus Wijaya",
    email: "agus.wijaya@gmail.com",
    no_anggota: "AG-004",
    tgl_daftar: "20 April 2024",
    status: "nonaktif",
  },
];
export default function page() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-5 ">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-medium ">Anggota</h1>
          <p className="text-muted">Kelola data anggota perpustaakan.</p>
        </div>
        <div className="flex items-center ">
          <button className="bg-accent text-white px-4 py-2 rounded-xl">
            + Tambah Anggota
          </button>
        </div>
      </div>
      <Table<anggotaProps>
        data={data}
        keyFor={(p) => String(p.id)}
        column={[
          {
            header: "No",
            content: (c) => c.id,
          },
          {
            header: "Nama",
            content: (c) => c.nama,
          },
          {
            header: "Email",
            content: (c) => c.email,
          },
          {
            header: "No. Anggota",
            content: (c) => c.no_anggota,
          },
          {
            header: "Tgl Daftar",
            content: (c) => c.tgl_daftar,
          },
          {
            header: "Status",
            content: (c) => (
              <Badge variant={checkStatusAnggota(c.status)}>{c.status}</Badge>
            ),
          },
          {
            header: "Aksi",
            content: (c) => (
              <div className="flex gap-3">
                <button
                  onClick={() => alert(c.id)}
                  className="border border-muted rounded-xl py-2 px-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => alert(c.id)}
                  className="bg-red-50 text-red-800 py-2 px-4 rounded-xl"
                >
                  Hapus
                </button>
              </div>
            ),
          },
        ]}
      ></Table>
    </div>
  );
}
