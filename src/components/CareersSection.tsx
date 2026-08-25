'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './CareersSection.module.css';

const hiringSteps = [
  {
    step: '01',
    title: 'CV Shortlisting',
    badge: 'Initial Screening',
    desc: 'Candidates submit their resume and portfolio. Our HR and admin team reviews background, passion for community building, and creative achievements.',
    icon: '📄'
  },
  {
    step: '02',
    title: 'Team Selection',
    badge: 'Choose 1 of 4 Wings',
    desc: 'Candidates select their preferred operational focus from Marketing, HR & Quality, Content & Production, or Event Management based on their strengths.',
    icon: '🎯'
  },
  {
    step: '03',
    title: 'Interview Round',
    badge: 'Dialogue & Culture Fit',
    desc: 'A conversational 1-on-1 interview with department leads and Insiders to explore motivations, communication style, and alignment with Castpotro values.',
    icon: '💬'
  },
  {
    step: '04',
    title: 'Aptitude & EQ Test',
    badge: 'Interactive Assessment',
    desc: 'Our online 20-question test evaluating Numerical, Verbal, Logical, and Spatial problem-solving alongside Emotional Intelligence and Work Personality traits.',
    icon: '🧠',
    hasAction: true
  },
  {
    step: '05',
    title: 'Department Activity & Onboarding',
    badge: 'Trial Task & Induction',
    desc: 'A practical, real-world mini-challenge tailored to your selected department. Successful completion leads to formal induction as an active Castpotro Intern.',
    icon: '🚀'
  }
];

export default function CareersSection() {
  return (
    <section id="careers" className={styles.section}>
      <div className="container">
        <div className={styles.headerBlock}>
          <span className="section-tag">Talent Acquisition</span>
          <h2 className="section-title">Join the Castpotro Team</h2>
          <p className="section-subtitle">
            We are looking for self-starters, creators, and leaders. Here is our transparent 5-step recruitment roadmap to join as an intern.
          </p>
        </div>

        {/* 5-STEP ROADMAP */}
        <div className={styles.roadmapGrid}>
          {hiringSteps.map((step, idx) => (
            <motion.div 
              key={step.step}
              className={`${styles.stepCard} ${step.hasAction ? styles.activeStepCard : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <div className={styles.stepTop}>
                <span className={styles.stepNum}>{step.step}</span>
                <span className={styles.stepIcon}>{step.icon}</span>
              </div>
              <span className={styles.stepBadge}>{step.badge}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              
              {step.hasAction && (
                <div className={styles.stepActionWrapper}>
                  <Link href="/test" className={styles.takeTestBtn}>
                    <span>Take Aptitude Test Now</span>
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
            <span className={styles.bannerTag}>Step 4: Talent Assessment Live</span>
            <h3 className={styles.bannerTitle}>Ready to prove your skills and join the network?</h3>
            <p className={styles.bannerText}>
              Take the 20-question timed aptitude and EQ assessment today. Instant evaluation, personality profiling, and automatic submission to our hiring leads.
            </p>
            <div className={styles.bannerActions}>
              <Link href="/test" className={styles.bannerBtn}>
                Launch Aptitude Test
              </Link>
              <div className={styles.bannerNotice}>
                ⏱ 20 Minutes • No Outside AI Allowed • Instant Trait Analysis
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
