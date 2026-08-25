'use client';

import { motion } from 'framer-motion';
import styles from './LivePulse.module.css';

const pulseItems = [
  {
    icon: '🟢',
    label: 'Discord Voice Lounge',
    value: 'Live & Active Now',
    sub: 'Members sharing stories & study sessions'
  },
  {
    icon: '📚',
    label: 'Bookverse Reading of the Week',
    value: '"Atomic Habits" - James Clear',
    sub: 'Chapter 4 discussion this Friday'
  },
  {
    icon: '🎙️',
    label: 'Next Flagship Broadcast',
    value: 'Fall Season Episode 06',
    sub: 'Theme: Emotional Resilience in Leadership'
  },
  {
    icon: '🚀',
    label: 'Internship Onboarding',
    value: 'Cohort 2026 Open',
    sub: 'Marketing, HR, Content & Event Wings'
  }
];

const testimonials = [
  {
    quote: "Chatter Box completely cured my stage fright. Speaking for 1 minute on unannounced topics trained my mind to think clearly under pressure.",
    author: "Intern Member",
    wing: "Content & Voice Broadcaster"
  },
  {
    quote: "Being an HR Intern at Castpotro gave me actual experience reviewing talent portfolios and moderating international events across 15+ countries.",
    author: "Active Intern",
    wing: "HR & Quality Department"
  },
  {
    quote: "Castpotro is not just another Discord group; it's a family that genuinely cares about your personal growth, mental health, and career trajectory.",
    author: "Community Host",
    wing: "Media & Event Management"
  }
];

export default function LivePulse() {
  return (
    <section className={styles.section}>
      <div className="container">
        {/* LIVE STATUS TICKER */}
        <div className={styles.pulseBanner}>
          <div className={styles.pulseHeader}>
            <span className={styles.liveBadge}>● Community Pulse</span>
            <span className={styles.pulseTitle}>What's Happening Right Now at Castpotro</span>
          </div>

          <div className={styles.pulseGrid}>
            {pulseItems.map((item, idx) => (
              <div key={idx} className={styles.pulseCard}>
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
            <span className="section-tag">Voices of Our Community</span>
            <h2 className="section-title">Growth Stories from Castpotro</h2>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                className={styles.testimonyCard}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <div className={styles.quoteMark}>“</div>
                <p className={styles.quoteText}>{t.quote}</p>
                <div className={styles.authorMeta}>
                  <span className={styles.authorName}>{t.author}</span>
                  <span className={styles.authorWing}>{t.wing}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
