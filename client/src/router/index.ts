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
      { path: 'profile', name: 'profile', component: () => import('@/views/Profile.vue') },
      { path: 'training', name: 'training', component: () => import('@/views/Training.vue') }
    ]
    },
    {
      path: '/auth',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        { path: 'login', name: 'login', component: () => import('@/views/Login.vue') },
        { path: 'register', name: 'register', component: () => import('@/views/Register.vue') }
      ]
    }
  ],
})

export default router
