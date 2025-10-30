<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router';
  import { useTrainingStore } from '@/stores/training';
  import { useAuthStore } from '@/stores/auth';

  const router = useRouter()
  const trainingStore = useTrainingStore()
  const authStore = useAuthStore()

  const showResults = computed(() => {
    return trainingStore.trainingGroups.map(group => {
      return {
        groupId: group.id,
        words: group.words.map(w => {
          const stat = group.wordStats[w.id]
          return {
            id: w.id,
            word: w.word,
            shown: stat?.shown ?? 0,
            correct: stat?.correct ?? 0
          }
        })
      }
    })
  })

  function setLearned() {
    if (authStore.user && authStore.user.id !== null) {
      console.log('user', authStore.user.id)
    }
  }

  function findSuccessfulGroups() {
    const successfulGroups = showResults.value
      .filter(group =>
        group.words.every(w => w.correct === 3)
      )
      .map(group => group.groupId)
      console.log('success grs', successfulGroups)
      return successfulGroups
  }
</script>

<template>
  <div v-for="group in showResults" :key="group.groupId">
    <table>
      <thead>
        <tr>
          <th class="border border-gray-400 px-2 py-1">Word</th>
          <th class="border border-gray-400 px-2 py-1">Correct</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="w in group.words" :key="w.id">
          <td class="border border-gray-400 px-2 py-1">{{ w.word }}</td>
          <td class="border border-gray-400 px-2 py-1">{{ w.correct }} of {{ w.shown }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div @click="setLearned">setLearned</div>
  <div @click="findSuccessfulGroups">successfulGroups</div>
</template>
