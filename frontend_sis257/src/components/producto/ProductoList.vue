<script setup lang="ts">
import type { Productos } from '../../models/producto'
import type { Categorias } from '../../models/categoria'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import { onMounted, ref, computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast';

const toast = useToast()
const ENDPOINT = 'productos'
const ENDPOINT_CATEGORIAS = 'categorias'
let productos = ref<Productos[]>([])
let categorias = ref<Categorias[]>([])

const emit = defineEmits(['edit'])
const productoDelete = ref<Productos | null>(null)
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
const totalPaginas = computed(() => Math.ceil(productos.value.length / filasPorPagina.value))

const productosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * filasPorPagina.value
  return productos.value.slice(inicio, inicio + filasPorPagina.value)
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
    productos.value = response.data
    paginaActual.value = 1 // Reinicia a la primera página al actualizar la lista
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
          <tr v-for="(producto, index) in productosPaginados" :key="producto.id">
            <td class="td-number">{{ (paginaActual - 1) * filasPorPagina + index + 1 }}</td>
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

@media (max-width: 768px) {
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