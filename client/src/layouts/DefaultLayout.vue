<script setup lang="ts">
  import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="default-layout">
    <AppHeader/>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
  .default-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .content {
    display: flex;
    flex: 1;
    padding: 15px;
  }
</style>
