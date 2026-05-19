import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from '@/pages/SignupPage';
import DashboardPage from '@/pages/DashboardPage';
import SessionPage from '@/pages/SessionPage';
import { AppProvider } from '@/lib/AppContext';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/session" element={<SessionPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
