import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import { UserRole } from '@/types';
import styles from './SignupPage.module.css';
import { Zap, Code2, ChevronRight, Star } from 'lucide-react';

export default function SignupPage() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'role' | 'form'>('role');

  function handleRoleSelect(role: UserRole) {
    setSelectedRole(role);
    dispatch({ type: 'SET_ROLE', payload: role });
    setStep('form');
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;
    dispatch({ type: 'LOGIN' });
    navigate('/dashboard');
  }

  return (
    <div className={styles.page}>
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Zap size={20} className={styles.logoIcon} />
          <span>Crewers</span>
        </div>
        <div className={styles.navRight}>
          <span className={styles.navLink}>Already have an account?</span>
          <button className={styles.signInBtn} onClick={() => { dispatch({ type: 'LOGIN' }); navigate('/dashboard'); }}>
            Sign in
          </button>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.badge}>
            <Star size={12} fill="currentColor" />
            <span>Trusted by 1,200+ developers & students</span>
          </div>
          <h1 className={styles.headline}>
            Learn by shipping.<br />
            <span className={styles.headlineAccent}>With a crew.</span>
          </h1>
          <p className={styles.subheadline}>
            Join small squads led by freelance developers. Build real client projects.
            <br />Ship work that matters — together.
          </p>
        </div>

        {step === 'role' ? (
          <div className={styles.roleSection}>
            <p className={styles.rolePrompt}>How do you want to join?</p>
            <div className={styles.roleCards}>
              <button
                className={`${styles.roleCard} ${selectedRole === 'student' ? styles.roleCardActive : ''}`}
                onClick={() => handleRoleSelect('student')}
              >
                <div className={styles.roleCardIcon}>
                  <Code2 size={28} />
                </div>
                <div className={styles.roleCardBody}>
                  <h3 className={styles.roleCardTitle}>I'm a student</h3>
                  <p className={styles.roleCardDesc}>
                    Join a squad, work on real client projects, and level up your dev skills by actually shipping.
                  </p>
                </div>
                <div className={styles.roleCardArrow}>
                  <ChevronRight size={20} />
                </div>
                <div className={styles.roleCardGlow} />
              </button>

              <button
                className={`${styles.roleCard} ${selectedRole === 'freelancer' ? styles.roleCardActive : ''}`}
                onClick={() => handleRoleSelect('freelancer')}
              >
                <div className={`${styles.roleCardIcon} ${styles.roleCardIconViolet}`}>
                  <Zap size={28} />
                </div>
                <div className={styles.roleCardBody}>
                  <h3 className={styles.roleCardTitle}>I'm a freelancer</h3>
                  <p className={styles.roleCardDesc}>
                    Lead a squad of students, take on client work, earn more, and build your reputation as a mentor.
                  </p>
                </div>
                <div className={styles.roleCardArrow}>
                  <ChevronRight size={20} />
                </div>
                <div className={`${styles.roleCardGlow} ${styles.roleCardGlowViolet}`} />
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.formSection}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <div className={`${styles.formBadge} ${selectedRole === 'freelancer' ? styles.formBadgeViolet : ''}`}>
                  {selectedRole === 'student' ? <Code2 size={14} /> : <Zap size={14} />}
                  <span>{selectedRole === 'student' ? 'Student' : 'Freelancer'}</span>
                </div>
                <button className={styles.changeRole} onClick={() => setStep('role')}>Change role</button>
              </div>
              <h2 className={styles.formTitle}>Create your account</h2>
              <p className={styles.formSubtitle}>
                {selectedRole === 'student'
                  ? 'Pick a squad, ship your first project, get unstuck.'
                  : 'Apply to lead a squad. We review all freelancer applications.'}
              </p>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <label className={styles.label}>Email address</label>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Password</label>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className={`${styles.submitBtn} ${selectedRole === 'freelancer' ? styles.submitBtnViolet : ''}`}>
                  {selectedRole === 'student' ? 'Join as a Student' : 'Apply as a Freelancer'}
                  <ChevronRight size={18} />
                </button>
              </form>
              <p className={styles.terms}>
                By continuing, you agree to our <span className={styles.termsLink}>Terms of Service</span> and <span className={styles.termsLink}>Privacy Policy</span>.
              </p>
            </div>
          </div>
        )}

        <div className={styles.socialProof}>
          <div className={styles.avatarStack}>
            {['AC', 'ER', 'JP', 'SL', 'NK'].map((a, i) => (
              <div key={i} className={styles.stackAvatar} style={{ zIndex: 5 - i }}>{a}</div>
            ))}
          </div>
          <p className={styles.socialProofText}>
            <strong>240+ squads</strong> are shipping right now
          </p>
        </div>
      </main>
    </div>
  );
}
