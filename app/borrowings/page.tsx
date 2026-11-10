"use client";

import Button from "@/components/Button";
import Table from "@/components/Table";
import TextField from "@/components/TextField";
import axios from "axios";

import {
  Book,
  RequestUpdateReturnDate,
  useBookHubQuery,
  useCreateBorrowingMutation,
  useBorrowingsQuery,
  useUpdateReturnDateMutation,
  BookHub,
} from "@/hooks/useBorrowing";

import React, { useEffect, useState } from "react";
import { showDate } from "../helper/dateIndo";
import ModalTglBalik from "@/components/ModalTglBalik";

import ModalError from "@/components/ModalError";
import { useGetKondisiByBarcode } from "@/hooks/useBook";
import { useConditionsQuery } from "@/hooks/useCondition";
import { log } from "console";

export default function Page() {
  const [noAnggota, setNoAnggota] = useState<string>("");
  const [dataTglBalik, setDataTglBalik] = useState<
    RequestUpdateReturnDate | null | undefined
  >(undefined);
  const [PinjamanId, setPinjamanId] = useState<string | null>(null);
  const { data, isLoading } = useBorrowingsQuery(noAnggota);
  const [barcode, setBarcode] = useState<string>("");
  const { data: dataBuku } = useBookHubQuery(barcode);
  const createPinjaman = useCreateBorrowingMutation();
  const updateTglBalik = useUpdateReturnDateMutation();
  const [messageError, setMessageError] = useState<string | null>(null);
  const { data: dataKondisiByBarcode, isLoading: isLoadingKondisi } =
    useGetKondisiByBarcode(barcode);
  const {data:dataCondition}=useConditionsQuery()
  const [returnConditionId, setReturnConditionId] = useState("")
  useEffect(() => {
    (function setInitialReturnConditionId() {
      if (dataCondition !== undefined) {
        setReturnConditionId(() =>dataCondition.length!==0 ? String(dataCondition?.[0].id):"")
        }
    })()
  },[dataCondition])
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-5 ">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-medium ">Pinjaman</h1>
          <p className="text-muted">Kelola data pinjaman perpustaakan.</p>
        </div>

        <div className="flex items-center "></div>
      </div>
      {isLoading && isLoadingKondisi && (
        <div>
          <h1>sedang menunggu data</h1>
        </div>
      )}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5 w-screen">
          <div className="flex items-end gap-4">
            <TextField
              label="No. Anggota"
              value={noAnggota}
              onChange={(value) => {
                setNoAnggota(value as string);
              }}
            />
            <div className="text-xl font-medium ">
              {data?.name !== undefined && <div>{data.name}</div>}
            </div>
          </div>

          {dataTglBalik !== undefined && (
            <ModalTglBalik
              initial={dataTglBalik}
              isSubmiting={updateTglBalik.isPending}
              onClose={() => setDataTglBalik(undefined)}
              onSubmit={(payload) => {
                {
                  updateTglBalik.mutate(
                    {
                      id:String(PinjamanId),
                      payload,
                    },
                    { onSuccess: () => setDataTglBalik(undefined) },
                  );
                }
              }}
            />
          )}

          <div className="flex items-end gap-20">
            <div className="flex items-end gap-4">
              <TextField
                label="Kode Buku"
                value={barcode}
                onChange={(value) => {
                  setBarcode(value as string);
                }}
              />
              <div className="text-xl font-medium ">
                {dataBuku?.title !== undefined && <div>{dataBuku.title}</div>}
              </div>
            </div>

            <Button
              onClick={() =>
                createPinjaman.mutate(
                  {
                    member_id: data!.id,
                    book_id: dataBuku!.id,
                    borrow_officer_id: null,
                    return_officer_id: null,
                    borrow_condition_id: dataKondisiByBarcode!.condition_id,
                    return_condition_id: returnConditionId,
                    status: "dipinjam",
                  },
                  {
                    onError: (error) => {
                      if (axios.isAxiosError(error)) {
                        setMessageError(error.response?.data.message);
                      }
                    },
                  },
                )
              }
              type="submit"
              variant="primary"
            >
              + Tambah Buku
            </Button>
          </div>
          {messageError !== null && (
            <ModalError
              onClose={() => setMessageError(null)}
              message={messageError}
            />
          )}
          <div className="w-screen">
            <Table<BookHub>
              data={data?.book_hub ?? []}
              keyFor={(p) => String(p.id)}
              column={[
                { header: "No", content: (_, i) => i + 1 },
                { header: "title", content: (c, _) => c.title },
                {
                  header: "Tanggal Pinjam",
                  content: (c, _) => showDate(c.borrow_date),
                },
                {
                  header: "Book's Condition",
                  content: (c, _) => c.borrow_condition,
                },
              ]}
            ></Table>
          </div>
        </div>
      </div>
    </div>
  );
}
