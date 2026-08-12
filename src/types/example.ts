export interface ExamplePair {
  words: string[]
  homophones: boolean
  play: number
}

export interface PairState {
  played: boolean
  playedIndex: number
  answered: boolean
  selected: number | 'all' | null
  isSpeaking: boolean
  animating: boolean
}
