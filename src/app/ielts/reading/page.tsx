'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { readingSection } from '@/lib/ielts-data';
import { playPopSound, playChimeSound } from '@/lib/sound';
import styles from './page.module.css';

export default function ReadingPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [band, setBand] = useState<number | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (!isSubmitted) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const handleSelectOption = (qId: string, option: string) => {
    playPopSound();
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = () => {
    let correct = 0;
    readingSection.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });

    setScore(correct);
    let calculatedBand = 5.0;
    if (correct === 4) calculatedBand = 8.5;
    else if (correct === 3) calculatedBand = 7.0;
    else if (correct === 2) calculatedBand = 6.0;
    else if (correct === 1) calculatedBand = 5.0;
    else calculatedBand = 4.0;

    setBand(calculatedBand);
    setIsSubmitted(true);
    playChimeSound();
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <Link href="/ielts" className={styles.backLink}>
            <span>← Back to IELTS Hub</span>
          </Link>
          <div className={styles.brandTitle}>
            <span>IELTS Academic Reading Diagnostic</span>
          </div>
          <div className={styles.timerPill}>
            ⏱ Time: {formatTimer(secondsElapsed)}
          </div>
        </div>
      </header>

      <div className={`container ${styles.splitLayout}`}>
        {/* LEFT PANE: PASSAGE */}
        <section className={styles.passageCol}>
          <div className={styles.passageHeader}>
            <span className={styles.passageBadge}>Academic Reading Passage</span>
            <h2 className={styles.passageTitle}>{readingSection.title}</h2>
          </div>
          <div className={styles.passageBody}>
            {readingSection.passage.split('\n\n').map((para, idx) => (
              <p key={idx} className={styles.paragraph}>{para}</p>
            ))}
          </div>
        </section>

        {/* RIGHT PANE: QUESTIONS */}
        <section className={styles.questionsCol}>
          <div className={styles.qColHeader}>
            <span className={styles.qBadge}>Comprehension Questions</span>
            <span className={styles.qStatus}>{Object.keys(answers).length} of {readingSection.questions.length} Answered</span>
          </div>

          <div className={styles.qList}>
            {readingSection.questions.map((q, idx) => {
              const isCorrect = answers[q.id] === q.correctAnswer;
              return (
                <div key={q.id} className={`${styles.qCard} ${isSubmitted ? (isCorrect ? styles.correctCard : styles.incorrectCard) : ''}`}>
                  <div className={styles.qNum}>Question {idx + 1} ({q.type === 'true-false-notgiven' ? 'True / False / Not Given' : 'Multiple Choice'})</div>
                  <h4 className={styles.qText}>{q.question}</h4>

                  <div className={styles.optionsGrid}>
                    {q.options?.map((opt, oIdx) => {
                      const isSelected = answers[q.id] === opt;
                      return (
                        <label key={oIdx} className={`${styles.optLabel} ${isSelected ? styles.optSelected : ''}`}>
                          <input
                            type="radio"
                            name={q.id}
                            checked={isSelected}
                            disabled={isSubmitted}
                            onChange={() => handleSelectOption(q.id, opt)}
                            className={styles.radioInput}
                          />
                          <span className={styles.optText}>{opt}</span>
                        </label>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className={styles.expBox}>
                      <div className={styles.expHeader}>
                        {isCorrect ? '✓ Correct Answer' : `✗ Correct Answer: ${q.correctAnswer}`}
                      </div>
                      <p className={styles.expDetail}>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* SUBMIT / RESULTS */}
          {!isSubmitted ? (
            <div className={styles.submitRow}>
              <button 
                onClick={handleSubmit}
                disabled={Object.keys(answers).length < readingSection.questions.length}
                className={styles.submitBtn}
              >
                Submit Reading Assessment
              </button>
            </div>
          ) : (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={styles.resultBox}>
              <div className={styles.bandHeader}>
                <span>Reading Band Score</span>
                <h3>Band {band}</h3>
                <p>You answered {score}/{readingSection.questions.length} correctly in {formatTimer(secondsElapsed)}.</p>
              </div>
              <Link href="/ielts" className={styles.continueBtn}>
                Proceed to Next Module →
              </Link>
            </motion.div>
          )}
        </section>
      </div>
    </main>
  );
}
