import { defineStore } from "pinia"
import { useGroupsStore } from "./groups"
import { useWordsStore } from "./words"
import { useAuthStore } from "./auth"
import axios from 'axios'
import type { LearnedGroupsState, LearnedGroup } from "@/types/learned"
import type { GroupedWords } from "@/types/words"
import type { GroupWithWords } from '@/types/derived'

export const useLearnedStore = defineStore('learned', {
  state: (): LearnedGroupsState => ({
    learned_groups: [],
    learnedMap: {},
    loading: false,
    error: null
  }),

  getters: {
    separateLearningGroups: (state): {learnedWords: GroupWithWords[], wordsToLearn: GroupWithWords[]} => {
      const groupStore = useGroupsStore()
      const wordsStore = useWordsStore()
      const authStore = useAuthStore()
      if (!authStore.user) {
        throw Error('User must be authenticated to access learning groups')
      }
      const userId = authStore.user.id

      const allGroups = groupStore.groups.filter(g => g.additional_to_id === 0)

      const wordsByGroup = wordsStore.words.reduce((acc, word) => {
        if(!acc[word.group_id]) acc[word.group_id] = []
        acc[word.group_id].push(word)
        return acc
      }, {} as GroupedWords)

      const learnedGroupsId = state.learnedMap[userId] || []

      const learnedWords = allGroups
        .filter(g => learnedGroupsId.includes(g.id))
        .map(g => ({
          ...g,
          words: wordsByGroup[g.id] || []
        }))

      const wordsToLearn = allGroups
        .filter(g => !learnedGroupsId.includes(g.id))
        .map(g => ({
          ...g,
          words: wordsByGroup[g.id] || []
        }))

        return {
          learnedWords,
          wordsToLearn
        }
    }
  },

  actions: {
    async fetchLearned() {
      this.loading = true
      this.error = null
      try {
        const authStore = useAuthStore()
        if (!authStore.user) throw new Error("User not authenticated")

        const userId = authStore.user.id

        const res = await axios.get<LearnedGroup[]>(
          'https://x8ki-letl-twmt.n7.xano.io/api:PKgvb2gt/get_by_user',
          {
            params: {
              user_id: userId
            },
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }

        )

        this.learned_groups = res.data

        this.learnedMap = {
          [userId]: res.data.map(item => item.group_id)
        }
      } catch (err: any) {
        this.error = err.message || 'Error fetching learned groups'
      } finally {
        this.loading = false
      }
    }
  }
})
