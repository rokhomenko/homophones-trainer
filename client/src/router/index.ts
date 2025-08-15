import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/Home.vue') },
    { path: '/login', name: 'login', component : () => import('@/views/Login.vue') },
    { path: '/register', name: 'register', component : () => import('@/views/Register.vue') },
    { path: '/training', name: 'training', component : () => import('@/views/Training.vue') },
    { path: '/profile', name: 'profile', component : () => import('@/views/Profile.vue') }
  ],
})

export default router
