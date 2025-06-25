<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import CategoriaList from '../../components/categoria/CategoriaList.vue'
import CategoriaSave from '../../components/categoria/CategoriaSave.vue'

const mostrarDialog = ref<boolean>(false)
const categoriaEdit = ref<any>(null)
const CategoriaListRef = ref<typeof CategoriaList | null>(null)

function handleCreate() {
  categoriaEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(categoria: any) {
  categoriaEdit.value = JSON.parse(JSON.stringify(categoria))
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  CategoriaListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="admin-container">
    <div class="crud-container">
      <div class="crud-header">
        <div class="title-container">
          <i class="pi pi-tags" style="font-size: 1.5rem; color: #ffffff;"></i>
          <h1 style="font-size: 1.5rem; color: #ffffff;">Gestión de Categorías</h1>
        </div>
        <Button label="Agregar Categoría" icon="pi pi-plus" @click="handleCreate" class="add-button" />
      </div>

      <div class="crud-content">
        <CategoriaList ref="CategoriaListRef" @edit="handleEdit" />
      </div>

      <CategoriaSave :mostrar="mostrarDialog" :categoria="categoriaEdit" :modoEdicion="!!categoriaEdit"
        @guardar="handleGuardar" @close="handleCloseDialog" />
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  margin-top: 110px;
  min-height: calc(100vh - 70px);
  background-color: #f8f9fa;
}

.crud-container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.crud-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #2B2B2B;
  color: white;
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
  padding: 1.5rem;
}

.add-button {
  background-color: #FBAF32 !important;
  border: none !important;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  color: #2B2B2B !important;
}

.add-button:hover, .add-button.p-button:hover {
  background-color: #FFD166 !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #2B2B2B !important;
}

.add-button:active, .add-button.p-button:active {
  background-color: #FFD166 !important;
  color: #2B2B2B !important;
}

</style>