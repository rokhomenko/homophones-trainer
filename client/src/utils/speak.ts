
export function speak(word: string) {
      if(!('speechSynthesis' in window)) {
        alert("This browser doesn't support voicing")
        return
      }
      const utterance = new SpeechSynthesisUtterance(word)
      window.speechSynthesis.speak(utterance)
    }
