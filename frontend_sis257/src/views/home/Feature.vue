<script setup lang="ts">
import Button from 'primevue/button';

defineProps({
  id: {
    type: String,
    required: true
  }
});

// Función para hacer scroll suave
function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <section :id="id" class="feature-section">
    <!-- Feature Start -->
    <div class="feature">
      <div class="container">
        <div class="row">
          <div class="col-lg-5">
            <div class="section-header">
              <p>¿Por qué elegirnos?</p>
              <h2>Características Clave</h2>
            </div>
            <div class="feature-text">
              <div class="feature-img">
                <div class="row">
                  <div class="col-6">
                    <img src="../../assets/img/feature-1.jpg" alt="Imagen">
                  </div>
                  <div class="col-6">
                    <img src="../../assets/img/feature-2.jpg" alt="Imagen">
                  </div>
                  <div class="col-6">
                    <img src="../../assets/img/feature-3.jpg" alt="Imagen">
                  </div>
                  <div class="col-6">
                    <img src="../../assets/img/feature-4.jpg" alt="Imagen">
                  </div>
                </div>
              </div>
              <p>
                Disfruta de las mejores hamburguesas hechas con ingredientes frescos y de calidad. Nuestro equipo se esfuerza por ofrecerte una experiencia única en cada visita. ¡Ven y prueba el auténtico sabor de nuestra hamburguesería!
              </p>
              <Button
                label="Ver el menú"
                class="p-button-success custom-btn"
                @click="scrollToSection('menu')"
              />
            </div>
          </div>
          <div class="col-lg-7">
            <div class="row">
              <div class="col-sm-6">
                <div class="feature-item">
                  <i class="flaticon-cooking"></i>
                  <h3>Chef de clase mundial</h3>
                  <p>
                    Nuestro chef experto prepara cada hamburguesa con pasión y creatividad para sorprender tu paladar.
                  </p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="feature-item">
                  <i class="flaticon-vegetable"></i>
                  <h3>Ingredientes naturales</h3>
                  <p>
                    Utilizamos solo ingredientes frescos y naturales para garantizar el mejor sabor en cada bocado.
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="feature-item">
                  <i class="flaticon-medal"></i>
                  <h3>Productos de la mejor calidad</h3>
                  <p>
                    Seleccionamos cuidadosamente cada producto para ofrecerte hamburguesas de calidad superior.
                  </p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="feature-item">
                  <i class="flaticon-meat"></i>
                  <h3>Vegetales y carne fresca</h3>
                  <p>
                    Nuestras hamburguesas se preparan con vegetales frescos y carne seleccionada diariamente.
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="feature-item">
                  <i class="flaticon-courier"></i>
                  <h3>Entrega rápida a domicilio</h3>
                  <p>
                    Disfruta de tus hamburguesas favoritas en casa con nuestro servicio de entrega rápido y seguro.
                  </p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="feature-item">
                  <i class="flaticon-fruits-and-vegetables"></i>
                  <h3>Carne magra y baja en grasa</h3>
                  <p>
                    Ofrecemos opciones saludables con carne magra y baja en grasa, sin perder el sabor auténtico.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Feature End -->
  </section>
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
</style>