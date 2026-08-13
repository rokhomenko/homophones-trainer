<script setup lang="ts">
import { ref } from 'vue'
import { speak } from '@/utils/speak'
import type { ExamplePair, PairState } from '@/types/example'

const examples: ExamplePair[] = [
  { words: ['sea', 'see'], homophones: true, play: 0 },
  { words: ['beach', 'bitch'], homophones: false, play: 0 },
  { words: ['hill', 'heal'], homophones: false, play: 1 },
  { words: ['night', 'knight'], homophones: true, play: 0 },
]

const pairStates = ref<PairState[]>(
  examples.map((item) => ({
    played: false,
    playedIndex: item.play,
    answered: false,
    selected: null,
    isSpeaking: false,
    animating: false,
  })),
)

async function handleSpeak(idx: number) {
  const state = pairStates.value[idx]
  if (state.isSpeaking || state.answered) return
  state.isSpeaking = true
  state.played = true
  await speak(examples[idx].words[examples[idx].play])
  state.isSpeaking = false
}

function triggerSpeakerAnim(idx: number) {
  pairStates.value[idx].animating = true
  setTimeout(() => {
    pairStates.value[idx].animating = false
  }, 600)
}

function selectWord(pairIdx: number, wordIdx: number) {
  const state = pairStates.value[pairIdx]
  if (state.answered) return
  if (!state.played) {
    triggerSpeakerAnim(pairIdx)
    return
  }
  state.answered = true
  state.selected = wordIdx
}

function selectAll(pairIdx: number) {
  const state = pairStates.value[pairIdx]
  if (state.answered) return
  if (!state.played) {
    triggerSpeakerAnim(pairIdx)
    return
  }
  state.answered = true
  state.selected = 'all'
}
</script>

<template>
  <div class="flex flex-col gap-3 text-stone-300">
    <h3 class="text-base font-black uppercase tracking-[0.2em] text-[#d99165] sm:text-lg">
      What do you hear?
    </h3>
    <p class="max-w-sm text-sm leading-6 text-stone-400">
      Click on the speaker and choose which word you heard.
    </p>
    <div class="flex flex-col gap-3">
      <div v-for="(item, idx) in examples" :key="idx" class="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap">
        <button @click="handleSpeak(idx)" :disabled="pairStates[idx].isSpeaking || pairStates[idx].answered"
          class="rounded-full border border-stone-700 bg-[#0f0e0c] p-2 text-stone-200 shadow-[0_0_30px_rgb(140_63_45/0.16)] transition-transform duration-300 ease-in-out hover:border-[#9e553a] hover:text-[#d99165] disabled:opacity-50"
          :class="{ 'scale-120': pairStates[idx].animating }">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
          </svg>
        </button>
        <div class="flex flex-wrap items-center justify-center gap-2">
          <span v-for="(word, wordIdx) in item.words" :key="word" @click="selectWord(idx, wordIdx)"
            class="border border-dashed border-stone-700 bg-[#0f0e0c] px-2.5 py-1 text-sm text-stone-200 rounded-lg transition-colors"
            :class="{
              'cursor-pointer hover:border-[#9e553a] hover:text-[#d99165]': !pairStates[idx].answered,
              'cursor-not-allowed': pairStates[idx].answered,
              'border-[#9bd96b] bg-[#2d4a22] text-[#d8f5a8] shadow-[0_0_22px_rgb(140_200_80/0.35)]':
                pairStates[idx].answered && !item.homophones && wordIdx === pairStates[idx].playedIndex,
              'border-[#ff9b5e] bg-[#5a2c14] text-[#ffd1a8] shadow-[0_0_22px_rgb(255_155_94/0.4)]':
                pairStates[idx].answered && !item.homophones && pairStates[idx].selected === wordIdx && wordIdx !== pairStates[idx].playedIndex,
            }">
            {{ word }}
          </span>
          <button @click="selectAll(idx)"
            class="border border-stone-700 bg-[#0f0e0c] px-2.5 py-1 text-sm text-stone-200 rounded-lg transition-colors"
            :class="{
              'cursor-pointer hover:border-[#9e553a] hover:text-[#d99165]': !pairStates[idx].answered,
              'cursor-not-allowed': pairStates[idx].answered,
              'border-[#9bd96b] bg-[#2d4a22] text-[#d8f5a8] shadow-[0_0_22px_rgb(140_200_80/0.35)]':
                pairStates[idx].answered && item.homophones,
              'border-[#ff9b5e] bg-[#5a2c14] text-[#ffd1a8] shadow-[0_0_22px_rgb(255_155_94/0.4)]':
                pairStates[idx].answered && !item.homophones && pairStates[idx].selected === 'all',
            }">
            All these words sound the same
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
