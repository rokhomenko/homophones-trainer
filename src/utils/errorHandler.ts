import axios from 'axios'

export function getErrorMessage(error: unknown, fallback = 'Unexpected token') {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}
