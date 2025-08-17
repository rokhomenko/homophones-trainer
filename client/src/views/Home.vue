<script setup lang="ts">
import { onMounted } from 'vue'
import { useWordsStore } from '@/stores/words'
import AppHeader from '@/components/AppHeader.vue'

const wordsStore = useWordsStore();

onMounted(() => {
  wordsStore.fetchWords();
})
</script>

<template>
  <AppHeader/>
  <div>Home</div>
  <router-link to="/login">login</router-link>
  <router-link to="/register">register</router-link>
  <div class="words">
    <div v-for="(words, groupId) in wordsStore.groupedWords"
      :key="groupId"
      class="mb-4 p-4 border rounded"
    >
    <h2>{{ groupId }}</h2>
    <ul>
      <li
        v-for="word in words"
        :key="word.id"
        @click="wordsStore.speak(word.word)"
      >
        {{ word.word }}
      </li>
    </ul>
    </div>
  </div>
</template>
