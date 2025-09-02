<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { useWordsStore } from '@/stores/words'
  import { useGroupsStore } from '@/stores/groups'
  import { useLearnedStore } from '@/stores/learned'
  import type { GroupWithWords } from '@/types/derived'


  const wordsStore = useWordsStore()
  const groupsStore = useGroupsStore()
  const learnedStore = useLearnedStore()

  onMounted(async () => {
    await Promise.all([
      groupsStore.fetchGroups(),
      wordsStore.fetchWords(),
      learnedStore.fetchLearned()
    ])
  })

  const wordsToLearn = computed<GroupWithWords[]>(() => learnedStore.separateLearningGroups.wordsToLearn)
</script>

<template>
  <div>
    <ul
      v-for="group in wordsToLearn"
      :key="group.id"
    >
      <li
        v-for="word in group.words"
        :key="group.id"
      >
        {{ word.word }}
      </li>
    </ul>
  </div>
</template>
