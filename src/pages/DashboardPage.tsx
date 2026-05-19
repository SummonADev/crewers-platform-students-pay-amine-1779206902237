import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import { mockActivities } from '@/lib/mockData';
import { NavItem } from '@/types';
import Sidebar from '@/components/Sidebar';
import MemberAvatars from '@/components/MemberAvatars';
import ProjectCard from '@/components/ProjectCard';
import SessionPanel from '@/components/SessionPanel';
import ActivityFeed from '@/components/ActivityFeed';
import RatingModal from '@/components/RatingModal';
import styles from './DashboardPage.module.css';
import { Star, Zap } from 'lucide-react';

export default function DashboardPage() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<NavItem>('squad');
  const [showRating, setShowRating] = useState(false);

  const squad = state.squad;
  if (!squad) return null;

  return (
    <div className={styles.layout}>
      <Sidebar activeNav={activeNav} onNav={setActiveNav} />

      <div className={styles.content}>
        {/* Top bar */}
        <header className={styles.header}>
          <div className={styles.squadInfo}>
            <div className={styles.squadIconWrap}>
              <Zap size={18} className={styles.squadIcon} />
            </div>
            <div>
              <h1 className={styles.squadName}>{squad.name}</h1>
              <div className={styles.squadMeta}>
                <Star size={13} fill="var(--warning)" color="var(--warning)" />
                <span className={styles.rating}>{squad.rating.toFixed(1)}</span>
                <span className={styles.ratingLabel}}>· {squad.members.length} members</span>
              </div>
            </div>
          </div>
          <MemberAvatars members={squad.members} />
        </header>

        {/* Main + Right panel */}
        <div className={styles.body}>
          <main className={styles.main}>
            <ProjectCard
              project={squad.project}
              tasks={state.tasks}
            />

            <ActivityFeed activities={mockActivities} />
          </main>

          <aside className={styles.aside}>
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
