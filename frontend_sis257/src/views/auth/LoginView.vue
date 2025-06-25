<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/index';
import Swal from 'sweetalert2';

const nombreUsuario = ref('');
const clave = ref('');
const showPassword = ref(false);
const router = useRouter();

async function onSubmit() {
  const usuario: string = nombreUsuario.value.trim();
  const password: string = clave.value.trim();

  if (usuario.length === 0 || password.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Debe ingresar un usuario y/o password',
    });
    return;
  }

  const authStore = useAuthStore();
  try {
    await authStore.login(usuario, password);
    Swal.fire({
      icon: 'success',
      title: `¡Bienvenido, ${usuario}!`,
      text: 'Has iniciado sesión correctamente.',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ingresar'
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/');
      }
    });
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    Swal.fire({
      icon: 'error',
      title: 'Usuario y/o password incorrecta'
    });
  }
}

function goBack() {
  router.push('/');
}
</script>

<template>
  <div class="container-login">
    <div class="wrap-login">
      <form class="login-form" id="formLogin" @submit.prevent="onSubmit">
        <span class="login-form-title">Iniciar Sesión</span>
        <div class="logo-container">
          <img src="@/assets/img/bendita/logo.jpg" width="100" alt="Bendita Logo">
        </div>
        <div class="wrap-input100">
          <input class="input100" type="text" id="usuario" v-model="nombreUsuario" placeholder="Usuario" />
        </div>
        <div class="wrap-input100" style="position: relative;">
          <input
            class="input100"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="clave"
            placeholder="Password"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer;"
            tabindex="-1"
            aria-label="Mostrar/Ocultar contraseña"
          >
            <span v-if="showPassword">🙈</span>
            <span v-else>👁️</span>
          </button>
        </div>
        <div class="container-login-form-btn">
          <button type="submit" class="login-form-btn">Ingresar</button>
        </div>
        <div class="container-back-btn">
          <button type="button" class="back-btn" @click="goBack">Regresar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

body, html {
  height: 100%;
  font-family: 'Poppins', Arial, sans-serif;
  background: linear-gradient(120deg, #191b21 0%, #232526 100%);
}

.container-login {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: transparent;
}

.wrap-login {
  width: 400px;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  padding: 60px 40px 40px 40px;
  box-shadow: 0 8px 32px 0 rgba(227, 155, 20, 0.25), 0 1.5px 6px 0 rgba(0,0,0,0.10);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.login-form-title {
  font-family: 'Poppins', Arial, sans-serif;
  font-weight: 700;
  font-size: 2.2rem;
  color: #E39B14;
  text-align: center;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
}

.wrap-input100 {
  width: 100%;
  position: relative;
  margin-bottom: 10px;
}

.input100 {
  font-family: 'Poppins', Arial, sans-serif;
  font-size: 1rem;
  color: #333;
  width: 100%;
  height: 48px;
  border: 1.5px solid #E39B14;
  border-radius: 8px;
  background: #f7f7f7;
  padding: 0 15px;
  transition: border 0.3s;
  margin-bottom: 2px;
}

.input100:focus {
  border: 2px solid #191b21;
  background: #fff;
  outline: none;
}

.container-login-form-btn {
  width: 100%;
  margin-top: 10px;
}

.login-form-btn {
  width: 100%;
  height: 48px;
  background: linear-gradient(90deg, #E39B14 0%, #ffbe4d 100%);
  color: #fff;
  font-family: 'Poppins', Arial, sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(227, 155, 20, 0.15);
  transition: background 0.3s, transform 0.2s;
  cursor: pointer;
  letter-spacing: 1px;
}

.login-form-btn:hover {
  background: linear-gradient(90deg, #ffbe4d 0%, #E39B14 100%);
  transform: translateY(-2px) scale(1.03);
}

.container-back-btn {
  width: 100%;
  margin-top: 8px;
  display: flex;
  justify-content: center;
}

.back-btn {
  background: none;
  color: #E39B14;
  border: 2px solid #E39B14;
  border-radius: 8px;
  padding: 8px 24px;
  font-family: 'Poppins', Arial, sans-serif;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.back-btn:hover {
  background: #E39B14;
  color: #fff;
}

@media (max-width: 576px) {
  .wrap-login {
    padding: 40px 10px 20px 10px;
    width: 95vw;
  }
  .login-form-title {
    font-size: 1.5rem;
  }
}
</style>
