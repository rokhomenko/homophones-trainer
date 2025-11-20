import { ref } from 'vue'

export function useSpeech() {
  const isSpeaking = ref(false)

  function speak(word: string) {
    if(!('speechSynthesis' in window)) {
        alert("This browser doesn't support voicing")
        return
      }
      if (isSpeaking.value) return

      isSpeaking.value = true
      const utterance = new SpeechSynthesisUtterance(word)

      utterance.onend = () => {
        isSpeaking.value = false
      }

      window.speechSynthesis.speak(utterance)
  }
  return { isSpeaking, speak }
}
