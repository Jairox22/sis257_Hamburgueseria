<script setup lang="ts">
import { useAuthStore } from "@/stores/index";

const authStore = useAuthStore();
</script>

<template>
  <!-- Nav Bar Start -->
  <div class="navbar navbar-expand-lg bg-light navbar-light fixed-top">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">Bendita <span>Burguer</span></RouterLink>
      <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
        <div class="navbar-nav ml-auto">
          <RouterLink 
            :to="{ name: 'categorias' }"
            class="nav-item nav-link"
            style="margin-left: 10px;"
          >
            Categorías
          </RouterLink>
          <RouterLink 
            :to="{ name: 'productos' }"
            class="nav-item nav-link"
            style="margin-left: 10px;"
          >
            Productos
          </RouterLink>
          <RouterLink 
            :to="{ name: 'empleados' }"
            class="nav-item nav-link"
            style="margin-left: 10px;"
          >
            Empleados
          </RouterLink>
            <RouterLink 
            :to="{ name: 'ventas' }"
            class="nav-item nav-link"
            style="cursor: pointer; color: #212529; background-color: #FBAF32; border-radius: 4px; padding: 6px 16px; margin-left: 10px; font-weight: bold;"
            >
            Ventas
            </RouterLink>
            <a
            class="nav-item nav-link"
            style="cursor: pointer; color: #fff; background-color: #dc3545; border-radius: 4px; padding: 6px 16px; margin-left: 10px;"
            @click="authStore.logout()"
            >
            Salir
            </a>
        </div>
      </div>
    </div>
  </div>
  <!-- Nav Bar End -->
</template>

<style scoped>
.navbar {
  background-color: #2B2B2B !important;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}
</style>