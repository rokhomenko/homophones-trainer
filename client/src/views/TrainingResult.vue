<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router';
  import { useTrainingStore } from '@/stores/training';

  const router = useRouter()
  const trainingStore = useTrainingStore()

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
  function startNewTraining() {
    trainingStore.initTraining()
    router.push('/training')
  }
</script>

<template>
  <div>Training is finished</div>
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
  <button @click="startNewTraining">Start new training</button>
</template>
