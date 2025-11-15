<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { computed,watch } from 'vue'
  import { useTrainingStore } from '@/stores/training'
  import TrainingResult from './TrainingResult.vue'

  const router = useRouter()
  const trainingStore = useTrainingStore()

  const calculateRowWidth = computed(() => {
    return trainingStore.showResults.map(group => {
      return group.words.map(w => {
        const value = w.shown ? (w.correct / 3).toFixed(1) : 0
        return Number(value) * 100
      })
    })
  })

  watch(
    calculateRowWidth,
    (oldVal, newVal) => {
      console.log('oldVal', oldVal)
      console.log('newVal', newVal)
    },
    { deep: true}
  )
</script>

<template>
  <!-- <div v-for="group in trainingStore.showResults" :key="group.groupId">
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
  <br/> -->
  <div class="flex flex-col">
    <div class="flex flex-col w-full" v-for="(g, groupIndex) in trainingStore.showResults" :key="g.groupId">
    <div v-for="(w, wordIndex) in g.words" :key="w.id">
      <div
        v-if="calculateRowWidth[groupIndex][wordIndex] > 0"
        class="bg-gradient-to-r from-emerald-100 to-cyan-100 mb-3 text-white font-bold rounded-md px-2"
        :style="{ width: calculateRowWidth[groupIndex][wordIndex] + '%' }"
      >
        {{ w.word }}
      </div>
    </div>
  </div>

    <!-- <table>
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
            <td class="border border-gray-400 px-2 py-1">
            {{ w.shown ? (w.correct / 3).toFixed(1) : 0 }}
          </td>
        </tr>
      </tbody>
    </table> -->
  </div>
  <!-- <TrainingResult /> -->
</template>
