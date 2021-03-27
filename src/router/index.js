import { createRouter, createWebHistory } from 'vue-router'
import Network from '../pages/Network.vue'

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Network,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/About.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
