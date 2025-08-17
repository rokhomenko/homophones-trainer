import { defineStore } from 'pinia'
import axios from 'axios'
import type { AuthState, LoginResponse, User } from '@/types/auth'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null
  }),

  actions: {
    async register(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.post<LoginResponse>(`https://x8ki-letl-twmt.n7.xano.io/api:U6KB-8Fp/auth/signup`, {email, password})
        this.token = res.data.authToken
        localStorage.setItem('token', this.token)
        await this.getUser()
      } catch (err: any) {
        this.error = err.response?.data?.message || err.message
      } finally {
        this.loading = false
      }
    },

    async login (email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.post<LoginResponse>(`https://x8ki-letl-twmt.n7.xano.io/api:U6KB-8Fp/auth/login`, {email, password})
        this.token = res.data.authToken
        localStorage.setItem('token', this.token)
        await this.getUser()
      } catch (err: any) {
        this.error = err.response?.data?.message || err.message
      } finally {
        this.loading = false
      }
    },

    async getUser () {
      if (!this.token) return
      try {
        const res = await axios.get<User>(`https://x8ki-letl-twmt.n7.xano.io/api:U6KB-8Fp/auth/me`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.user = res.data
      } catch {
        this.logout()
      }
    },

    logout () {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
