<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useToast } from 'primevue/usetoast'
import { METODOS_PAGO } from '../../constants/index'
import type { DetalleVenta } from '@/models/venta'
import type { Productos } from '@/models/producto'

const toast = useToast()
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    venta: {
        type: Object,
        default: null
    }
})

const emit = defineEmits(['close', 'save', 'update:visible'])

// Datos para los selects
const clientes = ref([])
const empleados = ref([])
const productos = ref<Productos[]>([])

// Formulario de venta
const ventaForm = ref({
    clienteId: null,
    empleadoId: null,
    metodoPago: null,
    detalles: []
})

// Producto seleccionado para agregar
const productoSeleccionado = ref<Productos | null>(null)
const cantidad = ref(1)

// Tabla de productos seleccionados
const detallesVenta = ref<DetalleVenta[]>([])
const submitting = ref(false)

// Total de la venta
const totalVenta = computed(() => {
    return detallesVenta.value.reduce((total, item) => {
        return total + (item.cantidad * item.producto.precioUnitario)
    }, 0)
})

// Cargar datos iniciales
async function cargarDatos() {
    try {
        const [clientesResp, empleadosResp, productosResp] = await Promise.all([
            http.get('clientes'),
            http.get('empleados'),
            http.get('productos')
        ])

        clientes.value = clientesResp.data
        empleados.value = empleadosResp.data
        productos.value = productosResp.data
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los datos necesarios',
            life: 3000
        })
    }
}

// Agregar producto a la venta
function agregarProducto() {
    if (!productoSeleccionado.value) {
        toast.add({
            severity: 'warn',
            summary: 'Atención',
            detail: 'Seleccione un producto para agregar',
            life: 3000
        })
        return
    }

    if (cantidad.value <= 0) {
        toast.add({
            severity: 'warn',
            summary: 'Atención',
            detail: 'La cantidad debe ser mayor a 0',
            life: 3000
        })
        return
    }

    // Verificar si el producto ya está en la lista
    const productoIndex = detallesVenta.value.findIndex(
        item => item.producto.id === productoSeleccionado.value!.id
    )

    if (productoIndex >= 0) {
        // Actualizar cantidad si ya existe
        detallesVenta.value[productoIndex].cantidad += cantidad.value
    } else {
        // Agregar nuevo producto
        detallesVenta.value.push({
            producto: {
                id: productoSeleccionado.value.id!,
                nombre: productoSeleccionado.value.nombre,
                precio: productoSeleccionado.value.precioUnitario
            },
            cantidad: cantidad.value,
            precioUnitario: productoSeleccionado.value.precioUnitario
        })
    }

    // Resetear selección
    productoSeleccionado.value = null
    cantidad.value = 1
}

// Eliminar producto de la venta
function eliminarProducto(index: number) {
    detallesVenta.value.splice(index, 1)
}

// Guardar venta
async function guardarVenta() {
    if (!ventaForm.value.clienteId) {
        toast.add({
            severity: 'warn',
            summary: 'Atención',
            detail: 'Seleccione un cliente',
            life: 3000
        })
        return
    }

    if (!ventaForm.value.empleadoId) {
        toast.add({
            severity: 'warn',
            summary: 'Atención',
            detail: 'Seleccione un empleado',
            life: 3000
        })
        return
    }

    if (!ventaForm.value.metodoPago) {
        toast.add({
            severity: 'warn',
            summary: 'Atención',
            detail: 'Seleccione un método de pago',
            life: 3000
        })
        return
    }

    if (detallesVenta.value.length === 0) {
        toast.add({
            severity: 'warn',
            summary: 'Atención',
            detail: 'Agregue al menos un producto a la venta',
            life: 3000
        })
        return
    }

    submitting.value = true

    try {
        // Ajuste aquí
        const ventaData = {
            idCliente: ventaForm.value.clienteId,
            idEmpleado: ventaForm.value.empleadoId,
            metodoPago: ventaForm.value.metodoPago,
            detalles: detallesVenta.value.map(item => ({
                idProducto: item.producto.id,
                cantidad: item.cantidad
            }))
        }

        await http.post('ventas', ventaData)

        toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Venta registrada correctamente',
            life: 3000
        })

        // Cerrar formulario y notificar al componente padre
        cerrarDialog()
        emit('save')
    } catch (error) {
        let detailMessage = 'No se pudo registrar la venta'
        const err = error as { response?: { data?: { message?: string } } }
        if (err.response && err.response.data?.message) {
            detailMessage = err.response.data.message
        }

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: detailMessage,
            life: 3000
        })
    } finally {
        submitting.value = false
    }
}

