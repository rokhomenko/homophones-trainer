<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const auth = useAuthStore()
const isOpen = ref(false)

function logout() {
  auth.logout()
  router.push({ name: 'login' })
}

function toggleMenu() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="bg-gradient-to-r from-[#111827] to-[#3f3f46]">
    <div class="flex flex-row justify-between items-center px-4 pb-2">
      <router-link to="/#">
        <div class="flex flex-row items-center">
          <img src="../../public/logo-grey.png" width="40px" class="mr-2 md:mr-3" />
          <h1 class="text-white hover:text-gray-300 text-2xl font-extrabold cursor-pointer mt-2 max-[400px]:text-xl">
            Homophones Trainer</h1>
        </div>
      </router-link>

      <!-- desktop -->
      <div class="hidden md:flex items-center font-light gap-5 mt-2">
        <template v-if="!auth.isAuthenticated">
          <router-link to="/auth/login" class="flex text-white hover:text-gray-300 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
            </svg>
          </router-link>
        </template>
        <div v-else class="flex text-white text-bold gap-4">
          <router-link to="/training" class="hover:text-gray-300 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-train-front-icon lucide-train-front"><path d="M8 3.1V7a4 4 0 0 0 8 0V3.1"/><path d="m9 15-1-1"/><path d="m15 15 1-1"/><path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"/><path d="m8 19-2 3"/><path d="m16 19 2 3"/></svg>
            </svg>
          </router-link>
          <router-link to="/profile" class="hover:text-gray-300 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </router-link>
          <button @click="logout" class="cursor-pointer hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
          </button>
        </div>
      </div>

      <!-- hamburger -->
      <button @click="toggleMenu" class="md:hidden text-white focus:outline-none mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>
      </button>
    </div>

    <!-- mobile menu -->
    <div v-if="isOpen" class="md:hidden px-4 pb-4 flex flex-col gap-3 text-white">
      <template v-if="!auth.isAuthenticated">
        <router-link to="/auth/login" class="hover:text-gray-300">Login</router-link>
      </template>
      <template v-else>
        <router-link to="/training" class="hover:text-gray-300">Training</router-link>
        <router-link to="/profile" class="hover:text-gray-300">Profile</router-link>
        <button @click="logout" class="text-left hover:text-gray-300">Logout</button>
      </template>
    </div>
  </div>
</template>
