import Vue from 'vue'
import VueRouter from 'vue-router'
import AssetList from '../views/AssetList.vue'
import AssetDetail from '../views/AssetDetail.vue'
import AssetCreate from '../views/AssetCreate.vue'
import AssetEdit from '../views/AssetEdit.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/reports',
    name: 'AssetList',
    component: AssetList
  },
  {
    path: '/assets/create',
    name: 'AssetCreate',
    component: AssetCreate
  },
  {
    path: '/assets/:id',
    name: 'AssetDetail',
    component: AssetDetail,
    props: true
  },
  {
    path: '/assets/:id/edit',
    name: 'AssetEdit',
    component: AssetEdit,
    props: true
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router