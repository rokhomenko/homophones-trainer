<script setup lang="ts">
import { computed, ref } from 'vue'

const email = ref('')
const message = ref('')
const emailTouched = ref(false)
const submitted = ref(false)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isEmailValid = computed(() => emailRegex.test(email.value.trim()))
const showEmailError = computed(() => (emailTouched.value || submitted.value) && !isEmailValid.value)

function onSubmit() {
  submitted.value = true
  if (!isEmailValid.value) {
    emailTouched.value = true
    return
  }
  submitted.value = false
  email.value = ''
  message.value = ''
  emailTouched.value = false
}
</script>

<template>
  <section
    class="relative overflow-hidden border border-stone-800/90 bg-[#15130f]/88 px-5 py-8 shadow-[0_18px_60px_rgb(0_0_0/0.25)] rounded-[2rem] sm:px-8">
    <h1 class="mb-6 text-3xl font-black tracking-[-0.04em] text-stone-100 sm:text-4xl">Contact</h1>
    <div class="space-y-4 text-sm leading-7 text-stone-300 sm:text-base">
      <p>
        Have a question, a suggestion, or found a word that doesn't belong? I'd love to hear from
        you.
      </p>
      <p>
        Find me on
        <a
          href="https://www.linkedin.com/in/roksolana-khomenko-826916178/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-[#d99165] hover:underline">
          LinkedIn
        </a>.
      </p>
      <p>
        You can also review my
        <router-link to="/privacy-policy" class="text-[#d99165] hover:underline">Privacy Policy</router-link>
        to learn how I handle your data.
      </p>
    </div>

    <form class="mt-8 space-y-4" novalidate @submit.prevent="onSubmit">
      <p class="text-sm leading-7 text-stone-300 sm:text-base">
        You can also drop me an email through this form.
      </p>
      <div>
        <input
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="Email"
          class="w-full border border-stone-700 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-500 focus:border-[#9e553a] focus:outline-none rounded-xl sm:text-base"
          :class="showEmailError ? 'border-[#e09773]' : ''"
          @blur="emailTouched = true" />
        <p v-if="showEmailError" class="mt-2 text-sm text-[#e09773]">
          Please enter a valid email address.
        </p>
      </div>
      <textarea
        v-model="message"
        rows="5"
        placeholder="Your message"
        class="w-full resize-y border border-stone-700 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-500 focus:border-[#9e553a] focus:outline-none rounded-xl sm:text-base" />
      <button
        type="submit"
        class="border border-[#9e553a]/70 bg-[#241812] px-10 py-3 text-center text-sm font-black uppercase tracking-[0.18em] text-stone-100 shadow-[6px_6px_0_rgb(0_0_0/0.35)] hover:bg-[#2b1b14] rounded-xl">
        Send
      </button>
    </form>
  </section>
</template>