import { defineStore } from 'pinia'
import { getErrorMessage } from '@/utils/errorHandler'
import { api } from '@/api/axios'
import type { Group, GroupsState } from '@/types/groups'

export const useGroupsStore = defineStore('groups', {
  state: (): GroupsState => ({
    groups: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchGroups() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get<Group[]>('/words/groups')
        this.groups = res.data
      } catch (error) {
        this.error = getErrorMessage(error, 'Error fetching groups')
      } finally {
        this.loading = false
      }
    },
  },
})
