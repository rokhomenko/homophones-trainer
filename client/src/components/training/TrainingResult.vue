<script setup lang="ts">
  import { useTrainingStore } from '@/stores/training'
  
  const trainingStore = useTrainingStore()
</script>

<template>
  <div @click="trainingStore.setLearned">setLearned</div>
</template>
