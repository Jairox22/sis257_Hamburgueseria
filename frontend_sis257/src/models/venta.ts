import type { Cliente } from './cliente'
import type { Empleados } from './empleado'

// Definir el tipo para los detalles de venta
export interface DetalleVenta {
  producto: {
    id: number
    nombre: string
    precio: number
    [key: string]: any
  }
  cantidad: number
  precioUnitario: number
}

export interface Venta {
  id: number
  idCliente: number
  cliente: Cliente
  idEmpleado: number
  empleado: Empleados
  metodoPago: string
  totalVenta: number
  estado: string
  detalles: DetalleVenta[]
  fechaCreacion: Date
}
