<template>
  <Dialog v-model:visible="visible" :header="isEdit ? 'Editar Cliente' : 'Nuevo Cliente'"
    :style="{ width: '420px', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }" :modal="true"
    :closable="true" :closeOnEscape="true" @hide="onClose" class="custom-dialog">
    <div class="form-content">
      <div class="field">
        <label for="nombres" class="form-label">Nombres</label>
        <InputText id="nombres" v-model="cliente.nombres" class="form-input" autocomplete="off" autofocus required />
      </div>
      <div class="field">
        <label for="apellidos" class="form-label">Apellidos</label>
        <InputText id="apellidos" v-model="cliente.apellidos" class="form-input" autocomplete="off" required />
      </div>
      <div class="field">
        <label for="direccion" class="form-label">Dirección</label>
        <InputText id="direccion" v-model="cliente.direccion" class="form-input" autocomplete="off" required />
      </div>
      <div class="field">
        <label for="telefono" class="form-label">Teléfono</label>
        <InputMask id="telefono" v-model="cliente.telefono" class="form-input" mask="99999999"
          placeholder="Ej: 71234568" autocomplete="off" required />
      </div>
      <div class="field">
        <label for="email" class="form-label">E-mail</label>
        <InputText id="email" v-model="cliente.email" class="form-input" placeholder="ejemplo@gmail.com"
          autocomplete="off" required />
      </div>
    </div>
    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" class="p-button-text btn-cancel" :disabled="loading"
        @click="onClose" />
      <Button :label="isEdit ? 'Actualizar' : 'Guardar'" icon="pi pi-check" :loading="loading" class="btn-save"
        @click="handleSave" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import InputMask from 'primevue/inputmask'
import http from '../../plugins/axios'
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast'

const toast = useToast()
const ENDPOINT = '/clientes'

const props = defineProps<{
  visible: boolean
  clienteData?: Partial<{
    id: number
    nombres: string
    apellidos: string
    direccion: string
    telefono: string
    email: string
  }>
  isEdit?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'save', cliente: any): void
  (e: 'close'): void
}>()

const visible = ref(props.visible)
watch(() => props.visible, v => visible.value = v)
watch(visible, v => emit('update:visible', v))

const cliente = reactive({
  nombres: '',
  apellidos: '',
  direccion: '',
  telefono: '',
  email: ''
})

watch(
  () => props.clienteData,
  (data) => {
    if (data) {
      Object.assign(cliente, data)
    } else {
      Object.assign(cliente, { nombres: '', apellidos: '', direccion: '', telefono: '', email: '' })
    }
  },
  { immediate: true }
)

const loading = ref(props.loading ?? false)
const isEdit = props.isEdit ?? false

async function handleSave() {
  loading.value = true
  try {
    const body = {
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
      email: cliente.email
    }
    await http.post(ENDPOINT, body)
    emit('save', { ...cliente })
    Object.assign(cliente, { nombres: '', apellidos: '', direccion: '', telefono: '', email: '' })
    visible.value = false
  } catch (error: any) {
    console.error('Error al guardar el cliente:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response?.data?.message || 'No se pudo guardar el cliente',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

function onClose() {
  visible.value = false
  emit('close')
}
</script>

<style scoped>
.form-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-bottom: 0.2rem;
  font-weight: 500;
}

.form-input {
  width: 100%;
}
</style>
