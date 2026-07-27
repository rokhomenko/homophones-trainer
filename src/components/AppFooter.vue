<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative z-10 mt-10 border-t border-stone-800/80 bg-[#11100e]/88 backdrop-blur-xl">
    <div
      class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs uppercase tracking-[0.22em] text-stone-400 sm:flex-row sm:px-6">
      <p class="text-stone-500">&copy; {{ year }} Homophones Trainer</p>
      <nav class="flex items-center gap-5">
        <router-link to="/privacy-policy" class="hover:text-[#d99165]">Privacy Policy</router-link>
        <router-link to="/contact" class="hover:text-[#d99165]">Contact</router-link>
      </nav>
    </div>
  </footer>
</template>
