export interface User {
  userId: number
  email: string
  createdAt?: string
}

export interface LoginResponse {
  userId: number
  email: string
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}
