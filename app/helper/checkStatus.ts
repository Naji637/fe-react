type badgeStatus = "green" | "gray" | "red";

export function checkStatus(status: string): badgeStatus {
  if (status === "dipinjam") {
    return "green";
  } else if (status === "dikembalikan") {
    return "gray";
  } else {
    return "red";
  }
}
export function checkStatusAnggota(status: string): badgeStatus {
  if (status === "aktif") {
    return "green";
  } else {
    return "gray";
  }
}
