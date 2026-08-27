'use client';

import { motion } from 'framer-motion';
import styles from './LivePulse.module.css';

const pulseItems = [
  {
    icon: '🟢',
    label: 'Discord Voice Lounge',
    value: 'Live & Active Now',
    sub: 'Members sharing stories & study sessions',
    bg: 'var(--pastel-sage)'
  },
  {
    icon: '📚',
    label: 'Bookverse Reading Circle',
    value: '"Atomic Habits" - James Clear',
    sub: 'Chapter 4 group discussion this Friday',
    bg: 'var(--pastel-butter)'
  },
  {
    icon: '🎙️',
    label: 'Next Flagship Broadcast',
    value: 'Fall Season Episode 06',
    sub: 'Theme: Emotional Resilience in Leadership',
    bg: 'var(--pastel-sky)'
  },
  {
    icon: '🚀',
    label: 'Internship Onboarding',
    value: 'Cohort 2026 Open',
    sub: 'Marketing, HR, Content & Event Wings',
    bg: 'var(--pastel-lavender)'
  }
];

const testimonials = [
  {
    quote: "Chatter Box completely cured my stage fright. Speaking for 1 minute on unannounced topics trained my mind to structure thoughts calmly under pressure.",
    author: "Intern Member",
    wing: "Content & Voice Broadcaster",
    accent: "var(--pastel-butter)"
  },
  {
    quote: "Being an HR Intern at Castpotro gave me actual experience reviewing talent portfolios and moderating international events across 15+ countries.",
    author: "Active Intern",
    wing: "HR & Quality Department",
    accent: "var(--pastel-sage)"
  },
  {
    quote: "Castpotro is not just another Discord group; it's a family that genuinely cares about your personal growth, mental health, and career trajectory.",
    author: "Community Host",
    wing: "Media & Event Management",
    accent: "var(--pastel-lavender)"
  }
];

export default function LivePulse() {
  return (
    <section className={styles.section}>
      <div className="container">
        {/* LIVE STATUS TICKER */}
        <div className={styles.pulseBanner}>
          <div className={styles.pulseHeader}>
            <span className={styles.liveBadge}>[ LIVE PULSE ]</span>
            <span className={styles.pulseTitle}>Real-time Activity Across the Castpotro Network</span>
          </div>

          <div className={styles.pulseGrid}>
            {pulseItems.map((item, idx) => (
              <div key={idx} className={styles.pulseCard} style={{ backgroundColor: item.bg }}>
                <div className={styles.cardTop}>
                  <span className={styles.icon}>{item.icon}</span>
                  <span className={styles.label}>{item.label}</span>
                </div>
                <div className={styles.value}>{item.value}</div>
                <div className={styles.sub}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* COMMUNITY VOICES / TESTIMONIALS */}
        <div className={styles.testimonialsBlock}>
          <div className={styles.testimonialHeader}>
            <span className="section-tag">[ VOICES OF CASTPOTRO ]</span>
            <h2 className="section-title">Growth Stories & Perspectives</h2>
            <p className="section-subtitle">Real feedback from active interns, casters, and community members worldwide.</p>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                className={styles.testimonyCard}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
              >
                <div className={styles.cardSticker} style={{ backgroundColor: t.accent }}>
                  <span>ENTRY № 0{idx + 1}</span>
                </div>
                <p className={styles.quoteText}>"{t.quote}"</p>
                <div className={styles.authorMeta}>
                  <span className={styles.authorName}>{t.author}</span>
                  <span className={styles.authorWing}>// {t.wing}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
