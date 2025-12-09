export interface Group {
  id: number
  created_at: number
  homophones: boolean
  additional_to_id: number
}

export interface GroupsState {
  groups: Group[]
  loading: boolean
  error: string | null
}

