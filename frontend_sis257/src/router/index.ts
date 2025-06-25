import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import HomeView from '../views/home/HomeView.vue'
import { useAuthStore } from '@/stores'
import { getTokenFromLocalStorage } from '@/helpers'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'home',
          component: { template: '<div></div>' } // Componente vacío ya que el contenido está en MainLayout
        },
        // Rutas de administración como hijas del layout principal
        {
          path: 'admin/categorias',
          name: 'categorias',
          component: () => import('@/views/cruds/CategoriaView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'admin/productos',
          name: 'productos',
          component: () => import('@/views/cruds/ProductoView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'admin/empleados',
          name: 'empleados',
          component: () => import('@/views/cruds/EmpleadoView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'admin/ventas',
          name: 'ventas',
          component: () => import('@/views/cruds/VentaView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'admin/ventas/registrar',
          name: 'registrar-venta',
          component: () => import('@/views/cruds/RegistrarVentaView.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    if (!getTokenFromLocalStorage()) {
      if (authStore) authStore.logout()
      authStore.returnUrl = to.fullPath
      return '/login'
    }
  }

  // Redirigir a home si ya está autenticado y trata de ir a login
  if (to.name === 'login' && getTokenFromLocalStorage()) {
    return '/'
  }
})

export default router