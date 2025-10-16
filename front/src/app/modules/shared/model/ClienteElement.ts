export interface ClientElement {
  id?: number;
  nombre: string;
  t_documento: string;
  nit: string;
  direccion: string;
  telefono: number;
  ciudad: string | null;
  correo: string;
  estado: string;
  desvincular: string;
  valor_credito: number;
  fecha_credito: string;
  remitente?: string | null;
  cedularemitente?: string | null;
  telefonoremitente?: string | null;
  tipo: string;
  ciudaddane: string;
  dv: string;
  tipopersona: string;
  tipoiva: string;
}