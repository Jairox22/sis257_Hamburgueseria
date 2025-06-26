<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Tag from 'primevue/tag'
import Dropdown from 'primevue/dropdown'
import { useToast } from 'primevue/usetoast'
import type { Venta } from '../../models/venta'
import VentaDetallesList from './VentaDetallesList.vue'

const toast = useToast()
const ENDPOINT = 'ventas'
let ventas = ref<Venta[]>([])

const emit = defineEmits(['show', 'edit'])
const ventaDelete = ref<Venta | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

// Para el modal de detalles
const mostrarDetallesDialog = ref<boolean>(false)
const ventaIdSeleccionada = ref<number | null>(null)

// Paginación
const opcionesFilas = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 }
]
const filasPorPagina = ref(5)
const paginaActual = ref(1)
const totalPaginas = computed(() => Math.ceil(ventas.value.length / filasPorPagina.value))

const ventasPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * filasPorPagina.value
  return ventas.value.slice(inicio, inicio + filasPorPagina.value)
})

function cambiarPagina(nuevaPagina: number) {
  if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina
  }
}

watch(filasPorPagina, () => {
  paginaActual.value = 1
})

async function obtenerLista() {
  try {
    const response = await http.get(ENDPOINT)
    ventas.value = response.data
    paginaActual.value = 1
    console.log('Ventas obtenidas:', ventas.value)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo obtener la lista de ventas',
      life: 3000
    })
  }
}

function mostrarDetalles(venta: Venta) {
  ventaIdSeleccionada.value = venta.id
  mostrarDetallesDialog.value = true
}

function mostrarEliminarConfirm(venta: Venta) {
  ventaDelete.value = venta
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  try {
    await http.delete(`${ENDPOINT}/${ventaDelete.value?.id}`)
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Venta anulada correctamente',
      life: 3000
    })
    obtenerLista()
  } catch (error: any) {
    let detail = 'No se pudo anular la venta'
    if (error.response && error.response.status === 400 && error.response.data?.message) {
      detail = error.response.data.message
    }
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail,
      life: 3000
    })
  } finally {
    mostrarConfirmDialog.value = false
  }
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div class="venta-container">
    <div class="table-responsive">
      <table class="venta-table">
        <thead>
          <tr>
            <th class="th-number">No.</th>
            <th>Cliente</th>
            <th>Empleado</th>
            <th>Método Pago</th>
            <th>Total Venta</th>
            <th>Fecha de Venta</th>
            <th>Estado</th>
            <th class="th-actions">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(venta, index) in ventasPaginadas" :key="venta.id">
            <td class="td-number">{{ (paginaActual - 1) * filasPorPagina + index + 1 }}</td>
            <td>
              {{
                (venta.cliente
                  ? (venta.cliente.nombres + ' ' + (venta.cliente.apellidos ?? ''))
                  : '-')
              }}
            </td>
            <td>
              {{
                (venta.empleado
                  ? (venta.empleado.nombres + ' ' + (venta.empleado.apellidos ?? ''))
                  : '-')
              }}
            </td>
            <td>{{ venta.metodoPago }}</td>
            <td>
              <span v-if="parseFloat(venta.totalVenta.toString()) === 0">Anulada</span>
              <span v-else>{{ venta.totalVenta }} Bs</span>
            </td>
            <td>
              {{
                venta.fechaCreacion
                  ? new Date(venta.fechaCreacion).toLocaleString()
                  : '-'
              }}
            </td>
            <td>
              <Tag v-if="venta.estado === 'realizada'" value="realizada" severity="success" />
              <Tag v-else-if="venta.estado === 'anulada'" value="anulada" severity="danger" />
              <Tag v-else :value="venta.estado ?? '-'" />
            </td>
            <td class="actions-column">
              <div class="actions-wrapper">
                <Button icon="pi pi-eye" aria-label="Ver detalles"
                  class="p-button-rounded p-button-text p-button-primary" @click="mostrarDetalles(venta)" />
                <Button icon="pi pi-trash" aria-label="Eliminar" class="p-button-rounded p-button-text p-button-danger"
                  @click="mostrarEliminarConfirm(venta)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Controles de paginación -->
    <div class="paginacion-moderna">
      <div class="dropdown-filas">
        <span>Mostrar</span>
        <Dropdown v-model="filasPorPagina" :options="opcionesFilas" option-label="label" option-value="value"
          class="dropdown-estilizado" />
        <span>registros</span>
      </div>
      <div class="controles-paginas">
        <Button icon="pi pi-angle-left" class="paginacion-btn" @click="cambiarPagina(paginaActual - 1)"
          :disabled="paginaActual === 1" />
        <span class="paginacion-info">Página {{ paginaActual }} de {{ totalPaginas }}</span>
        <Button icon="pi pi-angle-right" class="paginacion-btn" @click="cambiarPagina(paginaActual + 1)"
          :disabled="paginaActual === totalPaginas || totalPaginas === 0" />
      </div>
    </div>

    <!-- Modal de confirmación para eliminar -->
    <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Anulación" :style="{ width: '25rem' }"
      :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem; color: var(--yellow-500)" />
        <span>
          ¿Estás seguro de anular la venta de
          <strong>{{ ventaDelete?.cliente?.nombres }}</strong>
          en fecha
          <strong>
            {{
              ventaDelete?.fechaCreacion
                ? new Date(ventaDelete.fechaCreacion).toLocaleString()
                : '-'
            }}
          </strong>
          ?
        </span>
      </div>
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="mostrarConfirmDialog = false" />
        <Button label="Eliminar" icon="pi pi-check" class="p-button-danger" @click="eliminar" />
      </template>
    </Dialog>

    <!-- Modal de detalles de venta -->
    <VentaDetallesList :visible="mostrarDetallesDialog" :ventaId="ventaIdSeleccionada"
      @close="mostrarDetallesDialog = false" @update:visible="(val) => mostrarDetallesDialog = val" />
  </div>
