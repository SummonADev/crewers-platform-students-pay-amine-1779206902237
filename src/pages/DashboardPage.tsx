import { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import styles from './DashboardPage.module.css';
import Sidebar from '@/components/Sidebar';
import ProjectCard from '@/components/ProjectCard';
import ActivityFeed from '@/components/ActivityFeed';
import SessionPanel from '@/components/SessionPanel';
import RatingModal from '@/components/RatingModal';
import MemberAvatars from '@/components/MemberAvatars';
import { mockActivities } from '@/lib/mockData';
import { NavItem } from '@/types';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<NavItem>('squad');
  const [showRating, setShowRating] = useState(false);

  const { squad, tasks } = state;

  return (
    <div className={styles.layout}>
      <Sidebar activeNav={activeNav} onNav={setActiveNav} />

      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.squadName}>{squad.name}</h1>
            <div className={styles.squadMeta}>
              <span className={styles.ratingBadge}>★ {squad.rating}</span>
              <span className={styles.ratingLabel}>· {squad.members.length} members</span>
            </div>
          </div>
          <MemberAvatars members={squad.members} />
        </header>

        {/* Main + Right panel */}
        <div className={styles.body}>
          <div className={styles.content}>
            <ProjectCard project={squad.project} tasks={tasks} />
            <ActivityFeed activities={mockActivities} />
          </div>

          <aside className={styles.rightPanel}>
            <SessionPanel
              nextSession={squad.nextSession}
              onJoin={() => navigate('/session')}
              onRate={() => setShowRating(true)}
            />
          </aside>
        </div>
      </div>

      {showRating && <RatingModal onClose={() => setShowRating(false)} />}
    </div>
  );
}
