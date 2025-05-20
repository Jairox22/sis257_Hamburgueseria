<script setup lang="ts">
import NavBarAdmin from './NavBarAdmin.vue';
</script>

<template>
  <div class="admin-layout">
    <NavBarAdmin />
    <div class="admin-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.admin-content {
  flex: 1;
  margin-top: 60px; /* Ajusta según la altura de tu navbar */
}
</style>