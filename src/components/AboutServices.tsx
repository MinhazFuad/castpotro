'use client';

import { motion } from 'framer-motion';
import styles from './AboutServices.module.css';

const services = [
  {
    icon: '🎙️',
    title: 'Global Digital Radio & Media',
    tag: 'Broadcast Network',
    desc: 'Weekly high-production podcasts broadcasting across Spotify and YouTube, addressing mental health, career resilience, history, and modern youth dilemmas.',
    highlights: ['Weekly episodes on Spotify & YouTube', 'Youth voice spotlight', 'Expert guest interviews']
  },
  {
    icon: '🌐',
    title: 'Collaborative Global Community',
    tag: 'Safe & Inclusive',
    desc: 'An international Discord ecosystem connecting passionate individuals across 15+ countries for peer learning, mutual encouragement, and cultural discovery.',
    highlights: ['24/7 interactive voice & text channels', 'Multiplayer gaming nights', 'Moderated family-friendly space']
  },
  {
    icon: '🎓',
    title: 'Educational Masterclasses',
    tag: 'Skill Building',
    desc: 'Hands-on workshops, language circles, and leadership development sessions led by domain mentors to build practical career and communication capabilities.',
    highlights: ['Chatter Box English fluency', 'Leadership & public speaking', 'Bookverse reading masterclasses']
  },
  {
    icon: '🚀',
    title: 'Talent Acquisition & Leadership Incubator',
    tag: 'Career Growth',
    desc: 'A structured 5-step onboarding and practical training pipeline across 4 operational departments, mentoring the next generation of creative and organizational leaders.',
    highlights: ['Marketing, HR, Content, & Event wings', 'Real project ownership', 'Certificate & recommendation letters']
  }
];

export default function AboutServices() {
  return (
    <section id="ecosystem" className={styles.section}>
      <div className="container">
        <div id="about" className={styles.headerBlock}>
          <span className="section-tag">The Castpotro Ecosystem</span>
          <h2 className="section-title">A Multidisciplinary Platform for Holistic Growth</h2>
          <p className="section-subtitle">
            More than just an audio network, Castpotro provides a complete ecosystem of media, community engagement, education, and career development.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((item, idx) => (
            <motion.div 
              key={idx}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div className={styles.cardTop}>
                <span className={styles.iconBox}>{item.icon}</span>
                <span className={styles.tagBadge}>{item.tag}</span>
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
