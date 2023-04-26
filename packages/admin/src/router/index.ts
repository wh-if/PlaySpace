import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/Layout/index.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
