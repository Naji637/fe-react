"use client";

import { Members, MemberRequest } from "@/hooks/useMember";
import React, { ReactNode, useEffect, useState } from "react";
import TextField from "./TextField";
import Button from "./Button";
import {MemberClassifications, useGetMemberClassificationsQuery} from "@/hooks/useMemberClassification";
import SelectBox, { DataProps } from "./SelectBox";

interface ModalProps {
  initial: Members | null;
  onClose: () => void;
  isSubmiting: boolean;
  onSubmit: (payload: MemberRequest) => void;
}

function convertToDataSelect(data: MemberClassifications[]): DataProps[] {
  const dataSelectBox: DataProps[] = [];
  data.map((item) => {
    dataSelectBox.push({ label: item.classification, value: String(item.id) });
  });
  return dataSelectBox;
}

export default function Modal({
  onClose,
  initial,
  isSubmiting,
  onSubmit,
}: ModalProps) {
  const [nama, setNama] = useState(initial ? initial.name : "");
  const [alumni, setAlumni] = useState(initial ? initial.alumni : false);
  const [memberClassificationId, setMemberClassificationId] = useState("");
  const { data, isLoading } = useGetMemberClassificationsQuery();
  useEffect(() => {
    (function setInitialMemberClassificationId() {
      if (data !== undefined) { setMemberClassificationId(() =>data.length!==0? String(data?.[0].id):'') }
    })()
  },[data])
  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    onSubmit({
      name: nama,
      alumni: alumni,
      member_classification_id: memberClassificationId,
    });
    //  console.log(typeof(klasifikasiAnggotaId))
  }

  if (isLoading) {
    return <div className="p-5">loading...</div>;
  }
  return (
    <div className="p-5 ">
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/40 ">
        <div className="bg-white p-5 rounded-[8px] min-w-75 ">
          <button onClick={() => onClose()}>X</button>
          <div className="gap-7 px-8 py-5">
            <form className="flex flex-col gap-7 " onSubmit={handleSubmit}>
              <TextField
                value={nama}
                onChange={(value) => setNama(value as string)}
                label="Nama"
              />
              <TextField
                value={alumni}
                onChange={(value) => setAlumni(value as boolean)}
                label="Alumni"
                type="checkbox"
              />
              <SelectBox
                value={memberClassificationId}
                onChange={(value) => {
                  setMemberClassificationId(value);
                }}
                data={convertToDataSelect(data!)}
                label="Member Classification"
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmiting} variant="primary">
                  {isSubmiting ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
