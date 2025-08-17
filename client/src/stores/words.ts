import { defineStore } from 'pinia'
import axios from 'axios'
import type { Word, WordsState, GroupedWords } from '@/types/words'

export const useWordsStore = defineStore('words', {
  state: (): WordsState => ({
    words: [],
    loading: false,
    error: null,
  }),

  getters: {
    groupedWords: (state): GroupedWords => {
      return state.words.reduce((groups, word) => {
        if(!groups[word.group_id]) {
          groups[word.group_id] = []
        }
        groups[word.group_id].push(word)
        return groups
      }, {} as GroupedWords)
    }
  },

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
    },

    speak(word: string) {
      if(!('speechSynthesis' in window)) {
        alert("This browser doesn't support voicing")
        return
      }
      const utterance = new SpeechSynthesisUtterance(word)
      window.speechSynthesis.speak(utterance)
    }
  }
})

