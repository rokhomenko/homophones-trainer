<script setup>
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
      router.push('/profile')
    }
  }
</script>

<template>
  <div>Register</div>
  <input v-model="email" placeholder="Email"></input>
  <input type="password" v-model="password" placeholder="Password"></input>
  <button @click="onRegister" :disabled="auth.loading">
    {{ auth.loading ? 'Loading' : 'Register' }}
  </button>
  <p v-if="auth.error">
    {{ auth.error }}
  </p>
</template>
