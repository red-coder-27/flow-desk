import React, { useState } from 'react';
import {
  Zap,
  LayoutDashboard,
  Target,
  Clock,
  CheckSquare,
  Settings,
  ChevronRight,
  Sun,
  Moon,
  Menu,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const Sidebar = ({ activePage, setActivePage, isMobileMenuOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'habits', label: 'Habits', icon: Target },
    { id: 'timer', label: 'Timer', icon: Clock },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        style={{
          width: isCollapsed ? '64px' : '240px',
          height: '100vh',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '20px 12px',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width var(--transition)',
          position: 'relative',
          '@media (max-width: 768px)': {
            display: 'none',
          },
        }}
        className="sidebar-desktop"
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 8px',
            marginBottom: '30px',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            animation: 'fadeSlideUp 0.3s ease',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
              padding: '6px',
              borderRadius: '8px',
            }}
          >
            <Zap size={24} color="white" />
          </div>
          {!isCollapsed && (
            <span
              style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              FlowDesk
            </span>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            position: 'absolute',
            top: '20px',
            right: isCollapsed ? '8px' : '12px',
            background: 'rgba(124,58,237,0.2)',
            border: 'none',
            color: 'var(--accent)',
            padding: '6px',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition)',
          }}
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          <ChevronRight
            size={18}
            style={{
              transform: isCollapsed ? 'rotate(0)' : 'rotate(180deg)',
              transition: 'transform var(--transition)',
            }}
          />
        </button>

        {/* Nav Items */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 12px',
                background:
                  activePage === item.id
                    ? '#7c3aed'
                    : 'transparent',
                color:
                  activePage === item.id
                    ? 'white'
                    : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: activePage === item.id ? 600 : 500,
                transition: 'var(--transition)',
                position: 'relative',
                borderLeft: activePage === item.id ? '3px solid white' : '3px solid transparent',
                paddingLeft: '9px',
                animation: `fadeSlideUp 0.3s ease ${index * 0.05}s both`,
              }}
              title={isCollapsed ? item.label : ''}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
          <button
            onClick={() => {
              const themes = ['dark', 'light', 'system'];
              const current = theme === 'dark' ? 0 : theme === 'light' ? 1 : 2;
              setTheme(themes[(current + 1) % 3]);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: '12px',
              padding: '12px',
              background: 'rgba(124,58,237,0.1)',
              color: 'var(--accent)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
            title="Toggle theme"
          >
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            {!isCollapsed && <span style={{ fontSize: '0.85rem' }}>{theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'}</span>}
          </button>

          <div
            style={{
              textAlign: isCollapsed ? 'center' : 'left',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              padding: '8px 0',
            }}
          >
            {!isCollapsed && 'v1.0.0'}
          </div>
        </div>
      </div>
    </>
  );
};
