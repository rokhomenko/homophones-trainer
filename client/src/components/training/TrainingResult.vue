<script setup lang="ts">
  import { useTrainingStore } from '@/stores/training'

  const trainingStore = useTrainingStore()

</script>

<template>
  <div v-if="trainingStore.finished">
    <div>{{ trainingStore.successfulGroups }}</div>
    <div>Try again:</div>
  </div>
</template>
