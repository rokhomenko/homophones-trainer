import { defineStore } from 'pinia'
import { getErrorMessage } from '@/utils/errorHandler'
import { api } from '@/api/axios'
import type { Word, WordsState } from '@/types/words'

export const useWordsStore = defineStore('words', {
  state: (): WordsState => ({
    words: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchWords() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get<Word[]>('/words')
        this.words = res.data
      } catch (error) {
        this.error = getErrorMessage(error, 'Error loading words')
      } finally {
        this.loading = false
      }
    },
  },
})
