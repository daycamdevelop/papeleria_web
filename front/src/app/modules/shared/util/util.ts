export function formatoFecha(fecha: Date): string {
  if(fecha){
    const yyyy = fecha.getFullYear();
    const MM = String(fecha.getMonth() + 1).padStart(2, "0");
    const dd = String(fecha.getDate()).padStart(2, "0");
    const HH = String(fecha.getHours()).padStart(2, "0");
    const mm = String(fecha.getMinutes()).padStart(2, "0");
    return `${yyyy}/${MM}/${dd} ${HH}:${mm}`;
  }
  return "";
}

export function formatoFechaSinHora(fecha: Date, separator?:String): string {
  const yyyy = fecha.getFullYear();
  const MM = String(fecha.getMonth() + 1).padStart(2, "0");
  const dd = String(fecha.getDate()).padStart(2, "0");
  return `${yyyy+""+separator+MM+separator+dd}`;
}

export function formatoPrecioAEntero(valor:string): string{
  return valor.replace("$","").replaceAll(".","");
}

export function formatoEnteroAPrecio(valor:string, agregarPesos:boolean): string{
  let valorLimpio = formatoPrecioAEntero(valor);
  valorLimpio = valorLimpio.replace(',', '.');
  const numero = parseFloat(valorLimpio) || 0;
  const valorFormateado = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(numero);
  return agregarPesos ? "$"+valorFormateado : valorFormateado;
}