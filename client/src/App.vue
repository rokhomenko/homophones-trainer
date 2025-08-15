<script setup lang="ts">
  import { useAuthStore } from './stores/auth'
  const auth = useAuthStore()
  auth.getUser()
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
