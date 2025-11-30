<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useWordsStore } from '@/stores/words'
  import { useGroupsStore } from '@/stores/groups'
  import { useLearnedStore } from '@/stores/learned'
  import type { GroupWithWords } from '@/types/derived'
  import { speak } from '@/utils/speak'

  const wordsStore = useWordsStore()
  const groupsStore = useGroupsStore()
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
  <section class="flex justify-center flex-col w-full md:w-2/3 lg:w-1/2 bg-cyan-50 text-cyan-800 rounded-lg mx-auto">
    <h2 class="flex justify-center items-center text-xl w-full h-15 bg-gradient-to-b text-teal-900 from-teal-300 via-teal-400 to-teal-400 rounded-t-lg">Groups you have already learned</h2>
    <div v-if="learnedWords.length">
      <div v-if="learnedStore.loading" class="text-center p-5">Loading…</div>
      <div v-else class="flex flex-col mt-7 mb-5">
        <ul
          v-for="group in learnedWords"
          :key="group.id"
          class="flex flex-row gap-x-5 items-center justify-center p-y-2 flex-wrap"
        >
          <li
            v-for="word in group.words"
            :key="group.id"
            :disabled="isDisabled"
            @click="handleSpeak(word.word)"
            class="flex my-3 gap-2 px-3 py-2 border border-cyan-800 rounded-lg cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
            <span>{{ word.word }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="text-center p-5" v-else>You don't have learned words</div>
  </section>
</template>
