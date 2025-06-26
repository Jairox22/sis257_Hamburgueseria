<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useToast } from 'primevue/usetoast'
import type { DetalleVenta } from '@/models/venta'
import type { Productos } from '@/models/producto'
import Swal from 'sweetalert2'
import ClienteCreate from '../../components/cliente/ClienteCreate.vue'
import { getEmpleado } from '@/helpers'

const toast = useToast()
const router = useRouter()


// Datos para los selects
type Cliente = { id: number; nombres: string; apellidos?: string }
type Empleado = { id: number; nombres: string; apellidos?: string }
const pagoCliente = ref<number | null>(null)
const clientes = ref<Cliente[]>([])
const empleados = ref<Empleado[]>([])
const productos = ref<Productos[]>([])
const categorias = ref([])

// Filtros
const busquedaCliente = ref('')
const busquedaEmpleado = ref('')
const busquedaProducto = ref('')

// Modal de cliente
const mostrarModalCliente = ref(false)

// Formulario de venta
const ventaForm = ref({
  clienteId: null as number | null,
  empleadoId: null as number | null,
  metodoPago: null,
  detalles: []
})

// Producto seleccionado para agregar
const productoSeleccionado = ref<Productos | null>(null)
const cantidad = ref(1)

// Tabla de productos seleccionados
const detallesVenta = ref<DetalleVenta[]>([])
const submitting = ref(false)

// Total de la venta
const totalVenta = computed(() => {
  return detallesVenta.value.reduce((total, item) => {
    return total + (item.cantidad * item.producto.precio)
  }, 0)
})

const cambio = computed(() => {
  if (pagoCliente.value === null) return 0
  return Math.max(0, pagoCliente.value - totalVenta.value)
})

// Filtros computados
const clientesFiltrados = computed(() => {
  if (!busquedaCliente.value) return clientes.value

  return clientes.value.filter(cliente =>
    `${cliente.nombres} ${cliente.apellidos || ''}`.toLowerCase().includes(busquedaCliente.value.toLowerCase())
  )
})

const empleadosFiltrados = computed(() => {
  if (!busquedaEmpleado.value) return empleados.value

  return empleados.value.filter(empleado =>
    `${empleado.nombres} ${empleado.apellidos || ''}`.toLowerCase().includes(busquedaEmpleado.value.toLowerCase())
  )
})

const productosFiltrados = computed(() => {
  let filtrados = productos.value

  if (busquedaProducto.value) {
    filtrados = filtrados.filter(producto =>
      producto.nombre.toLowerCase().includes(busquedaProducto.value.toLowerCase())
    )
  }

  return filtrados
})

const maxCantidadProducto = computed(() => {
  if (!productoSeleccionado.value) return 1
  const detalleExistente = detallesVenta.value.find(
    d => d.producto.id === productoSeleccionado.value!.id
  )
  const cantidadAgregada = detalleExistente ? detalleExistente.cantidad : 0
  return (productoSeleccionado.value.stock || 0) - cantidadAgregada
})

// Cargar datos iniciales
async function cargarDatos() {
  try {
    const [clientesResp, empleadosResp, productosResp, categoriasResp] = await Promise.all([
      http.get('clientes'),
      http.get('empleados'),
      http.get('productos/stock'),
      http.get('categorias')
    ])

    clientes.value = clientesResp.data
    empleados.value = empleadosResp.data
    productos.value = productosResp.data
    categorias.value = categoriasResp.data
    console.log('Clientes:', clientes.value)

    // Obtener empleado autenticado y seleccionarlo en el formulario
    const empleadoAuth = getEmpleado();
    console.log('Empleado Auth:', empleadoAuth);
    if (empleadoAuth) {
      try {
        const empleadoActual = await http.get(`empleados/usuario/${empleadoAuth}`);
        console.log('Empleado Respuesta:', empleadoActual.data);
        if (empleadoActual.data && empleadoActual.data.id) {
          ventaForm.value.empleadoId = empleadoActual.data.id;
        }
      } catch (error) {
        toast.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'No se pudo seleccionar el empleado autenticado',
          life: 3000
        })
      }
    } else {
      toast.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'No se pudo seleccionar el empleado autenticado',
        life: 3000
      })
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudieron cargar los datos necesarios',
      life: 3000
    })
  }
}

