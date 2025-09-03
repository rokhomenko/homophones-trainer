<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { useWordsStore } from '@/stores/words'
  import { useGroupsStore } from '@/stores/groups'
  import { useLearnedStore } from '@/stores/learned'
  import { useTrainingStore } from '@/stores/training'
  //import type { GroupWithWords } from '@/types/derived'

  const wordsStore = useWordsStore()
  const groupsStore = useGroupsStore()
  const learnedStore = useLearnedStore()
  const trainingStore = useTrainingStore()

  onMounted(async () => {
    await Promise.all([
      groupsStore.fetchGroups(),
      wordsStore.fetchWords(),
      learnedStore.fetchLearned()
    ])

    trainingStore.initTraining()
  })
</script>

<template>
  <div>
    <ul
      v-for="group in trainingStore.trainingGroups"
      :key="group.id"
    >
      <li
        v-for="word in group.words"
        :key="group.id"
      >
        {{ word.word }}
      </li>
    </ul>
  </div>
</template>
