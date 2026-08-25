'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { speakingPart1, speakingPart2CueCard, speakingPart3 } from '@/lib/ielts-data';
import { speakText, stopSpeaking, LiveSpeechTranscriber } from '@/lib/speech-service';
import { playPopSound, playChimeSound, playBuzzerSound } from '@/lib/sound';
import styles from './page.module.css';

export default function SpeakingPage() {
  // Test Flow States: 'welcome' | 'part1' | 'part2_prep' | 'part2_speak' | 'part3' | 'evaluating' | 'results'
  const [testStage, setTestStage] = useState<'welcome' | 'part1' | 'part2_prep' | 'part2_speak' | 'part3' | 'evaluating' | 'results'>('welcome');
  
  // Part 1 Index
  const [part1Index, setPart1Index] = useState(0);
  // Part 3 Index
  const [part3Index, setPart3Index] = useState(0);

  // Audio / STT
  const [isExaminerSpeaking, setIsExaminerSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcripts, setTranscripts] = useState<Record<string, string>>({});
  const [currentText, setCurrentText] = useState('');
  
  // Timers
  const [prepSeconds, setPrepSeconds] = useState(60);
  const [speakSeconds, setSpeakSeconds] = useState(120);
  const [prepNotes, setPrepNotes] = useState('');

  // Results
  const [evalResult, setEvalResult] = useState<any>(null);

  const transcriberRef = useRef<LiveSpeechTranscriber | null>(null);

  // Initialize Speech Transcriber
  useEffect(() => {
    transcriberRef.current = new LiveSpeechTranscriber(
      (fullText) => {
        setCurrentText(fullText);
      },
      (err) => console.warn('STT error:', err)
    );

    return () => {
      stopSpeaking();
      if (transcriberRef.current) transcriberRef.current.stop();
    };
  }, []);

  // Part 2 Prep Countdown
  useEffect(() => {
    let interval: any = null;
    if (testStage === 'part2_prep' && prepSeconds > 0) {
      interval = setInterval(() => {
        setPrepSeconds((prev) => prev - 1);
      }, 1000);
    } else if (testStage === 'part2_prep' && prepSeconds === 0) {
      playBuzzerSound();
      startPart2Speaking();
    }
    return () => clearInterval(interval);
  }, [testStage, prepSeconds]);

  // Part 2 Speak Countdown
  useEffect(() => {
    let interval: any = null;
    if (testStage === 'part2_speak' && speakSeconds > 0 && isRecording) {
      interval = setInterval(() => {
        setSpeakSeconds((prev) => prev - 1);
      }, 1000);
    } else if (testStage === 'part2_speak' && speakSeconds === 0) {
      handleFinishPart2();
    }
    return () => clearInterval(interval);
  }, [testStage, speakSeconds, isRecording]);

  const handleStartTest = () => {
    playChimeSound();
    setTestStage('part1');
    setPart1Index(0);
    triggerExaminerSpeech(speakingPart1[0].question);
  };

  const triggerExaminerSpeech = (text: string) => {
    setIsExaminerSpeaking(true);
    speakText(text, () => {
      setIsExaminerSpeaking(false);
    });
  };

  const startRecording = () => {
    playPopSound();
    setIsRecording(true);
    if (transcriberRef.current) {
      transcriberRef.current.start(currentText);
    }
  };

  const pauseRecording = () => {
    playPopSound();
    setIsRecording(false);
    if (transcriberRef.current) {
      transcriberRef.current.stop();
    }
  };

  // Move to next Part 1 question
  const handleNextPart1 = () => {
    pauseRecording();
    const key = `p1_${part1Index}`;
    setTranscripts((prev) => ({ ...prev, [key]: currentText }));
    setCurrentText('');

    if (part1Index < speakingPart1.length - 1) {
      const nextIdx = part1Index + 1;
      setPart1Index(nextIdx);
      triggerExaminerSpeech(speakingPart1[nextIdx].question);
    } else {
      // Proceed to Part 2 Prep
      setTestStage('part2_prep');
      setPrepSeconds(60);
      triggerExaminerSpeech("Now, in Part 2, I am going to give you a cue card. You have one minute to prepare your notes, and then two minutes to speak.");
    }
  };

  // Start Part 2 Speaking
  const startPart2Speaking = () => {
    setTestStage('part2_speak');
    setSpeakSeconds(120);
    setCurrentText('');
    triggerExaminerSpeech("Your preparation time is complete. Please begin speaking for up to two minutes.");
  };

  const handleFinishPart2 = () => {
    pauseRecording();
    setTranscripts((prev) => ({ ...prev, p2_cue: currentText }));
    setCurrentText('');
    setTestStage('part3');
    setPart3Index(0);
    triggerExaminerSpeech("Thank you. Now, let's move to Part 3. " + speakingPart3[0].question);
  };

  // Part 3 Next
  const handleNextPart3 = async () => {
    pauseRecording();
    const key = `p3_${part3Index}`;
    const updatedTranscripts = { ...transcripts, [key]: currentText };
    setTranscripts(updatedTranscripts);
    setCurrentText('');

    if (part3Index < speakingPart3.length - 1) {
      const nextIdx = part3Index + 1;
      setPart3Index(nextIdx);
      triggerExaminerSpeech(speakingPart3[nextIdx].question);
    } else {
      // All 3 Parts Complete -> Evaluate
      setTestStage('evaluating');
      await evaluateFullSpeaking(updatedTranscripts);
    }
  };

  const evaluateFullSpeaking = async (allTranscripts: Record<string, string>) => {
    const combinedSpeech = Object.values(allTranscripts).join(' ');
    try {
      const response = await fetch('/api/ielts/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'speaking',
          transcript: combinedSpeech,
        })
      });

      const data = await response.json();
      if (data.success) {
        setEvalResult(data);
        playChimeSound();
        setTestStage('results');
      } else {
        alert('Evaluation error. Generating fallback results.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <Link href="/ielts" className={styles.backLink}>
            <span>← Back to IELTS Hub</span>
          </Link>
          <div className={styles.brandTitle}>
            <span>IELTS Speaking Interview Simulator</span>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: '2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* STAGE: WELCOME */}
        {testStage === 'welcome' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={styles.welcomeCard}>
            <div className={styles.examinerAvatar}>🎙️</div>
            <h1 className={styles.welcomeTitle}>IELTS Speaking Diagnostic Interview</h1>
            <p className={styles.welcomeDesc}>
              This test replicates the official 3-part IELTS Speaking interview. The AI Voice Examiner will speak each question aloud. Enable your microphone to record your answers with live Speech-to-Text transcription.
            </p>

            <div className={styles.partsBreakdown}>
              <div className={styles.partItem}>
                <span className={styles.partBadge}>Part 1</span>
                <h4>Introduction & General Qs</h4>
                <p>4 questions on familiar topics (Hometown, Work/Study, Communication).</p>
              </div>
              <div className={styles.partItem}>
                <span className={styles.partBadge}>Part 2</span>
                <h4>The Cue Card Long Turn</h4>
                <p>1 minute to prepare notes + 2 minutes continuous speech.</p>
              </div>
              <div className={styles.partItem}>
                <span className={styles.partBadge}>Part 3</span>
                <h4>Two-Way Discussion</h4>
                <p>3 abstract, analytical questions expanding on the topic.</p>
              </div>
            </div>

            <button onClick={handleStartTest} className={styles.primaryBtn}>
              Begin Speaking Interview
            </button>
          </motion.div>
        )}

        {/* STAGE: PART 1 */}
        {testStage === 'part1' && (
          <div className={styles.interviewContainer}>
            <div className={styles.partHeader}>
              <span className={styles.partTag}>Part 1: Introduction & Interview</span>
              <span className={styles.qCount}>Question {part1Index + 1} of {speakingPart1.length}</span>
            </div>

            <div className={styles.examinerBubble}>
              <div className={styles.examinerLabel}>
                <span>AI Examiner</span>
                {isExaminerSpeaking && <span className={styles.speakingWave}>🔊 Speaking...</span>}
              </div>
              <p className={styles.questionText}>"{speakingPart1[part1Index].question}"</p>
              <button 
                onClick={() => triggerExaminerSpeech(speakingPart1[part1Index].question)} 
                className={styles.repeatBtn}
              >
                🔊 Replay Question Audio
              </button>
            </div>

            <div className={styles.responseBox}>
              <div className={styles.responseTop}>
                <span className={styles.responseLabel}>Your Spoken Response (Speech-to-Text Transcription):</span>
                <span className={styles.wordCountBadge}>{currentText.split(/\s+/).filter(w => w.length > 0).length} words</span>
              </div>

              <textarea
                value={currentText}
                onChange={(e) => setCurrentText(e.target.value)}
                placeholder="Click 'Start Microphone' and begin speaking into your mic. Your speech will transcribe live here..."
                className={styles.transcriptInput}
                rows={4}
              />

              <div className={styles.actionRow}>
                {!isRecording ? (
                  <button onClick={startRecording} className={styles.micBtn}>
                    🎙️ Start Microphone
                  </button>
                ) : (
                  <button onClick={pauseRecording} className={styles.stopMicBtn}>
                    ⏹ Stop Recording
                  </button>
                )}

                <button onClick={handleNextPart1} className={styles.nextBtn}>
                  {part1Index < speakingPart1.length - 1 ? 'Next Question →' : 'Proceed to Part 2 (Cue Card) →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE: PART 2 PREPARATION */}
        {testStage === 'part2_prep' && (
          <div className={styles.cueCardContainer}>
            <div className={styles.partHeader}>
              <span className={styles.partTag}>Part 2: Cue Card Task</span>
              <span className={styles.timerBadge}>⏱ Prep Time Remaining: {prepSeconds}s</span>
            </div>

            <div className={styles.cueCard}>
              <h3 className={styles.cueTitle}>{speakingPart2CueCard.title}</h3>
              <p className={styles.cuePrompt}>{speakingPart2CueCard.prompt}</p>
              <div className={styles.bulletList}>
                <p><strong>You should say:</strong></p>
                <ul>
                  {speakingPart2CueCard.bulletPoints.map((bp, idx) => (
                    <li key={idx}>{bp}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.notesSection}>
              <label className={styles.notesLabel}>Preparation Scratchpad (Jot down your keywords & structure):</label>
              <textarea
                value={prepNotes}
                onChange={(e) => setPrepNotes(e.target.value)}
                placeholder="Type your bullet points, key vocabulary, and transition ideas here..."
                className={styles.notesInput}
                rows={3}
              />
            </div>

            <button onClick={startPart2Speaking} className={styles.primaryBtn} style={{ marginTop: '1.5rem' }}>
              I'm Ready — Start 2-Minute Speaking Turn Now
            </button>
          </div>
        )}

        {/* STAGE: PART 2 SPEAKING */}
        {testStage === 'part2_speak' && (
          <div className={styles.cueCardContainer}>
            <div className={styles.partHeader}>
              <span className={styles.partTag}>Part 2: Speaking Turn</span>
              <span className={`${styles.timerBadge} ${speakSeconds <= 15 ? styles.timerWarning : ''}`}>
                ⏱ Speaking Time: {speakSeconds}s
              </span>
            </div>

            <div className={styles.cueCardMini}>
              <h4>{speakingPart2CueCard.title}</h4>
              <p>{speakingPart2CueCard.prompt}</p>
            </div>

            <div className={styles.responseBox}>
              <div className={styles.responseTop}>
                <span className={styles.responseLabel}>Live Speech Transcription:</span>
                <span className={styles.wordCountBadge}>{currentText.split(/\s+/).filter(w => w.length > 0).length} words</span>
              </div>

              <textarea
                value={currentText}
                onChange={(e) => setCurrentText(e.target.value)}
                placeholder="Click 'Start Microphone' and address all bullet points in your speech..."
                className={styles.transcriptInput}
                rows={6}
              />

              <div className={styles.actionRow}>
                {!isRecording ? (
                  <button onClick={startRecording} className={styles.micBtn}>
                    🎙️ Start Microphone
                  </button>
                ) : (
                  <button onClick={pauseRecording} className={styles.stopMicBtn}>
                    ⏹ Stop Recording
                  </button>
                )}

                <button onClick={handleFinishPart2} className={styles.nextBtn}>
                  Finish Part 2 & Move to Part 3 →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE: PART 3 */}
        {testStage === 'part3' && (
          <div className={styles.interviewContainer}>
            <div className={styles.partHeader}>
              <span className={styles.partTag}>Part 3: Two-Way Analytical Discussion</span>
              <span className={styles.qCount}>Question {part3Index + 1} of {speakingPart3.length}</span>
            </div>

            <div className={styles.examinerBubble}>
              <div className={styles.examinerLabel}>
                <span>AI Examiner</span>
                {isExaminerSpeaking && <span className={styles.speakingWave}>🔊 Speaking...</span>}
              </div>
              <p className={styles.questionText}>"{speakingPart3[part3Index].question}"</p>
              <button 
                onClick={() => triggerExaminerSpeech(speakingPart3[part3Index].question)} 
                className={styles.repeatBtn}
              >
                🔊 Replay Question Audio
              </button>
            </div>

            <div className={styles.responseBox}>
              <div className={styles.responseTop}>
                <span className={styles.responseLabel}>Your Spoken Response:</span>
                <span className={styles.wordCountBadge}>{currentText.split(/\s+/).filter(w => w.length > 0).length} words</span>
              </div>

              <textarea
                value={currentText}
                onChange={(e) => setCurrentText(e.target.value)}
                placeholder="Express your viewpoint with structured arguments and examples..."
                className={styles.transcriptInput}
                rows={4}
              />

              <div className={styles.actionRow}>
                {!isRecording ? (
                  <button onClick={startRecording} className={styles.micBtn}>
                    🎙️ Start Microphone
                  </button>
                ) : (
                  <button onClick={pauseRecording} className={styles.stopMicBtn}>
                    ⏹ Stop Recording
                  </button>
                )}

                <button onClick={handleNextPart3} className={styles.nextBtn}>
                  {part3Index < speakingPart3.length - 1 ? 'Next Question →' : 'Complete Speaking Test & Calculate Score →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE: EVALUATING */}
        {testStage === 'evaluating' && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <h2>Analyzing Your Spoken English...</h2>
            <p>Evaluating Fluency, Lexical Resource, Grammatical Complexity, and Coherence markers across all 3 parts.</p>
          </div>
        )}

        {/* STAGE: RESULTS */}
        {testStage === 'results' && evalResult && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={styles.resultsContainer}>
            <div className={styles.resultBanner}>
              <span className={styles.resultBadge}>IELTS Speaking Band Score</span>
              <div className={styles.bandNumber}>Band {evalResult.overallBand}</div>
              <p className={styles.bandVerdict}>{evalResult.feedback}</p>
            </div>

            <div className={styles.subScoreGrid}>
              {evalResult.subScores && Object.entries(evalResult.subScores).map(([category, score]: any) => (
                <div key={category} className={styles.scoreCard}>
                  <div className={styles.scoreCat}>{category}</div>
                  <div className={styles.scoreVal}>Band {score}</div>
                </div>
              ))}
            </div>

            <div className={styles.metricsStrip}>
              <div className={styles.mItem}>
                <span className={styles.mVal}>{evalResult.wordCount}</span>
                <span className={styles.mLabel}>Total Words Spoken</span>
              </div>
              <div className={styles.mItem}>
                <span className={styles.mVal}>{evalResult.lexicalDiversity}%</span>
                <span className={styles.mLabel}>Lexical Diversity</span>
              </div>
              <div className={styles.mItem}>
                <span className={styles.mVal}>{evalResult.academicKeywordsUsed}</span>
                <span className={styles.mLabel}>Advanced Connectors</span>
              </div>
            </div>

            <div className={styles.resultActionRow}>
              <Link href="/ielts" className={styles.primaryBtn}>
                Explore Other IELTS Modules
              </Link>
              <button onClick={() => { setTestStage('welcome'); setTranscripts({}); setCurrentText(''); }} className={styles.retakeBtn}>
                ↺ Retake Speaking Test
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
