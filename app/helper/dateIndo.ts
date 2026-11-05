export function showDate(date: string): string {
  const tampung = date.split("T");
  return tampung[0].split("-").reverse().join("-");
}
