import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/AppContext';
import styles from './SessionPage.module.css';
import { Mic, MicOff, Video, VideoOff, Monitor, PhoneOff, Users, Plus } from 'lucide-react';

export default function SessionPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [newNote, setNewNote] = useState('');

  const squad = state.squad;

  function handleAddNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newNote.trim()) return;
    dispatch({
      type: 'ADD_NOTE',
      payload: {
        id: `n${Date.now()}`,
        text: newNote.trim(),
        author: 'Emma Rossi',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      },
    });
    setNewNote('');
  }

  function handleLeave() {
    navigate('/dashboard');
  }

  const doneTasks = state.tasks.filter(t => t.done).length;

  return (
    <div className={styles.page}>
      {/* Header bar */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.liveDot} />
          <span className={styles.liveLabel}>LIVE</span>
          <span className={styles.sessionTitle}>
            {squad ? squad.name : 'Session'} — {squad ? squad.project.title : ''}
          </span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.participantCount}>
            <Users size={15} />
            <span>{squad ? squad.members.length : 0} in session</span>
          </div>
        </div>
      </header>

      {/* Video area */}
      <div className={styles.videoArea}>
        <div className={styles.mainVideo}>
          <div className={styles.videoPlaceholder}>
            <div className={styles.videoGlow} />
            <div className={styles.videoGrid}>
              {squad && squad.members.map((m) => (
                <div key={m.id} className={styles.videoTile}>
                  <div className={styles.videoAvatar}>{m.avatar}</div>
                  <span className={styles.videoName}>{m.name}</span>
                  {m.isLeader && <span className={styles.leaderTag}>Leader</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Split content area */}
      <div className={styles.splitArea}>
        {/* Left: shared notes */}
        <div className={styles.notesPanel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Shared Notes</h3>
            <span className={styles.panelSub}>Visible to all squad members</span>
          </div>
          <div className={styles.notesList}>
            {state.sessionNotes.map((note) => (
              <div key={note.id} className={styles.noteItem}>
                <div className={styles.noteHeader}>
                  <span className={styles.noteAuthor}>{note.author}</span>
                  <span className={styles.noteTime}>{note.time}</span>
                </div>
                <p className={styles.noteText}>{note.text}</p>
              </div>
            ))}
          </div>
          <form className={styles.noteForm} onSubmit={handleAddNote}>
            <input
              className={styles.noteInput}
              placeholder="Add a note..."
              value={newNote}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewNote(e.target.value)}
            />
            <button type="submit" className={styles.noteSubmit}>
              <Plus size={16} />
            </button>
          </form>
        </div>

        {/* Right: live task checklist */}
        <div className={styles.taskPanel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Session Tasks</h3>
            <span className={styles.panelSub}>{doneTasks}/{state.tasks.length} done</span>
          </div>
          <div className={styles.taskList}>
            {state.tasks.map((task) => (
              <button
                key={task.id}
                className={`${styles.taskItem} ${task.done ? styles.taskDone : ''}`}
                onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
              >
                <div className={`${styles.taskCheck} ${task.done ? styles.taskCheckDone : ''}`}>
                  {task.done && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className={styles.taskLabel}>{task.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom control bar */}
      <div className={styles.controlBar}>
        <div className={styles.controls}>
          <button
            className={`${styles.controlBtn} ${!micOn ? styles.controlBtnOff : ''}`}
            onClick={() => setMicOn(!micOn)}
            title={micOn ? 'Mute' : 'Unmute'}
          >
            {micOn ? <Mic size={20} /> : <MicOff size={20} />}
            <span>{micOn ? 'Mute' : 'Unmute'}</span>
          </button>

          <button
            className={`${styles.controlBtn} ${!camOn ? styles.controlBtnOff : ''}`}
            onClick={() => setCamOn(!camOn)}
            title={camOn ? 'Stop Camera' : 'Start Camera'}
          >
            {camOn ? <Video size={20} /> : <VideoOff size={20} />}
            <span>{camOn ? 'Camera' : 'No Camera'}</span>
          </button>

          <button
            className={`${styles.controlBtn} ${sharing ? styles.controlBtnActive : ''}`}
            onClick={() => setSharing(!sharing)}
            title="Share Screen"
          >
            <Monitor size={20} />
            <span>{sharing ? 'Stop Share' : 'Share Screen'}</span>
          </button>
        </div>

        <button className={styles.leaveBtn} onClick={handleLeave}>
          <PhoneOff size={18} />
          <span>Leave Session</span>
        </button>
      </div>
    </div>
  );
}
