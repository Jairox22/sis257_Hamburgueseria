<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  id: {
    type: String,
    required: true
  }
});

const nombre = ref('');
const correo = ref('');
const asunto = ref('');
const mensaje = ref('');
const enviado = ref(false);

function enviarFormulario(e: Event) {
  e.preventDefault();
  // Aquí podrías agregar validaciones si lo deseas
  nombre.value = '';
  correo.value = '';
  asunto.value = '';
  mensaje.value = '';
  enviado.value = true;
}
</script>

<template>
  <section :id="id" class="contact-section">
    <!-- Contacto Inicio -->
    <div class="contact">
      <div class="container">
        <div class="section-header text-center">
          <p>Contáctanos</p>
          <h2>Contacta por cualquier consulta</h2>
        </div>
        <div class="row align-items-center contact-information">
          <div class="col-md-6 col-lg-3">
            <div class="contact-info">
              <div class="contact-icon">
                <i class="fa fa-map-marker-alt"></i>
              </div>
              <div class="contact-text">
                <h3>Dirección</h3>
                <p>Bustillos #312, Sucre, Bolivia</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="contact-info">
              <div class="contact-icon">
                <i class="fa fa-phone-alt"></i>
              </div>
              <div class="contact-text">
                <h3>Llámanos</h3>
                <p>Celular</p>
                <p>+591 75446065</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="contact-info">
              <div class="contact-icon">
                <i class="fa fa-envelope"></i>
              </div>
              <div class="contact-text">
                <h3>Envíanos un correo</h3>
                <p>burguerbendita@gmail.com</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="contact-info">
              <div class="contact-icon">
                <i class="fa fa-share"></i>
              </div>
              <div class="contact-text">
                <h3>Síguenos</h3>
                <div class="contact-social">
                  <a href=""><i class="fab fa-twitter"></i></a>
                  <a href=""><i class="fab fa-facebook-f"></i></a>
                  <a href=""><i class="fab fa-youtube"></i></a>
                  <a href=""><i class="fab fa-instagram"></i></a>
                  <a href=""><i class="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row contact-form">
          <div class="col-md-6">
            <iframe
              src="https://www.google.com/maps?q=Bustillos+%23312,+Sucre,+Bolivia&output=embed"
              frameborder="0" style="border:0; width:100%; height:350px;" allowfullscreen aria-hidden="false" tabindex="0"></iframe>
          </div>
          <div class="col-md-6">
            <div id="success"></div>
            <template v-if="!enviado">
              <form name="sentMessage" id="contactForm" @submit="enviarFormulario">
                <div class="control-group">
                  <input type="text" class="form-control" id="name" placeholder="Tu nombre"
                    v-model="nombre"
                    required
                  />
                  <p class="help-block text-danger"></p>
                </div>
                <div class="control-group">
                  <input type="email" class="form-control" id="email" placeholder="Tu correo"
                    v-model="correo"
                    required
                  />
                  <p class="help-block text-danger"></p>
                </div>
                <div class="control-group">
                  <input type="text" class="form-control" id="subject" placeholder="Asunto"
                    v-model="asunto"
                    required
                  />
                  <p class="help-block text-danger"></p>
                </div>
                <div class="control-group">
                  <textarea class="form-control" id="message" placeholder="Mensaje"
                    v-model="mensaje"
                    required
                  ></textarea>
                  <p class="help-block text-danger"></p>
                </div>
                <div>
                  <button class="btn custom-btn" type="submit" id="sendMessageButton">Enviar mensaje</button>
                </div>
              </form>
            </template>
            <template v-else>
              <div class="alert alert-success text-center">
                ¡Tu mensaje ha sido enviado exitosamente!
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- Contacto Fin -->
  </section>
</template>