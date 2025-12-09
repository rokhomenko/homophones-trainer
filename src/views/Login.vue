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
  <div class="flex text-slate-500 font-bold text-2xl lg:mb-[1rem]">Homophones Trainer</div>
  <div class="text-slate-500">Login or
    <a class="text-cyan-600">
      <router-link to="/auth/register" @click="auth.error = null">Register</router-link>
    </a>
  </div>
  <input v-model="email" class="border border-emerald-200 rounded-md px-3 py-2 focus:border-cyan-400 focus:outline-none" placeholder="Email"></input>
  <input type="password" class="border border-emerald-200 rounded-md px-3 py-2 focus:border-cyan-400 focus:outline-none" v-model="password" placeholder="Password"></input>
  <button class="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm rounded-2xl px-10 py-3 text-center font-bold" @click="onLogin" :disabled="auth.loading">
    {{ auth.loading ? 'Loading' : 'Submit' }}
  </button>
  <p v-if="auth.error">
    {{ auth.error }}
  </p>
</template>
