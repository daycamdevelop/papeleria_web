export interface ProveedorElement {
  id?: number;
  nombre: string;
  nit: string;
  direccion: string;
  telefono: number;
  celular: string | null;
  correo: string;
  estado: string;
  desvincular: string;
}