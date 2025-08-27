<script setup>
  import { useAuthStore } from '@/stores/auth'

  const auth = useAuthStore()
</script>

<template>
  <div>Header</div>
  <router-link to="/auth/login">login</router-link>
  <router-link to="/auth/register">register</router-link>
  <button @click="auth.logout()" class="btn-logout">Logout</button>
</template>
