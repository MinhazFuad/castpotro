'use client';

import { motion } from 'framer-motion';
import styles from './TeamHierarchy.module.css';

export default function TeamHierarchy() {
  return (
    <section id="team" className={styles.section}>
      <div className="container">
        <div className={styles.headerBlock}>
          <span className="section-tag">Organization & Leadership</span>
          <h2 className="section-title">Our Four-Tier Team Hierarchy</h2>
          <p className="section-subtitle">
            Castpotro operates with a clear, collaborative leadership structure designed to mentor talent and produce world-class creative broadcasts.
          </p>
        </div>

        {/* TIER 1: INSIDERS */}
        <div className={styles.tierContainer}>
          <div className={styles.tierBadge}>
            <span className={styles.tierLevel}>Tier 1</span>
            <span className={styles.tierName}>The Insiders • Executive Leadership</span>
          </div>

          <div className={styles.leadershipGrid}>
            <motion.div 
              className={`${styles.memberCard} ${styles.insiderCard}`}
              whileHover={{ y: -4 }}
            >
              <div className={styles.avatarCircle}>👨‍💼</div>
              <h3 className={styles.memberName}>Ibrahim Shanto</h3>
              <div className={styles.memberRole}>Chief Executive Officer (CEO)</div>
              <p className={styles.memberBio}>Leading overall strategic vision, organizational direction, global partnerships, and community growth.</p>
            </motion.div>

            <motion.div 
              className={`${styles.memberCard} ${styles.insiderCard} ${styles.featuredCard}`}
              whileHover={{ y: -4 }}
            >
              <div className={styles.avatarCircle}>💡</div>
              <h3 className={styles.memberName}>Ahsan Farabi</h3>
              <div className={styles.memberRole}>Founder</div>
              <p className={styles.memberBio}>Conceived Castpotro’s mission to build an empowering, youth-driven digital radio and personal growth platform.</p>
            </motion.div>

            <motion.div 
              className={`${styles.memberCard} ${styles.insiderCard}`}
              whileHover={{ y: -4 }}
            >
              <div className={styles.avatarCircle}>👩‍💼</div>
              <h3 className={styles.memberName}>Anastasia</h3>
              <div className={styles.memberRole}>Chief Operating Officer (COO)</div>
              <p className={styles.memberBio}>Overseeing day-to-day operations, cross-departmental coordination, quality standards, and global logistics.</p>
            </motion.div>
          </div>
        </div>

        {/* CONNECTOR LINE */}
        <div className={styles.connector}></div>

        {/* TIER 2: ADMINS */}
        <div className={styles.tierContainer}>
          <div className={styles.tierBadge}>
            <span className={styles.tierLevel}>Tier 2</span>
            <span className={styles.tierName}>Admins • Operations & Community</span>
          </div>

          <div className={styles.adminGrid}>
            <motion.div className={styles.memberCard} whileHover={{ y: -3 }}>
              <div className={styles.avatarCircleSm}>⚡</div>
              <h3 className={styles.memberName}>Minhaz</h3>
              <div className={styles.memberRole}>Operations Administrator</div>
              <p className={styles.memberBio}>Managing team sprint workflows, internal tools, project timelines, and technical operations.</p>
            </motion.div>

            <motion.div className={styles.memberCard} whileHover={{ y: -3 }}>
              <div className={styles.avatarCircleSm}>🛡️</div>
              <h3 className={styles.memberName}>Liza</h3>
              <div className={styles.memberRole}>Community & Systems Administrator</div>
              <p className={styles.memberBio}>Nurturing community engagement, moderation standards, member onboarding, and system security.</p>
            </motion.div>
          </div>
        </div>

        {/* CONNECTOR LINE */}
        <div className={styles.connector}></div>

        {/* TIER 3: CASTERS */}
        <div className={styles.tierContainer}>
          <div className={styles.tierBadge}>
            <span className={styles.tierLevel}>Tier 3</span>
            <span className={styles.tierName}>Casters • Core Media & Voice Broadcasters</span>
          </div>

          <div className={styles.castersGrid}>
            <motion.div className={styles.memberCard} whileHover={{ y: -3 }}>
              <div className={styles.avatarCircleSm}>🎙️</div>
              <h3 className={styles.memberName}>Asma</h3>
              <div className={styles.memberRole}>Lead Podcast Host</div>
              <p className={styles.memberBio}>Hosting mental health discussions and flagship interviews.</p>
            </motion.div>

            <motion.div className={styles.memberCard} whileHover={{ y: -3 }}>
              <div className={styles.avatarCircleSm}>📻</div>
              <h3 className={styles.memberName}>Asma</h3>
              <div className={styles.memberRole}>Creative Audio Broadcaster</div>
              <p className={styles.memberBio}>Managing seasonal broadcast narratives and show themes.</p>
            </motion.div>

            <motion.div className={styles.memberCard} whileHover={{ y: -3 }}>
              <div className={styles.avatarCircleSm}>🎧</div>
              <h3 className={styles.memberName}>Atika</h3>
              <div className={styles.memberRole}>Media & Dialogue Caster</div>
              <p className={styles.memberBio}>Curating youth philosophy and cultural dialogues.</p>
            </motion.div>

            <motion.div className={styles.memberCard} whileHover={{ y: -3 }}>
              <div className={styles.avatarCircleSm}>✨</div>
              <h3 className={styles.memberName}>Wiwi</h3>
              <div className={styles.memberRole}>Event & Live Voice Host</div>
              <p className={styles.memberBio}>Hosting Chatter Box and live interactive community sessions.</p>
            </motion.div>
          </div>
        </div>

        {/* CONNECTOR LINE */}
        <div className={styles.connector}></div>

        {/* TIER 4: INTERNS */}
        <div className={styles.tierContainer}>
          <div className={styles.tierBadge}>
            <span className={styles.tierLevel}>Tier 4</span>
            <span className={styles.tierName}>Departmental Interns • Emerging Leaders (2 per Dept)</span>
          </div>

          <div className={styles.deptInternGrid}>
            <div className={styles.deptBox}>
              <div className={styles.deptHeader}>
                <span className={styles.deptIcon}>📢</span>
                <h4>Marketing Department</h4>
              </div>
              <p className={styles.deptDetail}>2 Interns driving social outreach, audience engagement, and campaign metrics.</p>
              <span className={styles.deptStatus}>Active Cohort</span>
            </div>

            <div className={styles.deptBox}>
              <div className={styles.deptHeader}>
                <span className={styles.deptIcon}>🤝</span>
                <h4>HR & Quality Department</h4>
              </div>
              <p className={styles.deptDetail}>2 Interns managing talent screening, member well-being, and review standards.</p>
              <span className={styles.deptStatus}>Active Cohort</span>
            </div>

            <div className={styles.deptBox}>
              <div className={styles.deptHeader}>
                <span className={styles.deptIcon}>✍️</span>
                <h4>Content & Production</h4>
              </div>
              <p className={styles.deptDetail}>2 Interns developing podcast scripts, visual assets, and editorial pieces.</p>
              <span className={styles.deptStatus}>Active Cohort</span>
            </div>

            <div className={styles.deptBox}>
              <div className={styles.deptHeader}>
                <span className={styles.deptIcon}>🎪</span>
                <h4>Event Management</h4>
              </div>
              <p className={styles.deptDetail}>2 Interns organizing Chatter Box, competitions, and global cultural meets.</p>
              <span className={styles.deptStatus}>Active Cohort</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
