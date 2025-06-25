<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import EmpleadoList from '../../components/empleado/EmpleadoList.vue'
import EmpleadoSave from '../../components/empleado/EmpleadoSave.vue'

const mostrarDialog = ref<boolean>(false)
const empleadoEdit = ref<any>(null)
const EmpleadoListRef = ref<typeof EmpleadoList | null>(null)

function handleCreate() {
  empleadoEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(empleado: any) {
  empleadoEdit.value = JSON.parse(JSON.stringify(empleado))
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  EmpleadoListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="admin-container">
    <div class="crud-container">
      <div class="crud-header">
        <div class="title-container">
          <i class="pi pi-tags" style="font-size: 1.5rem; color: #ffffff;"></i>
          <h1 style="font-size: 1.5rem; color: #ffffff;">Gestión de Empleados</h1>
        </div>
        <Button label="Agregar Empleado" icon="pi pi-plus" @click="handleCreate" class="add-button" />
      </div>

      <div class="crud-content">
        <EmpleadoList ref="EmpleadoListRef" @edit="handleEdit" />
      </div>

      <EmpleadoSave :mostrar="mostrarDialog" :empleado="empleadoEdit" :modoEdicion="!!empleadoEdit"
        @guardar="handleGuardar" @close="handleCloseDialog" />
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  padding: 20px;
  margin-top: 110px;
  min-height: calc(100vh - 70px);
  background-color: #f8f9fa;
}

.crud-container {
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.crud-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background-color: #2B2B2B;
  color: white;
  border-bottom: 1px solid #e5e7eb;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-container h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.crud-content {
  padding: 1rem;
}

.add-button {
  background-color: #FBAF32 !important;
  border: none !important;
  padding: 0.65rem 1.25rem !important;
  font-weight: 600 !important;
  transition: all 0.2s ease !important;
  color: #2B2B2B !important;
  border-radius: 6px !important;
}

.add-button:hover {
  background-color: #FFD166 !important;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.add-button:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .admin-container {
    padding: 10px;
  }
  
  .crud-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
  }
  
  .add-button {
    width: 100%;
  }
}
</style>