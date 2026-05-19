import { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, UserRole, Task, SessionNote } from '@/types';
import { mockSquad, mockTasks, mockNotes } from '@/lib/mockData';

type Action =
  | { type: 'SET_ROLE'; payload: UserRole }
  | { type: 'LOGIN' }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'SET_RATING'; payload: number }
  | { type: 'ADD_NOTE'; payload: SessionNote }
  | { type: 'LOGOUT' };

const initialState: AppState = {
  role: null,
  isLoggedIn: false,
  squad: mockSquad,
  tasks: mockTasks,
  sessionRating: 0,
  sessionNotes: mockNotes,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'LOGIN':
      return { ...state, isLoggedIn: true };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t: Task) =>
          t.id === action.payload ? { ...t, done: !t.done } : t
        ),
      };
    case 'SET_RATING':
      return { ...state, sessionRating: action.payload };
    case 'ADD_NOTE':
      return { ...state, sessionNotes: [...state.sessionNotes, action.payload] };
    case 'LOGOUT':
      return { ...initialState, squad: mockSquad, tasks: mockTasks, sessionNotes: mockNotes };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
