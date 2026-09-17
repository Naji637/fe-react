"use client";

import Badge from "@/components/Badge";
import Button from "@/components/Button";
// import ModalPinjaman from "@/components/ModalPinjaman";
import Table from "@/components/Table";
import TextField from "@/components/TextField";
import { useGetNoAnggotaQuery } from "@/hooks/useAnggota";
import { Buku, Pinjaman, usePinjamanQuery } from "@/hooks/usePinjaman";
import React, { useState } from "react";
export default function Page() {
  // const [dataPinjaman, setDataPinjaman] = useState<Pinjaman | null | undefined>(
  //   undefined,
  // );
  const [noAnggota, setNoAnggota] = useState<string>("");
  const { data, isLoading } = usePinjamanQuery(noAnggota);
  const bukuBuku = data?.buku;
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-5 ">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-medium ">Pinjaman</h1>
          <p className="text-muted">Kelola data pinjaman perpustaakan.</p>
        </div>
        <div className="flex items-center ">
          {/* <Button onClick={() => setDataPinjaman(null)} variant="primary">
            + Tambah Pinjaman
          </Button> */}
          {/* {dataPinjaman !== undefined && (
            <ModalPinjaman
              isSubmiting={createMutation.isPending || updateMutation.isPending}
              initial={dataPinjaman}
              onClose={() => setDataPinjaman(undefined)}
              onSubmit={(payload) => {
                if (dataPinjaman) {
                  updateMutation.mutate(
                    {
                      id: dataPinjaman.id,
                      payload,
                    },
                    { onSuccess: () => setDataPinjaman(undefined) },
                  );
                } else {
                  createMutation.mutate(
                    payload,

                    { onSuccess: () => setDataPinjaman(undefined) },
                  );
                }
              }}
            />
          )} */}
        </div>
      </div>
      {isLoading && (
        <div>
          <h1>sedang menunggu data</h1>
        </div>
      )}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5 w-1/8">
          <div>
            <TextField
              label="No. Anggota"
              value={noAnggota}
              onChange={(value) => {
                setNoAnggota(value as string);
              }}
            />
            <div className="mt-2">
              {data?.nama === undefined && (
                <div className="mt-2 border-2 border-gray-100 bg-white px-2 py-1 rounded-md">
                  Nama
                </div>
              )}
              {data?.nama !== undefined && (
                <div className="mt-2 border-2 border-gray-100 bg-white px-2 py-1 rounded-md">
                  {data.nama}
                </div>
              )}
            </div>
          </div>
          <div className="w-screen">
            <Table<Buku>
              data={bukuBuku ?? []}
              keyFor={(p) => String(p.id)}
              column={[
                { header: "No", content: (c) => c.id },
                { header: "Judul", content: (c) => c.judul },
                { header: "Tanggal Pinjam", content: (c) => c.tgl_pinjam },
              ]}
            ></Table>
          </div>
        </div>
      </div>
    </div>
  );
}

// {!isLoading && (
//   <Table<Pinjaman>
//     data={data ?? []}
//     keyFor={(p) => String(p.id)}
//     column={[
//       {
//         header: "No",
//         content: (c) => c.id,
//       },
//       {
//         header: "Nama",
//         content: (c) => c.anggota_id,
//       },
//       {
//         header: "judul",
//         content: (c) => c.buku_id,
//       },
//       {
//         header: "Tanggal Pinjam",
//         content: (c) => c.tgl_pinjam,
//       },
//       {
//         header: "Tanggal Balik",
//         content: (c) => c.tgl_balik,
//       },
//       {
//         header: "Status",
//         content: (c) => c.status,
//       },
//       {
//         header: "Aksi",
//         content: (c) => (
//           <div className="flex gap-3">
//             <Button
//               onClick={() => setDataPinjaman(c)}
//               variant="secondary"
//             >
//               Edit
//             </Button>

//             <Button
//               onClick={() => {
//                 if (
//                   window.confirm(
//                     "Apakah Anda yakin ingin menghapus anggota ini?",
//                   )
//                 ) {
//                   deleteMutation.mutate(c.id);
//                 }
//               }}
//               variant="warning"
//             >
//               Hapus
//             </Button>
//           </div>
//         ),
//       },
//     ]}
//   ></Table>
// )}
