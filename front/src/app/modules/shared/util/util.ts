export function formatoFecha(fecha: Date): string {
  const yyyy = fecha.getFullYear();
  const MM = String(fecha.getMonth() + 1).padStart(2, "0");
  const dd = String(fecha.getDate()).padStart(2, "0");
  const HH = String(fecha.getHours()).padStart(2, "0");
  const mm = String(fecha.getMinutes()).padStart(2, "0");

  return `${yyyy}/${MM}/${dd} ${HH}:${mm}`;
}