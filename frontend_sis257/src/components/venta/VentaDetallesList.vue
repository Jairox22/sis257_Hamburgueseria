<script setup lang="ts">
import { ref, watch } from 'vue'
import http from '../../plugins/axios'
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'

const props = defineProps<{
  visible: boolean
  ventaId: number | null
}>()

const emit = defineEmits(['close', 'update:visible'])

const toast = useToast()
const detalles = ref<any[]>([])
const loading = ref<boolean>(false)
const totalVenta = ref<number>(0)

async function cargarDetalles() {
  if (!props.ventaId) return
  
  loading.value = true
  try {
    const response = await http.get(`ventas/${props.ventaId}/detalles`)
    detalles.value = response.data
    
    // Calcular el total de la venta sumando todos los subtotales
    totalVenta.value = detalles.value.reduce((total, detalle) => 
      total + parseFloat(detalle.subtotal), 0)
    
    console.log('Detalles obtenidos:', detalles.value)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudieron obtener los detalles de la venta',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

function cerrarModal() {
  emit('update:visible', false)
  emit('close')
}

// Cargar detalles solo una vez cuando el modal se abre con un ID válido
watch(
  [() => props.visible, () => props.ventaId],
  ([visible, ventaId], [oldVisible, oldVentaId]) => {
    if (visible && ventaId && (!oldVisible || ventaId !== oldVentaId)) {
      cargarDetalles()
    }
  }
)

defineExpose({ cargarDetalles })
</script>

<template>
  <Dialog 
    :visible="visible"
    header="Detalles de Venta" 
    :style="{ width: '90vw', maxWidth: '1000px' }"
    :modal="true"
    @hide="cerrarModal"
    @update:visible="(val) => emit('update:visible', val)"
  >
    <div v-if="loading" class="loading-container">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      <p>Cargando detalles...</p>
    </div>
    
    <div v-else class="detalles-container">
      <div class="header-info">
        <h3>Venta #{{ ventaId }}</h3>
        <div class="total-box">
          <span>Total de la venta:</span>
          <span class="total-amount">{{ totalVenta.toFixed(2) }} Bs</span>
        </div>
      </div>
      
      <div class="table-responsive">
        <table class="detalles-table">
          <thead>
            <tr>
              <th class="th-number">No.</th>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detalle, index) in detalles" :key="detalle.id">
              <td class="td-number">{{ index + 1 }}</td>
              <td>{{ detalle.producto?.nombre || '-' }}</td>
              <td>{{ detalle.producto?.descripcion || '-' }}</td>
              <td class="td-number">{{ detalle.cantidad }}</td>
              <td class="td-number">{{ detalle.precioUnitario }} Bs</td>
              <td class="td-number">{{ detalle.subtotal }} Bs</td>
            </tr>
            <tr v-if="detalles.length === 0" class="empty-row">
              <td colspan="6">No hay detalles disponibles para esta venta</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.detalles-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header-info h3 {
  margin: 0;
  color: #2B2B2B;
  font-size: 1.25rem;
  font-weight: 600;
}

.total-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f3f4f6;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
}

.total-amount {
  font-weight: 700;
  color: #2B2B2B;
  font-size: 1.1rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
  color: #6b7280;
}

.table-responsive {
  overflow-x: auto;
  max-height: 80vh;
}

.detalles-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
  font-size: 0.9rem;
}

.detalles-table th {
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
  width: 50px;
  text-align: center;
}

.detalles-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
  line-height: 1.4;
}

.td-number {
  text-align: center;
  font-weight: 500;
}

.empty-row td {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

.detalles-table tbody tr:hover {
  background-color: #f8fafc;
}

@media (max-width: 768px) {
  .header-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .detalles-table th,
  .detalles-table td {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
}
</style>