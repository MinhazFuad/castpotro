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
      {/* BACKGROUND EDITORIAL SHAPES */}
      <div className={styles.bgShapeCircle}></div>
      <div className={styles.bgShapeSquare}></div>
      <div className={styles.bgDottedGrid}></div>

      <div className={`container ${styles.heroContainer}`}>
        
        {/* LEFT COLUMN: EDITORIAL CONTENT & ACTIONS */}
        <motion.div 
          className={styles.contentCol}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* MINIMALIST METADATA PILL */}
          <div className={styles.editorialTopStrip}>
            <div className={styles.editionTag}>
              <span className={styles.sparkleIcon}>✦</span>
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
            Castpotro is a decentralized digital radio network and personal growth incubator connecting youth across 150+ countries through spontaneous speaking in <em>Chatter Box</em>, our <em>AI IELTS Suite</em>, and cross-border creative broadcasting.
          </p>

          {/* TACTILE CALLS TO ACTION */}
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

          {/* STATS MATRIX ON PASTEL BACKING */}
          <div className={styles.statsStrip}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>10K+</span>
              <span className={styles.statLabel}>Global Community</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>150+</span>
              <span className={styles.statLabel}>Countries Reached</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>Band 0–9</span>
              <span className={styles.statLabel}>IELTS AI Rubrics</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>4</span>
              <span className={styles.statLabel}>Core Wings</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: FANCY EDITORIAL COLLAGE WITH 5 IMAGES */}
        <motion.div 
          className={styles.mediaCol}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className={styles.fancyCollageStage}>
            
            {/* GEOMETRIC SHAPES */}
            <div className={styles.geomCircleRing}></div>
            <div className={styles.geomSquareAccent}></div>
            <div className={styles.starburstBadge}>
              <span className={styles.starburstText}>★ 2026 COHORT ★</span>
            </div>

            {/* 1. BIG FEATURED PRIMARY CARD (1.jpeg) */}
            <div className={styles.mainHeroCard}>
              <div className={styles.cardHeaderBar}>
                <div className={styles.windowDots}>
                  <span className={styles.dotRed}></span>
                  <span className={styles.dotYellow}></span>
                  <span className={styles.dotGreen}></span>
                </div>
                <span className={styles.windowTitle}>castpotro_live_broadcast.01</span>
                <span className={styles.liveIndicator}>● ON AIR</span>
              </div>
              
              <div className={styles.mainImageContainer}>
                <Image
                  src="/hero/1.jpeg"
                  alt="Castpotro Live Broadcast Circle & Youth Leaders"
                  width={420}
                  height={480}
                  className={styles.mainImg}
                  priority
                />
              </div>

              <div className={styles.mainCardFooter}>
                <div className={styles.broadcastMeta}>
                  <span className={styles.metaLocation}>DHAKA HUB // GLOBAL STREAM</span>
                  <span className={styles.metaTopic}>Youth Dialogue & Voice Incubator</span>
                </div>
                <div className={styles.barcodeStamp}>
                  <span>||||||| | ||||| | |||</span>
                </div>
              </div>
            </div>

            {/* 2. TOP-RIGHT POLAROID CARD (2.jpeg - GLOBAL SUMMITS) */}
            <div className={styles.polaroidTopRight}>
              <div className={styles.polaroidInner}>
                <Image
                  src="/hero/2.jpeg"
                  alt="Global Youth Summits"
                  width={240}
                  height={160}
                  className={styles.satelliteImg}
                />
                <div className={styles.polaroidCaption}>
                  <span>Global Summits</span>
                </div>
              </div>
            </div>

            {/* 3. ROAD TO HULT PRIZE // LEADERSHIP (3.jpeg) */}
            <div className={styles.polaroidBottomRight}>
              <div className={styles.polaroidInner}>
                <Image
                  src="/hero/3.jpeg"
                  alt="Road to Hult Prize - Leadership & Global Ventures"
                  width={260}
                  height={175}
                  className={styles.hultPrizeImg}
                />
                <div className={styles.hultPrizeCaption}>
                  <span className={styles.hultTag}>🏆 ROAD TO HULT PRIZE</span>
                  <span className={styles.hultSub}>Global Leadership & Impact</span>
                </div>
              </div>
            </div>

            {/* 4. BOTTOM-LEFT TEAM ACCENT CARD (4.jpeg) */}
            <div className={styles.polaroidBottomLeft}>
              <div className={styles.polaroidInner}>
                <Image
                  src="/hero/4.jpeg"
                  alt="Cross-Border Leadership"
                  width={155}
                  height={140}
                  className={styles.satelliteImg}
                />
                <div className={styles.polaroidCaption}>
                  <span>Cross-Border Team</span>
                </div>
              </div>
            </div>

            {/* 5. TOP-LEFT CARD: MARATHON 7.5KM (5.jpeg) */}
            <div className={styles.polaroidMarathon}>
              <div className={styles.polaroidInner}>
                <Image
                  src="/hero/5.jpeg"
                  alt="Marathon 7.5km - Youth Endurance & Spirit"
                  width={160}
                  height={160}
                  className={styles.marathonImg}
                />
                <div className={styles.marathonCaption}>
                  <span className={styles.marathonTag}>🏃‍♂️ MARATHON 7.5KM</span>
                </div>
              </div>
            </div>

            {/* FANCY FLOATING TEXT BADGES */}
            <div className={styles.badgeCountries}>
              <span className={styles.badgeEmoji}>🌐</span>
              <div>
                <div className={styles.badgeTitle}>150+ COUNTRIES</div>
                <div className={styles.badgeSub}>Decentralized Voice Network</div>
              </div>
            </div>

            <div className={styles.badgeIelts}>
              <span className={styles.badgeEmoji}>⚡</span>
              <div>
                <div className={styles.badgeTitle}>AI VOICE DIAGNOSTICS</div>
                <div className={styles.badgeSub}>Official IELTS Standard</div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
