'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { listeningSection } from '@/lib/ielts-data';
import { playPopSound, playChimeSound } from '@/lib/sound';
import styles from './page.module.css';

export default function ListeningPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(103); // ~1:43
  const [playbackRate, setPlaybackRate] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [band, setBand] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    playPopSound();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Audio playback error:', e);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleSpeedChange = (rate: number) => {
    playPopSound();
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleSelectOption = (qId: string, option: string) => {
    playPopSound();
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    listeningSection.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    let calculatedBand = 5.5;
    if (correctCount === 4) calculatedBand = 8.5;
    else if (correctCount === 3) calculatedBand = 7.0;
    else if (correctCount === 2) calculatedBand = 6.0;
    else if (correctCount === 1) calculatedBand = 5.0;
    else calculatedBand = 4.0;

    setBand(calculatedBand);
    setIsSubmitted(true);
    playChimeSound();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <Link href="/ielts" className={styles.backLink}>
            <span>← Back to IELTS Hub</span>
          </Link>
          <div className={styles.brandTitle}>
            <span>IELTS Listening Diagnostic Test</span>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: '2.5rem 1.5rem', flex: 1, maxWidth: '880px' }}>
        {/* HIDDEN AUDIO ELEMENT */}
        <audio 
          ref={audioRef} 
          src={listeningSection.audioUrl} 
          preload="auto"
        />

        {/* MODERN INTERACTIVE AUDIO PLAYER BANNER */}
        <div className={styles.audioPlayerCard}>
          <div className={styles.playerTop}>
            <div className={styles.audioBadgeRow}>
              <span className={styles.liveAudioPill}>
                <span className={`${styles.pulseDot} ${isPlaying ? styles.pulseActive : ''}`}></span>
                <span>Section 1 • Official IELTS Recording</span>
              </span>
              <span className={styles.smartVoiceTag}>🎙️ Neural Smart Voice (Examiner & Student)</span>
            </div>
            <h2 className={styles.playerTitle}>{listeningSection.title}</h2>
            <p className={styles.playerSub}>
              Listen carefully to the conversation between the Castpotro Examiner and applicant Liam Henderson. Answer Questions 1 to 4 while listening.
            </p>
          </div>

          {/* AUDIO CONTROLLER UI */}
          <div className={styles.controllerBox}>
            <div className={styles.playButtonWrapper}>
              <button 
                onClick={togglePlay} 
                className={`${styles.mainPlayBtn} ${isPlaying ? styles.btnPlaying : ''}`}
                aria-label={isPlaying ? "Pause Audio" : "Play Audio"}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              <div className={styles.equalizerWaves}>
                <span className={`${styles.eqBar} ${isPlaying ? styles.eqAnim1 : ''}`}></span>
                <span className={`${styles.eqBar} ${isPlaying ? styles.eqAnim2 : ''}`}></span>
                <span className={`${styles.eqBar} ${isPlaying ? styles.eqAnim3 : ''}`}></span>
                <span className={`${styles.eqBar} ${isPlaying ? styles.eqAnim4 : ''}`}></span>
                <span className={`${styles.eqBar} ${isPlaying ? styles.eqAnim5 : ''}`}></span>
              </div>
            </div>

            <div className={styles.progressSection}>
              <div className={styles.timeRow}>
                <span className={styles.timeCurrent}>{formatTime(currentTime)}</span>
                <span className={styles.trackStatus}>
                  {isPlaying ? 'Now Playing Castpotro Orientation...' : 'Audio Ready — Hit Play to Listen'}
                </span>
                <span className={styles.timeTotal}>{formatTime(duration)}</span>
              </div>

              <input
                type="range"
                min="0"
                max={duration || 103}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className={styles.seekBar}
                style={{
                  background: `linear-gradient(to right, #8b5cf6 ${progressPercent}%, #334155 ${progressPercent}%)`
                }}
              />
            </div>

            <div className={styles.speedControls}>
              <span className={styles.speedLabel}>Speed:</span>
              {[0.8, 1, 1.2, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`${styles.speedBtn} ${playbackRate === speed ? styles.speedBtnActive : ''}`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* QUESTIONS LIST */}
        <div className={styles.questionsContainer}>
          <div className={styles.instructionBanner}>
            <span>📝 Questions 1 – 4</span>
            <p>Choose the correct letter, <strong>A, B, C,</strong> or <strong>D</strong>.</p>
          </div>

          {listeningSection.questions.map((q, idx) => {
            const isCorrect = answers[q.id] === q.correctAnswer;
            return (
              <div key={q.id} className={`${styles.questionCard} ${isSubmitted ? (isCorrect ? styles.correctCard : styles.incorrectCard) : ''}`}>
                <div className={styles.qNum}>Question {idx + 1}</div>
                <h3 className={styles.qText}>{q.question}</h3>

                <div className={styles.optionsGrid}>
                  {q.options?.map((opt, oIdx) => {
                    const isSelected = answers[q.id] === opt;
                    return (
                      <label 
                        key={oIdx} 
                        className={`${styles.optionLabel} ${isSelected ? styles.selectedOpt : ''}`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={isSelected}
                          disabled={isSubmitted}
                          onChange={() => handleSelectOption(q.id, opt)}
                          className={styles.radioInput}
                        />
                        <span className={styles.optLetter}>{String.fromCharCode(65 + oIdx)}.</span>
                        <span className={styles.optText}>{opt}</span>
                      </label>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <div className={styles.explanationBox}>
                    <div className={styles.expHeader}>
                      {isCorrect ? '✓ Correct Answer' : `✗ Incorrect (Correct: ${q.correctAnswer})`}
                    </div>
                    <p className={styles.expText}>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SUBMISSION & SCORE */}
        {!isSubmitted ? (
          <div className={styles.submitRow}>
            <button 
              onClick={handleSubmit} 
              disabled={Object.keys(answers).length < listeningSection.questions.length}
              className={styles.submitBtn}
            >
              Submit Listening Test & Grade
            </button>
          </div>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={styles.scoreContainer}>
            <div className={styles.scoreBanner}>
              <span className={styles.scoreTag}>Listening Band Result</span>
              <div className={styles.bandNum}>Band {band}</div>
              <p className={styles.scoreDetail}>You scored {score} out of {listeningSection.questions.length} questions correctly.</p>
            </div>

            <div className={styles.resultActions}>
              <button onClick={() => setShowTranscript(!showTranscript)} className={styles.transcriptBtn}>
                {showTranscript ? 'Hide Audio Transcript' : '📜 View Full Audio Transcript'}
              </button>
              <Link href="/ielts" className={styles.primaryBtn}>
                Explore Next Module →
              </Link>
            </div>

            {showTranscript && (
              <div className={styles.transcriptView}>
                <h4>Complete Audio Script Transcript</h4>
                <pre className={styles.transcriptText}>{listeningSection.transcript}</pre>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
