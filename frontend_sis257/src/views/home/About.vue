<script setup lang="ts">
import Button from 'primevue/button';
import { ref, onMounted } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

// URL del video de YouTube
const videoId = ref('1iqEwKIbgcY');
const videoUrl = ref('');
const showModal = ref(false);

// Función para hacer scroll suave
function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// Función para abrir el modal con el video
function openVideoModal() {
  videoUrl.value = `https://www.youtube.com/embed/${videoId.value}?autoplay=1`;
  showModal.value = true;
}

// Función para cerrar el modal
function closeVideoModal() {
  videoUrl.value = '';
  showModal.value = false;
}

// Configuración del modal cuando el componente está montado
onMounted(() => {
  // Cerrar modal cuando se hace clic fuera
  window.addEventListener('click', (e: MouseEvent) => {
    const modal = document.getElementById('videoModal');
    if (modal && e.target === modal) {
      closeVideoModal();
    }
  });
});
</script>

<template>
  <section :id="id" class="about-section">
    <!-- About Start -->
    <div class="about">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="about-img">
              <img src="../../assets/img/about.jpg" alt="Imagen">
              <button type="button" class="btn-play" @click="openVideoModal">
                <span></span>
              </button>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="about-content">
              <div class="section-header">
                <p>Sobre Nosotros</p>
                <h2>Cocinando desde 1990</h2>
              </div>
              <div class="about-text">
                <p>
                  En nuestra hamburguesería, nos apasiona ofrecer las mejores hamburguesas artesanales desde 1990. Utilizamos ingredientes frescos y de alta calidad para garantizar el mejor sabor en cada bocado.
                </p>
                <p>
                  Nuestro compromiso es brindar una experiencia única a cada cliente, combinando recetas tradicionales con un toque innovador. Ven y disfruta de un ambiente acogedor, excelente atención y las hamburguesas más deliciosas de la ciudad.
                </p>
                <Button
                  label="Reservar una Mesa"
                  class="p-button-success custom-btn"
                  @click="scrollToSection('booking')"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- About End -->
  </section>

  <!-- Video Modal - Versión Vue actualizada -->
  <div class="video-modal" :class="{ 'show': showModal }" id="videoModal">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close-btn" @click="closeVideoModal">
          <span>&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="embed-responsive embed-responsive-16by9">
          <iframe
            v-if="showModal"
            class="embed-responsive-item"
            :src="videoUrl"
            allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-btn.p-button {
  font-size: 18px;
  padding: 12px 28px;
  border-radius: 30px;
  margin-top: 15px;
  font-weight: 600;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: none;
}

.custom-btn.p-button-success {
  background: #fbaf32;
  color: #fff;
  border: 2px solid #fbaf32;
}

.custom-btn.p-button-success:hover {
  background: #fffbe6;
  color: #fbaf32;
  border-color: #fbaf32;
  box-shadow: 0 0 10px 2px #fbaf3233;
}

/* Estilos modernos para el modal de video */
.video-modal {
  display: none;
  position: fixed;
  z-index: 1050;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.75);
  transition: opacity 0.3s ease;
}

.video-modal.show {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  position: relative;
  background-color: transparent;
  margin: auto;
  width: 90%;
  max-width: 800px;
  border-radius: 8px;
}

.modal-header {
  display: flex;
  justify-content: flex-end;
  padding: 0 0 10px 0;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
}

.close-btn:hover {
  color: #fbaf32;
}

.embed-responsive {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
}

.embed-responsive::before {
  display: block;
  content: "";
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

.embed-responsive-item {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

/* Estilos para el botón de reproducción */
.btn-play {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fbaf32;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-play:hover {
  background-color: #fff;
}

.btn-play span {
  display: block;
  width: 0;
  height: 0;
  margin-left: 5px;
  border-style: solid;
  border-width: 10px 0 10px 15px;
  border-color: transparent transparent transparent #fff;
}

.btn-play:hover span {
  border-color: transparent transparent transparent #fbaf32;
}
</style>