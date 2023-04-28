import { useMainStore } from '@/store/mainStore'
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

    // showConfirmDialog({
    //   message: '请先登录',
    //   theme: 'round-button',
    // })
    //   .then(() => {
    //     router.push('/login')
    //     // next()
    //   })
    //   .catch(() => {
    //     // router.back()
    //   })
  } else {
    next()
  }
  
})

export default router
