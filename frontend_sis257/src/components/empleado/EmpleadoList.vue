<script setup lang="ts">
import type { Empleados } from '../../models/empleado'
import type { Usuarios } from '../../models/usuario'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast';

const toast = useToast()
const ENDPOINT = 'empleados'
const ENDPOINT_CATEGORIAS = 'usuarios'
let empleados = ref<Empleados[]>([])
let usuarios = ref<Usuarios[]>([])

const emit = defineEmits(['edit'])
const empleadoDelete = ref<Empleados | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  try {
    const response = await http.get(ENDPOINT)
    empleados.value = response.data
    console.log('Empleados obtenidos:', empleados.value)
  } catch (error) {
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
    console.log('Usuarios obtenidos:', usuarios.value)
  } catch (error) {
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
    obtenerLista()
  } catch (error) {
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

onMounted(() => {
  obtenerLista()
  obtenerUsuarios()
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
          <tr v-for="(empleado, index) in empleados" :key="empleado.id">
            <td class="td-number">{{ index + 1 }}</td>
            <td>{{ empleado.nombres }}</td>
            <td>{{ empleado.apellidos }}</td>
            <td>{{ empleado.cargo }}</td>
            <td>{{ empleado.fechaContratacion }}</td>
            <td>{{ empleado.usuario.nombreUsuario }}</td>
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

/* Estilos para columnas específicas */
.empleado-table td:nth-child(3) { /* Descripción */
  max-width: 300px;
  white-space: normal;
  word-wrap: break-word;
}

.empleado-table td:nth-child(4), /* Precio */
.empleado-table td:nth-child(5) { /* Stock */
  text-align: left;
}

.empleado-table td:nth-child(6) { /* Categoría */
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
.empleado-table tbody tr:hover {
  background-color: #f8fafc;
}

/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  .table-responsive {
    padding: 0;
  }
  
  .empleado-table th, 
  .empleado-table td {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
  
  .empleado-table td:nth-child(3) {
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