'use client';

import { motion } from 'framer-motion';
import styles from './AboutServices.module.css';

const services = [
  {
    index: '01',
    icon: '🎙️',
    title: 'Global Digital Radio & Media',
    tag: 'Broadcast Wing',
    accent: 'var(--pastel-butter)',
    desc: 'Weekly high-production podcasts broadcasting across Spotify and YouTube, exploring mental health, career resilience, cultural history, and modern youth dilemmas.',
    highlights: ['Weekly episodes on Spotify & YouTube', 'Youth voice spotlights', 'Expert guest masterclasses']
  },
  {
    index: '02',
    icon: '🌐',
    title: 'Collaborative Global Community',
    tag: 'Discord Ecosystem',
    accent: 'var(--pastel-sky)',
    desc: 'An international Discord hub connecting passionate youth across 15+ countries for peer learning, mutual encouragement, and cultural discovery.',
    highlights: ['24/7 interactive voice lounges', 'Multiplayer gaming tournaments', 'Moderated family-friendly space']
  },
  {
    index: '03',
    icon: '🎓',
    title: 'Educational Masterclasses',
    tag: 'Skill Building',
    accent: 'var(--pastel-sage)',
    desc: 'Hands-on workshops, language circles, and leadership development sessions led by domain mentors to build real-world communication capabilities.',
    highlights: ['Chatter Box English fluency', 'Leadership & public speaking', 'Bookverse reading masterclasses']
  },
  {
    index: '04',
    icon: '🚀',
    title: 'Talent & Leadership Incubator',
    tag: 'Career Growth',
    accent: 'var(--pastel-lavender)',
    desc: 'A structured 5-step onboarding and practical training pipeline across 4 operational departments, mentoring emerging creative leaders.',
    highlights: ['Marketing, HR, Content, & Event wings', 'Real project portfolio ownership', 'Certificates & recommendation letters']
  }
];

export default function AboutServices() {
  return (
    <section id="ecosystem" className={styles.section}>
      <div className="container">
        <div id="about" className={styles.headerBlock}>
          <span className="section-tag">[ 01 / ECOSYSTEM ]</span>
          <h2 className="section-title">A Multidisciplinary Platform for Growth</h2>
          <p className="section-subtitle">
            More than just an audio network, Castpotro provides a complete ecosystem of media, community engagement, education, and career development.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((item, idx) => (
            <motion.div 
              key={idx}
              className={styles.card}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
            >
              <div className={styles.cardTop}>
                <div className={styles.iconBox} style={{ backgroundColor: item.accent }}>
                  <span>{item.icon}</span>
                </div>
                <div className={styles.badgeGroup}>
                  <span className={styles.indexTag}>{item.index} //</span>
                  <span className={styles.tagBadge}>{item.tag}</span>
                </div>
              </div>

              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
              
              <div className={styles.highlightsList}>
                {item.highlights.map((point, pIdx) => (
                  <div key={pIdx} className={styles.highlightItem}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
