<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import VentaList from '../../components/venta/VentaList.vue'
import VentasEliminarAnuladas from '../../components/venta/VentaEliminarAnuladas.vue'

const router = useRouter()
const mostrarEliminarAnuladas = ref<boolean>(false)
const VentaListRef = ref<typeof VentaList | null>(null)

function handleCreate() {
  router.push('/admin/ventas/registrar')
}

function handleDeletedAnuladas() {
  mostrarEliminarAnuladas.value = false
  VentaListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="admin-container">
    <div class="crud-container">
      <div class="crud-header">
        <div class="title-container">
          <i class="pi pi-tags" style="font-size: 1.5rem; color: #ffffff;"></i>
          <h1 style="font-size: 1.5rem; color: #ffffff;">Gestión de Ventas</h1>
        </div>
        <Button label="Limpiar Ventas Anuladas" icon="pi pi-trash" class="clear-button" severity="danger"
          @click="mostrarEliminarAnuladas = true" />
        <Button label="Agregar Venta" icon="pi pi-plus" @click="handleCreate" class="add-button" />
      </div>

      <div class="crud-content">
        <VentaList ref="VentaListRef" />
      </div>

      <VentasEliminarAnuladas :visible="mostrarEliminarAnuladas" @close="mostrarEliminarAnuladas = false"
        @deleted="handleDeletedAnuladas" />
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

.clear-button {
  margin-right: 0.5rem;
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

  .add-button,
  .clear-button {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}
</style>