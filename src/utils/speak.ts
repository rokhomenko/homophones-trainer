
export function speak(word: string): Promise<void> {
  return new Promise(resolve => {
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    utterance.onend = () => resolve()
    utterance.onerror = () => resolve()

    window.speechSynthesis.speak(utterance)
  })
}
