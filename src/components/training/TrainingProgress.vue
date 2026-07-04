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
  <div class="flex flex-col rounded-[1.5rem] border border-stone-800/90 bg-[#15130f]/72 p-4 shadow-[0_18px_60px_rgb(0_0_0/0.2)]">
    <div class="flex w-full flex-col" v-for="(g, groupIndex) in trainingStore.showResults" :key="g.groupId">
      <div v-for="(w, wordIndex) in g.words" :key="w.id">
        <div v-if="calculateRowWidth[groupIndex][wordIndex] > 0"
          class="mb-3 border border-[#9e553a]/35 bg-gradient-to-r from-[#3a2419] to-[#161411] px-3 py-1 text-sm font-bold text-stone-100 rounded-xl"
          :style="{ width: calculateRowWidth[groupIndex][wordIndex] + '%' }">
          {{ w.word }}
        </div>
      </div>
    </div>
  </div>
</template>
