<script setup>
  import { useAuthStore } from '@/stores/auth'
  import router from '@/router'

  const auth = useAuthStore()

  function logout () {
    auth.logout()
    router.push({ name: 'login' })
  }
</script>

<template>
  <div>Header</div>
  <router-link to="/auth/login">login</router-link>
  <router-link to="/auth/register">register</router-link>
  <button @click="logout" class="btn-logout">Logout</button>
</template>
