'use client';

// Speech Synthesis (TTS) - Examiner Voice
export const speakText = (
  text: string, 
  onEnd?: () => void,
  rate = 0.95
): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      resolve();
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      (v.lang.includes('en-GB') || v.lang.includes('en-AU') || v.lang.includes('en-US')) && 
      (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Samantha') || v.name.includes('Karen'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
      resolve();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
      resolve();
    };

    window.speechSynthesis.speak(utterance);
  });
};

export const stopSpeaking = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// Continuous Speech-to-Text with Intelligent Pause & Resume Handling
export class LiveSpeechTranscriber {
  private recognition: any = null;
  private isListening = false;
  private onResultCallback?: (result: string) => void;
  private onSpeechActivityCallback?: (isVoicing: boolean) => void;
  private onErrorCallback?: (err: any) => void;
  private onEndCallback?: () => void;
  private baseText = '';
  private sessionFinalText = '';

  constructor(
    onResult?: (text: string) => void,
    onSpeechActivity?: (isVoicing: boolean) => void,
    onError?: (err: any) => void,
    onEnd?: () => void
  ) {
    this.onResultCallback = onResult;
    this.onSpeechActivityCallback = onSpeechActivity;
    this.onErrorCallback = onError;
    this.onEndCallback = onEnd;

    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onspeechstart = () => {
          if (this.onSpeechActivityCallback) {
            this.onSpeechActivityCallback(true);
          }
        };

        this.recognition.onspeechend = () => {
          if (this.onSpeechActivityCallback) {
            this.onSpeechActivityCallback(false);
          }
        };

        this.recognition.onsoundstart = () => {
          if (this.onSpeechActivityCallback) {
            this.onSpeechActivityCallback(true);
          }
        };

        this.recognition.onsoundend = () => {
          if (this.onSpeechActivityCallback) {
            this.onSpeechActivityCallback(false);
          }
        };

        this.recognition.onresult = (event: any) => {
          let currentFinal = '';
          let currentInterim = '';
          for (let i = 0; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              currentFinal += transcript + ' ';
            } else {
              currentInterim += transcript;
            }
          }
          this.sessionFinalText = currentFinal;
          const combined = [this.baseText, currentFinal, currentInterim]
            .filter(Boolean)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();

          if (this.onResultCallback) {
            this.onResultCallback(combined);
          }
        };

        this.recognition.onerror = (event: any) => {
          if (event.error === 'no-speech' || event.error === 'aborted') {
            return;
          }
          console.warn('SpeechRecognition error:', event.error);
          if (this.onErrorCallback) this.onErrorCallback(event.error);
        };

        this.recognition.onend = () => {
          if (this.onSpeechActivityCallback) {
            this.onSpeechActivityCallback(false);
          }

          if (this.isListening) {
            // Commit final session text into baseText before restarting
            if (this.sessionFinalText) {
              this.baseText = [this.baseText, this.sessionFinalText].filter(Boolean).join(' ').trim();
              this.sessionFinalText = '';
            }

            // Continuous listening through natural candidate pauses
            setTimeout(() => {
              if (this.isListening && this.recognition) {
                try {
                  this.recognition.start();
                } catch (e) {
                  setTimeout(() => {
                    if (this.isListening && this.recognition) {
                      try { this.recognition.start(); } catch (err) {}
                    }
                  }, 150);
                }
              }
            }, 80);
          } else {
            if (this.onEndCallback) this.onEndCallback();
          }
        };
      }
    }
  }

  public start(existingText?: string) {
    if (existingText !== undefined) {
      this.baseText = existingText.trim();
    }
    this.sessionFinalText = '';
    if (this.recognition && !this.isListening) {
      try {
        this.isListening = true;
        this.recognition.start();
      } catch (e) {
        console.warn('Recognition start error:', e);
      }
    }
  }

  public stop(): string {
    this.isListening = false;
    if (this.onSpeechActivityCallback) {
      this.onSpeechActivityCallback(false);
    }
    if (this.sessionFinalText) {
      this.baseText = [this.baseText, this.sessionFinalText].filter(Boolean).join(' ').trim();
      this.sessionFinalText = '';
    }
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore
      }
    }
    return this.baseText;
  }

  public setBaseText(text: string) {
    this.baseText = text.trim();
    this.sessionFinalText = '';
  }

  public reset() {
    this.stop();
    this.baseText = '';
    this.sessionFinalText = '';
  }

  public isSupported(): boolean {
    return this.recognition !== null;
  }
}
