import type { Word } from './words'

export interface Group {
  id: number
  created_at: number
  homophones: boolean
  additionalToId: number
  words?: Word[]
}

export interface GroupsState {
  groups: Group[]
  loading: boolean
  error: string | null
}
