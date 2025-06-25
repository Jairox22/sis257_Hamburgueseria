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
                      <img src="../../assets/img/menu-burger.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Mini Hamburguesa con Queso</span> <strong>11.00 Bs</strong></h3>
                      <p>Lorem ipsum dolor sit amet elit. Phasel nec preti facil</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-burger.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Hamburguesa Doble</span> <strong>13.00 Bs</strong></h3>
                      <p>Lorem ipsum dolor sit amet elit. Phasel nec preti facil</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-burger.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Bacon, Huevo y Queso</span> <strong>15.00 Bs</strong></h3>
                      <p>Lorem ipsum dolor sit amet elit. Phasel nec preti facil</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-burger.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Hamburguesa de Cerdo Desmenuzado</span> <strong>20.00 Bs</strong></h3>
                      <p>Lorem ipsum dolor sit amet elit. Phasel nec preti facil</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-burger.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Hamburguesa de Pollo Frito</span> <strong>25.00 Bs</strong></h3>
                      <p>Lorem ipsum dolor sit amet elit. Phasel nec preti facil</p>
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
                      <p>Lorem ipsum dolor sit amet elit. Phasel nec preti facil</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-snack.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Pan Tostado con Besan</span> <strong>38.00 Bs</strong></h3>
                      <p>Lorem ipsum dolor sit amet elit. Phasel nec preti facil</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-snack.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Snacks Saludables de Soya</span> <strong>23.00 Bs</strong></h3>
                      <p>Lorem ipsum dolor sit amet elit. Phasel nec preti facil</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-snack.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Trozos de Soya Tandoori</span> <strong>33.00 Bs</strong></h3>
                      <p>Lorem ipsum dolor sit amet elit. Phasel nec preti facil</p>
                    </div>
                  </div>
                    <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-snack.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Papas Fritas con Queso</span> <strong>33.00 Bs</strong></h3>
                      <p>Lorem ipsum dolor sit amet elit. Phasel nec preti facil</p>
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
                      <h3><span>Taza Individual de Café</span> <strong>9.00 Bs</strong></h3>
                      <p>Lorem ipsum dolor sit amet elit. Phasel nec preti facil</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-beverage.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Café Americano</span> <strong>11.00 Bs</strong></h3>
                      <p>Lorem ipsum dolor sit amet elit. Phasel nec preti facil</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-beverage.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Caramel Macchiato</span> <strong>18.00 Bs</strong></h3>
                      <p>Lorem ipsum dolor sit amet elit. Phasel nec preti facil</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-beverage.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Café Negro Estándar</span> <strong>10.00 Bs</strong></h3>
                      <p>Lorem ipsum dolor sit amet elit. Phasel nec preti facil</p>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-img">
                      <img src="../../assets/img/menu-beverage.jpg" alt="Imagen">
                    </div>
                    <div class="menu-text">
                      <h3><span>Café Negro Estándar</span> <strong>14.00 Bs</strong></h3>
                      <p>Lorem ipsum dolor sit amet elit. Phasel nec preti facil</p>
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