<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast';
import type { Productos } from '../../models/producto'
import type { Categorias } from '../../models/categoria'
import http from '../../plugins/axios'
import Toast from 'primevue/toast'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'

const toast = useToast()
const ENDPOINT = 'productos'
const ENDPOINT_CATEGORIAS = 'categorias'
const props = defineProps({
  mostrar: Boolean,
  producto: {
    type: Object as () => Productos | null,
    default: () => null,
  },
  modoEdicion: Boolean,
})

// Inicializar producto con valores por defecto
const producto = ref<Productos>({
  id: 0,
  nombre: '',
  descripcion: '',
  precioUnitario: 0,
  stock: 0,
  categoria: {
    id: 0,
    nombre: ''
  }
})

const categorias = ref<Categorias[]>([])
const loading = ref(false)
const emit = defineEmits(['guardar', 'close'])
const selectedCategoria = ref<Categorias | null>(null)

// Actualizar producto cuando cambia props.producto
watch(() => props.producto, (newVal) => {
  if (newVal) {
    producto.value = { ...newVal }
    selectedCategoria.value = newVal.categoria || null
  } else {
    // Resetear a valores por defecto cuando es nuevo
    producto.value = {
      id: 0,
      nombre: '',
      descripcion: '',
      precioUnitario: 0,
      stock: 0,
      categoria: {
        id: 0,
        nombre: ''
      }
    }
    selectedCategoria.value = null
  }
}, { deep: true, immediate: true })

const dialogVisible = computed({
  get: () => props.mostrar,
  set: value => {
    if (!value) emit('close')
  },
})

async function obtenerCategorias() {
  try {
    const response = await http.get(ENDPOINT_CATEGORIAS)
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

onMounted(() => {
  obtenerCategorias()
})

async function handleSave() {
  loading.value = true
  try {
    const body = {
      nombre: producto.value.nombre,
      descripcion: producto.value.descripcion,
      precioUnitario: Number(producto.value.precioUnitario),
      stock: producto.value.stock,
      idCategoria: selectedCategoria.value?.id || 0,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${producto.value.id}`, body)
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Producto actualizado correctamente',
        life: 3000
      })
    } else {
      await http.post(ENDPOINT, body)
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Producto creado correctamente',
        life: 3000
      })
    }
    emit('guardar')
    resetForm()
    dialogVisible.value = false
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response?.data?.message || 'No se pudo guardar el producto',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

function resetForm() {
  producto.value = {
    id: 0,
    nombre: '',
    descripcion: '',
    precioUnitario: 0,
    stock: 0,
    categoria: {
      id: 0,
      nombre: ''
    }
  }
  selectedCategoria.value = null
}
</script>

<template>
  <Toast />
  <Dialog v-model:visible="dialogVisible" :header="modoEdicion ? 'Editar Producto' : 'Nuevo Producto'"
    :style="{ width: '420px', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }" :modal="true"
    :closable="true" :closeOnEscape="true" @hide="dialogVisible = false" class="custom-dialog">
    <div class="form-content">
      <div class="field">
        <label for="nombre" class="form-label">Nombre</label>
        <InputText id="nombre" v-model="producto.nombre" class="form-input" autocomplete="off" autofocus />
      </div>
      <div class="field">
        <label for="descripcion" class="form-label">Descripción</label>
        <InputText id="descripcion" v-model="producto.descripcion" class="form-input" autocomplete="off" />
      </div>
      <div class="field">
        <label for="precioUnitario" class="form-label">Precio</label>
        <InputNumber id="precioUnitario" v-model="producto.precioUnitario" class="form-input" :min="0" mode="decimal"
          :step="0.10" :minFractionDigits="2" :maxFractionDigits="2" />
      </div>
      <div class="field">
        <label for="stock" class="form-label">Stock</label>
        <InputNumber id="stock" v-model="producto.stock" class="form-input" :min="0" />
      </div>
      <div class="field">
        <label for="categoria" class="form-label">Categoría</label>
        <Select
          id="categoria"
          v-model="selectedCategoria"
          :options="categorias"
          optionLabel="nombre"
          placeholder="Seleccione una categoría"
          class="form-input"
          :filter="true"
          style="min-width: 0; width: 100%; max-width: 370px; padding: 0;"
        />
      </div>
    </div>

    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" class="p-button-text btn-cancel" :disabled="loading"
        @click="dialogVisible = false" />
      <Button :label="modoEdicion ? 'Actualizar' : 'Guardar'" icon="pi pi-check" :loading="loading" class="btn-save"
        @click="handleSave" />
    </template>
  </Dialog>
</template>

<style scoped>
.custom-dialog :deep(.p-dialog-header) {
  background: linear-gradient(90deg, #2B2B2B 60%, #6d5c5c 100%);
  color: #fff;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 1.2rem 1.5rem;
}

.custom-dialog :deep(.p-dialog-header-icon) {
  color: #fff !important;
  font-size: 1.2rem;
  transition: background 0.2s;
}

.custom-dialog :deep(.p-dialog-header-icon):hover {
  background: #fff2;
}

.custom-dialog :deep(.p-dialog-content) {
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  background: #f8f8fa;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.field {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: 600;
  color: #2B2B2B;
  margin-bottom: 0.5rem;
  font-size: 1.05rem;
  letter-spacing: 0.01em;
}

.form-input {
  border-radius: 6px;
  border: 1px solid #d1cfcf;
  padding: 0.6rem 0.9rem;
  font-size: 1rem;
  background: #fff;
  transition: border 0.2s;
}

.form-input:focus {
  border: 1.5px solid #2B2B2B;
  outline: none;
}

.btn-cancel {
  color: #6d5c5c;
}

.btn-save {
  background: #2B2B2B;
  border: none;
  color: #fff;
}

.btn-save:enabled:hover {
  background: #6d5c5c;
}
</style>