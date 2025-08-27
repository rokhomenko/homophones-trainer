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
  <div>Home</div>
  <router-link to="/training">Go to Training</router-link>
  <ul>
    <li v-for="group in learned" :key="group.id">
      Group: {{ group.group_id }} User: {{ group.user_id }}
    </li>
  </ul>
  <div class="words">
    <h2>Homophones Group</h2>
    <ul
      v-for="group in homophonesGroup"
      :key="group.id"
    >
      <li
        v-for="word in group.words"
        :key="word.id"
        @click="wordsStore.speak(word.word)"
      >
        {{ word.word }}
      </li>
    </ul>
    <h2>Non-Homophones Group</h2>
    <ul
      v-for="group in nonHomophonesGroup"
      :key="group.id"
    >
      <li
        v-for="word in group.words"
        :key="word.id"
        @click="wordsStore.speak(word.word)"
      >
        {{ word.word }}
      </li>
    </ul>
  </div>
</template>
