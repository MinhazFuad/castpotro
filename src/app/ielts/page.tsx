'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const modules = [
  {
    id: 'speaking',
    index: '01',
    title: 'Speaking Module',
    subtitle: '3 Authentic IELTS Parts',
    icon: '🎙️',
    duration: '11 - 14 Mins',
    desc: 'Interactive 1-on-1 interview with an AI Voice Examiner. Covers Part 1 (Intro Qs), Part 2 (Cue Card with 1-min prep), and Part 3 (In-depth discussion) with real-time Speech-to-Text.',
    features: ['AI Voice Audio Examiner', 'Real-time Speech Recognition', 'Fluency & Lexical Analysis', 'Band Score 0-9.0 Report'],
    link: '/ielts/speaking',
    badge: 'AI VOICE STT',
    accent: 'var(--accent-rose)'
  },
  {
    id: 'listening',
    index: '02',
    title: 'Listening Module',
    subtitle: 'Audio Dialogue & Comprehension',
    icon: '🎧',
    duration: '10 - 15 Mins',
    desc: 'Listen to campus dialogues and academic radio broadcasts. Answer multiple-choice, form-filling, and detail questions with live audio player and instant script review.',
    features: ['Real-time Audio Player', 'Instant Auto-Grading', 'Transcript Highlighting', 'Detail Accuracy Check'],
    link: '/ielts/listening',
    badge: 'NEURAL AUDIO',
    accent: 'var(--accent-sky)'
  },
  {
    id: 'reading',
    index: '03',
    title: 'Reading Module',
    subtitle: 'Academic Passage & Analysis',
    icon: '📖',
    duration: '12 - 15 Mins',
    desc: 'Read a curated academic passage on digital communications and culture. Solve True/False/Not Given, multiple-choice, and paragraph analysis questions.',
    features: ['Split-screen Reading Interface', 'True / False / Not Given', 'Reading Speed (WPM) Tracker', 'Detailed Answer Keys'],
    link: '/ielts/reading',
    badge: 'COMPREHENSION',
    accent: 'var(--accent-emerald)'
  },
  {
    id: 'writing',
    index: '04',
    title: 'Writing Module',
    subtitle: 'Task 1 & Task 2 Essay Editor',
    icon: '✍️',
    duration: '20 - 30 Mins',
    desc: 'Craft a formal letter/summary (Task 1, 150 words) or discursive opinion essay (Task 2, 250 words) with real-time word counting and automated IELTS band rubric evaluation.',
    features: ['Live Threshold Word Counter', 'Task Achievement Scoring', 'Coherence & Lexical Analysis', 'Grammatical Feedback'],
    link: '/ielts/writing',
    badge: 'SMART RUBRIC',
    accent: 'var(--accent-yellow)'
  }
];

export default function IeltsHub() {
  return (
    <main className={styles.main}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <Link href="/" className={styles.backLink}>
            <span>← Return to Castpotro Home</span>
          </Link>
          <div className={styles.brandTitle}>
            <Image src="/logo.png" alt="Logo" width={100} height={35} className={styles.headerLogo} />
            <span className={styles.badgeIelts}>[ IELTS AI SUITE ]</span>
          </div>
        </div>
      </header>

      {/* HERO BANNER */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.editionPill}>
              <span>DIAGNOSTIC TEST CENTER</span>
              <span>•</span>
              <span>BAND 0 – 9.0</span>
            </div>
            <h1 className={styles.title}>
              CASTPOTRO <span className={styles.titleHighlight}>IELTS SUITE</span>
            </h1>
            <p className={styles.subtitle}>
              Assess your English proficiency across all 4 official IELTS skills. Practice authentic 3-part speaking interviews with our AI voice examiner, test listening comprehension, and evaluate your writing essays.
            </p>

            <div className={styles.quickStats}>
              <div className={styles.qStat}>
                <span className={styles.qNum}>04</span>
                <span className={styles.qLabel}>CORE MODULES</span>
              </div>
              <div className={styles.qDivider}></div>
              <div className={styles.qStat}>
                <span className={styles.qNum}>Band 0-9</span>
                <span className={styles.qLabel}>OFFICIAL RUBRICS</span>
              </div>
              <div className={styles.qDivider}></div>
              <div className={styles.qStat}>
                <span className={styles.qNum}>Instant</span>
                <span className={styles.qLabel}>AI DIAGNOSTICS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE SELECTION GRID */}
      <section className={styles.modulesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-tag">[ SELECT YOUR MODULE ]</span>
            <h2 className="section-title">CHOOSE A SKILL TO PRACTICE</h2>
            <p className="section-subtitle">
              Take individual skill tests or practice them sequentially for a full diagnostic profile.
            </p>
          </div>

          <div className={styles.grid}>
            {modules.map((mod, idx) => (
              <motion.div 
                key={mod.id}
                className={styles.moduleCard}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
              >
                <div className={styles.cardTop}>
                  <div className={styles.cardIcon} style={{ backgroundColor: mod.accent }}>
                    <span>{mod.icon}</span>
                  </div>
                  <div className={styles.badgeRow}>
                    <span className={styles.modBadge}>{mod.badge}</span>
                    <span className={styles.durationBadge}>⏱ {mod.duration}</span>
                  </div>
                </div>

                <div className={styles.modIndex}>{mod.index} //</div>
                <h3 className={styles.cardTitle}>{mod.title}</h3>
                <div className={styles.cardSubtitle}>{mod.subtitle}</div>
                <p className={styles.cardDesc}>{mod.desc}</p>

                <div className={styles.featureList}>
                  {mod.features.map((feat, fIdx) => (
                    <div key={fIdx} className={styles.featureItem}>
                      <span className={styles.checkIcon}>✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <Link href={mod.link} className={styles.startBtn}>
                  <span>Launch {mod.title}</span>
                  <span>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CHATTER BOX INTEGRATION PROMO */}
      <section className={styles.communityPromo}>
        <div className="container">
          <div className={styles.promoCard}>
            <div className={styles.promoIcon}>🎙️</div>
            <div className={styles.promoText}>
              <h3>WANT TO MASTER SPEAKING FLUENCY?</h3>
              <p>
                Join Castpotro's bi-weekly <strong>Chatter Box</strong> speaking circles on Discord! Practice 1-minute impromptu speaking with international learners and build conversational fluency.
              </p>
            </div>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className={styles.promoBtn}>
              Join Speaking Discord Circle →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
