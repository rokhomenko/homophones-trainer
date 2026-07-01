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
      class="flex justify-center items-center flex-col w-ful text-gray-800 rounded-lg">
      <div class="my-3 lg:my-5 text-center">Congratulations! You have successfully learned these groups of words:</div>
      <div v-for="group in filterSuccessfulGroups" :key="group.groupId" class="flex flex-row gap-2">
        <div v-for="word in group.words" :key="word.word"
          class="flex my-2 md:my-1 gap-2 px-3 py-1 border border-gray-400 rounded-lg shadow-sm cursor-pointe">
          {{ word.word }}
        </div>
      </div>
    </div>
    <div class="mt-3 mb-5 lg:mt-5 lg:mb-8 text-center flex-col w-ful text-gray-800 rounded-lg" v-else>You don't have any
      learned words yet.</div>
  </div>
</template>
