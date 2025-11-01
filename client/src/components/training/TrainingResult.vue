<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  import { useTrainingStore } from '@/stores/training'
  import type { GroupResult } from '@/types/training'

  const authStore = useAuthStore()
  const trainingStore = useTrainingStore()

  const props = defineProps<{
    showResults: GroupResult[]
  }>()

  function setLearned() {
    if (authStore.user && authStore.user.id !== null) {
      console.log('user', authStore.user.id)
    }
  }

  function findSuccessfulGroups() {
    const successfulGroups = props.showResults
      .filter(group =>
        group.words.every(w => w.correct === 3)
      )
      .map(group => group.groupId)
      console.log('success grs', successfulGroups)
      return successfulGroups
  }

  // зробити post запит
  // створити модалку і кнопку для повторного виклику

  /* function updateLearned(userId: number, groupIds: number[]) {
      if () {

      }

      try {

      } catch {

      }
    } */
</script>

<template>
  <div @click="setLearned">setLearned</div>
  <div @click="findSuccessfulGroups">successfulGroups</div>
</template>
