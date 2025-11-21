
export function speak(word: string): Promise<void> {
  return new Promise(resolve => {
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.onend = () => {
      resolve();
    }
    window.speechSynthesis.speak(utterance)
  })
}
