export interface User {
  id: number
  email: string
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
