export interface Word {
  id: number
  created_at: number
  group_id: number
  word: string
}

export interface WordsState {
  words: Word[]
  loading: boolean
  error: string | null
}

export type GroupedWords = Record<number, Word[]>