// Manejar cuando se agrega un nuevo cliente
function nuevoClienteAgregado(_nuevoCliente: any) {
  // Volver a cargar la lista de clientes desde el backend
  http.get('clientes').then(resp => {
    clientes.value = resp.data
    // Seleccionar el cliente con el id más alto
    const maxIdCliente = clientes.value.reduce((max, c) => c.id > max ? c.id : max, 0)
    ventaForm.value.clienteId = maxIdCliente
  })
  mostrarModalCliente.value = false
  toast.add({
    severity: 'success',
    summary: 'Éxito',
    detail: 'Cliente creado y seleccionado correctamente',
    life: 3000
  })
}

// Abrir modal de cliente
function abrirModalCliente() {
  mostrarModalCliente.value = true
}

// Agregar producto a la venta
function agregarProducto() {
  if (!productoSeleccionado.value) {
    toast.add({
      severity: 'warn',
      summary: 'Atención',
      detail: 'Seleccione un producto para agregar',
      life: 3000
    })
    return
  }

  if (cantidad.value <= 0) {
    toast.add({
      severity: 'warn',
      summary: 'Atención',
      detail: 'La cantidad debe ser mayor a 0',
      life: 3000
    })
    return
  }

  // Verificar si el producto ya está en la lista
  const productoIndex = detallesVenta.value.findIndex(
    item => item.producto.id === productoSeleccionado.value!.id
  )

  if (productoIndex >= 0) {
    // Actualizar cantidad si ya existe
    detallesVenta.value[productoIndex].cantidad += cantidad.value
  } else {
    // Agregar nuevo producto
    detallesVenta.value.push({
      producto: {
        id: productoSeleccionado.value.id!,
        nombre: productoSeleccionado.value.nombre,
        precio: productoSeleccionado.value.precioUnitario
      },
      cantidad: cantidad.value,
      precioUnitario: productoSeleccionado.value.precioUnitario
    })
  }

  // Resetear selección
  productoSeleccionado.value = null
  cantidad.value = 1
}

// Eliminar producto de la venta
function eliminarProducto(index: number) {
  detallesVenta.value.splice(index, 1)
}

// Guardar venta
async function guardarVenta() {
  if (!ventaForm.value.clienteId) {
    toast.add({
      severity: 'warn',
      summary: 'Atención',
      detail: 'Seleccione un cliente',
      life: 3000
    })
    return
  }

  if (!ventaForm.value.empleadoId) {
    toast.add({
      severity: 'warn',
      summary: 'Atención',
      detail: 'Seleccione un empleado',
      life: 3000
    })
    return
  }

  if (detallesVenta.value.length === 0) {
    toast.add({
      severity: 'warn',
      summary: 'Atención',
      detail: 'Agregue al menos un producto a la venta',
      life: 3000
    })
    return
  }

  if (pagoCliente.value === null || pagoCliente.value < totalVenta.value) {
    toast.add({
      severity: 'warn',
      summary: 'Atención',
      detail: 'El pago del cliente debe ser igual o mayor al total',
      life: 3000
    })
    return
  }

  submitting.value = true

  try {
    const ventaData = {
      idCliente: ventaForm.value.clienteId,
      idEmpleado: ventaForm.value.empleadoId,
      metodoPago: 'efectivo',
      montoPagado: pagoCliente.value,
      cambio: cambio.value,
      detalles: detallesVenta.value.map(item => ({
        idProducto: item.producto.id,
        cantidad: item.cantidad
      }))
    }

    await http.post('ventas', ventaData)

    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Venta registrada correctamente',
      life: 3000
    })

    await Swal.fire({
      icon: 'success',
      title: 'Venta registrada',
      text: 'La venta se registró correctamente',
      confirmButtonText: 'OK'
    })

    // Redirigir a la lista de ventas
    router.push('/admin/ventas')
  } catch (error) {
    let detailMessage = 'No se pudo registrar la venta'
    const err = error as { response?: { data?: { message?: string } } }
    if (err.response && err.response.data?.message) {
      detailMessage = err.response.data.message
    }

    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: detailMessage,
      life: 3000
    })
  } finally {
    submitting.value = false
  }
}

