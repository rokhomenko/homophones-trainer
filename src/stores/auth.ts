import { defineStore } from 'pinia'
import { api } from '@/api/axios'
import { AxiosError } from 'axios'
import type { AuthState, User } from '@/types/auth'
import type { ApiError } from '@/types/api'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
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
        const res = await api.post<User>(`/auth/login`, {
          email,
          password,
        })
        this.user = res.data
      } catch (err) {
        const error = err as AxiosError<ApiError>
        this.error = error.response?.data?.message || error.message
      } finally {
        this.loading = false
      }
    },

    async getUser() {
      try {
        const res = await api.get<User>(`/auth/me`)
        this.user = res.data
      } catch (err) {
        const error = err as AxiosError<ApiError>
        if (error.response?.status === 401) {
          this.user = null
        }
      }
    },

    async logout() {
      try {
        await api.post(`/auth/logout`)
      } catch {
      } finally {
        this.user = null
      }
    },
  },
})
