'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { playPopSound, playChimeSound } from '@/lib/sound';
import styles from './DepartmentMatcher.module.css';

interface QuizQuestion {
  question: string;
  options: {
    label: string;
    dept: 'Marketing' | 'HR' | 'Content' | 'Event';
    icon: string;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "When launching a new global initiative, what excites you the most?",
    options: [
      { label: "Spreading the word, growing audience reach & viral campaigns", dept: 'Marketing', icon: '📢' },
      { label: "Building the team, interviewing members & nurturing culture", dept: 'HR', icon: '🤝' },
      { label: "Scripting podcast narratives, editing audio & storytelling", dept: 'Content', icon: '✍️' },
      { label: "Planning live stages, speaker timelines & interactive logistics", dept: 'Event', icon: '🎪' }
    ]
  },
  {
    question: "What is your natural superpower when working in a group?",
    options: [
      { label: "Analyzing trends and crafting persuasive messaging", dept: 'Marketing', icon: '📈' },
      { label: "Mediating disagreements and ensuring everyone feels valued", dept: 'HR', icon: '❤️' },
      { label: "Researching deep topics and turning ideas into creative media", dept: 'Content', icon: '🎨' },
      { label: "Flawless organization, managing deadlines & hosting chaos", dept: 'Event', icon: '⏱️' }
    ]
  },
  {
    question: "Which Castpotro activity would you lead first?",
    options: [
      { label: "Collaborating with universities and social media influencers", dept: 'Marketing', icon: '🌐' },
      { label: "Mentoring new interns and organizing team well-being check-ins", dept: 'HR', icon: '🌱' },
      { label: "Producing our next Fall Season podcast on mental health", dept: 'Content', icon: '🎙️' },
      { label: "Hosting the 1-min Chatter Box circle or monthly game tournament", dept: 'Event', icon: '🏆' }
    ]
  }
];

const deptDetails = {
  Marketing: {
    title: 'Marketing & Outreach Wing',
    icon: '📢',
    desc: 'You are a growth strategist and communicator! You thrive on audience engagement, social outreach, and cross-organizational partnerships.',
    accent: 'var(--pastel-sky)'
  },
  HR: {
    title: 'Human Resources & Quality Assurance',
    icon: '🤝',
    desc: 'You are an empathetic leader and community builder! You excel at talent screening, team cohesion, and keeping our community safe and thriving.',
    accent: 'var(--pastel-sage)'
  },
  Content: {
    title: 'Content & Media Production',
    icon: '✍️',
    desc: 'You are a creative visionary and storyteller! You love scriptwriting, podcast directing, editorial research, and audio excellence.',
    accent: 'var(--pastel-lavender)'
  },
  Event: {
    title: 'Event Management & Logistics',
    icon: '🎪',
    desc: 'You are an energetic orchestrator! You thrive on live broadcasting, Chatter Box facilitation, stage management, and tournament hosting.',
    accent: 'var(--pastel-butter)'
  }
};

export default function DepartmentMatcher() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ Marketing: 0, HR: 0, Content: 0, Event: 0 });
  const [matchedDept, setMatchedDept] = useState<'Marketing' | 'HR' | 'Content' | 'Event' | null>(null);

  const handleSelectOption = (dept: 'Marketing' | 'HR' | 'Content' | 'Event') => {
    playPopSound();
    const updatedScores = { ...scores, [dept]: (scores[dept] || 0) + 1 };
    setScores(updatedScores);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      let topDept: 'Marketing' | 'HR' | 'Content' | 'Event' = 'Content';
      let highest = -1;
      for (const [d, count] of Object.entries(updatedScores)) {
        if (count > highest) {
          highest = count;
          topDept = d as any;
        }
      }
      playChimeSound();
      setMatchedDept(topDept);
    }
  };

  const handleRestart = () => {
    playPopSound();
    setCurrentStep(0);
    setScores({ Marketing: 0, HR: 0, Content: 0, Event: 0 });
    setMatchedDept(null);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.matcherContainer}>
          <div className={styles.headerBlock}>
            <span className="section-tag">[ 04 / TALENT MATCHER ]</span>
            <h2 className="section-title">Which Castpotro Wing Fits You?</h2>
            <p className="section-subtitle">
              Answer 3 quick questions to discover your optimal operational department match.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!matchedDept ? (
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={styles.quizCard}
              >
                <div className={styles.quizProgress}>
                  QUESTION 0{currentStep + 1} OF 0{quizQuestions.length} // TALENT RADAR
                </div>
                <h3 className={styles.quizQuestion}>
                  {quizQuestions[currentStep].question}
                </h3>

                <div className={styles.optionsList}>
                  {quizQuestions[currentStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt.dept)}
                      className={styles.optionBtn}
                    >
                      <span className={styles.optionIcon}>{opt.icon}</span>
                      <span className={styles.optionLabel}>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={styles.resultCard}
                style={{ backgroundColor: deptDetails[matchedDept].accent }}
              >
                <div className={styles.resultBadge}>[ OPTIMAL MATCH FOUND ]</div>
                <div className={styles.resultIcon}>{deptDetails[matchedDept].icon}</div>
                <h3 className={styles.resultDeptTitle}>{deptDetails[matchedDept].title}</h3>
                <p className={styles.resultDeptDesc}>{deptDetails[matchedDept].desc}</p>

                <div className={styles.resultActions}>
                  <Link href="/test" className={styles.applyBtn} onClick={playPopSound}>
                    <span>Proceed to Aptitude Test for {matchedDept}</span>
                    <span>→</span>
                  </Link>
                  <button onClick={handleRestart} className={styles.retryBtn}>
                    ↺ Retake Talent Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
