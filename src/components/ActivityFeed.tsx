import styles from './ActivityFeed.module.css';

type ActivityItem = {
  id: string;
  member: string;
  avatar: string;
  action: string;
  time: string;
};

type ActivityFeedProps = {
  activities: ActivityItem[];
};

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className={styles.feed}>
      <h3 className={styles.feedTitle}>Recent Activity</h3>
      <div className={styles.list}>
        {activities.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.avatar}>{item.avatar}</div>
            <div className={styles.body}>
              <span className={styles.member}>{item.member}</span>
              <span className={styles.action}> {item.action}</span>
            </div>
            <span className={styles.time}>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
