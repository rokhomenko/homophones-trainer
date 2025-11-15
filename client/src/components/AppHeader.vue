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
  <div class="flex flex-row justify-between bg-gradient-to-r from-emerald-400 to-cyan-400">
    <router-link to="/#"><div class="text-white hover:text-blue-50 text-2xl m-5 font-extrabold cursor-pointer">Homophones Trainer</div></router-link>
    <div class="flex items-center font-light gap-5 mr-7">
      <template v-if="!auth.isAuthenticated">
        <div class="flex text-white hover:text-blue-100 cursor-pointer">
          <router-link to="/auth/login">Login</router-link>
        </div>
        <div class="flex text-white hover:text-blue-100 cursor-pointer">
          <router-link to="/auth/register">Register</router-link>
        </div>
      </template>
      <button v-else @click="logout" class="flex text-white hover:text-blue-100 cursor-pointer">Logout</button>
    </div>
  </div>
</template>
