import { defineStore } from "pinia"
import axios from 'axios'
import type { Word } from '@/types/words'
import type { WordStats, WordStat, TrainingState, TrainingGroup, TrainingQueueItem, GroupResult, LearnedDuringTraining } from "@/types/training"
import type { GroupWithWords } from '@/types/derived'
import { useLearnedStore } from "./learned"
import { useAuthStore } from './auth'


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
    },
    
    showResults(state): GroupResult[] {
      return state.trainingGroups.map(group => ({
        groupId: group.id,
        words: group.words.map(w => {
          const stat = group.wordStats[w.id]
          return {
            id: w.id,
            word: w.word,
            shown: stat?.shown ?? 0,
            correct: stat?.correct ?? 0
          }
        })
      }))
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
          wordStats[word.id] = { shown: 0, correct: 0 }
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

      if(isCorrect) {
        return stats.correct++
      }
    },

    countShown() {
      const currentWord = this.currentWord
      if (!currentWord) return

      const stats = currentWord.group.wordStats[currentWord.word.id]
      stats.shown++
    },

    async updateLearned(groupIds: number[]) {
      const authStore = useAuthStore()
      const userId = authStore.user?.id
      if (!userId) return console.warn('No user ID found')

      try {
        const requests = groupIds.map(groupId =>
          axios.post<LearnedDuringTraining>(`https://x8ki-letl-twmt.n7.xano.io/api:PKgvb2gt/learned_groups`, {
            user_id: userId,
            group_id: groupId
          })
        )
        const responses = await Promise.allSettled(requests)
        console.log('responses', responses)
        return responses
      } catch (error) {
        console.error('Error updating learned groups:', error)
        throw error
      }
    },

    async setLearned() {
      const successfulGroups = this.showResults
        .filter(group =>
          group.words.every(w => w.correct >= 3)
        )
        .map(group => group.groupId)
        
      if (!successfulGroups.length) return console.log('No successful groups')
      return await this.updateLearned(successfulGroups)
    }
  }
})


