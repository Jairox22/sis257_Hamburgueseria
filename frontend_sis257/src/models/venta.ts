import type { Cliente } from './cliente'
import type { Empleado } from './empleado'
import type { Producto } from './producto'

export interface DetalleVenta {
  idProducto: number
  producto: Producto
  cantidad: number
}

export interface Venta {
  idCliente: number
  cliente: Cliente
  idEmpleado: number
  empleado: Empleado
  metodoPago: string
  detalles: DetalleVenta[]
  tipoDocumento: string
}
