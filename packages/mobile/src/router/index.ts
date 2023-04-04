import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/PageLayout.vue'),
    redirect: 'home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/index.vue'),
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('@/views/Category/index.vue'),
      },
      {
        path: '/product/:id',
        name: 'product',
        component: () => import('@/views/Product/index.vue'),
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/Cart/index.vue'),
      },
      {
        path: '/order',
        name: 'orderList',
        component: () => import('@/views/OrderList/index.vue'),
      },
      {
        path: '/order/:id',
        name: 'order',
        component: () => import('@/views/Order/index.vue'),
      },
      {
        path: '/me',
        name: 'me',
        component: () => import('@/views/Me/index.vue'),
      },
      {
        path: '/message',
        name: 'message',
        component: () => import('@/views/Message/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
