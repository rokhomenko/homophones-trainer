<script setup lang="ts">
import { computed, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import { useWordsStore } from '@/stores/words'
import { useGroupsStore } from '@/stores/groups'
import { useDictionaryStore } from '@/stores/dictionary'

const wordsStore = useWordsStore();
const groupsStore = useGroupsStore();
const dictionaryStore = useDictionaryStore();

onMounted(async () => {
 await Promise.all([
  groupsStore.fetchGroups(),
  wordsStore.fetchWords()
 ])
})

const homophonesGroup = computed(() => dictionaryStore.dictionaryWords.homophonesGroup)
const nonHomophonesGroup = computed(() => dictionaryStore.dictionaryWords.nonHomophonesGroup)

console.log('dictionaryStore.dictionaryWords', dictionaryStore.dictionaryWords)
</script>

<template>
  <AppHeader/>
  <div>Home</div>
  <router-link to="/login">login</router-link>
  <router-link to="/register">register</router-link>
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
