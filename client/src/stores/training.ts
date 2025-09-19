import { defineStore } from "pinia"
import type { Word } from '@/types/words'
import type { WordStats, WordStat, TrainingState, TrainingGroup, TrainingQueueItem } from "@/types/training"
import type { GroupWithWords } from '@/types/derived'
import { useLearnedStore } from "./learned"


export const useTrainingStore = defineStore('training', {
  state: (): TrainingState => ({
    currentGroup: 0,
    trainingGroups: [],
    finished: false,
    trainingQueue: [],
    currentWordIndex: 0
  }),

  getters: {
    currentWord(state): TrainingQueueItem | null {
      return state.trainingQueue[state.currentWordIndex] ?? null
    }
  },

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
          homophones: group.homophones,
          words: group.words,
          wordStats: wordStats
        } as TrainingGroup
      })

      const queue: TrainingQueueItem[] = []
      this.trainingGroups.forEach(group => {
        group.words.forEach(word => {
          for (let i = 0; i < 3; i++) {
            queue.push({word, group})
          }
        })
      })

      this.trainingQueue = queue.sort(() => Math.random() - 0.5)
      this.currentWordIndex = 0
      this.finished = false
    },

    registerAnswer(wordId: number, isCorrect: boolean) {
      const currentItem = this.currentWord
      if (!currentItem) return

      const stats = currentItem.group.wordStats[wordId]
      if (!stats) return

      stats.attempts++
      if (isCorrect) {
        stats.correct++
      }
    }
  }
})


