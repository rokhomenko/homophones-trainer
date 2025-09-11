<script setup lang="ts">
  import { computed, onMounted, watch, ref } from 'vue'
  import { useWordsStore } from '@/stores/words'
  import { useGroupsStore } from '@/stores/groups'
  import { useLearnedStore } from '@/stores/learned'
  import { useTrainingStore } from '@/stores/training'
  import { speak } from '@/utils/speak'
  //import type { GroupWithWords } from '@/types/derived'

  const wordsStore = useWordsStore()
  const groupsStore = useGroupsStore()
  const learnedStore = useLearnedStore()
  const trainingStore = useTrainingStore()

  let showAnswer = ref(false)
  const selectedWordId = ref<number | null>(null)

  onMounted(async () => {
    await Promise.all([
      groupsStore.fetchGroups(),
      wordsStore.fetchWords(),
      learnedStore.fetchLearned()
    ])

    trainingStore.initTraining()
  })

  watch(
    () => trainingStore.currentWord,
    (newWord) => {
      showAnswer.value = false
      selectedWordId.value = null
      if (newWord) speak(newWord.word.word),
      { immediate: true}
    }
  )

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

  function selectWord(wordId: number) {
    selectedWordId.value = wordId
    showAnswer.value = true
  }
</script>

<template>
  <div class="flex flex-col" v-if="!trainingStore.finished">
    <button class="mb-8" @click="nextWord()" :disabled="selectedWordId === null">
      {{ hasNextWord ? 'Next' : 'Finish' }}
    </button>
    <div v-if="showAnswer">
      {{ trainingStore.currentWord?.word.word }}
    </div>
    <button v-if="trainingStore.currentWord?.word.word" @click="speak(trainingStore.currentWord?.word.word)">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
      </svg>
    </button>
    <div>
      <ul>
        <li
          v-for="w in trainingStore.currentWord?.group.words"
          :key="w.id"
          @click="selectWord(w.id)"
          :class="{
            'text-green-600 font-bold' : selectedWordId === w.id && w.id === trainingStore.currentWord?.word.id,
            'text-red-600 font-bold' : selectedWordId === w.id && w.id !== trainingStore.currentWord?.word.id
          }"
        >
          {{ w.word }}
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <div>Training is finished</div>
  </div>
</template>
