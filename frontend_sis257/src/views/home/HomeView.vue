<script setup lang="ts">
import NavBar from './NavBar.vue';
import Carousel from './Carousel.vue';
import Booking from './Booking.vue';
import About from './About.vue';
import Feature from './Feature.vue';
import Food from './Food.vue';
import Menu from './Menu.vue';
import Team from './Team.vue';
import Contact from './Contact.vue';
import Blog from './Blog.vue';
import Footer from './Footer.vue';
import { onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Computed para saber si estamos en una ruta de admin
const isAdminRoute = computed(() => route.path.startsWith('/admin'));

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToTop() {
  scrollToSection('carousel');
}

// Manejar scroll cuando se carga la página con hash
onMounted(() => {
  if (window.location.hash && !isAdminRoute.value) {
    setTimeout(() => {
      scrollToSection(window.location.hash.substring(1));
    }, 100);
  }
});
</script>

<template>
  <div class="main-layout">
    <!-- Navbar unificado siempre visible -->
    <NavBar @scroll-to="scrollToSection" />
    
    <!-- Contenido principal -->
    <div class="main-content">
      <!-- Mostrar contenido del home solo si NO estamos en rutas admin -->
      <template v-if="!isAdminRoute">
        <Carousel id="carousel" />
        <Booking id="booking" />
        <About id="about" />
        <Feature id="feature" />
        <Food id="food" />
        <Menu id="menu" />
        <Team id="team" />
        <Contact id="contact" />
        <Blog />
        <Footer />
        <a href="#carousel" class="back-to-top" @click.prevent="scrollToTop">
          <i class="fa fa-chevron-up"></i>
        </a>
      </template>
      
      <!-- Mostrar contenido de admin si estamos en rutas admin -->
      <template v-else>
        <div class="admin-content">
          <RouterView />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-top: 70px; /* Espacio para el navbar fijo */
}
.back-to-top {
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 99;
  background-color: #FBAF32;
  color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(251, 175, 50, 0.3);
}

.back-to-top:hover {
  background-color: #ff6b35;
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(251, 175, 50, 0.4);
  color: white;
}

.main-content {
  flex: 1;
  margin-top: 0; /* Elimina el margen superior ya que lo manejamos en el carrusel */
}
</style>