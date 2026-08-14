import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.heroSide}>
        <div className={styles.logoWrapper}>
          <Image 
            src="/logo.png" 
            alt="Castpotro Logo" 
            width={320} 
            height={160} 
            className={styles.logoImage}
            priority 
          />
        </div>
        <Image 
          src="/hero.jpg" 
          alt="Candidate taking a fun test" 
          width={600} 
          height={800} 
          className={styles.heroImage} 
          priority 
        />
      </div>
      <div className={styles.contentSide}>
        <h1 className={styles.title}>Grow with Castpotro</h1>
        <p className={styles.subtitle}>
          Join our global community and digital radio network. Step into our talent acquisition program by taking a fun and easy aptitude test!
        </p>
        <Link href="/test" className={styles.button}>
          Start Aptitude Test
        </Link>
      </div>
    </main>
  );
}
