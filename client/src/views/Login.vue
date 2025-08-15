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
    router.push('/profile')
  }
}

</script>

<template>
  <div>Login</div>
  <input v-model="email" placeholder="Email"></input>
  <input v-model="password" placeholder="Password"></input>
  <button @click="onLogin" :disabled="auth.loading">
    {{ auth.loading ? 'Loading' : 'Submit' }}
  </button>
  <p v-if="auth.error">
    {{ auth.error }}
  </p>
</template>
