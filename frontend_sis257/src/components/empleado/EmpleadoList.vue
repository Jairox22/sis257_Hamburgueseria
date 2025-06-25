<script setup lang="ts">
import type { Empleados } from '../../models/empleado'
import type { Usuarios } from '../../models/usuario'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import { onMounted, ref, computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast';

const toast = useToast()
const ENDPOINT = 'empleados'
const ENDPOINT_CATEGORIAS = 'usuarios'
let empleados = ref<Empleados[]>([])
let usuarios = ref<Usuarios[]>([])

const emit = defineEmits(['edit'])
const empleadoDelete = ref<Empleados | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

// Opciones de filas por página
const opcionesFilas = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 }
]
const filasPorPagina = ref(5)
const paginaActual = ref(1)

// CORREGIDO: Asegurar que totalPaginas no sea 0
const totalPaginas = computed(() => {
  const total = Math.ceil(empleados.value.length / filasPorPagina.value)
  return total > 0 ? total : 1
})

// CORREGIDO: Mejorar la lógica de paginación
const empleadosPaginados = computed(() => {
  if (!empleados.value || empleados.value.length === 0) return []
  const inicio = (paginaActual.value - 1) * filasPorPagina.value
  const fin = inicio + filasPorPagina.value
  return empleados.value.slice(inicio, fin)
})

// CORREGIDO: Mejorar la función de cambio de página
function cambiarPagina(nuevaPagina: number) {
  if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina
  }
}

// CORREGIDO: Watch mejorado para filasPorPagina
watch(filasPorPagina, (nuevoValor) => {
  console.log('Cambio en filasPorPagina:', nuevoValor)
  paginaActual.value = 1 // Reinicia a la primera página
}, { immediate: false })

// CORREGIDO: Watch para debug de empleados
watch(empleados, (nuevosEmpleados) => {
  console.log('Empleados actualizados:', nuevosEmpleados.length)
  console.log('Total páginas:', totalPaginas.value)
}, { deep: true })

async function obtenerLista() {
  try {
    console.log('Obteniendo lista de empleados...')
    const response = await http.get(ENDPOINT)
    empleados.value = response.data
    paginaActual.value = 1 // Reinicia a la primera página al actualizar la lista
    console.log('Empleados obtenidos:', empleados.value.length)
  } catch (error) {
    console.error('Error al obtener empleados:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo obtener la lista de empleados',
      life: 3000
    })
  }
}

async function obtenerUsuarios() {
  try {
    const response = await http.get(ENDPOINT_CATEGORIAS)
    usuarios.value = response.data
    console.log('Usuarios obtenidos:', usuarios.value.length)
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo obtener la lista de usuarios',
      life: 3000
    })
  }
}

function emitirEdicion(empleado: Empleados) {
  emit('edit', { ...empleado })
}

function mostrarEliminarConfirm(empleado: Empleados) {
  empleadoDelete.value = empleado
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  try {
    await http.delete(`${ENDPOINT}/${empleadoDelete.value?.id}`)
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Empleado eliminado correctamente',
      life: 3000
    })
    await obtenerLista() // CORREGIDO: Esperar a que se actualice la lista
  } catch (error) {
    console.error('Error al eliminar empleado:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo eliminar el empleado',
      life: 3000
    })
  } finally {
    mostrarConfirmDialog.value = false
  }
}

// CORREGIDO: Funciones de navegación específicas
function irPrimeraPagina() {
  paginaActual.value = 1
}

function irUltimaPagina() {
  paginaActual.value = totalPaginas.value
}

function paginaAnterior() {
  if (paginaActual.value > 1) {
    paginaActual.value--
  }
}

function paginaSiguiente() {
  if (paginaActual.value < totalPaginas.value) {
    paginaActual.value++
  }
}

onMounted(async () => {
  await obtenerLista()
  await obtenerUsuarios()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div class="empleado-container">
    <div class="table-responsive">
      <table class="empleado-table">
        <thead>
          <tr>
            <th class="th-number">No.</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Cargo</th>
            <th>Fecha de Contratación</th>
            <th>Usuario</th>
            <th class="th-actions">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="empleadosPaginados.length === 0">
            <td colspan="7" style="text-align: center; padding: 2rem; color: #666;">
              No hay empleados para mostrar
            </td>
          </tr>
          <tr v-for="(empleado, index) in empleadosPaginados" :key="empleado.id">
            <td class="td-number">{{ (paginaActual - 1) * filasPorPagina + index + 1 }}</td>
            <td>{{ empleado.nombres }}</td>
            <td>{{ empleado.apellidos }}</td>
            <td>{{ empleado.cargo }}</td>
            <td>{{ empleado.fechaContratacion }}</td>
            <td>{{ empleado.usuario?.nombreUsuario || 'Sin usuario' }}</td>
            <td class="actions-column">
              <div class="actions-wrapper">
                <Button icon="pi pi-pencil" aria-label="Editar" class="p-button-rounded p-button-text p-button-primary"
                  @click="emitirEdicion(empleado)" />
                <Button icon="pi pi-trash" aria-label="Eliminar" class="p-button-rounded p-button-text p-button-danger"
                  @click="mostrarEliminarConfirm(empleado)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- CORREGIDO: Controles de paginación mejorados -->
    <div class="paginacion-moderna">
      <div class="dropdown-filas">
        <span>Mostrar</span>
        <Dropdown v-model="filasPorPagina" :options="opcionesFilas" option-label="label" option-value="value"
          class="dropdown-estilizado" @change="console.log('Dropdown changed:', $event)" />
        <span>registros</span>
      </div>

      <div class="controles-paginas">
        <!-- CORREGIDO: Botones de navegación mejorados -->
        <Button icon="pi pi-angle-left" class="paginacion-btn" @click="paginaAnterior" :disabled="paginaActual === 1"
          title="Página anterior" />

        <span class="paginacion-info">
          Página {{ paginaActual }} de {{ totalPaginas }}
        </span>

        <Button icon="pi pi-angle-right" class="paginacion-btn" @click="paginaSiguiente"
          :disabled="paginaActual >= totalPaginas" title="Página siguiente" />
      </div>
    </div>

    <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Eliminación" :style="{ width: '25rem' }"
      :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem; color: var(--yellow-500)" />
        <span>¿Estás seguro de eliminar el empleado <strong>{{ empleadoDelete?.apellidos }}</strong>?</span>
      </div>
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="mostrarConfirmDialog = false" />
        <Button label="Eliminar" icon="pi pi-check" class="p-button-danger" @click="eliminar" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.empleado-container {
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

.empleado-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
  font-size: 0.9rem;
}

.empleado-table th {
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

.empleado-table td {
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

/* Efecto hover */
.empleado-table tbody tr:hover {
  background-color: #f8fafc;
}

/* Estilos para los botones de acción */
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
  gap: 0.5rem;
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
  margin: 0 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .empleado-container {
    border-radius: 0;
    box-shadow: none;
  }

  .empleado-table th,
  .empleado-table td {
    padding: 0.5rem;
    font-size: 0.85rem;
  }

  .paginacion-moderna {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    align-items: stretch;
  }

  .controles-paginas {
    justify-content: center;
  }

  .dropdown-filas {
    justify-content: center;
  }
}
</style>