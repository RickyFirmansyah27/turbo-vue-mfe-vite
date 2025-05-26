import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import { Checkpoints } from 'commons/Utils'
Vue.use(VueRouter)

const routes = [
  {
    path: Checkpoints.assets,
    name: 'Dashboard',
    component: NotFound
  },
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