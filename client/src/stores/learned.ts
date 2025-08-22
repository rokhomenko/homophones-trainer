import { defineStore } from "pinia"
import axios from 'axios'
import type { LearnedGroupsState, LearnedGroup } from "@/types/learned"

export const useLearnedsStore = defineStore('learned', {
  state: (): LearnedGroupsState => ({
    learned_groups: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchLearned() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get<LearnedGroup[]>('https://x8ki-letl-twmt.n7.xano.io/api:PKgvb2gt/learned_groups')
        this.learned_groups = res.data
      } catch (err: any) {
        this.error = err.message || 'Error fetching learned groups'
      } finally {
        this.loading = false
      }
    }
  }
})
