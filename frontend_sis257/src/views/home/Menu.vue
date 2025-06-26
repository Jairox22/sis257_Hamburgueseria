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
                      <img src="../../assets/img/burguer1.jpeg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>BENDITA</span> <strong>20.00 Bs</strong></h3>
                      <p>Pan especial, carne seleccionada, queso cheddar, jamon, ensalada y salsas especiales</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/diabla.jpeg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>DIABLA</span> <strong>28.00 Bs</strong></h3>
                      <p>Pan espsecial, doble carne, doble queso chaddar, chorizo parrillero y tocino</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/gorgory.jpeg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>GORGORY</span> <strong>29.00 Bs</strong></h3>
                      <p>Donut glaseada, carne seleccionada, queso cheddar, doble tocino ahumado, salsas especiales y porcion de papas fritas</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/carnivora.jpeg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>CARNIVORA</span> <strong>24.00 Bs</strong></h3>
                      <p>Pan especial, carne mix, queso cheddar, tocino, doble jamon, ensalada y salsas especiales</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-burger.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Hamburguesa de Pollo Frito</span> <strong>25.00 Bs</strong></h3>
                      <p>Pan especial, pollo frito, lechuga, tomate y mayonesa</p>
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
                      <img src="../../assets/img/pan.png" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Pan Tostado con Besan</span> <strong>38.00 Bs</strong></h3>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-snack.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Snacks Saludables de Soya</span> <strong>23.00 Bs</strong></h3>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/soya.png" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Trozos de Soya Tandoori</span> <strong>33.00 Bs</strong></h3>
                    </div>
                  </div>
                    <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/snack1.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Papas Fritas con Queso</span> <strong>33.00 Bs</strong></h3>
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
                      <img src="../../assets/img/jugo1.png" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Limonada</span> <strong>9.00 Bs</strong></h3>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/jugo2.png" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Jugo de frutas</span> <strong>15.00 Bs</strong></h3>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/jugo3.png" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Gaseosa</span> <strong>18.00 Bs</strong></h3>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/jugo4.png" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Jugo del valle</span> <strong>15.00 Bs</strong></h3>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-beverage.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Coctel</span> <strong>20.00 Bs</strong></h3>
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