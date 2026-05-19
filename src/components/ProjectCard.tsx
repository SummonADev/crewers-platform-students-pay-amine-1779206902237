import { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Project, Task } from '@/types';
import styles from './ProjectCard.module.css';
import { Briefcase, CheckCircle2, Circle, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
  tasks: Task[];
};

export default function ProjectCard({ project, tasks }: ProjectCardProps) {
  const { dispatch } = useApp();
  const [expanded, setExpanded] = useState(true);

  const done = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardLeft}>
          <div className={styles.cardIcon}>
            <Briefcase size={18} />
          </div>
          <div>
            <h2 className={styles.cardTitle}>{project.title}</h2>
            <p className={styles.cardClient}>Client: <strong>{project.client}</strong></p>
          </div>
        </div>
        <div className={styles.cardRight}>
          <div className={styles.dueDateBadge}>
            <Calendar size={12} />
            <span>{project.dueDate}</span>
          </div>
          <button
            className={styles.expandBtn}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      <p className={styles.description}>{project.description}</p>

      {/* Progress bar */}
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Progress</span>
          <span className={styles.progressValue}>{progress}%</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className={styles.progressSub}>{done} of {total} tasks complete</p>
      </div>

      {/* Task list */}
      {expanded && (
        <div className={styles.tasks}>
          <h3 className={styles.tasksTitle}>Task list</h3>
          <div className={styles.taskList}>
            {tasks.map((task) => (
              <button
                key={task.id}
                className={`${styles.task} ${task.done ? styles.taskDone : ''}`}
                onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
              >
                <span className={styles.taskIcon}>
                  {task.done
                    ? <CheckCircle2 size={17} color="var(--success)" />
                    : <Circle size={17} color="var(--text-muted)" />}
                </span>
                <span className={styles.taskLabel}>{task.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
