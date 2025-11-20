<script setup lang="ts">
  import { computed, onMounted, watch, ref } from 'vue'
  import { useWordsStore } from '@/stores/words'
  import { useGroupsStore } from '@/stores/groups'
  import { useLearnedStore } from '@/stores/learned'
  import { useTrainingStore } from '@/stores/training'
  import TrainingProgress from '@/components/training/TrainingProgress.vue'
  import { speak } from '@/utils/speak'
  //import { useSpeech } from '@/composables/useSpeech'

  const wordsStore = useWordsStore()
  const groupsStore = useGroupsStore()
  const learnedStore = useLearnedStore()
  const trainingStore = useTrainingStore()
  //const { isSpeaking, speak } = useSpeech()

  let showAnswer = ref(false)
  let answeredCurrentWord = ref(false)
  const selectedWordId = ref<number | null>(null)
  const allWordsSelected = ref(false)

  onMounted(async () => {
    await Promise.all([
      groupsStore.fetchGroups(),
      wordsStore.fetchWords(),
      learnedStore.fetchLearned()
    ])

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }

    trainingStore.initTraining()
  })

  watch(
    () => trainingStore.currentWord,
    (newWord) => {
      showAnswer.value = false
      answeredCurrentWord.value = false
      selectedWordId.value = null
      if (newWord) {
        speak(newWord.word.word)
        trainingStore.countShown()
      }
    },
    { immediate: true }
  )

  const hasNextWord = computed(() =>
    trainingStore.currentWordIndex < trainingStore.trainingQueue.length - 1
  )

  async function nextWord() {
    if(hasNextWord.value) {
      trainingStore.currentWordIndex++
    } else {
      await trainingStore.setLearned()
      trainingStore.finished = true
    }
  }

  function selectWord(wordId: number) {
    if (answeredCurrentWord.value) return

    selectedWordId.value = wordId
    answeredCurrentWord.value = true
    allWordsSelected.value = false

    if (isCurrentGroupHomophones.value) {
      trainingStore.registerAnswer(wordId, false)
      showAnswer.value = false
    } else {
      showAnswer.value = true
      const isCorrect = wordId === trainingStore.currentWord?.word.id
      trainingStore.registerAnswer(wordId, isCorrect)
    }
  }

  function selectAllWords() {
    if (answeredCurrentWord.value) return

    answeredCurrentWord.value = true
    allWordsSelected.value = true
    const currentWordId = trainingStore.currentWord?.word.id
    if (currentWordId == undefined) return

    if (isCurrentGroupHomophones.value) {
      trainingStore.registerAnswer(currentWordId, true)
      showAnswer.value = false
    } else {
      trainingStore.registerAnswer(currentWordId, false)
      showAnswer.value = true
      selectedWordId.value = currentWordId
    }
  }

  const allWordsButtonClass = computed(() => {
    if (!answeredCurrentWord.value) return ''
    if (isCurrentGroupHomophones.value) return 'bg-emerald-500'
    if (allWordsSelected.value && !isCurrentGroupHomophones.value) return 'bg-rose-600'
    return ''
  })

  const isCurrentGroupHomophones = computed(() => {
    const isGroupHomophones = trainingStore?.currentWord?.group.homophones
    return isGroupHomophones
  })

  function startNewTraining() {
    trainingStore.initTraining()
  }
</script>

<template>
  <div class="flex justify-center" v-if="trainingStore.finished">
    <button class="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl rounded-2xl py-3 sm:py-4 md:py-5 px-8 sm:px-12 md:px-20 lg:px-35 max-w-[calc(100%-30px)] text-center my-20" @click="startNewTraining">
      Start New Training
    </button>
  </div>
  <div class="flex flex-col justify-between">
    <div class="flex flex-col items-center" v-if="!trainingStore.finished">
      <!-- <div v-if="showAnswer">
        {{ trainingStore.currentWord?.word.word }}
      </div> -->
      <div class="text-slate-400 text-sm">Make it louder</div>
      <div class="text-slate-400 text-sm">Tap the speaker to hear again</div>
      <button v-if="trainingStore.currentWord?.word.word" @click="speak(trainingStore.currentWord?.word.word)" class="my-15">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10 text-slate-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
        </svg>
      </button>
      <div class="flex flex-col md:flex-row gap-5 items-center">
        <ul class="flex flex-row gap-5">
          <li
            v-for="w in trainingStore.currentWord?.group.words"
            :key="w.id"
            @click="selectWord(w.id)"
            class="flex gap-2 px-3 py-2 bg-cyan-600 text-white font-bold rounded-lg cursor-pointer w-fit transition-colors"
            :class="{
              'bg-emerald-500' : answeredCurrentWord && !isCurrentGroupHomophones && w.id === trainingStore.currentWord?.word.id,
              'bg-rose-600' : answeredCurrentWord && !allWordsSelected && (isCurrentGroupHomophones || (selectedWordId === w.id && w.id !== trainingStore.currentWord?.word.id))
            }"
          >
            {{ w.word }}
          </li>
        </ul>
        <button
          @click="selectAllWords"
          class="flex gap-2 px-3 py-2 bg-cyan-600 text-white font-bold rounded-lg cursor-pointer transition-colors"
          :class="allWordsButtonClass"
        >
          All words sound the same
        </button>
      </div>
      <button class="mb-8 mt-20 cursor-pointer text-slate-600" @click="nextWord()" :disabled="!answeredCurrentWord">
        {{ hasNextWord ? 'Next' : 'Finish' }}
      </button>
    </div>
    <TrainingProgress />
  </div>
</template>
