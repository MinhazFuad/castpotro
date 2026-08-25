'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/logo.png"
            alt="Castpotro Logo"
            width={150}
            height={55}
            className={styles.logoImg}
            priority
          />
        </Link>

        <nav className={`${styles.navLinks} ${mobileMenuOpen ? styles.navLinksOpen : ''}`}>
          <Link href="#about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="#ecosystem" onClick={() => setMobileMenuOpen(false)}>Ecosystem</Link>
          <Link href="#events" onClick={() => setMobileMenuOpen(false)}>Events</Link>
          <Link href="#team" onClick={() => setMobileMenuOpen(false)}>Our Team</Link>
          <Link href="/ielts" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--primary)', fontWeight: 800 }}>
            🎯 IELTS Prep
          </Link>
          <Link href="#careers" onClick={() => setMobileMenuOpen(false)}>Careers</Link>
          <Link href="#podcasts" onClick={() => setMobileMenuOpen(false)}>Podcasts</Link>
          <Link 
            href="/test" 
            className={styles.mobileCtaBtn}
            onClick={() => setMobileMenuOpen(false)}
          >
            Aptitude Assessment
          </Link>
        </nav>

        <div className={styles.navActions}>
          <Link href="/ielts" className={styles.ieltsBtn}>
            <span>IELTS Test</span>
            <span className={styles.ieltsBadge}>AI Voice</span>
          </Link>
          <Link href="/test" className={styles.ctaButton}>
            <span>Aptitude</span>
            <span className={styles.badge}>Live</span>
          </Link>
          
          <button 
            className={styles.menuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
}