</template>

<style scoped>
.venta-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.table-responsive {
  overflow-x: auto;
  max-height: calc(100vh - 300px);
  padding: 0 1rem;
}

.venta-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
  font-size: 0.9rem;
}

.venta-table th {
  background-color: #2B2B2B;
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 500;
  position: sticky;
  top: 0;
  white-space: nowrap;
}

.th-number {
  width: 60px;
  text-align: center;
}

.th-actions {
  width: 120px;
  text-align: center;
}

.venta-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
  line-height: 1.4;
}

.td-number {
  text-align: center;
  color: #6b7280;
  font-weight: 500;
}

.actions-column {
  padding: 0.5rem !important;
}

.actions-wrapper {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.venta-table tbody tr:hover {
  background-color: #f8fafc;
}

@media (max-width: 768px) {
  .table-responsive {
    padding: 0;
  }

  .venta-table th,
  .venta-table td {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
}

.p-button-rounded {
  width: 2rem;
  height: 2rem;
}

.p-button-text {
  background-color: transparent !important;
}

/* Paginación moderna */
.paginacion-moderna {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin: 1.5rem 0 1rem 0;
  background: #f4f6fb;
  border-radius: 2rem;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.07);
}

.dropdown-filas {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #2B2B2B;
  font-weight: 500;
}

.dropdown-estilizado {
  min-width: 80px;
  border-radius: 1rem;
  border: 1px solid #e0e0e0;
  background: #fff;
  font-size: 1rem;
}

.controles-paginas {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.paginacion-btn {
  border-radius: 50%;
  background: #fff;
  color: #2B2B2B;
  border: 1px solid #e0e0e0;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 1px 3px rgba(44, 62, 80, 0.05);
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.paginacion-btn:enabled:hover {
  background: #2B2B2B;
  color: #fff;
}

.paginacion-info {
  font-size: 1rem;
  color: #2B2B2B;
  font-weight: 500;
  letter-spacing: 0.02em;
}

/* Responsive */
@media (max-width: 768px) {
  .categoria-container {
    border-radius: 0;
    box-shadow: none;
  }

  .categoria-table th,
  .categoria-table td {
    padding: 0.75rem;
  }

  .paginacion-moderna {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    align-items: stretch;
  }

  .controles-paginas {
    justify-content: center;
  }
}
</style>