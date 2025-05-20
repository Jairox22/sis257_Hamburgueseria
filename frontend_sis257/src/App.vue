<template>
  <Toast position="top-right" />
  <RouterView />
</template>

<script setup lang="ts">
// Import global scripts
import '@/assets/lib/easing/easing.min.js'
import '@/assets/lib/owlcarousel/owl.carousel.min.js'
import '@/assets/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js'
import '@/assets/js/main.js'
</script>

<style>
/* Third-party styles */
@import '@/assets/lib/animate/animate.min.css';
@import '@/assets/lib/owlcarousel/assets/owl.carousel.min.css';
@import '@/assets/lib/flaticon/font/flaticon.css';
@import '@/assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css';

/* Application styles */
@import '@/assets/css/style.css';
</style>