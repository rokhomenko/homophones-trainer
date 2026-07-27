<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type HCaptchaApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      theme: 'dark'
      callback: (token: string) => void
      'expired-callback': () => void
      'error-callback': () => void
    },
  ) => string
  reset: (widgetId?: string) => void
  remove: (widgetId: string) => void
}

const HCAPTCHA_SITE_KEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2'
const HCAPTCHA_CALLBACK_NAME = 'onWeb3FormsHCaptchaLoaded'
const HCAPTCHA_SCRIPT_URL = `https://js.hcaptcha.com/1/api.js?render=explicit&recaptchacompat=off&onload=${HCAPTCHA_CALLBACK_NAME}`

const email = ref('')
const message = ref('')
const emailTouched = ref(false)
const submitted = ref(false)
const isSending = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)
const captchaElement = ref<HTMLDivElement | null>(null)
const captchaToken = ref('')

let captchaWidgetId: string | undefined
let captchaLoadingPromise: Promise<void> | undefined

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isEmailValid = computed(() => emailRegex.test(email.value.trim()))
const showEmailError = computed(() => (emailTouched.value || submitted.value) && !isEmailValid.value)

function getHCaptcha() {
  return Reflect.get(window, 'hcaptcha') as HCaptchaApi | undefined
}

function loadHCaptcha() {
  if (getHCaptcha()) {
    return Promise.resolve()
  }

  if (captchaLoadingPromise) {
    return captchaLoadingPromise
  }

  captchaLoadingPromise = new Promise<void>((resolve, reject) => {
    Reflect.set(window, HCAPTCHA_CALLBACK_NAME, () => {
      Reflect.deleteProperty(window, HCAPTCHA_CALLBACK_NAME)
      resolve()
    })

    const script = document.createElement('script')
    script.src = HCAPTCHA_SCRIPT_URL
    script.async = true
    script.defer = true
    script.addEventListener(
      'error',
      () => {
        Reflect.deleteProperty(window, HCAPTCHA_CALLBACK_NAME)
        captchaLoadingPromise = undefined
        reject(new Error('Unable to load captcha.'))
      },
      { once: true },
    )
    document.head.append(script)
  })

  return captchaLoadingPromise
}

onMounted(async () => {
  try {
    await loadHCaptcha()

    if (!captchaElement.value) {
      return
    }

    captchaWidgetId = getHCaptcha()?.render(captchaElement.value, {
      sitekey: HCAPTCHA_SITE_KEY,
      theme: 'dark',
      callback: (token) => {
        captchaToken.value = token
        submitError.value = ''
      },
      'expired-callback': () => {
        captchaToken.value = ''
      },
      'error-callback': () => {
        captchaToken.value = ''
        submitError.value = 'Captcha verification failed. Please try again.'
      },
    })
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : 'Unable to load captcha.'
  }
})

onBeforeUnmount(() => {
  if (captchaWidgetId !== undefined) {
    getHCaptcha()?.remove(captchaWidgetId)
  }
})

async function onSubmit() {
  submitted.value = true
  submitError.value = ''
  submitSuccess.value = false

  if (!isEmailValid.value) {
    emailTouched.value = true
    return
  }

  if (!captchaToken.value) {
    submitError.value = 'Please complete the captcha verification.'
    return
  }

  isSending.value = true

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
        email: email.value.trim(),
        message: message.value.trim(),
        subject: 'New message from Homophones Trainer',
        'h-captcha-response': captchaToken.value,
      }),
    })
    const result = (await response.json()) as { success: boolean; message?: string }

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Unable to send your message.')
    }

    submitted.value = false
    email.value = ''
    message.value = ''
    emailTouched.value = false
    submitSuccess.value = true
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : 'Unable to send your message.'
  } finally {
    isSending.value = false
    captchaToken.value = ''
    getHCaptcha()?.reset(captchaWidgetId)
  }
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
      <div ref="captchaElement" class="min-h-[78px]"></div>
      <button
        type="submit"
        :disabled="isSending"
        class="border border-[#9e553a]/70 bg-[#241812] px-10 py-3 text-center text-sm font-black uppercase tracking-[0.18em] text-stone-100 shadow-[6px_6px_0_rgb(0_0_0/0.35)] hover:bg-[#2b1b14] disabled:cursor-not-allowed disabled:opacity-60 rounded-xl">
        {{ isSending ? 'Sending...' : 'Send' }}
      </button>
      <p v-if="submitSuccess" class="text-sm text-emerald-400" role="status">
        Your message has been sent. Thank you!
      </p>
      <p v-if="submitError" class="text-sm text-[#e09773]" role="alert">
        {{ submitError }}
      </p>
    </form>
  </section>
</template>