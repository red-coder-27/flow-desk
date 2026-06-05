import React from 'react';
import { LayoutDashboard, Target, Clock, CheckSquare } from 'lucide-react';

export const BottomNav = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'habits', label: 'Habits', icon: Target },
    { id: 'timer', label: 'Timer', icon: Clock },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'rgba(255, 255, 255, 0.02)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 100,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActivePage(item.id)}
          style={{
            background: 'transparent',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            padding: '8px',
            cursor: 'pointer',
            transition: 'var(--transition)',
            color: activePage === item.id ? 'var(--accent)' : 'var(--text-secondary)',
            flex: 1,
          }}
          onMouseEnter={(e) => {
            if (activePage !== item.id) {
              e.currentTarget.style.color = 'var(--accent)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = activePage === item.id ? 'var(--accent)' : 'var(--text-secondary)';
          }}
        >
          <item.icon size={24} />
          <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>{item.label}</span>
        </button>
      ))}
    </div>
  );
};
