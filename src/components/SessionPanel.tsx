import { useState, useEffect } from 'react';
import styles from './SessionPanel.module.css';
import { Video, CalendarCheck, Clock } from 'lucide-react';

type SessionPanelProps = {
  nextSession: Date;
  onJoin: () => void;
  onRate: () => void;
};

function useCountdown(target: Date) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    function tick() {
      const diff = target.getTime() - Date.now();
      setRemaining(Math.max(0, diff));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return { hours, minutes, seconds };
}

export default function SessionPanel({ nextSession, onJoin, onRate }: SessionPanelProps) {
  const { hours, minutes, seconds } = useCountdown(nextSession);
  const [rsvp, setRsvp] = useState(false);

  return (
    <div className={styles.panel}>
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Clock size={15} className={styles.sectionIcon} />
          <h3 className={styles.sectionTitle}>Next Live Session</h3>
        </div>
        <div className={styles.countdown}>
          <div className={styles.timeBlock}>
            <span className={styles.timeNum}>{String(hours).padStart(2, '0')}</span>
            <span className={styles.timeLabel}>hrs</span>
          </div>
          <span className={styles.timeSep}>:</span>
          <div className={styles.timeBlock}>
            <span className={styles.timeNum}>{String(minutes).padStart(2, '0')}</span>
            <span className={styles.timeLabel}>min</span>
          </div>
          <span className={styles.timeSep}>:</span>
          <div className={styles.timeBlock}>
            <span className={styles.timeNum}>{String(seconds).padStart(2, '0')}</span>
            <span className={styles.timeLabel}>sec</span>
          </div>
        </div>

        <div className={styles.sessionMeta}>
          <CalendarCheck size={13} />
          <span>
            {nextSession.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            {' · '}
            {nextSession.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <button
          className={`${styles.rsvpBtn} ${rsvp ? styles.rsvpBtnActive : ''}`}
          onClick={() => setRsvp(!rsvp)}
        >
          {rsvp ? '✓ RSVP\'d' : 'RSVP for session'}
        </button>

        <button className={styles.joinBtn} onClick={onJoin}>
          <Video size={16} />
          Join Session
        </button>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Rate Last Session</h3>
        <p className={styles.rateDesc}>How was Thursday's session?</p>
        <button className={styles.rateBtn} onClick={onRate}>
          Rate Session
        </button>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Squad Subscription</h3>
        <div className={styles.planCard}>
          <div className={styles.planInfo}>
            <span className={styles.planName}>Pro Squad</span>
            <span className={styles.planPrice}>$49<span className={styles.planPeriod}>/mo</span></span>
          </div>
          <div className={styles.planBadge}>Active</div>
        </div>
        <p className={styles.planRenew}>Renews Dec 1, 2024</p>
      </div>
    </div>
  );
}
