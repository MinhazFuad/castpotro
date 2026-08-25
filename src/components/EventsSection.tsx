'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './EventsSection.module.css';

const events = [
  {
    id: 'chatter-box',
    badge: 'Fluency & Speaking',
    title: 'Chatter Box',
    subtitle: '1-Minute Impromptu Public Speaking',
    desc: 'Participants gather in a circular, encouraging group environment to speak for exactly 1 minute on an unannounced topic. Builds English fluency, quick thinking, and fearless confidence.',
    frequency: 'Bi-Weekly Sessions',
    category: 'Communication'
  },
  {
    id: 'seasonal-podcasts',
    badge: 'Seasonal Productions',
    title: 'Seasonal Podcasts',
    subtitle: 'Spring, Summer & Fall Series',
    desc: 'Flagship themed broadcast seasons covering in-depth subjects like mental health awareness, depression & burnout recovery, cultural heritage, habits, and youth philosophy.',
    frequency: 'Quarterly Seasons',
    category: 'Media'
  },
  {
    id: 'creative-competitions',
    badge: 'Monthly Showcases',
    title: 'Creative Competitions',
    subtitle: 'Art, Drama & Gaming Tournaments',
    desc: 'A monthly spotlight on community talent where creators battle and showcase their skills across visual arts, dramatic performances, voice acting, and multiplayer e-sports.',
    frequency: 'Monthly Contest',
    category: 'Creativity'
  },
  {
    id: 'culture-exchange',
    badge: 'Global Perspective',
    title: 'Culture Exchange Presentations',
    subtitle: 'Cross-Border Heritage & Discovery',
    desc: 'International members present cultural stories, traditions, cuisine, and local histories, breaking down geographic barriers and promoting global empathy.',
    frequency: 'Monthly Global Meet',
    category: 'Community'
  },
  {
    id: 'bookverse',
    badge: 'Literature & Growth',
    title: 'Bookverse',
    subtitle: 'Collaborative Reading Circles',
    desc: 'A dedicated reading club where members read celebrated novels, non-fiction literature, and self-help classics together, sharing chapter reviews and life reflections.',
    frequency: 'Weekly Reading Club',
    category: 'Education'
  },
  {
    id: 'workshops',
    badge: 'Masterclasses',
    title: 'Skill & Leadership Workshops',
    subtitle: 'Expert-Led Professional Sessions',
    desc: 'Interactive masterclasses covering leadership fundamentals, emotional resilience, strategic communication, audio production, and personal brand building.',
    frequency: 'Monthly Masterclasses',
    category: 'Leadership'
  },
  {
    id: 'project-management',
    badge: 'Operational Alignment',
    title: 'Staff & Team PM Sprints',
    subtitle: 'Agile Operations & Strategy',
    desc: 'Structured coordination meetings for core team members, casters, admins, and departmental interns to align on sprints, event execution, and content quality.',
    frequency: 'Weekly Staff Meeting',
    category: 'Operations'
  },
  {
    id: 'collaborations',
    badge: 'Growth & Partnerships',
    title: 'Global Outreach & Collabs',
    subtitle: 'Organizational Partnerships',
    desc: 'Partnering with universities, student clubs, non-profits, and international youth organizations to co-host events, share resources, and expand impact.',
    frequency: 'Ongoing Initiatives',
    category: 'Partnerships'
  }
];

export default function EventsSection() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Communication', 'Media', 'Creativity', 'Education', 'Leadership'];

  const filteredEvents = filter === 'All' 
    ? events 
    : events.filter(e => e.category === filter);

  return (
    <section id="events" className={styles.section}>
      <div className="container">
        <div className={styles.headerBlock}>
          <span className="section-tag">Programs & Initiatives</span>
          <h2 className="section-title">Signature Community Events</h2>
          <p className="section-subtitle">
            From speaking circles and artistic competitions to seasonal podcasts and reading clubs, discover how our community gathers to grow together.
          </p>

          <div className={styles.filterPills}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`${styles.filterBtn} ${filter === cat ? styles.filterBtnActive : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.eventGrid}>
          {filteredEvents.map((evt, index) => (
            <motion.div
              key={evt.id}
              className={styles.eventCard}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.eventBadge}>{evt.badge}</span>
                <span className={styles.frequencyTag}>⏱ {evt.frequency}</span>
              </div>
              <h3 className={styles.eventTitle}>{evt.title}</h3>
              <div className={styles.eventSubtitle}>{evt.subtitle}</div>
              <p className={styles.eventDesc}>{evt.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
