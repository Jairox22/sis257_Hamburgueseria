<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast';
import type { Empleados } from '../../models/empleado'
import type { Usuarios } from '../../models/usuario'
import http from '../../plugins/axios'
import Toast from 'primevue/toast'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker';
import { CARGO_OPTIONS } from '../../constants/index';


const toast = useToast()
const ENDPOINT = 'empleados'
const ENDPOINT_USUARIOS = 'usuarios'
const emit = defineEmits(['guardar', 'close'])
const props = defineProps({
  mostrar: Boolean,
  empleado: {
    type: Object as () => Empleados | null,
    default: () => null,
  },
  modoEdicion: Boolean,
})

// Inicializar empleado con valores por defecto
const empleado = ref<Empleados>({
  id: 0,
  nombres: '',
  apellidos: '',
  cargo: '',
  fechaContratacion: new Date(),
  usuario: {
    id: 0,
    nombreUsuario: ''
  }
})

const usuarios = ref<Usuarios[]>([])
const usuariosDisponibles = ref<Usuarios[]>([])
const loading = ref(false)
const selectedUsuario = ref<Usuarios | null>(null)

// Corrige la fecha para compensar desfase de zona horaria
function ajustarFechaUTC(fechaStr: string | Date) {
  if (!fechaStr) return new Date()
  const fecha = typeof fechaStr === 'string' ? new Date(fechaStr) : fechaStr
  // Ajusta sumando la diferencia de zona horaria
  fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())
  return fecha
}

// Actualizar empleado cuando cambia props.empleado
watch(() => props.empleado, (newVal) => {
  if (newVal) {
    empleado.value = { ...newVal }
    // Corrige la fecha si es string
    if (typeof newVal.fechaContratacion === 'string') {
      empleado.value.fechaContratacion = ajustarFechaUTC(newVal.fechaContratacion)
    }
    selectedUsuario.value = newVal.usuario || null
    obtenerUsuariosYEmpleados()
  } else {
    empleado.value = {
      id: 0,
      nombres: '',
      apellidos: '',
      cargo: '',
      fechaContratacion: new Date(),
      usuario: {
        id: 0,
        nombreUsuario: ''
      }
    }
    selectedUsuario.value = null
  }
}, { deep: true, immediate: true })

const dialogVisible = computed({
  get: () => props.mostrar,
  set: value => {
    if (!value) emit('close')
  },
})

async function obtenerUsuariosYEmpleados() {
  try {
    // Obtener todos los usuarios
    const responseUsuarios = await http.get(ENDPOINT_USUARIOS)
    usuarios.value = responseUsuarios.data

    // Obtener todos los empleados para ver qué usuarios están asignados
    const responseEmpleados = await http.get(ENDPOINT)
    const empleados = responseEmpleados.data

    // IDs de usuarios ya asignados
    const usuariosAsignados = empleados.map((emp: any) => emp.usuario?.id).filter((id: any) => id > 0)

    // Filtrar usuarios no asignados + el usuario actual
    usuariosDisponibles.value = usuarios.value.filter(usuario => {
      // Incluir el usuario actual si estamos en modo edición
      if (props.modoEdicion && empleado.value.usuario && usuario.id === empleado.value.usuario.id) {
        return true
      }
      // Incluir usuarios que no están asignados a ningún empleado
      return !usuariosAsignados.includes(usuario.id)
    })

  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo obtener la lista de usuarios disponibles',
      life: 3000
    })

    // Si todo falla, mostrar todos los usuarios
    usuariosDisponibles.value = usuarios.value
  }
}

onMounted(() => {
  obtenerUsuariosYEmpleados()
})

async function handleSave() {
  loading.value = true
  try {
    const body = {
      nombres: empleado.value.nombres,
      apellidos: empleado.value.apellidos,
      cargo: empleado.value.cargo,
      fechaContratacion: empleado.value.fechaContratacion,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${empleado.value.id}`, body)
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Empleado actualizado correctamente',
        life: 3000
      })
    } else {
      await http.post(ENDPOINT, body)
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Empleado creado correctamente',
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
      detail: error.response?.data?.message || 'No se pudo guardar el empleado',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

function resetForm() {
  empleado.value = {
    id: 0,
    nombres: '',
    apellidos: '',
    cargo: '',
    fechaContratacion: new Date(),
    usuario: {
      id: 0,
      nombreUsuario: ''
    }
  }
  selectedUsuario.value = null
}
</script>

<template>
  <Toast />
  <Dialog v-model:visible="dialogVisible" :header="modoEdicion ? 'Editar Empleado' : 'Nuevo Empleado'"
    :style="{ width: '420px', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }" :modal="true"
    :closable="true" :closeOnEscape="true" @hide="dialogVisible = false" class="custom-dialog">
    <div class="form-content">
      <div class="field">
        <label for="nombres" class="form-label">Nombres</label>
        <InputText id="nombres" v-model="empleado.nombres" class="form-input" autocomplete="off" autofocus />
      </div>
      <div class="field">
        <label for="apellidos" class="form-label">Apellidos</label>
        <InputText id="apellidos" v-model="empleado.apellidos" class="form-input" autocomplete="off" />
      </div>
      <div class="field">
        <label for="cargo" class="form-label">Cargo</label>
        <Select id="cargo" v-model="empleado.cargo" :options="CARGO_OPTIONS" optionLabel="label" optionValue="value"
          placeholder="Seleccione un cargo" class="form-input"
          style="min-width: 0; width: 100%; max-width: 370px; padding: 0;" />
      </div>
      <div class="field">
        <label for="fechaContratacion" class="form-label">Fecha de Contratación</label>
        <DatePicker id="fechaContratacion" v-model="empleado.fechaContratacion" class="form-input" dateFormat="yy-mm-dd"
          placeholder="aaaa-mm-dd" showIcon />
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