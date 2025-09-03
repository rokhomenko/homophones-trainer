import { defineStore } from "pinia"
import type { Word } from '@/types/words'
import type { WordStats, WordStat, TrainingState, TrainingGroup } from "@/types/training"
import type { GroupWithWords } from '@/types/derived'
import { useLearnedStore } from "./learned"


export const useTrainingStore = defineStore('training', {
  state: (): TrainingState => ({
    currentGroup: 0,
    trainingGroups: [],
    finished: false,
    wordStats: {}
  }),

  actions: {
    initTraining() {
      const learnedStore = useLearnedStore()
      const wordsToLearn = learnedStore.separateLearningGroups.wordsToLearn

      if(!wordsToLearn.length) return

      const shuffled = [...wordsToLearn].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, 3)

      this.trainingGroups = selected.map(group => {
        const wordStats: WordStats = {}
        group.words.forEach(word => {
          wordStats[word.id] = { attempts: 0, correct: 0 }
        })
        return {
          id: group.id,
          homophones: false,
          words: group.words,
          wordStats: wordStats
        }
      })
    }
  }
})


