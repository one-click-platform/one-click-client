import { createRouter, createWebHistory } from 'vue-router'
import Network from '../pages/Network.vue'

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Network,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
