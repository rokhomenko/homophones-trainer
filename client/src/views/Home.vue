<script setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <AppHeader/>
  <div>Home</div>
  <router-link to="/login">login</router-link>
  <router-link to="/register">register</router-link>
</template>
