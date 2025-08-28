<script setup lang="ts">
  import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white text-gray-800 font-sans">
    <AppHeader/>
    <main class="flex-1 container mx-auto px-4 py-6">
      <router-view />
    </main>
  </div>
</template>
