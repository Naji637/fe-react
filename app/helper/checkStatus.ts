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
export function checkStatusAnggota(status:boolean): badgeStatus {
  if (status === false) {
    return "green";
  } else {
    return "red";
  }
}
