import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import HomeView from '../views/home/HomeView.vue'
import AdminView from '../views/administracion/AdminView.vue'
import { useAuthStore } from '@/stores'
import { getTokenFromLocalStorage } from '@/helpers'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      children: [  // Rutas hijas que mantendrán el NavBarAdmin
        {
          path: 'categorias',
          name: 'categorias',
          component: () => import('@/views/cruds/CategoriaView.vue')
        },
        {
          path: 'productos',
          name: 'productos',
          component: () => import('@/views/cruds/ProductoView.vue')
        },
        {
          path: 'empleados',
          name: 'empleados',
          component: () => import('@/views/cruds/EmpleadoView.vue')
        },
        {
          path: 'ventas',
          name: 'ventas',
          component: () => import('@/views/cruds/VentaView.vue')
        },
        {
          path: 'ventas/registrar',
          name: 'registrar-venta',
          component: () => import('@/views/cruds/RegistrarVentaView.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/login', '/']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()

  if (authRequired && !getTokenFromLocalStorage()) {
    if (authStore) authStore.logout()
    authStore.returnUrl = to.fullPath
    return '/login'
  }
})

export default router