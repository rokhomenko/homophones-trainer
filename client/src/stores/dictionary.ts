import { defineStore } from "pinia"
import { useGroupsStore } from "./groups"
import { useWordsStore } from "./words"
import type { GroupedWords } from '@/types/words'

export const useDictionaryStore = defineStore('dictionary', {
  getters: {
    dictionaryWords() {
      const groupsStore = useGroupsStore();
      const wordsStore = useWordsStore();

      const fullGroups = groupsStore.groups.filter(g => g.additional_to_id === 0)

      const wordsByGroup = wordsStore.words.reduce((acc, word) => {
        if(!acc[word.group_id]) acc[word.group_id] = []
        acc[word.group_id].push(word)
        return acc
      }, {} as GroupedWords)

      const homophonesGroup = fullGroups
        .filter(g => g.homophones)
        .map(g => ({
          ...g,
          words: wordsByGroup[g.id] || []
        }))

      const nonHomophonesGroup = fullGroups
        .filter(g => !g.homophones)
        .map(g => ({
          ...g,
          words: wordsByGroup[g.id] || []
        }))

        return {
          homophonesGroup,
          nonHomophonesGroup
        }
    }
  }
})
