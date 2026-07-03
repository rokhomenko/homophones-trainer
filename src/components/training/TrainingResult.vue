<script setup lang="ts">
import { computed } from 'vue'
import { useTrainingStore } from '@/stores/training'

const trainingStore = useTrainingStore()

const filterSuccessfulGroups = computed(() => {
  if (!trainingStore.successfulGroups.length) return
  return trainingStore.showResults.filter(group => trainingStore.successfulGroups.includes(group.groupId))
})

</script>

<template>
  <div v-if="trainingStore.finished">
    <div v-if="trainingStore.successfulGroups.length"
      class="flex flex-col items-center justify-center rounded-[1.5rem] border border-stone-800/90 bg-[#15130f]/88 p-6 text-stone-200 shadow-[0_18px_60px_rgb(0_0_0/0.25)]">
      <div class="my-3 text-center text-sm uppercase tracking-[0.2em] text-stone-400 lg:my-5">Congratulations! You have successfully learned these groups of words:</div>
      <div v-for="group in filterSuccessfulGroups" :key="group.groupId" class="flex flex-row flex-wrap justify-center gap-2">
        <div v-for="word in group.words" :key="word.word"
          class="my-2 flex gap-2 border border-dashed border-stone-700 bg-[#0f0e0c] px-3 py-1 text-stone-200 rounded-xl md:my-1">
          {{ word.word }}
        </div>
      </div>
    </div>
    <div class="mt-3 mb-5 flex-col rounded-[1.5rem] border border-stone-800/90 bg-[#15130f]/88 p-6 text-center text-stone-400 lg:mb-8 lg:mt-5" v-else>You don't have any
      learned words yet.</div>
  </div>
</template>
