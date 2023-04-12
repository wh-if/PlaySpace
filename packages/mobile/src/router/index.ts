import { useMainStore } from '@/store/mainStore'
import { showConfirmDialog } from 'vant'
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
        meta: {
          needLogin: true,
        },
      },
      {
        path: '/order/:id',
        name: 'order',
        component: () => import('@/views/Order/index.vue'),
        meta: {
          needLogin: true,
        },
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
        meta: {
          needLogin: true,
        },
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/Search/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const mainStore = useMainStore()
  if (to.meta.needLogin && (!mainStore.userInfo?.accountNumber)) {

    showConfirmDialog({
      message: '请先登录',
      theme: 'round-button',
    })
      .then(() => {
        router.push('/login')
        // next()
      })
      .catch(() => {
        // router.back()
      })
  } else {
    next()
  }
  
})

export default router
