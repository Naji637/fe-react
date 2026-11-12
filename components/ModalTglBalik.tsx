"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import { RequestUpdateReturnDate } from "@/hooks/useBorrowing";
import SelectBox, { DataProps } from "./SelectBox";

interface ModalProps {
  initial: RequestUpdateReturnDate | null;
  onClose: () => void;
  isSubmiting: boolean;
  onSubmit: (payload: RequestUpdateReturnDate) => void;
}



export default function ModalTglBalik({
  onClose,
  initial,
  isSubmiting,
  onSubmit,
}: ModalProps) {
  const [status, setStatus] = useState(
    initial ? initial.status : "dikembalikan",
  );




  return (
    <div className="p-5 ">
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/40 ">
        <div className="bg-white p-5 rounded-[8px] min-w-75 ">
          <button onClick={() => onClose()}>X</button>
          <div className="gap-7 px-8 py-5">

          </div>
        </div>
      </div>
    </div>
  );
}
