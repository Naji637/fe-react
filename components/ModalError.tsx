import React from "react";

interface ModalErrorProps {
  onClose: () => void;
  message: string;
}

export default function ModalError({ onClose, message }: ModalErrorProps) {
  return (
    <div className="p-5 ">
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/40 ">
        <div className="bg-white p-5 rounded-[8px] min-w-75 ">
          <div className="text-red-700 gap-7 px-8 py-5">{message}</div>
          <button className="items-end" onClick={() => onClose()}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