// Cancelar y volver a la lista
function cancelar() {
  router.push('/admin/ventas')
}

// Al montar el componente
onMounted(() => {
  cargarDatos()
})
</script>

<template>
  <div class="admin-container">
    <div class="crud-container">
      <div class="crud-header">
        <div class="title-container">
          <i class="pi pi-shopping-cart" style="font-size: 1rem; color: #ffffff;"></i>
          <h1 style="font-size: 1rem; color: #ffffff;">Registrar Nueva Venta</h1>
        </div>
      </div>
      <div class="crud-content">
        <div class="venta-container">
          <div class="venta-form">
            <div class="form-row" style="align-items: center; gap: 1.5rem;">
              <div class="form-group" style="flex: 1.26;">
                <label for="cliente">Cliente <span class="required">*</span></label>
                <Select id="cliente" v-model="ventaForm.clienteId" :options="clientesFiltrados" optionLabel="nombres"
                  optionValue="id" placeholder="Seleccione un cliente" class="w-full" :disabled="submitting" filter
                  filterPlaceholder="Buscar cliente...">
                  <template #option="slotProps">
                    {{ slotProps.option.nombres }} {{ slotProps.option.apellidos || '' }}
                  </template>
                  <template #footer>
                    <div style="padding: 0.5rem; text-align: center; border-top: 1px solid #e5e7eb;">
                      <Button label="Agregar nuevo cliente" icon="pi pi-user-plus" class="p-button-text"
                        @click.stop="abrirModalCliente" style="width: 100%;" />
                    </div>
                  </template>
                </Select>
              </div>

              <div class="form-group">
                <label for="empleado">Empleado <span class="required">*</span></label>
                <Select id="empleado" v-model="ventaForm.empleadoId" :options="empleadosFiltrados" optionLabel="nombres"
                  optionValue="id" placeholder="Seleccione un empleado" class="w-full" :disabled="true" filter
                  filterPlaceholder="Buscar empleado...">
                  <template #option="slotProps">
                    {{ slotProps.option.nombres }} {{ slotProps.option.apellidos || '' }}
                  </template>
                </Select>
              </div>
            </div>

            <div class="products-section">
                <div class="form-row" style="align-items: flex-end; gap: 1.5rem;">
                <div class="form-group-large" style="flex: 1.8;">
                  <label for="producto">Producto</label>
                  <Select id="producto" v-model="productoSeleccionado" :options="productosFiltrados"
                  optionLabel="nombre" placeholder="Seleccione un producto" class="w-full" :disabled="submitting"
                  filter filterPlaceholder="Buscar producto...">
                  <template #option="slotProps">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>
                      {{ slotProps.option.nombre }} - {{ slotProps.option.precioUnitario }} Bs
                    </span>
                    <span style="font-size: 0.8em; color: #10B981; margin-left: 8px;">
                      Stock: {{ slotProps.option.stock }}
                    </span>
                    </div>
                  </template>
                  </Select>
                </div>

                <div class="form-group-small" style="flex: 1; min-width: 120px;">
                  <label for="cantidad">Cantidad</label>
                  <InputNumber id="cantidad" v-model="cantidad" :min="1" :max="maxCantidadProducto"
                  :disabled="submitting || maxCantidadProducto <= 0" showButtons style="width: 100%;" />
                </div>

                <div class="form-group-action" style="flex: none; padding-bottom: 0;">
                  <Button label="Agregar" icon="pi pi-plus" @click="agregarProducto"
                  :disabled="!productoSeleccionado || cantidad <= 0 || cantidad > maxCantidadProducto || submitting"
                  style="height: 48px; min-width: 140px; font-size: 1.1rem; padding: 0 2rem;" />
                </div>
                </div>

              <div class="products-table">
                <DataTable :value="detallesVenta" responsiveLayout="scroll" class="p-datatable-sm">
                  <Column field="producto.nombre" header="Producto">
                    <template #body="slotProps">
                      {{ slotProps.data.producto.nombre }}
                    </template>
                  </Column>
                  <Column field="cantidad" header="Cantidad" />
                  <Column field="producto.precio" header="Precio Unitario">
                    <template #body="slotProps">
                      {{ slotProps.data.producto.precio }} Bs
                    </template>
                  </Column>
                  <Column field="subtotal" header="Subtotal">
                    <template #body="slotProps">
                      {{ (slotProps.data.cantidad * slotProps.data.producto.precio).toFixed(2) }} Bs
                    </template>
                  </Column>
                  <Column header="Acciones" style="width:100px">
                    <template #body="slotProps">
                      <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger"
                        @click="eliminarProducto(slotProps.index)" :disabled="submitting" />
                    </template>
                  </Column>
                </DataTable>
              </div>

              <div class="total-section">
                <div class="total-label">Pago del cliente:</div>
                <InputNumber v-model="pagoCliente" :min="totalVenta" :disabled="submitting" mode="decimal"
                  :step="0.01" />
              </div>
              <div class="totals-summary">
                <div class="totals-row">
                  <div class="totals-item">
                    <span class="total-label">Total:</span>
                    <span class="total-value">{{ totalVenta.toFixed(2) }} Bs</span>
                  </div>
                  <div class="totals-item">
                    <span class="total-label">Pago del cliente:</span>
                    <span class="total-value">{{ pagoCliente !== null ? pagoCliente.toFixed(2) : '0.00' }} Bs</span>
                  </div>
                  <div class="totals-item">
                    <span class="total-label">Cambio:</span>
                    <span class="total-value">{{ cambio.toFixed(2) }} Bs</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="actions-footer">
              <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cancelar"
                :disabled="submitting" />
              <Button label="Guardar Venta" icon="pi pi-check" class="p-button-success" @click="guardarVenta"
                :loading="submitting" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de Cliente -->
  <ClienteCreate :visible="mostrarModalCliente" @close="mostrarModalCliente = false" @save="nuevoClienteAgregado"
    @update:visible="mostrarModalCliente = $event" />