// Cerrar diálogo y resetear formulario
function cerrarDialog() {
    ventaForm.value = {
        clienteId: null,
        empleadoId: null,
        metodoPago: null,
        detalles: []
    }
    detallesVenta.value = []
    productoSeleccionado.value = null
    cantidad.value = 1
    emit('close')
    emit('update:visible', false)
}

// Al montar el componente
onMounted(() => {
    cargarDatos()
})

// Observar cambios en la visibilidad
watch(() => props.visible, (newValue) => {
    if (newValue) {
        cargarDatos()
    }
})
</script>

<template>
    <Drawer v-model:visible="props.visible" position="right" :style="{ width: '95vw' }" :modal="true"
        :closable="!submitting" :dismissable="!submitting" class="venta-drawer">
        <template #header>
            <div class="drawer-header">
                <i class="pi pi-shopping-cart" style="font-size: 1.5rem; margin-right: 0.5rem;"></i>
                <span>Registrar Venta</span>
            </div>
        </template>

        <div class="venta-container">
            <div class="venta-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="cliente">Cliente <span class="required">*</span></label>
                        <Select id="cliente" v-model="ventaForm.clienteId" :options="clientes" optionLabel="nombres"
                            optionValue="id" placeholder="Seleccione un cliente" class="w-full" :disabled="submitting">
                            <template #option="slotProps">
                                {{ slotProps.option.nombres }} {{ slotProps.option.apellidos || '' }}
                            </template>
                        </Select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="empleado">Empleado <span class="required">*</span></label>
                    <Select id="empleado" v-model="ventaForm.empleadoId" :options="empleados" optionLabel="nombres"
                        optionValue="id" placeholder="Seleccione un empleado" class="w-full" :disabled="submitting">
                        <template #option="slotProps">
                            {{ slotProps.option.nombres }} {{ slotProps.option.apellidos || '' }}
                        </template>
                    </Select>
                </div>

                <div class="form-group">
                    <label for="metodoPago">Método de Pago <span class="required">*</span></label>
                    <Select id="metodoPago" v-model="ventaForm.metodoPago" :options="METODOS_PAGO" optionLabel="label"
                        optionValue="value" placeholder="Seleccione método de pago" class="w-full"
                        :disabled="submitting" />
                </div>
            </div>

            <div class="products-section">
                <h3>Agregar Productos</h3>

                <div class="product-selection">
                    <div class="form-row">
                        <div class="form-group-large">
                            <label for="producto">Producto</label>
                            <Select id="producto" v-model="productoSeleccionado" :options="productos"
                                optionLabel="nombre" placeholder="Seleccione un producto" class="w-full"
                                :disabled="submitting">
                                <template #option="slotProps">
                                    {{ slotProps.option.nombre }} - {{ slotProps.option.precioUnitario }} Bs
                                </template>
                            </Select>
                        </div>

                        <div class="form-group-small">
                            <label for="cantidad">Cantidad</label>
                            <InputNumber id="cantidad" v-model="cantidad" :min="1" :disabled="submitting" showButtons />
                        </div>

                        <div class="form-group-action">
                            <Button label="Agregar" icon="pi pi-plus" @click="agregarProducto"
                                :disabled="!productoSeleccionado || cantidad <= 0 || submitting" />
                        </div>
                    </div>
                </div>

                <div class="products-table">
                    <DataTable :value="detallesVenta" responsiveLayout="scroll" class="p-datatable-sm">
                        <Column field="producto.nombre" header="Producto">
                            <template #body="slotProps">
                                {{ slotProps.data.producto.nombre }}
                            </template>
                        </Column>
                        <Column field="cantidad" header="Cantidad" />
                        <Column field="producto.precioUnitario" header="Precio Unitario">
                            <template #body="slotProps">
                                {{ slotProps.data.producto.precioUnitario }} Bs
                            </template>
                        </Column>
                        <Column field="subtotal" header="Subtotal">
                            <template #body="slotProps">
                                {{ (slotProps.data.cantidad * slotProps.data.producto.precioUnitario).toFixed(2) }} Bs
                            </template>
                        </Column>
                        <Column header="Acciones" style="width:100px">
                            <template #body="slotProps">
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger"
                                    @click="eliminarProducto(slotProps.index)" :disabled="submitting" />
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <div class="total-section">
                    <div class="total-label">Total:</div>
                    <div class="total-value">{{ totalVenta.toFixed(2) }} Bs</div>
                </div>
            </div>
        </div>

        <div class="actions-footer">
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"
                :disabled="submitting" />
            <Button label="Guardar Venta" icon="pi pi-check" class="p-button-success" @click="guardarVenta"
                :loading="submitting" />
        </div>
    </Drawer>
