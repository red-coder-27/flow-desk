import React, { useState, useEffect } from 'react';
import { HelpCircle, Sun, Moon, Download, Menu } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const TopNav = ({ pageTitle, setActivePage }) => {
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setShowShortcuts(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const shortcuts = [
    { key: 'Space', action: 'Start/Pause timer' },
    { key: 'R', action: 'Reset timer' },
    { key: 'S', action: 'Skip timer' },
    { key: 'D', action: 'Go to Dashboard' },
    { key: 'H', action: 'Go to Habits' },
    { key: 'F', action: 'Go to Timer' },
    { key: 'T', action: 'Go to Tasks' },
    { key: '?', action: 'Show shortcuts' },
  ];

  return (
    <>
      {/* Top Navigation */}
      <div
        style={{
          height: '60px',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Left: Title */}
        <h1
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0,
          }}
        >
          {pageTitle}
        </h1>

        {/* Right: Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Shortcuts Button */}
          <button
            onClick={() => setShowShortcuts(true)}
            style={{
              background: 'rgba(124,58,237,0.1)',
              border: 'none',
              color: 'var(--accent)',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9rem',
              transition: 'var(--transition)',
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(124,58,237,0.2)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(124,58,237,0.1)'}
            title="Keyboard shortcuts (? key)"
          >
            <HelpCircle size={18} />
            <span style={{ '@media (max-width: 768px)': { display: 'none' } }}>Help</span>
          </button>

          {/* Install Button */}
          {installPrompt && (
            <button
              onClick={async () => {
                installPrompt.prompt();
                const { outcome } = await installPrompt.userChoice;
                if (outcome === 'accepted') {
                  setInstallPrompt(null);
                }
              }}
              style={{
                background: 'rgba(124,58,237,0.2)',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                padding: '8px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.9rem',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(124,58,237,0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(124,58,237,0.2)'}
            >
              <Download size={18} />
              <span style={{ '@media (max-width: 768px)': { display: 'none' } }}>Install</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => {
              const themes = ['dark', 'light', 'system'];
              const current = theme === 'dark' ? 0 : theme === 'light' ? 1 : 2;
              setTheme(themes[(current + 1) % 3]);
            }}
            style={{
              background: 'rgba(124,58,237,0.1)',
              border: 'none',
              color: 'var(--accent)',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9rem',
              transition: 'var(--transition)',
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(124,58,237,0.2)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(124,58,237,0.1)'}
          >
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>

      {/* Shortcuts Modal */}
      {showShortcuts && (
        <div
          onClick={() => setShowShortcuts(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeSlideUp 0.2s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg-card)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '32px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              animation: 'fadeSlideUp 0.2s ease',
            }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '20px',
                margin: '0 0 20px 0',
              }}
            >
              Keyboard Shortcuts ⌨️
            </h2>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}
            >
              <tbody>
                {shortcuts.map((shortcut) => (
                  <tr key={shortcut.key} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td
                      style={{
                        padding: '12px 0',
                        paddingRight: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--accent)',
                      }}
                    >
                      {shortcut.key}
                    </td>
                    <td
                      style={{
                        padding: '12px 0',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {shortcut.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => setShowShortcuts(false)}
              style={{
                marginTop: '20px',
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: 600,
                width: '100%',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(0.98)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
