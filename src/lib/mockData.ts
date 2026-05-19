import { Squad, Task, SessionNote } from '@/types';

export const mockSquad: Squad = {
  id: 'squad-1',
  name: 'Pixel Collective',
  rating: 4.8,
  members: [
    { id: 'm1', name: 'Alex Chen', avatar: 'AC', role: 'freelancer', isLeader: true },
    { id: 'm2', name: 'Emma Rossi', avatar: 'ER', role: 'student' },
    { id: 'm3', name: 'Jake Park', avatar: 'JP', role: 'student' },
    { id: 'm4', name: 'Sofia Lima', avatar: 'SL', role: 'student' },
    { id: 'm5', name: 'Noah Kim', avatar: 'NK', role: 'student' },
  ],
  project: {
    id: 'proj-1',
    title: 'E-commerce Redesign',
    client: 'Bloom & Co.',
    description: 'Full redesign of an e-commerce storefront using React + Tailwind. The client wants a modern, conversion-focused UI with a cart, checkout, and product filtering.',
    progress: 62,
    tasks: [],
    dueDate: 'Nov 30, 2024',
  },
  nextSession: new Date(Date.now() + 2 * 60 * 60 * 1000 + 34 * 60 * 1000),
};

export const mockTasks: Task[] = [
  { id: 't1', label: 'Set up project repo & folder structure', done: true },
  { id: 't2', label: 'Design system: color tokens & typography', done: true },
  { id: 't3', label: 'Build product listing component', done: true },
  { id: 't4', label: 'Implement cart sidebar with animations', done: false },
  { id: 't5', label: 'Checkout flow — step 1 (contact info)', done: false },
  { id: 't6', label: 'Checkout flow — step 2 (payment)', done: false },
  { id: 't7', label: 'Mobile responsiveness pass', done: false },
  { id: 't8', label: 'Client review & final handoff', done: false },
];

export const mockActivities = [
  { id: 'a1', member: 'Alex Chen', avatar: 'AC', action: 'marked "Design system" as complete', time: '2m ago' },
  { id: 'a2', member: 'Emma Rossi', avatar: 'ER', action: 'pushed 3 commits to main branch', time: '14m ago' },
  { id: 'a3', member: 'Jake Park', avatar: 'JP', action: 'left a comment on the cart component', time: '31m ago' },
  { id: 'a4', member: 'Sofia Lima', avatar: 'SL', action: 'RSVP\'d for Tuesday\'s session', time: '1h ago' },
  { id: 'a5', member: 'Noah Kim', avatar: 'NK', action: 'uploaded design mockups to the project', time: '2h ago' },
];

export const mockNotes: SessionNote[] = [
  { id: 'n1', text: 'Focus today: cart sidebar animations using Framer Motion patterns', author: 'Alex Chen', time: '10:02 AM' },
  { id: 'n2', text: 'Use CSS custom properties for animation durations — keeps it consistent', author: 'Emma Rossi', time: '10:05 AM' },
  { id: 'n3', text: 'Cart should slide in from the right, overlay with a backdrop blur', author: 'Alex Chen', time: '10:07 AM' },
];
