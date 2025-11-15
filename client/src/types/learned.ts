export interface LearnedGroup {
  id: number
  created_at: number
  user_id: number
  group_id: number
}

export interface LearnedGroupsState {
  learned_groups: LearnedGroup[]
  learnedMap: Record<number, number[]>
  loading: boolean
  error: string | null
}
