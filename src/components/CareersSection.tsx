'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { playPopSound } from '@/lib/sound';
import styles from './CareersSection.module.css';

const hiringSteps = [
  {
    step: '01',
    title: 'CV Shortlisting',
    badge: 'Initial Screening',
    desc: 'Candidates submit their resume and portfolio. Our HR and admin team reviews background, passion for community building, and creative achievements.',
    icon: '📄',
    accent: 'var(--pastel-butter)'
  },
  {
    step: '02',
    title: 'Team Selection',
    badge: 'Choose 1 of 4 Wings',
    desc: 'Candidates select their preferred operational focus from Marketing, HR & Quality, Content & Production, or Event Management based on their strengths.',
    icon: '🎯',
    accent: 'var(--pastel-sky)'
  },
  {
    step: '03',
    title: 'Interview Round',
    badge: 'Dialogue & Culture Fit',
    desc: 'A conversational 1-on-1 interview with department leads and Insiders to explore motivations, communication style, and alignment with Castpotro values.',
    icon: '💬',
    accent: 'var(--pastel-rose)'
  },
  {
    step: '04',
    title: 'Aptitude & EQ Test',
    badge: 'Interactive Assessment',
    desc: 'Our online 20-question test evaluating Numerical, Verbal, Logical, and Spatial problem-solving alongside Emotional Intelligence and Work Personality traits.',
    icon: '🧠',
    accent: 'var(--pastel-lavender)',
    hasAction: true
  },
  {
    step: '05',
    title: 'Department Activity & Induction',
    badge: 'Trial Task & Onboarding',
    desc: 'A practical, real-world mini-challenge tailored to your selected department. Successful completion leads to formal induction as an active Castpotro Intern.',
    icon: '🚀',
    accent: 'var(--pastel-sage)'
  }
];

export default function CareersSection() {
  return (
    <section id="careers" className={styles.section}>
      <div className="container">
        <div className={styles.headerBlock}>
          <span className="section-tag">[ 05 / TALENT GATEWAY ]</span>
          <h2 className="section-title">Our 5-Step Recruitment Roadmap</h2>
          <p className="section-subtitle">
            We are looking for self-starters, creators, and emerging leaders. Here is our transparent roadmap to join as an intern.
          </p>
        </div>

        {/* 5-STEP ROADMAP */}
        <div className={styles.roadmapGrid}>
          {hiringSteps.map((step, idx) => (
            <motion.div 
              key={step.step}
              className={`${styles.stepCard} ${step.hasAction ? styles.activeStepCard : ''}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
            >
              <div className={styles.stepTop}>
                <span className={styles.stepNum}>{step.step} //</span>
                <span className={styles.stepIcon} style={{ backgroundColor: step.accent }}>{step.icon}</span>
              </div>
              <span className={styles.stepBadge}>{step.badge}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              
              {step.hasAction && (
                <div className={styles.stepActionWrapper}>
                  <Link href="/test" className={styles.takeTestBtn} onClick={playPopSound}>
                    <span>Take Aptitude Test</span>
                    <span className={styles.arrowIcon}>→</span>
                  </Link>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA BANNER */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerContent}>
            <span className={styles.bannerTag}>[ STEP 04 : APTITUDE PORTAL OPEN ]</span>
            <h3 className={styles.bannerTitle}>Ready to Test Your Cognitive Reasoning & EQ?</h3>
            <p className={styles.bannerText}>
              Complete our automated 20-question cognitive and EQ assessment. Instant scoring, personality profiling, and automatic transmission to our hiring leads.
            </p>
            <div className={styles.bannerActions}>
              <Link href="/test" className={styles.bannerBtn} onClick={playPopSound}>
                Launch Aptitude Test Now →
              </Link>
              <div className={styles.bannerNotice}>
                ⏱ 20 MINUTES • 1-MIN PER QUESTION • INSTANT PROFILE VERDICT
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
