'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './PodcastsResources.module.css';

const featuredEpisodes = [
  {
    season: 'Fall Season',
    title: 'Navigating Burnout & Rebuilding Momentum',
    duration: '38 mins',
    tags: ['Mental Health', 'Productivity'],
    platform: 'Spotify & YouTube'
  },
  {
    season: 'Summer Season',
    title: 'The Art of Fearless Public Speaking',
    duration: '42 mins',
    tags: ['Communication', 'Confidence'],
    platform: 'Spotify & YouTube'
  },
  {
    season: 'Spring Season',
    title: 'Cultural Heritage in a Hyper-Connected World',
    duration: '45 mins',
    tags: ['Culture', 'Global Perspectives'],
    platform: 'Spotify & YouTube'
  }
];

export default function PodcastsResources() {
  return (
    <section id="podcasts" className={styles.section}>
      <div className="container">
        <div className={styles.headerBlock}>
          <span className="section-tag">Media & Publications</span>
          <h2 className="section-title">Podcasts & Community Resources</h2>
          <p className="section-subtitle">
            Tune into our weekly broadcasts or connect directly with our international Discord hub.
          </p>
        </div>

        <div className={styles.grid}>
          {/* PODCAST HIGHLIGHTS */}
          <div className={styles.mediaCol}>
            <h3 className={styles.colHeading}>🎙️ Featured Broadcasts</h3>
            <div className={styles.episodesList}>
              {featuredEpisodes.map((ep, idx) => (
                <motion.div 
                  key={idx}
                  className={styles.episodeCard}
                  whileHover={{ x: 4 }}
                >
                  <div className={styles.epTop}>
                    <span className={styles.seasonBadge}>{ep.season}</span>
                    <span className={styles.duration}>⏱ {ep.duration}</span>
                  </div>
                  <h4 className={styles.epTitle}>{ep.title}</h4>
                  <div className={styles.tagRow}>
                    {ep.tags.map((t, tIdx) => (
                      <span key={tIdx} className={styles.topicTag}>{t}</span>
                    ))}
                    <span className={styles.platformBadge}>📻 {ep.platform}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* COMMUNITY & RESOURCES */}
          <div className={styles.resourceCol}>
            <h3 className={styles.colHeading}>🌐 Community Hubs & Links</h3>
            
            <div className={styles.resourceCard}>
              <div className={styles.resIcon}>💬</div>
              <div className={styles.resInfo}>
                <h4>Official Discord Server</h4>
                <p>Join live Chatter Box circles, multiplayer game nights, and Bookverse reading sessions.</p>
                <a 
                  href="https://discord.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className={styles.resourceLink}
                >
                  Join Discord Community →
                </a>
              </div>
            </div>

            <div className={styles.resourceCard}>
              <div className={styles.resIcon}>🎧</div>
              <div className={styles.resInfo}>
                <h4>Spotify & Podcast Channels</h4>
                <p>Stream every seasonal episode on demand with rich discussions and expert interviews.</p>
                <a 
                  href="https://open.spotify.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className={styles.resourceLink}
                >
                  Listen on Spotify →
                </a>
              </div>
            </div>

            <div className={styles.resourceCard}>
              <div className={styles.resIcon}>📝</div>
              <div className={styles.resInfo}>
                <h4>Talent Aptitude System</h4>
                <p>Take our automated 20-question cognitive reasoning and personality archetype test.</p>
                <Link href="/test" className={styles.resourceLink}>
                  Open Aptitude Engine →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
