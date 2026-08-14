'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { questions } from '@/lib/test-data';
import { playPopSound, playSwooshSound } from '@/lib/sound';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import styles from './page.module.css';

interface CandidateInfo {
  name: string;
  email: string;
  department: string;
}

interface TestResults {
  dominantTrait: string;
  strength: string;
  improvement: string;
  totalPercentage: number;
}

export default function TestPage() {
  const router = useRouter();
  const [step, setStep] = useState<'form' | 'instructions' | 'test' | 'finished'>('form');
  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo>({
    name: '', email: '', department: ''
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<TestResults | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const [showMilestone, setShowMilestone] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  useEffect(() => {
    if (step !== 'test' || isSubmitting || showMilestone) return;

    if (timeLeft <= 0) {
      handleNext();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, step, isSubmitting, showMilestone]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (candidateInfo.name && candidateInfo.email && candidateInfo.department) {
      setStep('instructions');
    }
  };

  const startTest = () => {
    playSwooshSound();
    setStep('test');
    setTimeLeft(60);
  };

  const question = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    playPopSound();
    setAnswers((prev) => ({
      ...prev,
      [question.id]: optionIndex,
    }));
  };

  const handleNext = async () => {
    playSwooshSound();
    
    if (currentIndex === 9 && !showMilestone) {
      setShowMilestone(true);
      return;
    }
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(60);
    } else {
      await handleSubmitTest();
    }
  };

  const handleSubmitTest = async () => {
    setIsSubmitting(true);
    try {
      let totalCognitiveScore = 0;
      const domainScores: Record<string, number> = {
        Numerical: 0, Verbal: 0, Logical: 0, Spatial: 0, 'Emotional Intelligence': 0
      };
      const traitCounts: Record<string, number> = {};

      questions.forEach((q) => {
        const answer = answers[q.id];
        if (answer === undefined) return; 

        if (q.domain === 'Personality' && q.traitMapping) {
          const trait = q.traitMapping[answer];
          traitCounts[trait] = (traitCounts[trait] || 0) + 1;
        } else if (q.correctAnswer !== undefined && answer === q.correctAnswer) {
          if (q.domain !== 'Emotional Intelligence') {
            totalCognitiveScore += 1;
          }
          if (domainScores[q.domain] !== undefined) {
            domainScores[q.domain] += 1;
          }
        }
      });

      // Calculate total percentage: Cognitive is out of 12 (60% weight). Personality/EQ gives automatic 40%.
      const cognitivePercentage = (totalCognitiveScore / 12) * 60;
      const totalPercentage = cognitivePercentage + 40;

      let dominantTrait = 'Versatile';
      let maxTrait = 0;
      for (const [trait, count] of Object.entries(traitCounts)) {
        if (count > maxTrait) {
          maxTrait = count;
          dominantTrait = trait;
        }
      }

      let strength = 'General';
      let maxScore = -1;
      let improvement = 'General';
      let minScore = 999;

      // Only check cognitive domains for strength/improvement
      const cognitiveDomains = ['Numerical', 'Verbal', 'Logical', 'Spatial'];
      for (const domain of cognitiveDomains) {
        const score = domainScores[domain];
        if (score > maxScore) {
          maxScore = score;
          strength = domain;
        }
        if (score < minScore) {
          minScore = score;
          improvement = domain;
        }
      }

      const calculatedResults = {
        dominantTrait,
        strength: `${strength} Reasoning`,
        improvement: `Brush up on ${improvement} skills`,
        totalPercentage
      };

      setResults(calculatedResults);

      const response = await fetch('/api/submit-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          candidateInfo, answers, totalPercentage, domainScores, dominantTrait, total: questions.length 
        }),
      });

      if (response.ok) {
        setStep('finished');
      } else {
        alert('There was an error submitting your test.');
      }
    } catch (error) {
      console.error(error);
      alert('Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `0${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (step === 'finished' && results) {
    return (
      <main className={styles.container} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Confetti 
          width={windowSize.width} 
          height={windowSize.height} 
          recycle={false} 
          numberOfPieces={600} 
          gravity={0.15}
        />
        
        <Image src="/logo.png" alt="Logo" width={80} height={80} className={styles.logoSmall} />
        <h1 className={styles.questionText}>Application Submitted</h1>
        <p className={styles.progressText} style={{ marginBottom: '2rem' }}>
          Thank you, {candidateInfo.name}! We have analyzed your profile. Here is a quick summary:
        </p>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className={styles.resultsGrid}
        >
          <div className={styles.resultCard} style={{ gridColumn: '1 / -1', backgroundColor: 'var(--primary)', color: 'white' }}>
            <h3 className={styles.resultTitle} style={{ color: '#f4eff7' }}>Total Score</h3>
            <p className={styles.resultValue} style={{ fontSize: 'clamp(2.25rem, 7vw, 3rem)', color: 'white' }}>{results.totalPercentage.toFixed(0)}%</p>
          </div>
          <div className={styles.resultCard}>
            <h3 className={styles.resultTitle}>Core Strength</h3>
            <p className={styles.resultValue}>{results.strength}</p>
          </div>
          <div className={styles.resultCard}>
            <h3 className={styles.resultTitle}>Personality Trait</h3>
            <p className={styles.resultValue}>The {results.dominantTrait}</p>
          </div>
          <div className={styles.resultCard}>
            <h3 className={styles.resultTitle}>Suggestion</h3>
            <p className={styles.resultValue}>{results.improvement}</p>
          </div>
        </motion.div>

        <button className={styles.button} onClick={() => router.push('/')}>
          Return Home
        </button>
      </main>
    );
  }

  if (step === 'form') {
    return (
      <main className={styles.container}>
        <Image src="/logo.png" alt="Logo" width={80} height={80} className={styles.logoSmall} />
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={styles.formContainer}
        >
          <h1 className={styles.formTitle}>Candidate Registration</h1>
          <p className={styles.formSubtitle}>Please provide your details before starting the test.</p>
          <form onSubmit={handleFormSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <input required type="text" className={styles.input} value={candidateInfo.name} onChange={e => setCandidateInfo({...candidateInfo, name: e.target.value})} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input required type="email" className={styles.input} value={candidateInfo.email} onChange={e => setCandidateInfo({...candidateInfo, email: e.target.value})} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Department</label>
              <select required className={styles.input} value={candidateInfo.department} onChange={e => setCandidateInfo({...candidateInfo, department: e.target.value})}>
                <option value="">Select Department</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Content">Content</option>
                <option value="Event">Event</option>
              </select>
            </div>
            <button type="submit" className={styles.button} style={{ width: '100%' }}>
              Continue
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  if (step === 'instructions') {
    return (
      <main className={styles.container}>
        <Image src="/logo.png" alt="Logo" width={80} height={80} className={styles.logoSmall} />
        <motion.div 
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={styles.formContainer}
        >
          <h1 className={styles.formTitle}>Instructions & Checklist</h1>
          <p className={styles.formSubtitle}>Please read carefully before starting the assessment.</p>
          
          <div style={{ marginBottom: '1.5rem', textAlign: 'left', lineHeight: 1.6 }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span> 
                <span><strong>Time Limit:</strong> You have exactly 1 minute (60 seconds) to answer each question.</span>
              </li>
              <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span> 
                <span><strong>No Going Back:</strong> Once you move to the next question, you cannot return to previous ones.</span>
              </li>
              <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span> 
                <span><strong>Honesty:</strong> Emotional Intelligence and Personality questions have no "wrong" answers. Answer based on how you would genuinely act.</span>
              </li>
            </ul>
          </div>

          <label style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginTop: '1rem', marginBottom: '2rem', cursor: 'pointer', backgroundColor: '#f4eff7', padding: '1.25rem', borderRadius: '12px', border: '2px solid var(--border)' }}>
            <input type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} style={{ width: '24px', height: '24px', accentColor: 'var(--primary)', marginTop: '2px' }} />
            <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>I confirm I will not use AI, search engines, or outside help. Any cheating will immediately disqualify me.</span>
          </label>
          
          <button onClick={startTest} className={styles.button} style={{ width: '100%' }} disabled={!agreedToTerms}>
            I am Ready — Start Test
          </button>
        </motion.div>
      </main>
    );
  }

  if (showMilestone) {
    return (
      <main className={styles.container} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
        >
          <h1 className={styles.questionText} style={{ fontSize: 'clamp(1.75rem, 6vw, 2.75rem)' }}>🎉 Halfway There! 🎉</h1>
          <p className={styles.progressText} style={{ marginBottom: '3rem', fontSize: '1.25rem' }}>
            You've completed 10 questions. You're doing absolutely fantastic!<br/>Keep up the great work.
          </p>
          <button 
            className={styles.button} 
            onClick={() => {
              playPopSound();
              setShowMilestone(false);
              setCurrentIndex(10);
              setTimeLeft(60);
            }}
          >
            Continue Test
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.progressText}>
            Question {currentIndex + 1} of {questions.length}
          </div>
          <div className={`${styles.timerBadge} ${timeLeft <= 10 ? styles.timerWarning : ''}`}>
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.section 
          key={currentIndex}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.questionCard}
        >
          <div>
            <span className={styles.domainBadge}>{question.domain}</span>
            <h2 className={styles.questionText}>{question.text}</h2>
          </div>
          
          {question.imageUrl && (
            <div style={{ marginBottom: '2rem' }}>
              <Image src={question.imageUrl} alt="Question Visual" width={600} height={200} className={styles.questionImage} />
            </div>
          )}

          <div className={styles.optionsGrid} style={{ gridTemplateColumns: question.optionImages ? 'repeat(2, 1fr)' : '1fr' }}>
            {question.options.map((option, idx) => {
              const isSelected = answers[question.id] === idx;
              const hasOptionImage = question.optionImages && question.optionImages[idx];
              
              return (
                <label key={idx} className={`${styles.optionLabel} ${hasOptionImage ? styles.optionLabelWithImage : ''} ${isSelected ? styles.selected : ''}`}>
                  <input
                    type="radio"
                    name={question.id}
                    className={styles.optionInput}
                    checked={isSelected}
                    onChange={() => handleOptionSelect(idx)}
                  />
                  <span className={`${styles.optionText} ${hasOptionImage ? styles.optionTextWithImage : ''}`}>{option}</span>
                  {hasOptionImage && (
                    <span className={styles.optionImageWrapper}>
                      <Image src={question.optionImages![idx]} alt={`Option ${option}`} width={100} height={100} className={styles.optionImage} />
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </motion.section>
      </AnimatePresence>

      <footer className={styles.footer}>
        <button 
          className={styles.button} 
          onClick={handleNext}
          disabled={answers[question.id] === undefined || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : currentIndex === questions.length - 1 ? 'Finish Test' : 'Next Question'}
        </button>
      </footer>
    </main>
  );
}
