import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brandCol}>
          <Image
            src="/logo.png"
            alt="Castpotro Logo"
            width={160}
            height={55}
            className={styles.footerLogo}
          />
          <p className={styles.brandDesc}>
            Castpotro is an international digital radio network and personal growth community empowering youth through podcasts, cultural exchange, and elite talent incubation.
          </p>
          <div className={styles.socialRow}>
            <span className={styles.socialBadge}>Spotify</span>
            <span className={styles.socialBadge}>Discord</span>
            <span className={styles.socialBadge}>YouTube</span>
            <span className={styles.socialBadge}>LinkedIn</span>
          </div>
        </div>

        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Ecosystem</h4>
          <ul>
            <li><Link href="#about">About Castpotro</Link></li>
            <li><Link href="#ecosystem">Digital Radio Network</Link></li>
            <li><Link href="#events">Chatter Box Speaking</Link></li>
            <li><Link href="#events">Bookverse Reading</Link></li>
            <li><Link href="#events">Seasonal Podcasts</Link></li>
          </ul>
        </div>

        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Leadership & Careers</h4>
          <ul>
            <li><Link href="#team">Four-Tier Hierarchy</Link></li>
            <li><Link href="#careers">5-Step Hiring Roadmap</Link></li>
            <li><Link href="/test">Aptitude & EQ Assessment</Link></li>
            <li><Link href="#careers">Departmental Internships</Link></li>
          </ul>
        </div>

        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Four Departments</h4>
          <ul>
            <li><span>Marketing & Outreach</span></li>
            <li><span>HR & Quality Assurance</span></li>
            <li><span>Content & Audio Production</span></li>
            <li><span>Event Management & PM</span></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContainer}`}>
          <p>© {new Date().getFullYear()} Castpotro Network. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link href="#">Privacy Policy</Link>
            <span>•</span>
            <Link href="#">Terms of Service</Link>
            <span>•</span>
            <Link href="/test">Aptitude Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
