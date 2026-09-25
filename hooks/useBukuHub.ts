const BUKU_HUB = ["buku-hub"];

export interface BukuHub {
  list_kondisi_id: number;
  rak_id: number;
  no_anggota: string;
}

export interface CreateBukuHub {
  list_kondisi_id: number;
  rak_id: number;
  no_anggota: string | null;
}
