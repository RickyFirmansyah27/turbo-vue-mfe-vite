import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/service/assets',
    name: 'Dashboard',
    component: NotFound
  },
  {
    path: '/service/*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router