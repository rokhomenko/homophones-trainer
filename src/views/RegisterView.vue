<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const onRegister = async () => {
  await auth.register(email.value, password.value)
  if (auth.user) {
    router.push('/')
  }
}
</script>

<template>
  <div class="text-3xl font-black tracking-[-0.05em] text-stone-100 lg:mb-[1rem]">Homophones Trainer</div>
  <div class="text-sm uppercase tracking-[0.2em] text-stone-400">Register</div>
  <input v-model="email" class="w-full border border-stone-700 px-4 py-3 focus:border-[#9e553a] focus:outline-none rounded-xl"
    placeholder="Email">
  <input type="password" class="w-full border border-stone-700 px-4 py-3 focus:border-[#9e553a] focus:outline-none rounded-xl"
    v-model="password" placeholder="Password">
  <button
    class="border border-[#9e553a]/70 bg-[#241812] px-10 py-3 text-center text-sm font-black uppercase tracking-[0.18em] text-stone-100 shadow-[6px_6px_0_rgb(0_0_0/0.35)] hover:bg-[#2b1b14] disabled:cursor-not-allowed disabled:opacity-60 rounded-xl"
    @click="onRegister" :disabled="auth.loading">
    {{ auth.loading ? 'Loading' : 'Submit' }}
  </button>
  <p v-if="auth.error" class="text-sm text-[#e09773]">
    {{ auth.error }}
    <a class="text-[#d99165] hover:text-[#f0b180]">
      <router-link v-if="auth.error.toLowerCase().includes('use')" to="/auth/login" @click="auth.error = null">
        Login
      </router-link>
    </a>
  </p>
</template>
