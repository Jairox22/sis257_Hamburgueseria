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
const celular = ref('');
const fecha = ref('');
const hora = ref('');
const enviado = ref(false);

function enviarReserva(e: Event) {
    e.preventDefault();
    // Aquí podrías agregar validaciones si lo deseas
    nombre.value = '';
    correo.value = '';
    celular.value = '';
    fecha.value = '';
    hora.value = '';
    enviado.value = true;
}
</script>

<template>
    <section :id="id" class="booking-section">
        <div class="booking">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-7">
                        <div class="booking-content">
                            <div class="section-header">
                                <p>Reservar una mesa</p>
                                <h2>Reserva tu mesa para cenas privadas y cumpleaños</h2>
                            </div>
                            <div class="about-text">
                                <p>
                                    Realiza tu reserva de manera rápida y sencilla para asegurar tu mesa en nuestro restaurante. Disfruta de una experiencia única con tus amigos y familiares.
                                </p>
                                <p>
                                    Completa el formulario con tus datos y selecciona la fecha y hora que prefieras. Nuestro equipo confirmará tu reserva lo antes posible. ¡Te esperamos para que vivas una velada inolvidable!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="booking-form">
                            <template v-if="!enviado">
                                <form @submit="enviarReserva">
                                    <div class="control-group">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Nombre" v-model="nombre" required />
                                            <div class="input-group-append">
                                                <div class="input-group-text"><i class="far fa-user" style="color: black;"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <div class="input-group">
                                            <input type="email" class="form-control" placeholder="Correo electrónico" v-model="correo" required />
                                            <div class="input-group-append">
                                                <div class="input-group-text"><i class="far fa-envelope" style="color: black;"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Celular" v-model="celular" required />
                                            <div class="input-group-append">
                                                <div class="input-group-text"><i class="fa fa-mobile-alt" style="color: black;"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <div class="input-group date">
                                            <input type="date" class="form-control" placeholder="Fecha" v-model="fecha" required />
                                            <div class="input-group-append">
                                                <div class="input-group-text"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <div class="input-group time">
                                            <input type="time" class="form-control" placeholder="Hora" v-model="hora" required />
                                            <div class="input-group-append">
                                                <div class="input-group-text"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button class="btn custom-btn" type="submit">Reservar ahora</button>
                                    </div>
                                </form>
                            </template>
                            <template v-else>
                                <div class="text-center" style="background: none; color: white; font-weight: bold;">
                                    ¡Tu reserva ha sido registrada! Nos pondremos en contacto contigo pronto.
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
