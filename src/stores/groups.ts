import { defineStore } from 'pinia'
import axios from 'axios'
import type { Group, GroupsState } from '@/types/groups'

export const useGroupsStore = defineStore('groups', {
  state: (): GroupsState => ({
    groups: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchGroups() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get<Group[]>('https://x8ki-letl-twmt.n7.xano.io/api:PKgvb2gt/groups')
        this.groups = res.data
      } catch (err: any) {
        this.error = err.message || 'Error fetching groups'
      } finally {
        this.loading = false
      }
    }
  }
})
