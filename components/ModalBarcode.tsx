import { BookHub, CreateBarcode} from "@/hooks/useBookHub";
import { useEffect, useState } from "react";
import TextField from "./TextField";
import SelectBox, { DataProps } from "./SelectBox";
import { Conditions, useConditionsQuery } from "@/hooks/useCondition";

import Button from "./Button";
// import { useGetNoAnggotaQuery } from "@/hooks/useMember";
import { Shelves, useShelvesQuery } from "@/hooks/useShelf";

interface ModalBarcodeProps {
  bookId :string
  onClose: () => void;
  isSubmiting: boolean;
  onSubmit: (payload: CreateBarcode) => void;
}

function convertToDataSelect(data: Conditions[]): DataProps[] {
  const dataSelectBox: DataProps[] = [];
  data.map((item) => {
    dataSelectBox.push({ label: item.condition, value: item.id });
  });
  return dataSelectBox;
}
function convertToDataSelectForShelves(data: Shelves[]): DataProps[] {
  const dataSelectBoxForShelves: DataProps[] = [];
  data.map((item) => {
    dataSelectBoxForShelves.push({ label: item.shelf_number, value: item.id });
  });
  return dataSelectBoxForShelves;
}

export default function ModalBarcode({
  isSubmiting,
  onClose,
  onSubmit,bookId
}: ModalBarcodeProps) {
  const { data: dataConditions, isLoading } = useConditionsQuery();
  const { data: dataShelves } = useShelvesQuery();
  const [conditionsId, setConditionsId] = useState("");
  const [shelfId, setShelfId] = useState("");
  const [membershipNumber, setMembershipNumber] = useState("");
  const [price,setPrice]=useState(0)

  useEffect(() => {
    (function setInitialBookHub() {
     if(dataConditions!==undefined) setConditionsId(() =>dataConditions.length!==0  ? String(dataConditions?.[0].id):"");
      if(dataShelves!==undefined)setShelfId(() =>dataShelves.length!==0 ? String(dataShelves?.[0].id):"");
    })();
  }, [dataConditions, dataShelves]);

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    let temp = null;
    if (membershipNumber !== "") {
      temp = membershipNumber;
    }
    onSubmit({
      book_id:bookId,
      condition_id: conditionsId,
      shelf_id: shelfId,
      membership_number: temp,
      price:Number(price)
    });
  }

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className="p-5 ">
      {
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/40 ">
          <div className="bg-white p-5 rounded-[8px] min-w-75 ">
            <button onClick={() => onClose()}>X</button>
            <div className="gap-7 px-8 py-5">
              <form className="flex flex-col gap-7 " onSubmit={handleSubmit}>
                <SelectBox
                  value={conditionsId}
                  onChange={(value) => {
                    setConditionsId(value);
                  }}
                  data={convertToDataSelect(dataConditions!)}
                  label="Book's Condition"
                />
                <SelectBox
                  value={shelfId}
                  onChange={(value) => {
                    setShelfId(value);
                  }}
                  data={convertToDataSelectForShelves(dataShelves!)}
                  label="Shelf Number"
                />

                <TextField
                  value={membershipNumber}
                  onChange={(value) => setMembershipNumber(value as string)}
                  label="Membership Number"
                />
                <TextField
                  value={price}
                  onChange={(value) => setPrice(value as number)}
                  label="Price"
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmiting}
                    variant="primary"
                  >
                    {isSubmiting ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
