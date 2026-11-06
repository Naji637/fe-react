const BUKU_HUB = ["buku-hub"];

// export interface BookHub {
//   condition_id: string;
//   shelf_id: string;
//   membership_number: string;
// }

export interface CreateBarcode {
  book_id:string
  condition_id: string;
  shelf_id: string;
  membership_number: string | null;
  price :number
}
