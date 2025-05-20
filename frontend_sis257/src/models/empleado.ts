import type { Usuarios } from './usuario'

export interface Empleados {
  id: number
  nombres: string
  apellidos: string
  cargo: string
  fechaContratacion: Date
  usuario: Usuarios
}
