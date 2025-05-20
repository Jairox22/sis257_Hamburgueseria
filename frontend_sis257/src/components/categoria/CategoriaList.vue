<script setup lang="ts">
import type { Categorias } from '../../models/categoria'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast';

const toast = useToast()
const ENDPOINT = 'categorias'
let categorias = ref<Categorias[]>([])

const emit = defineEmits(['edit'])
const categoriaDelete = ref<Categorias | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  try {
    const response = await http.get(ENDPOINT)
    categorias.value = response.data
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
          <tr v-for="(categoria, index) in categorias" :key="categoria.id">
            <td class="td-number">{{ index + 1 }}</td>
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
  background-color: white;
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
}

/* Estilos para la tabla (deberías aplicar estos a tu componente CategoriaList) */
:deep(.p-datatable) {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

:deep(.p-datatable thead th) {
  background-color: #f1f1f1;
  color: #2B2B2B;
  font-weight: 600;
}

:deep(.p-datatable tbody tr:nth-child(even)) {
  background-color: #f9f9f9;
}

:deep(.p-datatable tbody tr:hover) {
  background-color: #f1f1f1;
}

:deep(.action-buttons button) {
  margin-right: 5px;
  padding: 0.3rem 0.6rem;
}

/* Responsive */
@media (max-width: 768px) {
  .crud-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
  }

  .add-button {
    width: 100%;
  }

  .crud-content {
    padding: 1rem;
    overflow-x: auto;
  }
}
</style>