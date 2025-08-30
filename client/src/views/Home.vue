<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useWordsStore } from '@/stores/words'
import { useGroupsStore } from '@/stores/groups'
import { useDictionaryStore } from '@/stores/dictionary'
import { useLearnedsStore } from '@/stores/learned'

const wordsStore = useWordsStore();
const groupsStore = useGroupsStore();
const dictionaryStore = useDictionaryStore();
const learnedStore = useLearnedsStore();

onMounted(async () => {
 await Promise.all([
  groupsStore.fetchGroups(),
  wordsStore.fetchWords(),
  learnedStore.fetchLearned()
 ])
})

const homophonesGroup = computed(() => dictionaryStore.dictionaryWords.homophonesGroup)
const nonHomophonesGroup = computed(() => dictionaryStore.dictionaryWords.nonHomophonesGroup)
const learned = computed(() => learnedStore.learned_groups)
</script>

<template>
  <div class="flex flex-col">
    <div class="flex justify-center mt-5 sm:mt-7 md:mt-10 lg:mt-15 mb-7 sm:mb-12 md:mb-15 lg:mb-20">
      <div class="bg-gradient-to-br from-slate-700 via-emerald-900 to-teal-500 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl rounded-2xl py-3 sm:py-4 md:py-5 px-8 sm:px-12 md:px-20 lg:px-35 max-w-[calc(100%-30px)] text-center">
        <router-link to="/training" class="inline-block">Go to Training</router-link>
      </div>
    </div>
    <div class="flex flex-col md:flex-row justify-center gap-10 items-start">
      <section class="flex flex-col w-full md:w-2/3 lg:w-1/2 bg-cyan-800 text-cyan-50 p-y-20 rounded-lg">
        <h2 class="flex justify-center items-center text-xl w-full h-15 bg-gradient-to-b text-teal-900 from-teal-300 via-teal-400 to-teal-400 rounded-t-lg">Homophones Group</h2>
        <div class="flex flex-col mt-7 mb-5">
          <ul
            v-for="group in homophonesGroup"
            :key="group.id"
            class="flex flex-row gap-x-5 items-center justify-center p-y-2"
          >
            <li
              v-for="word in group.words"
              :key="word.id"
              @click="wordsStore.speak(word.word)"
              class="flex my-3 gap-2 px-3 py-2 border border-white rounded-lg cursor-pointer hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
              <span>{{ word.word }}</span>
            </li>
          </ul>
        </div>
      </section>
      <section class="flex flex-col w-full md:w-2/3 lg:w-1/2 bg-cyan-800 text-cyan-50 p-y-20 rounded-lg">
        <h2 class="flex justify-center items-center text-xl w-full h-15 bg-gradient-to-b text-teal-900 from-teal-300 via-teal-400 to-teal-400 rounded-t-lg">Non-Homophones Group</h2>
        <div class="flex flex-col mt-7 mb-5">
          <ul
            v-for="group in nonHomophonesGroup"
            :key="group.id"
            class="flex flex-row gap-x-5 items-center justify-center p-y-2"
          >
            <li
              v-for="word in group.words"
              :key="word.id"
              @click="wordsStore.speak(word.word)"
              class="flex my-3 gap-2 px-3 py-2 border border-white rounded-lg cursor-pointer hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
              <span>{{ word.word }}</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
