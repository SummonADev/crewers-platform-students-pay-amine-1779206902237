import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import { NavItem } from '@/types';
import styles from './Sidebar.module.css';
import { Users, Calendar, FolderKanban, CreditCard, Zap, LogOut } from 'lucide-react';

type NavDef = {
  key: NavItem;
  label: string;
  icon: React.ReactNode;
};

const navItems: NavDef[] = [
  { key: 'squad', label: 'Squad', icon: <Users size={18} /> },
  { key: 'sessions', label: 'Sessions', icon: <Calendar size={18} /> },
  { key: 'project', label: 'Project', icon: <FolderKanban size={18} /> },
  { key: 'billing', label: 'Billing', icon: <CreditCard size={18} /> },
];

type SidebarProps = {
  activeNav: NavItem;
  onNav: (item: NavItem) => void;
};

export default function Sidebar({ activeNav, onNav }: SidebarProps) {
  const { dispatch } = useApp();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch({ type: 'LOGOUT' });
    navigate('/signup');
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Zap size={18} className={styles.logoIcon} />
        <span>Crewers</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`${styles.navItem} ${activeNav === item.key ? styles.navItemActive : ''}`}
            onClick={() => onNav(item.key)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label}</span>
            {activeNav === item.key && <div className={styles.navActivePill} />}
          </button>
        ))}
      </nav>

      <div className={styles.bottom}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>ER</div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>Emma Rossi</span>
            <span className={styles.userRole}>Student</span>
          </div>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout} title="Log out">
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
