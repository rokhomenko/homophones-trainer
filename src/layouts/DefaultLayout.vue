<script setup lang="ts">
  import AppHeader from '@/components/AppHeader.vue'
  import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col text-stone-200 font-sans">
    <AppHeader/>
    <main class="relative z-10 mx-auto w-full flex-1 px-4 py-7 sm:px-6 lg:max-w-7xl lg:py-10">
      <router-view />
    </main>
    <AppFooter/>
  </div>
</template>
