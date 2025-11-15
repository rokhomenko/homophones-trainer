import type { Word } from './words'

export interface TrainingState {
  currentGroup: number
  trainingGroups: TrainingGroup[]
  finished: boolean
  trainingQueue: TrainingQueueItem[]
  currentWordIndex: number
}

export interface WordStat {
  shown: number
  correct: number
}

export interface TrainingGroup {
  id: number
  homophones: boolean
  words: Word[]
  wordStats: WordStats
}

export type WordStats = Record<number, WordStat>

export interface TrainingQueueItem {
  word: Word
  group: TrainingGroup
}

export interface WordResult {
  id: number
  word: string
  shown: number
  correct: number
}

export interface GroupResult {
  groupId: number
  words: WordResult[]
}

export interface LearnedDuringTraining {
  userId: number
  groups: number[]
}
