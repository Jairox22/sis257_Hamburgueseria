<script setup lang="ts">
import type { Categorias } from '../../models/categoria'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import { onMounted, ref, computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast';

const toast = useToast()
const ENDPOINT = 'categorias'
let categorias = ref<Categorias[]>([])

const emit = defineEmits(['edit'])
const categoriaDelete = ref<Categorias | null>(null)
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
const totalPaginas = computed(() => Math.ceil(categorias.value.length / filasPorPagina.value))

const categoriasPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * filasPorPagina.value
  return categorias.value.slice(inicio, inicio + filasPorPagina.value)
})

function cambiarPagina(nuevaPagina: number) {
  if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina
  }
}

watch(filasPorPagina, () => {
  paginaActual.value = 1 // Reinicia a la primera página si cambia la cantidad de filas
})

async function obtenerLista() {
  try {
    const response = await http.get(ENDPOINT)
    categorias.value = response.data
    paginaActual.value = 1 // Reinicia a la primera página al actualizar la lista
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo obtener la lista de categorías',
      life: 3000
    })
  }
}

function emitirEdicion(categoria: Categorias) {
  emit('edit', { ...categoria })
}

function mostrarEliminarConfirm(categoria: Categorias) {
  categoriaDelete.value = categoria
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  try {
    await http.delete(`${ENDPOINT}/${categoriaDelete.value?.id}`)
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Categoría eliminada correctamente',
      life: 3000
    })
    obtenerLista()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo eliminar la categoría',
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
  <div class="categoria-container">
    <div class="table-responsive">
      <table class="categoria-table">
        <thead>
          <tr>
            <th class="th-number">No.</th>
            <th>Nombre</th>
            <th class="th-actions">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(categoria, index) in categoriasPaginadas" :key="categoria.id">
            <td class="td-number">{{ (paginaActual - 1) * filasPorPagina + index + 1 }}</td>
            <td>{{ categoria.nombre }}</td>
            <td class="actions-column">
              <div class="actions-wrapper">
                <Button icon="pi pi-pencil" aria-label="Editar" class="p-button-rounded p-button-text p-button-primary"
                  @click="emitirEdicion(categoria)" />
                <Button icon="pi pi-trash" aria-label="Eliminar" class="p-button-rounded p-button-text p-button-danger"
                  @click="mostrarEliminarConfirm(categoria)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Controles de paginación modernos -->
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

    <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Eliminación" :style="{ width: '25rem' }"
      :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem; color: var(--yellow-500)" />
        <span>¿Estás seguro de eliminar la categoría <strong>{{ categoriaDelete?.nombre }}</strong>?</span>
      </div>
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="mostrarConfirmDialog = false" />
        <Button label="Eliminar" icon="pi pi-check" class="p-button-danger" @click="eliminar" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.categoria-container {
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.table-responsive {
  overflow-x: auto;
  max-height: calc(100vh - 300px);
}

.categoria-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.categoria-table th {
  background-color: #2B2B2B;
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 500;
  position: sticky;
  top: 0;
}

.th-number {
  width: 80px;
  text-align: center;
}

.th-actions {
  width: 150px;
  text-align: center;
}

.categoria-table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
}

.td-number {
  text-align: center;
  color: #6b7280;
  font-weight: 500;
}

.categoria-table tbody tr:hover {
  background-color: #f8f9fa;
}

.actions-column {
  padding: 0.5rem 1rem !important;
}

.actions-wrapper {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
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