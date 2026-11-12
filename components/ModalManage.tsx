"use client"

import {BorrowingRequest,Borrowing, ManageBorrowingBooks, RequestUpdateReturnDate} from "@/hooks/useBorrowing";
import SelectBox,{DataProps} from "@/components/SelectBox"
import React,{ useState,useEffect } from "react";
import TextField from "./TextField";
import Table from "./Table";
import Button from "./Button";
import { Conditions, useConditionsQuery } from "@/hooks/useCondition";



interface ModalManageProps{
  // initial: Borrowing[]|null
  onClose:()=>void;
  isSubmiting:boolean;
  onSubmit:(payload:BorrowingRequest | RequestUpdateReturnDate)=>void
}

function convertToDataSelect(data: Conditions[]): DataProps[] {
  const dataSelectBox: DataProps[] = [];
  data.map((item) => {
    dataSelectBox.push({ label: item.condition, value: String(item.id) });
  });
  return dataSelectBox;
}


export function ModalManage({ onClose,onSubmit,isSubmiting}: ModalManageProps) {
  const [selectType, setSelectType] = useState("")
  const data = [{ label: "borrowing", value: "borrowing" }, { label: "return", value: "return" }]
  const [barcode, setBarcode] = useState<string>("");
  const [latestCondition, setLatestCondition] = useState("");
  const { data:dataCondition, isLoading } = useConditionsQuery();

  useEffect(() => {
    (function setInitialKondisiAkhir() {
      setLatestCondition(() => String(dataCondition?.[0].id));
    })();
    // setInitialKondisiAkhir();
  }, [dataCondition]);

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    onSubmit({
      return_condition_id: latestCondition,
    });
  }
  if (isLoading) {
    return <div>loading...</div>;
  }

  return(
    <div className="p-5 ">
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/40 ">
        <div className="bg-white p-5 rounded-[8px] min-w-1/2 ">
          <button onClick={() => onClose()}>X</button>
          <div className="gap-7 px-8 py-5">
            <SelectBox data={data} value={selectType} label="Manage" onChange={(value) => setSelectType(value)} />
            {selectType === "borrowing" && (
              <div>
                <div className="flex flex-col  my-7">
                  <TextField
                    label="Barcode"
                    value={barcode}
                    onChange={(value) => {
                  setBarcode(value as string);
                }}
              />
                </div>
                <div className="flex flex-col mb-8 h-37.5 w-full">
                  <Table<ManageBorrowingBooks>
                    data={[]}
                    keyFor={(m) => String(m.id)}
                    column={[
                      { header: "No", content: (_, i) => i + 1 },
                      { header: "Title", content: (c, _) => c.title },
                      { header: "Condition", content: (c, _) => c.condition }
                    ]}
                  />
                </div>
                <div className="flex  justify-end bottom-0"><Button variant="primary" >Submit</Button></div>
              </div>
            )}
            {selectType === "return" && (
              <div>
                <div className="flex flex-col  my-7">
                  <TextField
                    label="Barcode"
                    value={barcode}
                    onChange={(value) => {
                  setBarcode(value as string);
                }}
              />
                </div>
                <div className="flex flex-col mb-8 h-37.5 w-full">
                  <Table<ManageBorrowingBooks>
                    data={[]}
                    keyFor={(m) => String(m.id)}
                    column={[
                      { header: "No", content: (_, i) => i + 1 },
                      { header: "Title", content: (c, _) => c.title },
                      {header: "Condition", content: (c, _) => (
                          <form className="flex flex-col gap-7 " onSubmit={handleSubmit}>
                        <SelectBox
                          value={c.condition}
                          onChange={(value) => {
                            setLatestCondition(value);
                          }}
                          data={convertToDataSelect(dataCondition!)}
                          label="Book's Condition"
                        />
                        </form>)
                      }
                    ]}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmiting} variant="warning">
                    {isSubmiting ? "Returning..." : "Return"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
