import type { Word } from './words'

export interface TrainingState {
  currentGroup: number
  trainingGroups: TrainingGroup[]
  finished: boolean
  wordStats: WordStats
}

export interface WordStat {
  attempts: number
  correct: number
}

export interface TrainingGroup {
  id: number
  homophones: boolean
  words: Word[]
  wordStats: WordStats
}

export type WordStats = Record<number, WordStat>
