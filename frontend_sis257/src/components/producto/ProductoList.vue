<script setup lang="ts">
import type { Productos } from '../../models/producto'
import type { Categorias } from '../../models/categoria'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast';

const toast = useToast()
const ENDPOINT = 'productos'
const ENDPOINT_CATEGORIAS = 'categorias'
let productos = ref<Productos[]>([])
let categorias = ref<Categorias[]>([])

const emit = defineEmits(['edit'])
const productoDelete = ref<Productos | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  try {
    const response = await http.get(ENDPOINT)
    productos.value = response.data
    console.log('Productos obtenidos:', productos.value)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo obtener la lista de productos',
      life: 3000
    })
  }
}

async function obtenerCategorias() {
  try {
    const response = await http.get(ENDPOINT_CATEGORIAS)
    categorias.value = response.data
    console.log('Categorías obtenidas:', categorias.value)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo obtener la lista de categorías',
      life: 3000
    })
  }
}

function emitirEdicion(producto: Productos) {
  emit('edit', { ...producto })
}

function mostrarEliminarConfirm(producto: Productos) {
  productoDelete.value = producto
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  try {
    await http.delete(`${ENDPOINT}/${productoDelete.value?.id}`)
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Producto eliminado correctamente',
      life: 3000
    })
    obtenerLista()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo eliminar el producto',
      life: 3000
    })
  } finally {
    mostrarConfirmDialog.value = false
  }
}

onMounted(() => {
  obtenerLista()
  obtenerCategorias()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div class="producto-container">
    <div class="table-responsive">
      <table class="producto-table">
        <thead>
          <tr>
            <th class="th-number">No.</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Precio Unitario</th>
            <th>Stock</th>
            <th>Categoria</th>
            <th class="th-actions">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) in productos" :key="producto.id">
            <td class="td-number">{{ index + 1 }}</td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>{{ producto.precioUnitario }} Bs</td>
            <td>{{ producto.stock }} unidades</td>
            <td>{{ producto.categoria.nombre }}</td>
            <td class="actions-column">
              <div class="actions-wrapper">
                <Button icon="pi pi-pencil" aria-label="Editar" class="p-button-rounded p-button-text p-button-primary"
                  @click="emitirEdicion(producto)" />
                <Button icon="pi pi-trash" aria-label="Eliminar" class="p-button-rounded p-button-text p-button-danger"
                  @click="mostrarEliminarConfirm(producto)" />
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
        <span>¿Estás seguro de eliminar el producto <strong>{{ productoDelete?.nombre }}</strong>?</span>
      </div>
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="mostrarConfirmDialog = false" />
        <Button label="Eliminar" icon="pi pi-check" class="p-button-danger" @click="eliminar" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.producto-container {
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

.producto-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
  font-size: 0.9rem;
}

.producto-table th {
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

.producto-table td {
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

/* Estilos para columnas específicas */
.producto-table td:nth-child(3) { /* Descripción */
  max-width: 300px;
  white-space: normal;
  word-wrap: break-word;
}

.producto-table td:nth-child(4), /* Precio */
.producto-table td:nth-child(5) { /* Stock */
  text-align: left;
}

.producto-table td:nth-child(6) { /* Categoría */
  text-transform: capitalize;
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
.producto-table tbody tr:hover {
  background-color: #f8fafc;
}

/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  .table-responsive {
    padding: 0;
  }
  
  .producto-table th, 
  .producto-table td {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
  
  .producto-table td:nth-child(3) {
    max-width: 200px;
  }
}

/* Estilos para los botones de acción */
.p-button-rounded {
  width: 2rem;
  height: 2rem;
}

.p-button-text {
  background-color: transparent !important;
}
</style>