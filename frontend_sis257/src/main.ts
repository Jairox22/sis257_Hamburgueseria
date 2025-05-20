import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

import App from './App.vue'
import router from './router'

// PrimeVue configuration
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// PrimeVue styles
import 'primeicons/primeicons.css' // icons

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(ToastService)
// PrimeVue components
app.component('Toast', Toast)

// PrimeVue setup
app.use(PrimeVue, {
  theme: {
    options: {
        darkModeSelector: false || 'none',
    },
    preset: Aura
  }
})

// FontAwesome setup
library.add(faPlus, faEdit, faTrash, faSave)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
