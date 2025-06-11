<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true
  }
});
</script>

<template>
  <section :id="id" class="menu-section">
    <!-- Menu Start -->
    <div class="menu">
      <div class="container">
        <div class="section-header text-center">
          <p>Menú de Comida</p>
          <h2>Delicioso Menú de Comida</h2>
        </div>
        <div class="menu-tab">
          <ul class="nav nav-pills justify-content-center">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="pill" href="#burgers">Hamburguesas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="pill" href="#snacks">Snacks</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="pill" href="#beverages">Bebidas</a>
            </li>
          </ul>
          <div class="tab-content">
            <div id="burgers" class="container tab-pane active">
              <div class="row">
                <div class="col-lg-7 col-md-12">
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-burger2.jpeg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>BENDITA</span> <strong>20.00 Bs</strong></h3>
                      <p>Pan especial, carne seleccionada 130gr, queso cheddar, jamon, ensalada, salsas especiales premium, porcion de papas Fritas.</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-burger1.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Hamburguesa Doble</span> <strong>21.00 Bs</strong></h3>
                      <p>Pan especial, carne, seleccionada 130 gr., queso cheddar, jamon, ensalada especial premium.</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/diabla.jpeg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>LA DIABLA</span> <strong>28.00 Bs</strong></h3>
                      <p>Pan especial (rojo), doble carne (res), doble queso cheddar, salsa perrillero (cobolde), tocino ensalada, salsa especial premium, porcion de papas fritas</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/carnivora.jpeg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>CARNIVORA</span> <strong>24.00 Bs</strong></h3>
                      <p>Pan especial (negro), crane mix (res y cardo) 150 gr., queso cheddar, tostones de platanos, tocino, doble jamon, ensalada, salsa especial premium, porcion de papas fritas</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/gorgory.jpeg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>GORGORY</span> <strong>29.00 Bs</strong></h3>
                      <p>Donut glaseada, carne seleccionada 170 gr., queso crema, doble queso cheddar, doble tocino ahumado cebolla, tocino ahumado, aros de cebolla, salsas especiales premium, porcion de papas fritas</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-5 d-none d-lg-block">
                  <img src="../../assets/img/menu-burger-img.jpg" alt="Imagen">
                </div>
              </div>
            </div>
            <div id="snacks" class="container tab-pane fade">
              <div class="row">
                <div class="col-lg-7 col-md-12">
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-snack.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Corn Tikki - Aloo Picante Frito</span> <strong>18.00 Bs</strong></h3>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-snack.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Pan Tostado con Besan</span> <strong>15.00 Bs</strong></h3>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-snack.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>papas fritas old bay con mayonesa de limon</span> <strong>10.00 Bs</strong></h3>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-snack.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Trozos de Soya Tandoori</span> <strong>18.00 Bs</strong></h3>
                    </div>
                  </div>
                    <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-snack.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Papas Fritas con Queso</span> <strong>12.00 Bs</strong></h3>
                    </div>
                    </div>
                </div>
                <div class="col-lg-5 d-none d-lg-block">
                  <img src="../../assets/img/menu-snack-img.jpg" alt="Imagen">
                </div>
              </div>
            </div>
            <div id="beverages" class="container tab-pane fade">
              <div class="row">
                <div class="col-lg-7 col-md-12">
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-beverage.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>REFRESCO DEL VALLE</span> <strong>12.00 Bs</strong></h3>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-beverage.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>LIMONADA MENTA</span> <strong>11.00 Bs</strong></h3>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-beverage.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>PIÑA COLADA</span> <strong>18.00 Bs</strong></h3>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-beverage.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>JUGO DE FRUTAS</span> <strong>10.00 Bs</strong></h3>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-beverage.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>GASEOSAS</span> <strong>15.00 Bs</strong></h3>
                    </div>
                  </div>
                </div>
                <div class="col-lg-5 d-none d-lg-block">
                  <img src="../../assets/img/menu-beverage-img.jpg" alt="Imagen">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Menu End -->
  </section>
</template>