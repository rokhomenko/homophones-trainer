export interface User {
  userId: number
  email: string
  createdAt: string
}

export interface LoginResponse {
  authToken: string
}

export interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}
