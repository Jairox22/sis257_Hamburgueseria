import type { Categorias } from './categoria'

export interface Productos {
  id?: number;
  nombre: string;
  descripcion: string;
  precioUnitario: number;
  stock: number;
  categoria: Categorias
}