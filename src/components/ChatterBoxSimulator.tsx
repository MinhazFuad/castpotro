'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playPopSound, playSwooshSound, playChimeSound, playBuzzerSound } from '@/lib/sound';
import styles from './ChatterBoxSimulator.module.css';

const sampleTopics = [
  "If you had the power to establish one global rule for all humans, what would it be and why?",
  "What is the single most valuable lesson you learned from a personal failure?",
  "Is artificial intelligence bringing human culture closer together or isolating us more?",
  "If you could travel back in time for exactly 24 hours, which historical era would you visit?",
  "Why is emotional intelligence often more crucial for leadership than technical expertise?",
  "What is one daily habit that completely transformed your focus and productivity?",
  "If your life were a podcast title, what would today's episode be called?",
  "How can authentic storytelling break down cultural misunderstandings across continents?",
  "What book or film has had the deepest philosophical influence on your decisions?",
  "What advice would you give to your 14-year-old self about overcoming self-doubt?"
];

export default function ChatterBoxSimulator() {
  const [topicIndex, setTopicIndex] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && timerActive) {
      setTimerActive(false);
      setCompleted(true);
      playBuzzerSound();
    }
    return () => clearInterval(interval);
  }, [timerActive, secondsLeft]);

  const handleNextTopic = () => {
    playPopSound();
    setTopicIndex((prev) => (prev + 1) % sampleTopics.length);
    setTimerActive(false);
    setSecondsLeft(60);
    setCompleted(false);
  };

  const handleStartTimer = () => {
    playChimeSound();
    setTimerActive(true);
    setCompleted(false);
    if (secondsLeft === 0) setSecondsLeft(60);
  };

  const handlePauseTimer = () => {
    playSwooshSound();
    setTimerActive(false);
  };

  const handleReset = () => {
    playSwooshSound();
    setTimerActive(false);
    setSecondsLeft(60);
    setCompleted(false);
  };

  const progress = ((60 - secondsLeft) / 60) * 100;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.simulatorCard}>
          <div className={styles.cardHeader}>
            <div className={styles.badgeWrapper}>
              <span className={styles.liveDot}></span>
              <span className={styles.badgeText}>[ 60-SECOND DRILL ]</span>
            </div>
            <h2 className={styles.title}>Chatter Box Impromptu Simulator</h2>
            <p className={styles.subtitle}>
              Practice Castpotro's signature impromptu speaking drill. Shuffle a random unannounced prompt, hit start, and speak fearlessly for 60 seconds.
            </p>
          </div>

          <div className={styles.topicBox}>
            <div className={styles.topicLabel}>PROMPT № 0{topicIndex + 1} // SPEAKING DRILL</div>
            <motion.div 
              key={topicIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.topicPrompt}
            >
              "{sampleTopics[topicIndex]}"
            </motion.div>

            <button onClick={handleNextTopic} className={styles.shuffleBtn}>
              <span>🎲 Shuffle Prompt</span>
            </button>
          </div>

          {/* TIMER DISPLAY */}
          <div className={styles.timerWrapper}>
            <div className={`${styles.timerCircle} ${secondsLeft <= 10 && timerActive ? styles.timerWarning : ''}`}>
              <div className={styles.timerNumber}>{secondsLeft}</div>
              <div className={styles.timerUnit}>SECONDS</div>
              <svg className={styles.circleSvg} viewBox="0 0 100 100">
                <circle className={styles.circleBg} cx="50" cy="50" r="44" />
                <circle 
                  className={styles.circleProgress} 
                  cx="50" 
                  cy="50" 
                  r="44" 
                  strokeDasharray="276"
                  strokeDashoffset={276 - (276 * progress) / 100}
                />
              </svg>
            </div>

            <div className={styles.controlsRow}>
              {!timerActive ? (
                <button onClick={handleStartTimer} className={styles.startBtn}>
                  {secondsLeft < 60 && !completed ? '▶ Resume Drill' : '🎙️ Start 60s Turn'}
                </button>
              ) : (
                <button onClick={handlePauseTimer} className={styles.pauseBtn}>
                  ⏸ Pause Timer
                </button>
              )}
              
              <button onClick={handleReset} className={styles.resetBtn}>
                ↺ Reset
              </button>
            </div>

            {completed && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={styles.celebrationBanner}
              >
                🎉 <strong>60 Seconds Completed!</strong> Excellent discipline. Join our live weekly Discord circles to do this with fellow international broadcasters!
              </motion.div>
            )}

            <div className={styles.guidanceTips}>
              <div className={styles.tipItem}>
                <span className={styles.tipTime}>00-10s</span>
                <span className={styles.tipText}>Hook & Stance</span>
              </div>
              <div className={styles.tipDivider}>//</div>
              <div className={styles.tipItem}>
                <span className={styles.tipTime}>10-45s</span>
                <span className={styles.tipText}>Anecdote / Example</span>
              </div>
              <div className={styles.tipDivider}>//</div>
              <div className={styles.tipItem}>
                <span className={styles.tipTime}>45-60s</span>
                <span className={styles.tipText}>Punchy Takeaway</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
