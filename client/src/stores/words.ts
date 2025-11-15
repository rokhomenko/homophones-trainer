import { defineStore } from 'pinia'
import axios from 'axios'
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
        const res = await axios.get<Word[]>('https://x8ki-letl-twmt.n7.xano.io/api:PKgvb2gt/words')
        this.words = res.data
      } catch (err: any) {
        this.error = err.message || 'Error loading words'
      } finally {
        this.loading = false
      }
    }
  }
})

