<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const onLogin = async () => {
  await auth.login(email.value, password.value)
  if (auth.user) {
    router.push('/')
  }
}
</script>

<template>
  <div class="flex text-gray-700 font-bold text-2xl lg:mb-[1rem]">Homophones Trainer</div>
  <div class="text-gray-700">Login or
    <a class="text-gray-700">
      <router-link to="/auth/register" @click="auth.error = null">Register</router-link>
    </a>
  </div>
  <input v-model="email" class="border border-gray-400 rounded-md shadow-sm px-3 py-2 focus:border-gray-900 focus:outline-none"
    placeholder="Email">
  <input type="password" class="border border-gray-400 rounded-md shadow-sm px-3 py-2 focus:border-gray-900 focus:outline-none"
    v-model="password" placeholder="Password">
  <button
    class="bg-gradient-to-r from-[#111827] to-[#404040] text-white text-sm rounded-2xl shadow-sm px-10 py-3 text-center font-bold"
    @click="onLogin" :disabled="auth.loading">
    {{ auth.loading ? 'Loading' : 'Submit' }}
  </button>
  <p v-if="auth.error">
    {{ auth.error }}
  </p>
</template>
