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
  <!-- Comida Inicio -->
  <section :id="id" class="food-section">
    <div class="food">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-4">
            <div class="food-item">
              <i class="flaticon-burger"></i>
              <h2>Hamburguesas</h2>
              <p>
                Disfruta de nuestras jugosas hamburguesas preparadas con carne 100% de res, ingredientes frescos y pan
                artesanal. ¡El sabor que te hará volver!
              </p>
              <Button label="Ver Menú" class="p-button-success custom-btn" @click="scrollToSection('menu')" />
            </div>
          </div>
          <div class="col-md-4">
            <div class="food-item">
              <i class="flaticon-snack"></i>
              <h2>Snacks</h2>
              <p>
                Acompaña tu comida con nuestras papas fritas crujientes, aros de cebolla y otros snacks ideales para
                compartir con amigos y familia.
              </p>
              <Button label="Ver el menú" class="p-button-success custom-btn" @click="scrollToSection('menu')" />
            </div>
          </div>
          <div class="col-md-4">
            <div class="food-item">
              <i class="flaticon-cocktail"></i>
              <h2>Bebidas</h2>
              <p>
                Refresca tu paladar con nuestra variedad de bebidas: gaseosas, jugos naturales y deliciosos batidos para
                todos los gustos.
              </p>
              <Button label="Ver el menú" class="p-button-success custom-btn" @click="scrollToSection('menu')" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Comida Fin -->
</template>

<style scoped>
.food-section {
  padding: 100px 0;
  background: #ffffff;
}

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