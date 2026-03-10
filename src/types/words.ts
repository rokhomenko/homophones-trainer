export interface Word {
  id: number
  created_at: number
  groupId: number
  word: string
}

export interface WordsState {
  words: Word[]
  loading: boolean
  error: string | null
}

export type GroupedWords = Record<number, Word[]>
