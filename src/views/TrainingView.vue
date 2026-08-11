<script setup lang="ts">
import { computed, onMounted, watch, ref, nextTick } from 'vue'
import { useWordsStore } from '@/stores/words'
import { useGroupsStore } from '@/stores/groups'
import { useLearnedStore } from '@/stores/learned'
import { useTrainingStore } from '@/stores/training'
import TrainingProgress from '@/components/training/TrainingProgress.vue'
import { speak } from '@/utils/speak'
import TrainingResult from '@/components/training/TrainingResult.vue'

const wordsStore = useWordsStore()
const groupsStore = useGroupsStore()
const learnedStore = useLearnedStore()
const trainingStore = useTrainingStore()
const isDisabled = ref(false)
const isReady = ref(false)

trainingStore.finished = false
trainingStore.trainingQueue = []
trainingStore.currentWordIndex = 0

const showAnswer = ref(false)
const answeredCurrentWord = ref(false)
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
  isReady.value = true
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
  }
)

const hasNextWord = computed(() =>
  trainingStore.currentWordIndex < trainingStore.trainingQueue.length - 1
)

async function nextWord() {
  if (hasNextWord.value) {
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
  if (isCurrentGroupHomophones.value) return 'border-[#d99165] bg-[#3a2419] text-[#f0b180]'
  if (allWordsSelected.value && !isCurrentGroupHomophones.value) return 'border-[#d99165] bg-[#3a2419] text-[#f0b180]'
  return ''
})

const isCurrentGroupHomophones = computed(() => {
  const isGroupHomophones = trainingStore?.currentWord?.group.homophones
  return isGroupHomophones
})

function startNewTraining() {
  isReady.value = false
  trainingStore.initTraining()
  nextTick(() => {
    isReady.value = true
  })
}

async function handleSpeak(word: string) {
  if (isDisabled.value) return

  isDisabled.value = true
  await speak(word)
  isDisabled.value = false
}
</script>

<template>
  <div v-if="!isReady" class="flex justify-center py-20">
    <p class="text-xl text-stone-400">wait...</p>
  </div>
  <template v-else>
    <div class="flex justify-center" v-if="trainingStore.finished">
      <div class="flex flex-col items-center">
        <TrainingResult />
        <button
          class="mt-5 mb-10 flex max-w-[calc(100%-30px)] items-center justify-center whitespace-nowrap border border-[#9e553a]/70 bg-[#241812] px-8 py-4 text-center text-lg font-black uppercase tracking-[0.18em] text-stone-100 shadow-[8px_8px_0_rgb(0_0_0/0.35)] hover:bg-[#2b1b14] sm:px-12 md:px-16 lg:mb-20 lg:mt-10 rounded-xl"
          @click="startNewTraining">
          Start New Training
        </button>
      </div>
    </div>
    <div class="flex flex-col justify-between gap-12">
      <div
        class="mx-auto flex w-full max-w-4xl flex-col items-center border border-stone-800/90 bg-[#15130f]/88 px-5 py-8 text-center shadow-[0_18px_70px_rgb(0_0_0/0.28)] rounded-[2rem] sm:px-8"
        v-if="!trainingStore.finished">
        <div class="text-xs font-semibold uppercase tracking-[0.28em] text-[#d99165]">Make it louder</div>
        <div class="mt-2 text-sm text-stone-500">Tap the speaker to hear again</div>
        <button v-if="trainingStore.currentWord?.word.word" :disabled="isDisabled"
          @click="handleSpeak(trainingStore.currentWord?.word.word)"
          class="my-14 rounded-full border border-stone-700 bg-[#0f0e0c] p-8 text-stone-200 shadow-[0_0_50px_rgb(140_63_45/0.16)] hover:border-[#9e553a] hover:text-[#d99165] disabled:opacity-50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-12">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
          </svg>
        </button>
        <div class="flex flex-col items-center gap-5 md:flex-row">
          <ul class="flex flex-row flex-wrap justify-center gap-3">
            <li v-for="w in trainingStore.currentWord?.group.words" :key="w.id" @click="selectWord(w.id)"
              class="flex w-fit cursor-pointer gap-2 border border-stone-700 bg-[#0f0e0c] px-4 py-3 font-bold text-stone-100 transition-colors hover:border-[#9e553a] hover:text-[#d99165] rounded-xl"
              :class="{
                'border-[#6f7d5a] bg-[#1f281c] text-[#c9d7a5]': answeredCurrentWord && !isCurrentGroupHomophones && w.id === trainingStore.currentWord?.word.id,
                'border-[#d99165] bg-[#3a2419] text-[#f0b180]': answeredCurrentWord && !allWordsSelected && (isCurrentGroupHomophones || (selectedWordId === w.id && w.id !== trainingStore.currentWord?.word.id))
              }">
              {{ w.word }}
            </li>
          </ul>
          <button @click="selectAllWords"
            class="flex cursor-pointer gap-2 border border-stone-700 bg-[#0f0e0c] px-4 py-3 font-bold text-stone-100 transition-colors hover:border-[#9e553a] hover:text-[#d99165] rounded-xl"
            :class="allWordsButtonClass">
            All words sound the same
          </button>
        </div>
        <button
          class="mb-2 mt-16 cursor-pointer text-sm font-black uppercase tracking-[0.24em] text-stone-300 hover:text-[#d99165] disabled:cursor-not-allowed disabled:opacity-30"
          @click="nextWord()" :disabled="!answeredCurrentWord">
          {{ hasNextWord ? 'Next' : 'Finish' }}
        </button>
      </div>
      <TrainingProgress />
    </div>
  </template>
</template>
