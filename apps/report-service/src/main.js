import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// 🔧 Configure Vue Query
Vue.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1
      }
    }
  }
})

// 🔧 Configure Toast Notifications
const toastOptions = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 3,
  newestOnTop: true,
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  showCloseButtonOnHover: false
}
Vue.use(Toast, toastOptions)

let app = null

// Fungsi mount untuk shell
const mount = (el, { initialPath = '/', onParentNavigation } = {}) => {
  const customRouter = router

  if (onParentNavigation) {
    customRouter.afterEach((to) => {
      onParentNavigation(to.fullPath)
    })
  }

  app = new Vue({
    router: customRouter,
    render: h => h(App)
  })

  app.$mount(el)
}

// Untuk dev lokal (standalone)
if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#report-service')
  if (el) {
    mount(el)
  }
}

export { mount }
