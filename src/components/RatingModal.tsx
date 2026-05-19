import { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import styles from './RatingModal.module.css';
import { X, Star } from 'lucide-react';

type RatingModalProps = {
  onClose: () => void;
};

export default function RatingModal({ onClose }: RatingModalProps) {
  const { dispatch } = useApp();
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  function handleRate(val: number) {
    setSelected(val);
    dispatch({ type: 'SET_RATING', payload: val });
  }

  function handleSubmit() {
    if (!selected) return;
    setSubmitted(true);
    setTimeout(onClose, 1500);
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={18} />
        </button>

        {submitted ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>🎉</div>
            <h3 className={styles.successTitle}>Thanks for rating!</h3>
            <p className={styles.successSub}>Your feedback helps the squad grow.</p>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Rate Thursday's Session</h2>
            <p className={styles.subtitle}>How would you rate the session with Pixel Collective?</p>

            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  className={styles.star}
                  onMouseEnter={() => setHovered(val)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => handleRate(val)}
                >
                  <Star
                    size={36}
                    fill={(hovered || selected) >= val ? 'var(--warning)' : 'none'}
                    color={(hovered || selected) >= val ? 'var(--warning)' : 'var(--text-muted)'}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>

            {selected > 0 && (
              <p className={styles.ratingLabel}>
                {['', 'Needs work', 'Below average', 'Good session', 'Great session!', 'Outstanding! 🔥'][selected]}
              </p>
            )}

            <button
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={!selected}
            >
              Submit Rating
            </button>
          </>
        )}
      </div>
    </div>
  );
}
