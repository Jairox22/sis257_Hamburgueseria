<script setup lang="ts">
import { useAuthStore } from "@/stores/index";
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Menu } from "primevue";
import UserAvatar from '@/components/usuario/UserAvatar.vue';

const emit = defineEmits(['scroll-to']);
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const adminDropdownRef = ref();

function scrollTo(sectionId: string) {
  if (route.path.startsWith('/admin')) {
    router.push({ path: '/', hash: `#${sectionId}` });
  } else {
    router.push({ hash: `#${sectionId}` });
    emit('scroll-to', sectionId);
  }
}

function goHome() {
  router.push('/');
}

const adminMenuItems = [
  {
    label: 'Categorías',
    icon: 'pi pi-tags',
    command: () => router.push({ name: 'categorias' })
  },
  {
    label: 'Productos',
    icon: 'pi pi-shopping-bag',
    command: () => router.push({ name: 'productos' })
  },
  {
    label: 'Empleados',
    icon: 'pi pi-users',
    command: () => router.push({ name: 'empleados' })
  },
  {
    separator: true
  },
  {
    label: 'Ventas',
    icon: 'pi pi-money-bill',
    command: () => router.push({ name: 'ventas' }),
    class: 'p-menuitem-special'
  }
];

function toggleAdminDropdown(event: Event) {
  adminDropdownRef.value.toggle(event);
}

const isAdminPage = computed(() => route.path.startsWith('/admin'));

// --- Scroll para cambiar color de links ---
const hasScrolled = ref(false);

function handleScroll() {
  hasScrolled.value = window.scrollY > 0;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="navbar navbar-expand-lg navbar-light" :class="{ 'navbar-admin': isAdminPage }">
    <div class="container-fluid">
      <a href="#" @click.prevent="goHome" class="navbar-brand">Bendita <span>Burguer</span></a>
      <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
        <div class="navbar-nav ml-auto">
          <a href="#" class="nav-item nav-link active" :class="{ 'scrolled': hasScrolled }"
            @click.prevent="goHome">Inicio</a>
          <a href="#menu" class="nav-item nav-link" :class="{ 'scrolled': hasScrolled }"
            @click.prevent="() => scrollTo('menu')">Menu</a>
          <a href="#team" class="nav-item nav-link" :class="{ 'scrolled': hasScrolled }"
            @click.prevent="() => scrollTo('team')">Chefs</a>
          <a href="#feature" class="nav-item nav-link" :class="{ 'scrolled': hasScrolled }"
            @click.prevent="() => scrollTo('feature')">Características</a>
          <a href="#booking" class="nav-item nav-link" :class="{ 'scrolled': hasScrolled }"
            @click.prevent="() => scrollTo('booking')">Reservas</a>
          <a href="#about" class="nav-item nav-link" :class="{ 'scrolled': hasScrolled }"
            @click.prevent="() => scrollTo('about')">Acerca de</a>
          <a href="#contact" class="nav-item nav-link" :class="{ 'scrolled': hasScrolled }"
            @click.prevent="() => scrollTo('contact')">Contacto</a>

          <!-- Administración y login/logout -->
          <div v-if="authStore.token" class="nav-item dropdown-container">
            <Button @click="toggleAdminDropdown" class="admin-dropdown-btn" severity="info" size="small">
              <i class="pi pi-cog me-2"></i>
              Administración
              <i class="pi pi-angle-down ms-2"></i>
            </Button>
            <Menu ref="adminDropdownRef" :model="adminMenuItems" :popup="true" class="admin-dropdown-menu" />
          </div>
          <!-- Avatar del usuario -->
          <UserAvatar v-if="authStore.token" :hasScrolled="hasScrolled" />

          <RouterLink v-if="!authStore.token" to="/login" class="nav-item nav-link login-btn">
            Login
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-link {
  color: #fff !important;
  /* Blanco por defecto */
  margin: 0 5px;
  transition: color 0.3s ease;
  text-decoration: none;
}

.nav-link.scrolled {
  color: #333 !important;
  /* Cambia a #333 al hacer scroll */
}

.nav-link:hover {
  color: #fbaf32 !important;
}

/* Contenedor del dropdown */
.dropdown-container {
  position: relative;
  display: inline-block;
  margin-left: 10px;
}

/* Botón del dropdown de administración */
.admin-dropdown-btn {
  background-color: #fbaf32 !important;
  border: none !important;
  border-radius: 4px !important;
  padding: 6px 16px !important;
  font-size: 14px !important;
  color: white !important;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 8px;
}

.admin-dropdown-btn:hover {
  background-color: #38434e !important;
}

/* Botones Login/Salir - Estilo original */
.login-btn {
  color: #fff !important;
  background-color: #fbaf32 !important;
  border-radius: 4px;
  padding: 6px 16px;
  margin-left: 10px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #38434e !important;
  color: #fff !important;
}

.logout-btn {
  cursor: pointer;
  color: #fff !important;
  background-color: #fbaf32 !important;
  border-radius: 4px;
  padding: 6px 16px;
  margin-left: 10px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #38434e !important;
  color: #fff !important;
}

/* Estilos para el menú dropdown de PrimeVue */
:deep(.admin-dropdown-menu) {
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  border: 1px solid #e9ecef !important;
  overflow: hidden !important;
}

:deep(.admin-dropdown-menu .p-menuitem-link) {
  padding: 12px 16px !important;
  color: #333 !important;
  transition: all 0.2s ease !important;
}

:deep(.admin-dropdown-menu .p-menuitem-link:hover) {
  background-color: #f8f9fa !important;
  color: #fbaf32 !important;
}

:deep(.admin-dropdown-menu .p-menuitem-special .p-menuitem-link) {
  background-color: #fbaf32 !important;
  color: white !important;
  font-weight: bold !important;
}

:deep(.admin-dropdown-menu .p-menuitem-special .p-menuitem-link:hover) {
  background-color: #e89a2b !important;
  color: white !important;
}

:deep(.admin-dropdown-menu .p-menuitem-icon) {
  color: inherit !important;
  margin-right: 8px !important;
}

:deep(.admin-dropdown-menu .p-separator) {
  margin: 4px 0 !important;
  border-top: 1px solid #e9ecef !important;
}

/* ====== ESTILOS PARA ADMIN ====== */
.navbar-admin {
  background-color: #2b2b2b !important;
}

.navbar-admin .nav-link,
.navbar-admin .dropdown-toggle,
.navbar-admin .admin-dropdown-btn,
.navbar-admin .login-btn,
.navbar-admin .logout-btn {
  color: #fff !important;
  background-color: transparent !important;
}

.navbar-admin .login-btn,
.navbar-admin .logout-btn {
  background-color: #e89a2b !important;
  color: #fff !important;
}

.navbar-admin .admin-dropdown-btn {
  background-color: #444 !important;
}

.navbar-admin .admin-dropdown-btn:hover {
  background-color: #666 !important;
}

:deep(.navbar-admin .admin-dropdown-menu .p-menuitem-link) {
  color: #fff !important;
  background-color: #2b2b2b !important;
}

:deep(.navbar-admin .admin-dropdown-menu .p-menuitem-link:hover) {
  background-color: #444 !important;
  color: #fbaf32 !important;
}

:deep(.navbar-admin .admin-dropdown-menu .p-menuitem-special .p-menuitem-link) {
  background-color: #fbaf32 !important;
  color: #2b2b2b !important;
}

:deep(.navbar-admin .admin-dropdown-menu .p-menuitem-special .p-menuitem-link:hover) {
  background-color: #e89a2b !important;
  color: #fff !important;
}
</style>