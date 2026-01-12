import { defineStore } from 'pinia'
import { useGroupsStore } from './groups'
import { useWordsStore } from './words'
import { useAuthStore } from './auth'
import axios from 'axios'
import type { LearnedGroupsState, LearnedGroup } from '@/types/learned'
import type { GroupedWords } from '@/types/words'
import type { GroupWithWords } from '@/types/derived'

export const useLearnedStore = defineStore('learned', {
  state: (): LearnedGroupsState => ({
    learned_groups: [],
    learnedMap: {},
    loading: false,
    error: null,
  }),

  getters: {
    separateLearningGroups: (state) => {
      const groupStore = useGroupsStore()
      const wordsStore = useWordsStore()
      const authStore = useAuthStore()

      const userId = authStore.user?.userId
      if (!userId) return { learnedWords: [], wordsToLearn: [] }

      const learnedGroupsIds = state.learnedMap[userId] || []

      if (groupStore.groups.length === 0) {
        return { learnedWords: [], wordsToLearn: [] }
      }

      const allGroups = groupStore.groups.filter((g) => g.additionalToId === 0)

      const wordsByGroup = wordsStore.words.reduce<GroupedWords>((acc, word) => {
        const gId = word.groupId || word.groupId
        if (!acc[gId]) acc[gId] = []
        acc[gId].push(word)
        return acc
      }, {})

      const learnedWords: GroupWithWords[] = allGroups
        .filter((g) => learnedGroupsIds.includes(g.id))
        .map((g) => ({ ...g, words: wordsByGroup[g.id] || [] }))

      const wordsToLearn: GroupWithWords[] = allGroups
        .filter((g) => !learnedGroupsIds.includes(g.id))
        .map((g) => ({ ...g, words: wordsByGroup[g.id] || [] }))

      return {
        learnedWords,
        wordsToLearn,
      }
    },
  },

  actions: {
    async fetchLearned() {
      this.loading = true
      this.error = null
      try {
        const authStore = useAuthStore()
        const userId = authStore.user?.userId
        if (!userId) return

        const res = await axios.get<LearnedGroup[]>(`http://localhost:3000/learned/${userId}`, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        })

        this.learned_groups = res.data

        this.learnedMap = {
          [userId]: res.data.map((item) => item.id),
        }
      } catch (err: any) {
        this.error = err.message || 'Error fetching learned groups'
      } finally {
        this.loading = false
      }
    },
  },
})
