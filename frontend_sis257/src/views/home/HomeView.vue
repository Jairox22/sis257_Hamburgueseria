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
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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
  if (window.location.hash) {
    setTimeout(() => {
      scrollToSection(window.location.hash.substring(1));
    }, 100);
  }
});
</script>

<template>
  <main>
    <NavBar @scroll-to="scrollToSection" />
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
  </main>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 99;
}
</style>