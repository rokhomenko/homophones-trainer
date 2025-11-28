
export function speak(word: string): Promise<void> {
  return new Promise(resolve => {
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    utterance.onend = () => {
      resolve();
    }
    window.speechSynthesis.speak(utterance)
  })
}
