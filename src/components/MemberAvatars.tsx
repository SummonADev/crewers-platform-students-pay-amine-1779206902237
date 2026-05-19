import { Member } from '@/types';
import styles from './MemberAvatars.module.css';

type MemberAvatarsProps = {
  members: Member[];
};

export default function MemberAvatars({ members }: MemberAvatarsProps) {
  return (
    <div className={styles.wrap}>
      {members.map((m, i) => (
        <div
          key={m.id}
          className={`${styles.avatar} ${m.isLeader ? styles.avatarLeader : ''}`}
          style={{ zIndex: members.length - i }}
          title={`${m.name}${m.isLeader ? ' (Leader)' : ''}`}
        >
          {m.avatar}
        </div>
      ))}
      <div className={styles.count}>+{members.length} members</div>
    </div>
  );
}
