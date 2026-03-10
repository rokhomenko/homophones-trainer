export interface User {
  userId: number
  email: string
  createdAt?: string
}

export interface LoginResponse {
  accessToken: string
  userId: number
  email: string
}

export interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}
