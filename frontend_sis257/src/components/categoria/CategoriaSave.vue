  <script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useToast } from 'primevue/usetoast';
  import type { Categorias } from '../../models/categoria'
  import http from '../../plugins/axios'
  import Toast from 'primevue/toast'
  import Button from 'primevue/button'
  import Dialog from 'primevue/dialog'
  import InputText from 'primevue/inputtext'

  const toast = useToast()
  const ENDPOINT = 'categorias'
  const props = defineProps({
    mostrar: Boolean,
    categoria: {
      type: Object as () => Categorias,
      default: () => ({}) as Categorias,
    },
    modoEdicion: Boolean,
  })
  const categoria = ref<Categorias>({ ...props.categoria })
  const loading = ref(false)
  const emit = defineEmits(['guardar', 'close'])

  watch(() => props.categoria, (newVal) => {
    categoria.value = { ...newVal }
  }, { deep: true, immediate: true })

  const dialogVisible = computed({
    get: () => props.mostrar,
    set: value => {
      if (!value) emit('close')
    },
  })

  async function handleSave() {
    loading.value = true
    try {
      const body = {
        nombre: categoria.value.nombre,
      }
      if (props.modoEdicion) {
        await http.patch(`${ENDPOINT}/${categoria.value.id}`, body)
        toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Categoría actualizada correctamente',
          life: 3000
        })
      } else {
        await http.post(ENDPOINT, body)
        toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Categoría creada correctamente',
          life: 3000
        })
      }
      emit('guardar')
      categoria.value = {} as Categorias
      dialogVisible.value = false
    } catch (error: any) {
      console.error('Error al guardar la categoría:', error)
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error.response?.data?.message || 'No se pudo guardar la categoría',
        life: 3000
      })
    } finally {
      loading.value = false
    }
  }
</script>

  <template>
    <Toast />
    <Dialog v-model:visible="dialogVisible" :header="modoEdicion ? 'Editar Categoría' : 'Nueva Categoría'"
      :style="{ width: '420px', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }" :modal="true"
      :closable="true" :closeOnEscape="true" @hide="dialogVisible = false" class="custom-dialog">
      <div class="form-content">
        <div class="field">
          <label for="nombre" class="form-label">Nombre</label>
          <InputText id="nombre" v-model="categoria.nombre" class="form-input" autocomplete="off" autofocus />
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