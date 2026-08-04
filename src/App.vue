<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'
import { Analytics } from "@vercel/analytics/vue"
const auth = useAuthStore()

onMounted(() => {
  if (auth.user === null) {
    auth.getUser()
  }
})
</script>

<template>
  <Analytics />
  <router-view></router-view>
</template>

<style scoped></style>
