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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* MONOSPACED METADATA PILL */}
          <div className={styles.editorialTopStrip}>
            <div className={styles.editionTag}>
              <span>EST. 2026</span>
              <span className={styles.dotSep}>•</span>
              <span>№ 04</span>
            </div>
            <div className={styles.badgeWrapper}>
              <span className={styles.pulseDot}></span>
              <span className={styles.badgeText}>Digital Radio & Youth Growth Ecosystem</span>
            </div>
          </div>

          <h1 className={styles.title}>
            Amplifying <span className={styles.serifItalic}>Voices</span>,<br />
            Inspiring <span className={styles.titleHighlight}>Leadership</span>.
          </h1>

          <p className={styles.lead}>
            Castpotro is a multidisciplinary digital radio network and personal growth incubator. From 1-minute impromptu speaking in <em>Chatter Box</em> and our <em>AI IELTS Suite</em> to our 5-step talent gateway, we empower youth to speak, produce, and lead globally.
          </p>

          {/* TACTILE BUTTONS WITH ACTIVE DEPRESS */}
          <div className={styles.ctaGroup}>
            <Link href="/ielts" className={styles.ieltsHeroBtn} onClick={playPopSound}>
              <span className={styles.btnIcon}>★</span>
              <span>Take IELTS Diagnostic</span>
              <span className={styles.heroBadge}>4 Modules</span>
            </Link>

            <Link href="#careers" className={styles.primaryBtn} onClick={playPopSound}>
              <span>Join Castpotro</span>
              <span className={styles.arrow}>→</span>
            </Link>

            <button onClick={toggleTeaser} className={`${styles.audioBtn} ${isPlayingTeaser ? styles.audioBtnActive : ''}`}>
              <span>{isPlayingTeaser ? '🔊 Previewing...' : '▶ Radio Teaser'}</span>
              <div className={styles.waveBars}>
                <span className={`${styles.bar} ${isPlayingTeaser ? styles.barAnim : ''}`}></span>
                <span className={`${styles.bar} ${isPlayingTeaser ? styles.barAnim : ''}`}></span>
                <span className={`${styles.bar} ${isPlayingTeaser ? styles.barAnim : ''}`}></span>
              </div>
            </button>
          </div>

          {/* STATS STRIP ON PASTEL SAGE BACKING */}
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
              <span className={styles.statLabel}>IELTS AI Rubrics</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>4</span>
              <span className={styles.statLabel}>Core Departments</span>
            </div>
          </div>
        </motion.div>

        {/* MEDIA COLUMN WITH EDITORIAL FRAME & PASTEL STICKERS */}
        <motion.div 
          className={styles.mediaCol}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <div className={styles.imageCardWrapper}>
            <div className={styles.cardFrame}>
              <div className={styles.cardHeaderBar}>
                <div className={styles.windowDots}>
                  <span className={styles.dotRed}></span>
                  <span className={styles.dotYellow}></span>
                  <span className={styles.dotGreen}></span>
                </div>
                <span className={styles.windowTitle}>castpotro_live_broadcast.jpg</span>
              </div>

              <Image
                src="/hero.jpg"
                alt="Castpotro global team and broadcast community"
                width={540}
                height={620}
                className={styles.heroImg}
                priority
              />
            </div>

            {/* FLOATING PASTEL STICKERS */}
            <div className={`${styles.sticker} ${styles.sticker1}`}>
              <span className={styles.stickerIcon}>🎙️</span>
              <div>
                <div className={styles.stickerTitle}>SEASONAL PODCASTS</div>
                <div className={styles.stickerSub}>Mental Health & Youth Culture</div>
              </div>
            </div>

            <div className={`${styles.sticker} ${styles.sticker2}`}>
              <span className={styles.stickerIcon}>⚡</span>
              <div>
                <div className={styles.stickerTitle}>CHATTER BOX 60S</div>
                <div className={styles.stickerSub}>Impromptu Speaking Circles</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
