<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
/* import { useWordsStore } from '@/stores/words'
import { useGroupsStore } from '@/stores/groups' */
import { useLearnedStore } from '@/stores/learned'
import type { GroupWithWords } from '@/types/derived'
import { speak } from '@/utils/speak'

/* const wordsStore = useWordsStore()
const groupsStore = useGroupsStore() */
const learnedStore = useLearnedStore()
const isDisabled = ref(false)

onMounted(async () => {
  await learnedStore.fetchLearned()
})

const learnedWords = computed<GroupWithWords[]>(() => learnedStore.separateLearningGroups.learnedWords)

async function handleSpeak(word: string) {
  if (isDisabled.value) return

  isDisabled.value = true
  await speak(word)
  isDisabled.value = false
}
</script>

<template>
  <div class="flex flex-row">
    <section class="mx-auto flex w-full flex-col justify-center overflow-hidden border border-stone-800/90 bg-[#15130f]/88 text-stone-200 shadow-[0_18px_60px_rgb(0_0_0/0.25)] rounded-[1.5rem] md:w-2/3 lg:w-1/2">
      <h2 class="border-b border-stone-800 bg-stone-950/35 px-5 py-4 text-center text-sm font-black uppercase tracking-[0.24em] text-stone-300">
        Groups you have already learned</h2>
      <div v-if="learnedWords.length">
        <div v-if="learnedStore.loading" class="p-5 text-center text-stone-400">Loading…</div>
        <div v-else class="flex flex-col px-5 py-6">
          <ul v-for="group in learnedWords" :key="group.id"
            class="flex flex-row flex-wrap items-center justify-center gap-x-4">
            <li v-for="word in group.words" :key="word.id" :disabled="isDisabled" @click="handleSpeak(word.word)"
              class="my-2 flex cursor-pointer gap-2 border border-dashed border-stone-700 bg-[#0f0e0c] px-3 py-2 text-stone-200 hover:border-[#9e553a] hover:text-[#d99165] rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
              <span>{{ word.word }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="p-8 text-center text-stone-400" v-else>You don't have learned words</div>
    </section>
  </div>
</template>
