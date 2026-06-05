import React, { useState } from 'react';
import { X } from 'lucide-react';

export const TimerSettings = ({ isOpen, onClose, settings, onUpdate }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onUpdate(localSettings);
    onClose();
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

        {/* Content */}
        <div style={{ flex: 1, padding: '24px' }}>
          {/* Sliders */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
              Durations
            </h3>

            {/* Work Duration */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <span>Work Session</span>
                <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{localSettings.work} min</span>
              </label>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={localSettings.work}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, work: parseInt(e.target.value) })
                }
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'linear-gradient(to right, var(--accent), var(--accent))',
                  outline: 'none',
                }}
              />
            </div>

            {/* Short Break */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <span>Short Break</span>
                <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{localSettings.short} min</span>
              </label>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={localSettings.short}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, short: parseInt(e.target.value) })
                }
                style={{ width: '100%', height: '6px', borderRadius: '3px', outline: 'none' }}
              />
            </div>

            {/* Long Break */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <span>Long Break</span>
                <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{localSettings.long} min</span>
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={localSettings.long}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, long: parseInt(e.target.value) })
                }
                style={{ width: '100%', height: '6px', borderRadius: '3px', outline: 'none' }}
              />
            </div>

            {/* Long Break Interval */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <span>Long Break After</span>
                <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{localSettings.longInterval} pomos</span>
              </label>
              <input
                type="range"
                min="2"
                max="8"
                step="1"
                value={localSettings.longInterval}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    longInterval: parseInt(e.target.value),
                  })
                }
                style={{ width: '100%', height: '6px', borderRadius: '3px', outline: 'none' }}
              />
            </div>
          </div>

          {/* Toggles */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
              Behavior
            </h3>

            {[
              { key: 'autoBreak', label: 'Auto-start Breaks' },
              { key: 'autoPomo', label: 'Auto-start Pomodoros' },
              { key: 'sound', label: 'Sound Notifications' },
              { key: 'tickSound', label: 'Tick Sound' },
            ].map((toggle) => (
              <div
                key={toggle.key}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  {toggle.label}
                </label>
                <input
                  type="checkbox"
                  checked={localSettings[toggle.key]}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, [toggle.key]: e.target.checked })
                  }
                  style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    accentColor: 'var(--accent)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '20px 24px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '12px',
          }}
        >
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'var(--transition)',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'var(--transition)',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(0.98)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          >
            Save Settings
          </button>
        </div>
      </div>
  );
};
