<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useTrainingStore } from '@/stores/training'
  import TrainingResult from './TrainingResult.vue'

  const router = useRouter()
  const trainingStore = useTrainingStore()
</script>

<template>
  <div v-for="group in trainingStore.showResults" :key="group.groupId">
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
  <TrainingResult />
</template>
