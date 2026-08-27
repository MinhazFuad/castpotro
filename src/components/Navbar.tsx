'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { playPopSound } from '@/lib/sound';
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
        <Link href="/" className={styles.logoLink} onClick={playPopSound}>
          <Image
            src="/logo.png"
            alt="Castpotro Logo"
            width={180}
            height={60}
            className={styles.logoImg}
            priority
          />
        </Link>

        <nav className={`${styles.navLinks} ${mobileMenuOpen ? styles.navLinksOpen : ''}`}>
          <Link href="#about" onClick={() => { playPopSound(); setMobileMenuOpen(false); }}>About</Link>
          <Link href="#ecosystem" onClick={() => { playPopSound(); setMobileMenuOpen(false); }}>Ecosystem</Link>
          <Link href="#events" onClick={() => { playPopSound(); setMobileMenuOpen(false); }}>Events</Link>
          <Link href="#team" onClick={() => { playPopSound(); setMobileMenuOpen(false); }}>Team</Link>
          <Link href="/ielts" onClick={() => { playPopSound(); setMobileMenuOpen(false); }} className={styles.ieltsNavLink}>
            IELTS Diagnostic
          </Link>
          <Link href="#careers" onClick={() => { playPopSound(); setMobileMenuOpen(false); }}>Careers</Link>
          <Link href="#podcasts" onClick={() => { playPopSound(); setMobileMenuOpen(false); }}>Podcasts</Link>
          <Link 
            href="/test" 
            className={styles.mobileCtaBtn}
            onClick={() => { playPopSound(); setMobileMenuOpen(false); }}
          >
            Aptitude Assessment
          </Link>
        </nav>

        <div className={styles.navActions}>
          <Link href="/ielts" className={styles.ieltsBtn} onClick={playPopSound}>
            <span>IELTS Diagnostic</span>
            <span className={styles.ieltsPill}>AI Voice</span>
          </Link>
          <Link href="/test" className={styles.ctaButton} onClick={playPopSound}>
            <span>Aptitude Portal</span>
            <span className={styles.badge}>Live</span>
          </Link>
          
          <button 
            className={styles.menuToggle}
            onClick={() => { playPopSound(); setMobileMenuOpen(!mobileMenuOpen); }}
            aria-label="Toggle navigation menu"
          >
            <span className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
}
