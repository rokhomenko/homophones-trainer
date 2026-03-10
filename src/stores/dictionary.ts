import { defineStore } from 'pinia'
import type { Group } from '@/types/groups'

export const useDictionaryStore = defineStore('dictionary', {
  state: () => ({
    dictionaryWords: {
      homophonesGroup: [] as Group[],
      nonHomophonesGroup: [] as Group[],
    },
  }),

  actions: {
    setDictionaryGroups(groups: Group[]) {
      this.dictionaryWords.homophonesGroup = groups.filter((g) => g.homophones)
      this.dictionaryWords.nonHomophonesGroup = groups.filter((g) => !g.homophones)
    },
  },
})
