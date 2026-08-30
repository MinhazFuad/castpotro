'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TEAM_MEMBERS_DATA, DEPARTMENT_CATEGORIES, TeamMember } from '@/lib/team-members-data';
import { playPopSound, playChimeSound } from '@/lib/sound';
import styles from './TeamHierarchy.module.css';

export default function TeamHierarchy() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('castpotro_team_favs');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    let updated: string[] = [];
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    try {
      localStorage.setItem('castpotro_team_favs', JSON.stringify(updated));
    } catch (e) {}
  };

  // Filter members based on Category and Search Query
  const filteredMembers = TEAM_MEMBERS_DATA.filter((member) => {
    const matchesCategory =
      activeCategory === 'all' ||
      member.department === activeCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      member.name.toLowerCase().includes(query) ||
      member.designation.toLowerCase().includes(query) ||
      member.country.toLowerCase().includes(query) ||
      member.city.toLowerCase().includes(query) ||
      (member.university && member.university.toLowerCase().includes(query)) ||
      member.skills.some((s) => s.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const getDepartmentColor = (dept: string) => {
    switch (dept) {
      case 'operations':
        return 'var(--pastel-butter)';
      case 'event':
        return 'var(--pastel-rose)';
      case 'quality':
        return 'var(--pastel-sage)';
      case 'marketing':
        return 'var(--pastel-sky)';
      case 'content':
        return 'var(--pastel-lavender)';
      default:
        return 'var(--pastel-butter)';
    }
  };

  return (
    <section id="team" className={styles.section}>
      <div className="container">
        {/* HEADER BLOCK */}
        <div className={styles.headerBlock}>
          <span className="section-tag">[ 03 / GLOBAL NETWORK TEAM ]</span>
          <h2 className="section-title">The People Behind Castpotro</h2>
          <p className="section-subtitle">
            A decentralized international collective of visionary leaders, strategists, and creators building next-generation digital radio and youth empowerment initiatives.
          </p>
        </div>

        {/* METRICS & DIVERSITY STRIP */}
        <div className={styles.statsStrip}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>{TEAM_MEMBERS_DATA.length}</span>
            <span className={styles.statLabel}>CORE LEADERS & MEMBERS</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>5</span>
            <span className={styles.statLabel}>COUNTRIES (🇧🇩 🇺🇦 🇰🇿 🇦🇫 🇹🇷)</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>4</span>
            <span className={styles.statLabel}>CORE OPERATIONAL WINGS</span>
          </div>
        </div>

        {/* CONTROLS BAR: SEARCH & DEPARTMENT FILTER TABS */}
        <div className={styles.controlsBar}>
          {/* SEARCH INPUT */}
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search by name, role, skill, university, or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={styles.clearSearchBtn}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* DEPARTMENT FILTER TABS */}
          <div className={styles.filterTabs}>
            {DEPARTMENT_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? TEAM_MEMBERS_DATA.length
                  : TEAM_MEMBERS_DATA.filter((m) => m.department === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playPopSound();
                    setActiveCategory(cat.id);
                  }}
                  className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ''}`}
                >
                  <span className={styles.catIcon}>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={styles.countBadge}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MEMBER CARDS GRID */}
        {filteredMembers.length > 0 ? (
          <div className={styles.membersGrid}>
            {filteredMembers.map((member) => {
              const isFav = favorites.includes(member.id);
              const deptBg = getDepartmentColor(member.department);

              return (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={styles.memberCard}
                  onClick={() => {
                    playChimeSound();
                    setSelectedMember(member);
                  }}
                >
                  {/* CARD TOP BAR */}
                  <div className={styles.cardHeader}>
                    <span
                      className={styles.deptBadge}
                      style={{ backgroundColor: deptBg }}
                    >
                      {member.roleBadge}
                    </span>

                    <button
                      onClick={(e) => toggleFavorite(member.id, e)}
                      className={`${styles.favBtn} ${isFav ? styles.favBtnActive : ''}`}
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {isFav ? '❤️' : '🤍'}
                    </button>
                  </div>

                  {/* MEMBER PHOTO & ORIGIN */}
                  <div className={styles.photoContainer}>
                    <div className={styles.photoFrame}>
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={180}
                        height={180}
                        className={styles.memberPhoto}
                        priority={member.featured}
                      />
                    </div>
                    <div className={styles.countryPill}>
                      <span>{member.countryFlag}</span>
                      <span>{member.city}, {member.country}</span>
                    </div>
                  </div>

                  {/* MEMBER INFO */}
                  <div className={styles.memberBody}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <div className={styles.memberRole}>{member.designation}</div>

                    <p className={styles.memberBio}>
                      {member.bio}
                    </p>

                    {/* SKILL TAGS */}
                    <div className={styles.skillsRow}>
                      {member.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className={styles.moreSkillsTag}>
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CARD FOOTER */}
                  <div className={styles.cardFooter}>
                    <span className={styles.viewProfileText}>
                      View Profile & Details →
                    </span>

                    <div className={styles.socialQuickLinks}>
                      {member.socialLinks.linkedin && (
                        <a
                          href={member.socialLinks.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={styles.socialIconBtn}
                          title="LinkedIn Profile"
                        >
                          in
                        </a>
                      )}
                      {member.socialLinks.instagram && (
                        <a
                          href={member.socialLinks.instagram}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={styles.socialIconBtn}
                          title="Instagram Profile"
                        >
                          ig
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE (E.G. CONTENT WING RECRUITING) */
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>✍️</div>
            <h3 className={styles.emptyTitle}>Content & Production Cohort 2026</h3>
            <p className={styles.emptyText}>
              Our Content & Audio Production wing is currently onboarding emerging scriptwriters, dialogue casters, and audio editors.
            </p>
            <Link href="/test" className={styles.emptyCtaBtn} onClick={playPopSound}>
              Apply via Talent Gateway →
            </Link>
          </div>
        )}

        {/* EDITORIAL MEMBER DETAIL MODAL */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.modalBackdrop}
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className={styles.closeModalBtn}
                  title="Close Modal"
                >
                  ✕
                </button>

                <div className={styles.modalLayout}>
                  {/* LEFT COLUMN: PHOTO & BADGES */}
                  <div className={styles.modalPhotoCol}>
                    <div className={styles.modalPhotoFrame}>
                      <Image
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        width={240}
                        height={240}
                        className={styles.modalPhoto}
                      />
                    </div>

                    <div className={styles.modalOriginBadge}>
                      <span className={styles.modalFlag}>{selectedMember.countryFlag}</span>
                      <span>{selectedMember.city}, {selectedMember.country}</span>
                    </div>

                    {selectedMember.university && (
                      <div className={styles.modalUniversity}>
                        <span className={styles.uniIcon}>🎓</span>
                        <span>{selectedMember.university}</span>
                      </div>
                    )}
                  </div>

                  {/* RIGHT COLUMN: EXECUTIVE DETAILS */}
                  <div className={styles.modalDetailsCol}>
                    <div className={styles.modalHeaderInfo}>
                      <span
                        className={styles.modalDeptTag}
                        style={{
                          backgroundColor: getDepartmentColor(selectedMember.department)
                        }}
                      >
                        {selectedMember.departmentLabel} // {selectedMember.roleBadge}
                      </span>
                      <h2 className={styles.modalName}>{selectedMember.name}</h2>
                      <div className={styles.modalRole}>{selectedMember.designation}</div>
                    </div>

                    {/* VISION QUOTE */}
                    {selectedMember.quote && (
                      <blockquote className={styles.modalQuote}>
                        “{selectedMember.quote}”
                      </blockquote>
                    )}

                    {/* FULL BIO */}
                    <div className={styles.modalBioSection}>
                      <h4 className={styles.modalSectionHeading}>// EXECUTIVE BIOGRAPHY</h4>
                      <p className={styles.modalBio}>{selectedMember.bio}</p>
                    </div>

                    {/* SKILLS & DOMAIN EXPERTISE */}
                    <div className={styles.modalSkillsSection}>
                      <h4 className={styles.modalSectionHeading}>// CORE COMPETENCIES</h4>
                      <div className={styles.modalSkillsList}>
                        {selectedMember.skills.map((skill, idx) => (
                          <span key={idx} className={styles.modalSkillChip}>
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* ACTIONS & SOCIAL CONNECT */}
                    <div className={styles.modalActionRow}>
                      {selectedMember.email && (
                        <a
                          href={`mailto:${selectedMember.email}`}
                          className={styles.modalEmailBtn}
                          onClick={playPopSound}
                        >
                          ✉ Send Email
                        </a>
                      )}

                      {selectedMember.socialLinks.linkedin && (
                        <a
                          href={selectedMember.socialLinks.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.modalSocialBtn}
                          onClick={playPopSound}
                        >
                          LinkedIn Profile →
                        </a>
                      )}

                      {selectedMember.socialLinks.instagram && (
                        <a
                          href={selectedMember.socialLinks.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.modalSocialBtn}
                          onClick={playPopSound}
                        >
                          Instagram Profile →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
