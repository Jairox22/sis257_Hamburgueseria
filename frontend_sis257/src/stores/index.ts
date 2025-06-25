import { defineStore } from "pinia";
import { getTokenFromLocalStorage } from "@/helpers";
import http from "@/plugins/axios";
import router from "@/router";
import Swal from 'sweetalert2';

const useAuthStore = defineStore("auth", {
  state: () => ({
    idUser: localStorage.getItem("idUser") || "",
    user: localStorage.getItem("user") || "",
    token: getTokenFromLocalStorage(),
    returnUrl: null as string | null
  }),
  getters: {},
  actions: {
    async login(nombreUsuario: string, clave: string) {
      await http.post("auth/login", { nombreUsuario, clave }).then(response => {
        this.idUser = response.data.id;
        this.user = response.data.nombreUsuario;
        this.token = response.data.access_token;

        localStorage.setItem("idUser", this.idUser || "");
        localStorage.setItem("user", this.user || "");
        localStorage.setItem("token", this.token || "");

        router.push(this.returnUrl || "/");
      });
    },
    logout() {
      localStorage.clear();
      this.$reset();
      Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        text: "Has cerrado sesión correctamente.",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        position: "top-end",
        toast: true
      });
      router.push("/");
    }
  }
});

export { useAuthStore };
