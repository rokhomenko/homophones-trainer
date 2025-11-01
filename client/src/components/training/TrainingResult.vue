<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  import type { GroupResult, LearnedDuringTraining } from '@/types/training'
  import axios from 'axios'

  const authStore = useAuthStore()

  const props = defineProps<{
    showResults: GroupResult[]
  }>()

  async function setLearned() {
    const userId = authStore.user?.id
    if (!userId) return console.warn('No user ID found')
    const successfulGroups = props.showResults
      .filter(group =>
        group.words.every(w => w.correct === 3)
      )
      .map(group => group.groupId)
    if (!successfulGroups.length) return console.log('No successful groups')
    await updateLearned(userId, successfulGroups)
  }

  async function updateLearned(userId: number, groupIds: number[]) {
    try {
      const requests = groupIds.map(groupId =>
        axios.post<LearnedDuringTraining>(`https://x8ki-letl-twmt.n7.xano.io/api:PKgvb2gt/learned_groups`, {
          user_id: userId,
          group_id: groupId
        })
      )
      const responses = await Promise.allSettled(requests)
      console.log('responses', responses)
    } catch (error) {
      console.error('Error updating learned groups:', error)
    }
  }
</script>

<template>
  <div @click="setLearned">setLearned</div>
</template>
