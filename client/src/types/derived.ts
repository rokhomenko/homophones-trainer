import type { Group } from './groups'
import type { Word } from './words'

export interface GroupWithWords extends Group {
  words: Word[]
}

