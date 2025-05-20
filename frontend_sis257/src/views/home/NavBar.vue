<script setup lang="ts">
import { useAuthStore } from "@/stores/index";
import { useRouter } from 'vue-router';

const emit = defineEmits(['scroll-to']);
const authStore = useAuthStore();
const router = useRouter();

function scrollTo(sectionId: string) {
  // Usamos el router para actualizar el hash en la URL
  router.push({ hash: `#${sectionId}` });
  emit('scroll-to', sectionId);
}
</script>

<template>
  <!-- Nav Bar Start -->
  <div class="navbar navbar-expand-lg bg-light navbar-light">
    <div class="container-fluid">
      <a href="/" class="navbar-brand">Bendita <span>Burguer</span></a>
      <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
        <div class="navbar-nav ml-auto">
            <a href="#menu" class="nav-item nav-link" @click.prevent="() => scrollTo('menu')">Menú</a>
            <a href="#booking" class="nav-item nav-link" @click.prevent="() => scrollTo('booking')">Reservar</a>
            <a href="#about" class="nav-item nav-link" @click.prevent="() => scrollTo('about')">Sobre nosotros</a>
            <a href="#feature" class="nav-item nav-link" @click.prevent="() => scrollTo('feature')">Características</a>
            <a href="#team" class="nav-item nav-link" @click.prevent="() => scrollTo('team')">Equipo</a>
            <a href="#contact" class="nav-item nav-link" @click.prevent="() => scrollTo('contact')">Contacto</a>
            <!-- Login/Bienvenido Button -->
            <RouterLink
            v-if="!authStore.token"
            to="/login"
            class="nav-item nav-link"
            style="color: #fff; background-color: #fbaf32; border-radius: 4px; padding: 6px 16px; margin-left: 10px;"
            >
            Login
            </RouterLink>
            <a
            v-else
            class="nav-item nav-link"
            style="cursor: pointer ; color: #fff; background-color: #fbaf32; border-radius: 4px; padding: 6px 16px; margin-left: 10px;"
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