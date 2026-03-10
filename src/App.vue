<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'
const auth = useAuthStore()

onMounted(() => {
  if (auth.token && !auth.user) {
    auth.getUser()
  }
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
