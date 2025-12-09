import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/Home.vue') },
      { path: 'profile', name: 'profile', component: () => import('@/views/Profile.vue'), meta: { requiresAuth: true } },
      { path: 'training', name: 'training', component: () => import('@/views/Training.vue'), meta: { requiresAuth: true } }
    ]
    },
    {
      path: '/auth',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        { path: 'login', name: 'login', component: () => import('@/views/Login.vue'), meta: { guestOnly: true } },
        { path: 'register', name: 'register', component: () => import('@/views/Register.vue'), meta: { guestOnly: true } }
      ]
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  if(auth.token && !auth.user) {
    await auth.getUser()
  }

  if(to.meta.guestOnly && auth.isAuthenticated) {
    return next({name: 'home'})
  }

  if(to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({name: 'login'})
  } else {
    next()
  }
})

export default router
