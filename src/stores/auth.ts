import { defineStore } from 'pinia'
import axios from 'axios'
import type { AuthState, LoginResponse, User } from '@/types/auth'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
  },

  actions: {
    async register(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        await axios.post(`http://localhost:3000/auth/register`, { email, password })
        await this.login(email, password)
      } catch (err: any) {
        this.error = err.response?.data?.message || err.message
      } finally {
        this.loading = false
      }
    },

    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.post<LoginResponse>(`http://localhost:3000/auth/login`, {
          email,
          password,
        })
        this.token = res.data.accessToken
        localStorage.setItem('token', this.token)
        this.user = {
          userId: res.data.userId,
          email: res.data.email,
        } as any
      } catch (err: any) {
        this.error = err.response?.data?.message || err.message
      } finally {
        this.loading = false
      }
    },

    async getUser() {
      if (!this.token) return
      try {
        const res = await axios.get<User>(`http://localhost:3000/auth/me`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        this.user = res.data
      } catch {
        this.logout()
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
  },
})
