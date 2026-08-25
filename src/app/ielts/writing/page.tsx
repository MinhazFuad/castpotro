'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { writingPrompts } from '@/lib/ielts-data';
import { playPopSound, playChimeSound } from '@/lib/sound';
import styles from './page.module.css';

export default function WritingPage() {
  const [selectedTaskIdx, setSelectedTaskIdx] = useState(0);
  const [essayContent, setEssayContent] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<any>(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const activePrompt = writingPrompts[selectedTaskIdx];
  const words = essayContent.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  useEffect(() => {
    let interval: any = null;
    if (!evalResult) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [evalResult]);

  const handleTaskSwitch = (idx: number) => {
    playPopSound();
    setSelectedTaskIdx(idx);
    setEssayContent('');
    setEvalResult(null);
    setSecondsElapsed(0);
  };

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    try {
      const response = await fetch('/api/ielts/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'writing',
          taskType: activePrompt.taskType,
          content: essayContent
        })
      });

      const data = await response.json();
      if (data.success) {
        setEvalResult(data);
        playChimeSound();
      }
    } catch (e) {
      console.error(e);
      alert('Error evaluating essay.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isLengthSufficient = wordCount >= activePrompt.minWords;

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <Link href="/ielts" className={styles.backLink}>
            <span>← Back to IELTS Hub</span>
          </Link>
          <div className={styles.brandTitle}>
            <span>IELTS Writing Smart Evaluator</span>
          </div>
          <div className={styles.timerPill}>
            ⏱ Time: {formatTimer(secondsElapsed)}
          </div>
        </div>
      </header>

      <div className={`container ${styles.editorLayout}`}>
        {/* LEFT PANE: PROMPT & OUTLINE */}
        <section className={styles.promptPane}>
          <div className={styles.taskTabs}>
            {writingPrompts.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handleTaskSwitch(idx)}
                className={`${styles.tabBtn} ${selectedTaskIdx === idx ? styles.tabActive : ''}`}
              >
                {p.taskType}: {p.minWords} Words
              </button>
            ))}
          </div>

          <div className={styles.promptCard}>
            <div className={styles.taskTypeBadge}>{activePrompt.taskType} • {activePrompt.title}</div>
            <h3 className={styles.promptTitle}>Prompt Question:</h3>
            <p className={styles.promptBody}>{activePrompt.prompt}</p>

            <div className={styles.outlineBox}>
              <h4>Recommended Essay Structure:</h4>
              <ul>
                {activePrompt.sampleOutline.map((item, oIdx) => (
                  <li key={oIdx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.guidanceNotes}>
              <span>💡 Aim for clear paragraphing with connective devices (e.g. <em>Furthermore, Conversely, In conclusion</em>).</span>
            </div>
          </div>
        </section>

        {/* RIGHT PANE: TEXTAREA & LIVE EVALUATOR */}
        <section className={styles.writingPane}>
          <div className={styles.editorToolbar}>
            <div className={styles.wordCounter}>
              <span>Words: <strong>{wordCount}</strong> / {activePrompt.minWords} min</span>
              <span className={`${styles.statusBadge} ${isLengthSufficient ? styles.badgeSuccess : styles.badgeWarning}`}>
                {isLengthSufficient ? '✓ Minimum Reached' : `Under Length (${activePrompt.minWords - wordCount} more)`}
              </span>
            </div>
          </div>

          <textarea
            value={essayContent}
            onChange={(e) => setEssayContent(e.target.value)}
            placeholder="Type your essay response here. Use formal academic vocabulary and logical paragraph transitions..."
            className={styles.essayTextarea}
            rows={14}
          />

          {!evalResult ? (
            <button
              onClick={handleEvaluate}
              disabled={wordCount < 20 || isEvaluating}
              className={styles.evaluateBtn}
            >
              {isEvaluating ? 'Evaluating Essay...' : '🚀 Submit for AI IELTS Band Evaluation'}
            </button>
          ) : (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={styles.evalResultBox}>
              <div className={styles.resultBanner}>
                <span className={styles.bannerTag}>Writing Band Score</span>
                <div className={styles.bandNum}>Band {evalResult.overallBand}</div>
                <p className={styles.verdictText}>{evalResult.feedback}</p>
              </div>

              <div className={styles.subGrid}>
                {evalResult.subScores && Object.entries(evalResult.subScores).map(([cat, val]: any) => (
                  <div key={cat} className={styles.subCard}>
                    <div className={styles.subCat}>{cat}</div>
                    <div className={styles.subVal}>Band {val}</div>
                  </div>
                ))}
              </div>

              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <span>Total Words</span>
                  <strong>{evalResult.wordCount}</strong>
                </div>
                <div className={styles.metaItem}>
                  <span>Lexical Variety</span>
                  <strong>{evalResult.lexicalDiversity}%</strong>
                </div>
                <div className={styles.metaItem}>
                  <span>Academic Markers</span>
                  <strong>{evalResult.academicKeywordsUsed}</strong>
                </div>
              </div>

              <div className={styles.actionRow}>
                <Link href="/ielts" className={styles.primaryBtn}>
                  Return to IELTS Hub
                </Link>
                <button onClick={() => setEvalResult(null)} className={styles.editBtn}>
                  ✏️ Edit & Re-Evaluate
                </button>
              </div>
            </motion.div>
          )}
        </section>
      </div>
    </main>
  );
}
