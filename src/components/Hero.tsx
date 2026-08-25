'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { playChimeSound, playPopSound } from '@/lib/sound';
import styles from './Hero.module.css';

export default function Hero() {
  const [isPlayingTeaser, setIsPlayingTeaser] = useState(false);

  const toggleTeaser = () => {
    playPopSound();
    if (!isPlayingTeaser) {
      playChimeSound();
      setIsPlayingTeaser(true);
      setTimeout(() => setIsPlayingTeaser(false), 4000);
    } else {
      setIsPlayingTeaser(false);
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroContainer}`}>
        <motion.div 
          className={styles.contentCol}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.topPillRow}>
            <div className={styles.badgeWrapper}>
              <span className={styles.pulseDot}></span>
              <span className={styles.badgeText}>Global Digital Radio & Youth Network</span>
            </div>

            <button onClick={toggleTeaser} className={`${styles.audioPill} ${isPlayingTeaser ? styles.audioPillActive : ''}`}>
              <span>{isPlayingTeaser ? '🔊 Previewing Radio...' : '▶ Listen Radio Teaser'}</span>
              <div className={styles.waveBars}>
                <span className={`${styles.bar} ${isPlayingTeaser ? styles.barAnim : ''}`}></span>
                <span className={`${styles.bar} ${isPlayingTeaser ? styles.barAnim : ''}`}></span>
                <span className={`${styles.bar} ${isPlayingTeaser ? styles.barAnim : ''}`}></span>
                <span className={`${styles.bar} ${isPlayingTeaser ? styles.barAnim : ''}`}></span>
              </div>
            </button>
          </div>

          <h1 className={styles.title}>
            Amplifying Voices, <span className={styles.gradientText}>Inspiring Growth</span> Worldwide.
          </h1>

          <p className={styles.lead}>
            Castpotro is an international digital radio network, youth community, and personal growth ecosystem. Practice authentic IELTS AI voice interviews, join live Chatter Box speaking circles, and step through our 5-step talent acquisition gateway.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/ielts" className={styles.ieltsHeroBtn}>
              <span>🎯 Take IELTS Diagnostic</span>
              <span className={styles.heroBadge}>4 Modules</span>
            </Link>
            <Link href="#careers" className={styles.primaryBtn}>
              <span>Join Castpotro</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
            <Link href="/test" className={styles.testBadgeBtn}>
              <span className={styles.testIcon}>📝</span>
              <span>Aptitude Test</span>
            </Link>
          </div>

          <div className={styles.statsStrip}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>10K+</span>
              <span className={styles.statLabel}>Global Community</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>15+</span>
              <span className={styles.statLabel}>Countries Reached</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>Band 0-9</span>
              <span className={styles.statLabel}>IELTS AI Diagnostic</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>4</span>
              <span className={styles.statLabel}>Core Departments</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.mediaCol}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.imageCard}>
            <div className={styles.glowBg}></div>
            <Image
              src="/hero.jpg"
              alt="Castpotro global team and broadcast community"
              width={540}
              height={620}
              className={styles.heroImg}
              priority
            />
            
            <div className={styles.floatingCard1}>
              <div className={styles.floatIcon}>🎯</div>
              <div>
                <div className={styles.floatTitle}>Castpotro IELTS AI Suite</div>
                <div className={styles.floatSub}>Speaking • Listening • Reading • Writing</div>
              </div>
            </div>

            <div className={styles.floatingCard2}>
              <div className={styles.floatIcon}>🌟</div>
              <div>
                <div className={styles.floatTitle}>5-Step Talent Gateway</div>
                <div className={styles.floatSub}>Marketing • HR • Content • Event</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
