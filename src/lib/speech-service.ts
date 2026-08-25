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
    // Prefer natural British/Australian/US English examiner voice
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

// Speech Recognition (STT) - Candidate Recording & Live Transcription
export interface SpeechRecognitionResultWrapper {
  transcript: string;
  isFinal: boolean;
}

export class LiveSpeechTranscriber {
  private recognition: any = null;
  private isListening = false;
  private onResultCallback?: (result: string) => void;
  private onErrorCallback?: (err: any) => void;
  private onEndCallback?: () => void;
  private accumulatedTranscript = '';

  constructor(
    onResult?: (text: string) => void,
    onError?: (err: any) => void,
    onEnd?: () => void
  ) {
    this.onResultCallback = onResult;
    this.onErrorCallback = onError;
    this.onEndCallback = onEnd;

    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event: any) => {
          let currentSessionText = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentSessionText += event.results[i][0].transcript;
          }
          const fullText = (this.accumulatedTranscript + ' ' + currentSessionText).trim();
          if (this.onResultCallback) {
            this.onResultCallback(fullText);
          }
        };

        this.recognition.onerror = (event: any) => {
          if (this.onErrorCallback) this.onErrorCallback(event.error);
        };

        this.recognition.onend = () => {
          if (this.isListening) {
            // Auto restart if continuous recording is active
            try {
              this.recognition.start();
            } catch (e) {
              this.isListening = false;
              if (this.onEndCallback) this.onEndCallback();
            }
          } else {
            if (this.onEndCallback) this.onEndCallback();
          }
        };
      }
    }
  }

  public start(existingText = '') {
    this.accumulatedTranscript = existingText;
    if (this.recognition && !this.isListening) {
      try {
        this.isListening = true;
        this.recognition.start();
      } catch (e) {
        console.warn('Recognition start failed:', e);
      }
    }
  }

  public stop() {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore
      }
    }
  }

  public isSupported(): boolean {
    return this.recognition !== null;
  }
}
