<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true
  }
});
</script>

<template>
  <section :id="id" class="team-section">
    <!-- Team Start -->
    <div class="team">
      <div class="container">
        <div class="section-header text-center">
          <p>Nuestro Equipo</p>
          <h2>Nuestros Maestros Chefs</h2>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6">
            <div class="team-item">
              <div class="team-img">
                <img src="../../assets/img/team-1.jpg" alt="Imagen">
                <div class="team-social">
                  <a href=""><i class="fab fa-twitter"></i></a>
                  <a href=""><i class="fab fa-facebook-f"></i></a>
                  <a href=""><i class="fab fa-linkedin-in"></i></a>
                  <a href=""><i class="fab fa-instagram"></i></a>
                </div>
              </div>
              <div class="team-text">
                <h2>Carlos Ramírez</h2>
                <p>CEO, Cofundador</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="team-item">
              <div class="team-img">
                <img src="../../assets/img/team-2.jpg" alt="Imagen">
                <div class="team-social">
                  <a href=""><i class="fab fa-twitter"></i></a>
                  <a href=""><i class="fab fa-facebook-f"></i></a>
                  <a href=""><i class="fab fa-linkedin-in"></i></a>
                  <a href=""><i class="fab fa-instagram"></i></a>
                </div>
              </div>
              <div class="team-text">
                <h2>Mario Fernández</h2>
                <p>Chef Ejecutivo</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="team-item">
              <div class="team-img">
                <img src="../../assets/img/team-3.jpg" alt="Imagen">
                <div class="team-social">
                  <a href=""><i class="fab fa-twitter"></i></a>
                  <a href=""><i class="fab fa-facebook-f"></i></a>
                  <a href=""><i class="fab fa-linkedin-in"></i></a>
                  <a href=""><i class="fab fa-instagram"></i></a>
                </div>
              </div>
              <div class="team-text">
                <h2>Juan Pérez</h2>
                <p>Chef de Cocina</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="team-item">
              <div class="team-img">
                <img src="../../assets/img/team-4.jpg" alt="Imagen">
                <div class="team-social">
                  <a href=""><i class="fab fa-twitter"></i></a>
                  <a href=""><i class="fab fa-facebook-f"></i></a>
                  <a href=""><i class="fab fa-linkedin-in"></i></a>
                  <a href=""><i class="fab fa-instagram"></i></a>
                </div>
              </div>
              <div class="team-text">
                <h2>Lucio Gómez</h2>
                <p>Jefe de Partida</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Team End -->
  </section>
</template>