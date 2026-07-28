<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'
import { Analytics } from "@vercel/analytics/vue"
import { SpeedInsights } from "@vercel/speed-insights/vue"
const auth = useAuthStore()

onMounted(() => {
  if (auth.token && !auth.user) {
    auth.getUser()
  }
})
</script>

<template>
  <Analytics />
  <SpeedInsights />
  <router-view></router-view>
</template>

<style scoped></style>
