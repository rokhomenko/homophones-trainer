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
  <div class="text-slate-500">Login</div>
  <input v-model="email" class="border border-emerald-200 rounded-md px-3 py-2 focus:border-cyan-400 focus:outline-none" placeholder="Email"></input>
  <input type="password" class="border border-emerald-200 rounded-md px-3 py-2 focus:border-cyan-400 focus:outline-none" v-model="password" placeholder="Password"></input>
  <button @click="onLogin" :disabled="auth.loading">
    {{ auth.loading ? 'Loading' : 'Submit' }}
  </button>
  <p v-if="auth.error">
    {{ auth.error }}
  </p>
</template>
