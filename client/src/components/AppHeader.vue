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
    <router-link to="/#">
      <div class="flex flex-row">
        <div class="mx-1 md:mx-3">
          <img src="../../public/logo-grey.png" width="40px" />
        </div>
        <div class="text-white hover:text-blue-50 text-2xl my-5 font-extrabold cursor-pointer">Homophones Trainer</div>
      </div>
    </router-link>
    <div class="flex items-center font-light gap-5 mr-5">
      <template v-if="!auth.isAuthenticated">
        <div class="flex text-white hover:text-blue-100 cursor-pointer">
          <router-link to="/auth/login">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
            </svg>
          </router-link>
        </div>
      </template>
      <div v-else class="flex text-white text-bold gap-4">
        <router-link to="/profile" class="hover:text-blue-100 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </router-link>
        <button @click="logout" class="cursor-pointer hover:text-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
