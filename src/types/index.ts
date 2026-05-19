export type UserRole = 'student' | 'freelancer';

export type NavItem = 'squad' | 'sessions' | 'project' | 'billing';

export interface Member {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
  isLeader?: boolean;
}

export interface Task {
  id: string;
  label: string;
  done: boolean;
}

export interface Activity {
  id: string;
  member: string;
  avatar: string;
  action: string;
  time: string;
}

export interface Squad {
  id: string;
  name: string;
  rating: number;
  members: Member[];
  project: Project;
  nextSession: Date;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  progress: number;
  tasks: Task[];
  dueDate: string;
}

export interface SessionNote {
  id: string;
  text: string;
  author: string;
  time: string;
}

export interface AppState {
  role: UserRole | null;
  isLoggedIn: boolean;
  squad: Squad | null;
  tasks: Task[];
  sessionRating: number;
  sessionNotes: SessionNote[];
}
