import { defineStore } from 'pinia'
import { api } from '@/api/axios'
import { AxiosError } from 'axios'
import type { AuthState, LoginResponse, User } from '@/types/auth'
import type { ApiError } from '@/types/api'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async register(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        await api.post(`/auth/register`, { email, password })
        await this.login(email, password)
      } catch (err) {
        const error = err as AxiosError<ApiError>
        this.error = error.response?.data?.message || error.message
      } finally {
        this.loading = false
      }
    },

    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const res = await api.post<LoginResponse>(`/auth/login`, {
          email,
          password,
        })
        this.token = res.data.accessToken
        localStorage.setItem('token', this.token)
        this.user = {
          userId: res.data.userId,
          email: res.data.email,
        } as User
      } catch (err) {
        const error = err as AxiosError<ApiError>
        this.error = error.response?.data?.message || error.message
      } finally {
        this.loading = false
      }
    },

    async getUser() {
      if (!this.token) return
      try {
        const res = await api.get<User>(`/auth/me`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        this.user = res.data
      } catch (err) {
        const error = err as AxiosError<ApiError>
        if (error.response?.status === 401) {
          this.logout()
        }
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
  },
})
