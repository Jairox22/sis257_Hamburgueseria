<template>
  <!-- Carousel Start -->
  <div class="carousel">
    <div class="container-fluid">
      <Carousel
        :value="carouselItems"
        :numVisible="1"
        :numScroll="1"
        :autoplayInterval="3000"
        circular
        :showIndicators="false"
      >
        <template #item="slotProps">
          <div class="carousel-item">
            <div class="carousel-img">
              <img :src="slotProps.data.image" alt="Imagen">
            </div>
            <div class="carousel-text">
              <h1 v-html="slotProps.data.title"></h1>
              <p>{{ slotProps.data.description }}</p>
              <div class="carousel-btn">
                <Button
                  v-for="(btn, index) in slotProps.data.buttons"
                  :key="index"
                  :label="btn.label"
                  :class="btn.class"
                  class="mr-2"
                  @click="scrollToSection(btn.target)"
                />
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
  <!-- Carousel End -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import carousel1 from '@/assets/img/carousel-1.jpg'
import carousel2 from '@/assets/img/carousel-2.jpg'
import carousel3 from '@/assets/img/carousel-3.jpg'
import Carousel from 'primevue/carousel';
import Button from 'primevue/button';

// Datos para el carrusel
const carouselItems = [
  {
    id: 1,
    image: carousel1,
    title: 'Mejores <span>Ingredientes</span> de Calidad',
    description: 'Utilizamos solo ingredientes frescos y de la mejor calidad para ofrecerte hamburguesas deliciosas. ¡Disfruta de una experiencia única en cada bocado!',
    buttons: [
      { label: 'Ver Menú', class: 'p-button-outlined', target: 'menu' },
      { label: 'Reservar Mesa', class: 'p-button-success', target: 'booking' }
    ]
  },
  {
    id: 2,
    image: carousel2,
    title: 'El <span>Mejor</span> Chef del Mundo',
    description: 'Nuestro chef galardonado prepara cada plato con pasión y dedicación, garantizando el mejor sabor en cada hamburguesa.',
    buttons: [
      { label: 'Ver Menú', class: 'p-button-outlined', target: 'menu' },
      { label: 'Reservar Mesa', class: 'p-button-success', target: 'booking' }
    ]
  },
  {
    id: 3,
    image: carousel3,
    title: 'Entrega <span>Rápida</span> de Pedidos',
    description: 'Recibe tu pedido en tiempo récord, caliente y listo para disfrutar. ¡La mejor hamburguesa, directo a tu mesa!',
    buttons: [
      { label: 'Ver Menú', class: 'p-button-outlined', target: 'menu' },
      { label: 'Reservar Mesa', class: 'p-button-success', target: 'booking' }
    ]
  }
];

// Función para hacer scroll a la sección
function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<style>
/* Estilos para el carrusel */
.carousel {
  position: relative;
  background: #ffffff;
}

.carousel-item {
  display: flex;
  align-items: center;
  position: relative;
}

.carousel-img {
  width: 50%;
  overflow: hidden;
}

.carousel-img img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.carousel-text {
  width: 50%;
  padding: 0 60px;
}

.carousel-text h1 {
  color: #fbaf32;
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 20px;
}

.carousel-text h1 span {
  color: #222222;
}

.carousel-text p {
  color: #666666;
  font-size: 18px;
  margin-bottom: 25px;
}

.carousel-btn a {
  margin-right: 15px;
}

/* Estilos responsive */
@media (max-width: 991.98px) {
  .carousel-item {
    flex-direction: column;
  }
  
  .carousel-img,
  .carousel-text {
    width: 100%;
  }
  
  .carousel-text {
    padding: 30px;
    text-align: center;
  }
}

@media (max-width: 767.98px) {
  .carousel-text h1 {
    font-size: 40px;
  }
  
  .carousel-text p {
    font-size: 16px;
  }
}

.carousel-btn .p-button {
  font-size: 18px;
  padding: 12px 28px;
  border-radius: 30px;
  margin-right: 15px;
  margin-bottom: 10px;
  font-weight: 600;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: none;
}

.carousel-btn .p-button-outlined {
  background: transparent;
  color: #fbaf32;
  border: 2px solid #fbaf32;
}

.carousel-btn .p-button-success {
  background: #fbaf32;
  color: #fff;
  border: 2px solid #fbaf32;
}

.carousel-btn .p-button-success:hover {
  background: #fffbe6;
  color: #fbaf32;
  border-color: #fbaf32;
  box-shadow: 0 0 10px 2px #fbaf3233;
}

.carousel-btn .p-button-success:hover,
.carousel-btn .p-button-outlined:hover {
  background: #fbaf32 !important;
  color: #fff !important;
  border-color: #fbaf32 !important;
  box-shadow: 0 0 10px 2px #fbaf3233;
}

</style>