<template>
  <div class="user-info-container" @click="toggleMenu">
    <div class="user-details">
      <span class="user-name" :class="{ scrolled: hasScrolled }">
        {{ empleado?.nombres }} {{ empleado?.apellidos }}
      </span>
      <span class="user-role" :class="{ scrolled: hasScrolled }">
        {{ empleado?.cargo }}
      </span>
    </div>
    <Avatar :label="avatarInitials" class="avatar" size="large" shape="circle" />
    <Menu ref="menu" :model="menuItems" :popup="true" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from "@/stores/index";
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import { getEmpleado } from '@/helpers';
import http from '../../plugins/axios';

const props = defineProps<{
  hasScrolled: boolean
}>();

const authStore = useAuthStore();
const menu = ref();
const empleado = ref<any>(null);

// Obtener las iniciales para el avatar
const avatarInitials = computed(() => {
  if (!empleado.value) return '';
  const { nombres, apellidos } = empleado.value;
  return `${nombres.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();
});

// Items del menú desplegable
const menuItems = [
  {
    label: 'Cerrar sesión',
    icon: 'pi pi-sign-out',
    command: () => {
      authStore.logout();
    }
  }
];

// Alternar menú
const toggleMenu = (event: Event) => {
  menu.value.toggle(event);
};

// Obtener datos del empleado
const fetchEmpleadoData = async () => {
  const empleadoAuth = getEmpleado();

  if (empleadoAuth) {
    try {
      const response = await http.get(`empleados/usuario/${empleadoAuth}`);
      empleado.value = response.data;
      console.log('Datos del empleado:', empleado.value);
    } catch (error) {
      console.error('Error al obtener datos del empleado:', error);
    }
  }
};

onMounted(() => {
  fetchEmpleadoData();
});
</script>

<style scoped>
.user-info-container {
  display: flex;
  align-items: center;
  margin-left: 1rem;
  cursor: pointer;
  padding: 0;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.user-info-container:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.user-details {
  display: flex;
  flex-direction: column;
  margin-right: 0.75rem;
  text-align: right;
}

.user-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: white;
  transition: color 0.3s;
}

.user-role {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s;
}

.user-name.scrolled,
.user-role.scrolled {
  color: #333 !important;
}

.avatar {
  background-color: #fbaf32;
  color: white;
  font-weight: bold;
  transition: all 0.3s ease;
}

.avatar:hover {
  background-color: #38434e;
  transform: scale(1.05);
}

/* Estilos para el menú desplegable */
:deep(.p-menu) {
  width: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #e9ecef;
}

:deep(.p-menuitem-link) {
  padding: 0.75rem 1rem;
  color: #333;
  transition: all 0.2s ease;
}

:deep(.p-menuitem-link:hover) {
  background-color: #f8f9fa;
  color: #fbaf32;
}

:deep(.p-menuitem-icon) {
  margin-right: 0.5rem;
  color: #6c757d;
}

:deep(.p-menuitem-text) {
  font-size: 0.875rem;
}

:deep(.p-menu .p-menuitem:last-child) {
  margin-top: 0.25rem;
  border-top: 1px solid #e9ecef;
}

:deep(.p-menu .p-menuitem:last-child .p-menuitem-link) {
  color: #dc3545;
}

:deep(.p-menu .p-menuitem:last-child .p-menuitem-link:hover) {
  color: #c82333;
  background-color: #f8f9fa;
}

/* Estilos para modo admin */
.navbar-admin .user-name,
.navbar-admin .user-role {
  color: white;
}

.navbar-admin .user-info-container:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>