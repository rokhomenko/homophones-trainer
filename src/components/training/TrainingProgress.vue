<script setup lang="ts">
import { computed } from 'vue'
import { useTrainingStore } from '@/stores/training'

const trainingStore = useTrainingStore()

const calculateRowWidth = computed(() => {
  return trainingStore.showResults.map(group => {
    return group.words.map(w => {
      const value = w.shown ? (w.correct / 3).toFixed(1) : 0
      return Number(value) * 100
    })
  })
})
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col w-full" v-for="(g, groupIndex) in trainingStore.showResults" :key="g.groupId">
      <div v-for="(w, wordIndex) in g.words" :key="w.id">
        <div v-if="calculateRowWidth[groupIndex][wordIndex] > 0"
          class="bg-gradient-to-r from-gray-600 to-gray-900 mb-3 text-white font-bold rounded-md shadow-sm px-2"
          :style="{ width: calculateRowWidth[groupIndex][wordIndex] + '%' }">
          {{ w.word }}
        </div>
      </div>
    </div>
  </div>
</template>