</template>

<style scoped>
.venta-drawer {
    --drawer-width: 95vw;
}

.drawer-header {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 600;
    color: #2B2B2B;
    padding: 0.5rem 0;
}

.venta-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 120px);
}

.venta-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    flex: 1;
    overflow-y: auto;
}

.form-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.form-group {
    flex: 1;
    min-width: 200px;
}

.form-group-large {
    flex: 3;
    min-width: 200px;
}

.form-group-small {
    flex: 1;
    min-width: 100px;
}

.form-group-action {
    display: flex;
    align-items: flex-end;
    padding-bottom: 0.25rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #2B2B2B;
}

.required {
    color: #e24c4c;
}

.products-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 1.5rem;
}

.products-section h3 {
    margin: 0;
    color: #2B2B2B;
    font-size: 1.2rem;
    font-weight: 600;
}

.product-selection {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 1rem;
    border: 1px solid #e5e7eb;
}

.products-table {
    max-height: calc(100vh - 450px);
    overflow-y: auto;
    margin-top: 1rem;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
}

.total-section {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    font-weight: 600;
    border: 1px solid #e5e7eb;
}

.total-label {
    margin-right: 1rem;
    color: #2B2B2B;
}

.total-value {
    font-size: 1.2rem;
    color: #2B2B2B;
    font-weight: 700;
}

.actions-footer {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    gap: 0.5rem;
    background-color: #f8f9fa;
    border-top: 1px solid #e5e7eb;
    margin-top: auto;
}

.p-button-success {
    background-color: #FBAF32 !important;
    border: none !important;
    padding: 0.65rem 1.25rem !important;
    font-weight: 600 !important;
    transition: all 0.2s ease !important;
    color: #2B2B2B !important;
    border-radius: 6px !important;
}

.p-button-success:hover {
    background-color: #FFD166 !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.p-button {
    border-radius: 6px !important;
}

/* Estilo para la tabla */
:deep(.p-datatable-header) {
    background-color: #2B2B2B;
    color: white;
}

:deep(.p-datatable-thead > tr > th) {
    background-color: #2B2B2B;
    color: white;
    padding: 0.75rem 1rem;
    font-weight: 500;
}

:deep(.p-datatable-tbody > tr:nth-child(even)) {
    background-color: #f8f9fa;
}

:deep(.p-datatable-tbody > tr:hover) {
    background-color: #f0f0f0;
}

/* Responsive ajustments */
@media (max-width: 768px) {
    .form-row {
        flex-direction: column;
        gap: 1rem;
    }

    .form-group,
    .form-group-large,
    .form-group-small {
        width: 100%;
        min-width: 100%;
    }

    .form-group-action {
        margin-top: 0.5rem;
    }

    .form-group-action button {
        width: 100%;
    }
}
</style>