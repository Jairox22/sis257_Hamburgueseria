<template>
  <Dialog v-model:visible="visible" header="Nuevo Usuario"
    :style="{ width: '350px', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }" :modal="true"
    :closable="true" :closeOnEscape="true" @hide="onClose" class="custom-dialog">
    <div class="form-content">
      <div class="field">
        <label for="nombreUsuario" class="form-label">Nombre de Usuario</label>
        <InputText id="nombreUsuario" v-model="usuario.nombreUsuario" class="form-input" autocomplete="off" autofocus
          required />
      </div>
    </div>
    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" class="p-button-text btn-cancel" :disabled="loading"
        @click="onClose" />
      <Button label="Guardar" icon="pi pi-check" :loading="loading" class="btn-save" @click="handleSave" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const props = defineProps<{
  visible: boolean
  usuarioData?: Partial<{ nombreUsuario: string }>
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'save', usuario: { nombreUsuario: string }): void
  (e: 'close'): void
}>()

const visible = ref(props.visible)
watch(() => props.visible, v => visible.value = v)
watch(visible, v => emit('update:visible', v))

const usuario = reactive({
  nombreUsuario: ''
})

watch(
  () => props.usuarioData,
  (data) => {
    if (data) {
      usuario.nombreUsuario = data.nombreUsuario ?? ''
    } else {
      usuario.nombreUsuario = ''
    }
  },
  { immediate: true }
)

const loading = ref(props.loading ?? false)

function handleSave() {
  emit('save', { nombreUsuario: usuario.nombreUsuario })
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
