'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { playPopSound } from '@/lib/sound';
import styles from './PodcastsResources.module.css';

const featuredEpisodes = [
  {
    season: 'Fall Edition',
    title: 'Navigating Burnout & Rebuilding Momentum',
    duration: '38 mins',
    tags: ['Mental Health', 'Productivity'],
    platform: 'Spotify & YouTube',
    accent: 'var(--pastel-butter)'
  },
  {
    season: 'Summer Edition',
    title: 'The Art of Fearless Public Speaking',
    duration: '42 mins',
    tags: ['Communication', 'Confidence'],
    platform: 'Spotify & YouTube',
    accent: 'var(--pastel-sky)'
  },
  {
    season: 'Spring Edition',
    title: 'Cultural Heritage in a Hyper-Connected World',
    duration: '45 mins',
    tags: ['Culture', 'Global Voices'],
    platform: 'Spotify & YouTube',
    accent: 'var(--pastel-sage)'
  }
];

export default function PodcastsResources() {
  return (
    <section id="podcasts" className={styles.section}>
      <div className="container">
        <div className={styles.headerBlock}>
          <span className="section-tag">[ 06 / MEDIA & HUBS ]</span>
          <h2 className="section-title">Podcasts & Community Hubs</h2>
          <p className="section-subtitle">
            Tune into our weekly broadcasts or connect directly with our international Discord network.
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
                  whileHover={{ x: 3 }}
                >
                  <div className={styles.epTop}>
                    <span className={styles.seasonBadge} style={{ backgroundColor: ep.accent }}>{ep.season}</span>
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
            <h3 className={styles.colHeading}>🌐 Community Hubs</h3>
            
            <div className={styles.resourceCard} style={{ backgroundColor: 'var(--pastel-sky)' }}>
              <div className={styles.resIcon}>💬</div>
              <div className={styles.resInfo}>
                <h4>Official Discord Server</h4>
                <p>Join live Chatter Box circles, multiplayer game nights, and Bookverse reading sessions.</p>
                <a 
                  href="https://discord.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className={styles.resourceLink}
                  onClick={playPopSound}
                >
                  Join Discord Community →
                </a>
              </div>
            </div>

            <div className={styles.resourceCard} style={{ backgroundColor: 'var(--pastel-butter)' }}>
              <div className={styles.resIcon}>🎧</div>
              <div className={styles.resInfo}>
                <h4>Spotify Podcast Channels</h4>
                <p>Stream every seasonal episode on demand with rich discussions and expert interviews.</p>
                <a 
                  href="https://open.spotify.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className={styles.resourceLink}
                  onClick={playPopSound}
                >
                  Listen on Spotify →
                </a>
              </div>
            </div>

            <div className={styles.resourceCard} style={{ backgroundColor: 'var(--pastel-sage)' }}>
              <div className={styles.resIcon}>🎯</div>
              <div className={styles.resInfo}>
                <h4>Castpotro IELTS Suite</h4>
                <p>Practice speaking with our AI voice examiner, test listening, and evaluate writing essays.</p>
                <Link href="/ielts" className={styles.resourceLink} onClick={playPopSound}>
                  Open IELTS Hub →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
