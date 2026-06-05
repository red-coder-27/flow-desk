import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { TimerProvider } from './contexts/TimerContext';
import { Sidebar } from './components/Layout/Sidebar';
import { TopNav } from './components/Layout/TopNav';
import { BottomNav } from './components/Layout/BottomNav';
import { Toast } from './components/common/Toast';
import { DashboardHome } from './components/Dashboard/DashboardHome';
import { HabitList } from './components/Habits/HabitList';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Lazy load pages
const TimerPage = lazy(() => import('./pages/TimerPage').then(m => ({ default: m.TimerPage })));
const KanbanBoard = lazy(() => import('./components/Tasks/KanbanBoard').then(m => ({ default: m.KanbanBoard })));
const SettingsPage = lazy(() => import('./components/Settings/SettingsPage').then(m => ({ default: m.SettingsPage })));

const APP_LAYOUT = {
  dashboard: { title: 'Dashboard', component: DashboardHome },
  habits: { title: 'My Habits', component: HabitList },
  timer: { title: 'Focus Timer', component: null },
  tasks: { title: 'Kanban Board', component: KanbanBoard },
  settings: { title: 'Settings', component: SettingsPage },
};

const PageLoader = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'transparent',
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid var(--bg-card)',
      borderTop: '3px solid var(--accent)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
  </div>
);

const AppContent = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const pageConfig = APP_LAYOUT[activePage];

  // Handle responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Register keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) return;
      
      // Ignore if typing in input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      
      if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setActivePage('dashboard');
      } else if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        setActivePage('habits');
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        setActivePage('timer');
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setActivePage('tasks');
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'transparent', overflow: 'hidden' }}>
      {/* Sidebar (hidden on mobile) */}
      {!isMobile && (
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        {/* Top Navigation */}
        <TopNav pageTitle={pageConfig?.title || 'FlowDesk'} setActivePage={setActivePage} />

        {/* Page Content */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: isMobile ? '70px' : '0' }}>
          {activePage === 'dashboard' && (
            <ErrorBoundary>
              <DashboardHome setActivePage={setActivePage} />
            </ErrorBoundary>
          )}

          {activePage === 'habits' && (
            <ErrorBoundary>
              <HabitList />
            </ErrorBoundary>
          )}

          {activePage === 'timer' && (
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <TimerPage />
              </Suspense>
            </ErrorBoundary>
          )}

          {activePage === 'tasks' && (
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <KanbanBoard />
              </Suspense>
            </ErrorBoundary>
          )}

          {activePage === 'settings' && (
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <SettingsPage setActivePage={setActivePage} />
              </Suspense>
            </ErrorBoundary>
          )}
        </div>
      </div>

      {/* Bottom Navigation (mobile only) */}
      {isMobile && <BottomNav activePage={activePage} setActivePage={setActivePage} />}

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <TimerProvider>
        <AppContent />
      </TimerProvider>
    </ThemeProvider>
  );
}

export default App;
