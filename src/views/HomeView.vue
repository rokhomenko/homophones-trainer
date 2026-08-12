<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useWordsStore } from '@/stores/words'
import { useGroupsStore } from '@/stores/groups'
import { useDictionaryStore } from '@/stores/dictionary'
import { speak } from '@/utils/speak'
import TrainingExample from '@/components/training/TrainingExample.vue'

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

function handleSpeak(word: string) {
  speak(word)
}
</script>

<template>
  <div class="flex flex-col gap-10">
    <section
      class="relative overflow-hidden border border-stone-800/90 bg-[#161411]/82 px-5 py-8 shadow-[0_24px_90px_rgb(0_0_0/0.28)] rounded-[2rem] sm:px-8 lg:px-12">
      <div class="absolute -right-20 -top-28 h-64 w-64 rounded-full bg-[#8c3f2d]/15 blur-3xl"></div>
      <div class="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div class="max-w-3xl text-stone-300">
          <p class="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#d99165]">ear training / no
            echolocation required</p>
          <h2 class="mb-6 text-4xl font-black tracking-[-0.06em] text-stone-100 sm:text-6xl">Hear the crack between
            almost identical words.</h2>
          <p class="mb-3 leading-7">
            Do you hear the difference between the words below? Sometimes yes, sometimes no, and
            sometimes there's no difference at all — because they genuinely sound the same.
          </p>
          <p class="mb-3 leading-7">
            This app might not be useful for native speakers or those with an English level of C1 and
            above. But for anyone who recently wondered how to correctly pronounce "beach" versus...
            well, you know... then this is for you.
          </p>
          <p class="mb-3 leading-7">
            <span class="mr-2 font-bold text-stone-100">What are Homophones?</span>
            They are words that truly sound alike, even though they are distinct words (like two, to,
            and too).
          </p>
          <p class="leading-7">
            I've also included a group of Non-Homophones in the app. These are words that sound
            different, but it’s not always obvious how to pronounce them correctly.
          </p>
        </div>
        <div class="flex flex-col gap-6 lg:h-full">
          <TrainingExample />
          <div class="flex flex-col gap-5 border-l border-stone-700/70 pl-5 text-stone-300 lg:mt-auto">
            <router-link to="/training"
              class="inline-flex w-fit items-center gap-3 border border-[#9e553a]/70 bg-[#241812] px-7 py-4 text-lg font-black uppercase tracking-[0.22em] text-stone-100 shadow-[8px_8px_0_rgb(0_0_0/0.35)] hover:bg-[#2b1b14] hover:text-[#f0b180] sm:text-xl">
              Go train
            </router-link>
            <p class="max-w-sm text-sm leading-6 text-stone-400">
              Create an account to start training and see your progress as you learn how to pronounce words correctly.
            </p>
          </div>
        </div>
      </div>
    </section>
    <div class="grid gap-6 lg:grid-cols-2">
      <section
        class="flex flex-col overflow-hidden border border-stone-800/90 bg-[#15130f]/88 text-stone-200 shadow-[0_18px_60px_rgb(0_0_0/0.25)] rounded-[1.5rem]">
        <h2
          class="border-b border-stone-800 bg-stone-950/35 px-5 py-4 text-sm font-black uppercase tracking-[0.24em] text-stone-300">
          Homophones Group
        </h2>
        <div class="flex flex-col px-4 py-5 max-[400px]:text-sm sm:px-6">
          <div v-if="isLoading" class="flex justify-center py-10">
            <p class="text-xl text-stone-400">wait...</p>
          </div>
          <ul v-for="group in limitedHomophonesGroup" :key="group.id"
            class="flex flex-row flex-wrap items-center justify-center gap-x-4">
            <li v-for="word in group.words" :key="word.id" @click="handleSpeak(word.word)"
              class="my-2 flex cursor-pointer items-center gap-2 border border-dashed border-stone-700 bg-[#0f0e0c] px-3 py-2 text-stone-200 hover:border-[#9e553a] hover:text-[#d99165] md:my-3 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
              <span>{{ word.word }}</span>
            </li>
          </ul>
          <button v-if="homophonesGroup?.length > 5 && !showAllHomophones && isMobile" @click="showAllHomophones = true"
            class="my-2 flex cursor-pointer items-center gap-2 self-center px-3 py-2 text-stone-400 hover:text-[#d99165] md:my-3">
            Show all
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </section>
      <section
        class="flex flex-col overflow-hidden border border-stone-800/90 bg-[#15130f]/88 text-stone-200 shadow-[0_18px_60px_rgb(0_0_0/0.25)] rounded-[1.5rem]">
        <h2
          class="border-b border-stone-800 bg-stone-950/35 px-5 py-4 text-sm font-black uppercase tracking-[0.24em] text-stone-300">
          Non-Homophones Group
        </h2>
        <div class="flex flex-col px-4 py-5 max-[400px]:text-sm sm:px-6">
          <div v-if="isLoading" class="flex justify-center py-10">
            <p class="text-xl text-stone-400">wait...</p>
          </div>
          <ul v-for="group in limitedNonHomophonesGroup" :key="group.id"
            class="flex flex-row flex-wrap items-center justify-center gap-x-4">
            <li v-for="word in group.words" :key="word.id" @click="handleSpeak(word.word)"
              class="my-2 flex cursor-pointer items-center gap-2 border border-dashed border-stone-700 bg-[#0f0e0c] px-3 py-2 text-stone-200 hover:border-[#9e553a] hover:text-[#d99165] md:my-3 rounded-xl">
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
            class="my-2 flex cursor-pointer items-center gap-2 self-center px-3 py-2 text-stone-400 hover:text-[#d99165] md:my-3">
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
