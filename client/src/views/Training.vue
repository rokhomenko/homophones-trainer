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

  const hasNextWord = computed(() =>
    trainingStore.currentWordIndex < trainingStore.trainingQueue.length - 1
  )

  function nextWord() {
      if(hasNextWord.value) {
        trainingStore.currentWordIndex++
      } else {
        trainingStore.finished = true
      }
    }
</script>

<template>
  <div v-if="!trainingStore.finished">
    <button @click="nextWord()">
      {{ hasNextWord ? 'Next' : 'Finish' }}
    </button>
    <div>
      {{ trainingStore.currentWord?.word.word }}
    </div>
    <div>
      <ul>
        <li v-for="w in trainingStore.currentWord?.group.words" :key="w.id">
          {{ w.word }}
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <div>Training is finished</div>
  </div>
</template>