</template>

<style scoped>
.venta-container {
  margin-top: 50px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: none;
  padding: 1.5rem 1rem 1rem 1rem;
  width: 100%;
}

.venta-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.form-group,
.form-group-large,
.form-group-small {
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  margin-bottom: 0;
}

.form-group {
  flex: 1;
  min-width: 200px;
}

.form-group-large {
  flex: 2;
  min-width: 300px;
}

.form-group-small {
  flex: 1;
  min-width: 150px;
}

.form-group-action {
  display: flex;
  align-items: flex-end;
  padding-bottom: 0.5rem;
}

.required {
  color: #ff0000;
}

.products-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.products-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2B2B2B;
  margin-bottom: 0.5rem;
}

.product-selection {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 1rem;
  border: 1px solid #e5e7eb;
}

.products-table {
  margin-top: 1rem;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  padding: 0.5rem;
}

.total-section {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.total-label {
  font-weight: bold;
  margin-right: 1rem;
  color: #2B2B2B;
}

.total-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #FBAF32;
}

.totals-summary {
  margin-top: 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 1rem;
  border: 1px solid #e5e7eb;
}

.totals-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.totals-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
}

.actions-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 2rem;
}

.p-button-success {
  background-color: #FBAF32 !important;
  border: none !important;
  color: #2B2B2B !important;
  font-weight: 600 !important;
  border-radius: 6px !important;
  transition: all 0.2s ease !important;
}

.p-button-success:hover {
  background-color: #FFD166 !important;
  color: #2B2B2B !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.p-button-text {
  color: #2B2B2B !important;
  background: transparent !important;
  border: none !important;
  font-weight: 600 !important;
}

.p-button-danger {
  color: #fff !important;
  background: #e53935 !important;
  border: none !important;
}

.p-button-danger:hover {
  background: #b71c1c !important;
}

@media (max-width: 900px) {
  .form-row {
    flex-direction: column;
    gap: 0.5rem;
  }

  .total-section {
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .venta-container {
    padding: 1rem 0.5rem;
  }

  .products-section,
  .product-selection,
  .products-table,
  .total-section {
    padding: 0.5rem;
  }

  .actions-footer {
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
  }
}
</style>
