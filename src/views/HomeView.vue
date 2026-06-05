<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useWordsStore } from '@/stores/words'
import { useGroupsStore } from '@/stores/groups'
import { useDictionaryStore } from '@/stores/dictionary'
import { speak } from '@/utils/speak'

const wordsStore = useWordsStore()
const groupsStore = useGroupsStore()
const dictionaryStore = useDictionaryStore()
const isLoading = ref(true)

onMounted(async () => {
  await groupsStore.fetchGroups()
  dictionaryStore.setDictionaryGroups(groupsStore.groups)

  await wordsStore.fetchWords()

  isLoading.value = false
})

const homophonesGroup = computed(() => dictionaryStore.dictionaryWords.homophonesGroup)
const nonHomophonesGroup = computed(() => dictionaryStore.dictionaryWords.nonHomophonesGroup)
const isDisabled = ref(false)

const showAllHomophones = ref(false)
const showAllNonHomophones = ref(false)
const isMobile = ref(window.innerWidth < 768)

const updateMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  window.addEventListener('resize', updateMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateMobile)
})

const limitedHomophonesGroup = computed(() => {
  return isMobile.value && !showAllHomophones.value
    ? homophonesGroup.value?.slice(0, 5)
    : homophonesGroup.value
})

const limitedNonHomophonesGroup = computed(() => {
  return isMobile.value && !showAllNonHomophones.value
    ? nonHomophonesGroup.value?.slice(0, 5)
    : nonHomophonesGroup.value
})

async function handleSpeak(word: string) {
  if (isDisabled.value) return

  isDisabled.value = true
  await speak(word)
  isDisabled.value = false
}
</script>

<template>
  <div class="flex flex-col">
    <div
      class="flex flex-col justify-center items-center mt-1 md:mt-5 lg:mt-7 mb-5 sm:mb-2 md:mb-5 lg:mb-7 text-cyan-800 opacity-80">
      <div>
        <p class="mb-2">
          Do you hear the difference between the words below? Sometimes yes, sometimes no, and
          sometimes there's no difference at all — because they genuinely sound the same.
        </p>
        <p class="mb-2">
          This app might not be useful for native speakers or those with an English level of C1 and
          above. But for anyone who recently wondered how to correctly pronounce "beach" versus...
          well, you know... this is for you.
        </p>
        <p class="mb-2">
          <span class="text-md text-lg"><b>What are Homophones?</b></span>
          They are words that truly sound alike, even though they are distinct words (like two, to,
          and too).
        </p>
        <p class="mb-3">
          I've also included a group of Non-Homophones in the app. These are words that sound
          different, but it’s not always obvious how to pronounce them correctly.
        </p>
      </div>
      <div
        class="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl rounded-2xl py-3 sm:py-4 md:py-5 px-8 md:my-5 sm:px-12 md:px-20 lg:px-35 max-w-[calc(100%-30px)] text-center">
        <router-link to="/training" class="inline-block">Go train</router-link>
      </div>
      <div class="self-start">
        <p class="my-2 w-full">
          Create an account to start training and see your progress as you learn new words.
        </p>
      </div>
    </div>
    <div class="flex flex-col md:flex-row justify-center gap-10 items-start">
      <section class="flex flex-col w-full md:w-2/3 lg:w-1/2 bg-cyan-50 text-cyan-800 rounded-lg">
        <h2
          class="flex justify-center items-center text-xl w-full h-15 bg-gradient-to-b text-teal-900 from-teal-300 via-teal-400 to-teal-400 rounded-t-lg">
          Homophones Group
        </h2>
        <div class="flex flex-col mt-3 mb-2 lg:mt-7 lg:mb-5 max-[400px]:text-sm">
          <div v-if="isLoading" class="flex justify-center py-10">
            <p class="text-cyan-800 text-xl">wait...</p>
          </div>
          <ul v-for="group in limitedHomophonesGroup" :key="group.id"
            class="flex flex-row gap-x-5 items-center justify-center p-y-2 flex-wrap">
            <li v-for="word in group.words" :key="word.id" :disabled="isDisabled" @click="handleSpeak(word.word)"
              class="flex my-2 md:my-3 gap-2 px-3 py-2 border border-dotted border-teal-400 rounded-lg cursor-pointer items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
              <span>{{ word.word }}</span>
            </li>
          </ul>
          <button v-if="homophonesGroup?.length > 5 && !showAllHomophones && isMobile" @click="showAllHomophones = true"
            class="flex my-2 md:my-3 gap-2 px-3 py-2 cursor-pointer items-center self-center text-teal-400">
            Show all
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </section>
      <section class="flex flex-col w-full md:w-2/3 lg:w-1/2 bg-cyan-50 text-cyan-800 rounded-lg">
        <h2
          class="flex justify-center items-center text-xl w-full h-15 bg-gradient-to-b text-teal-900 from-teal-300 via-teal-400 to-teal-400 rounded-t-lg">
          Non-Homophones Group
        </h2>
        <div class="flex flex-col mt-3 mb-2 lg:mt-7 lg:mb-5 max-[400px]:text-sm">
          <div v-if="isLoading" class="flex justify-center py-10">
            <p class="text-cyan-800 text-xl">wait...</p>
          </div>
          <ul v-for="group in limitedNonHomophonesGroup" :key="group.id"
            class="flex flex-row gap-x-5 items-center justify-center p-y-2 flex-wrap">
            <li v-for="word in group.words" :key="word.id" :disabled="isDisabled" @click="handleSpeak(word.word)"
              class="flex my-2 md:my-3 gap-2 px-3 py-2 border border-dotted border-teal-400 rounded-lg cursor-pointer items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
              <span>{{ word.word }}</span>
            </li>
          </ul>
          <button v-if="nonHomophonesGroup?.length > 5 && !showAllNonHomophones && isMobile"
            @click="showAllNonHomophones = true"
            class="flex my-2 md:my-3 gap-2 px-3 py-2 cursor-pointer items-center self-center text-teal-400">
            Show all
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
