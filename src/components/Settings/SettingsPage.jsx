import React, { useRef, useState } from 'react';
import { Download, Upload, Trash2, ExternalLink, Zap } from 'lucide-react';
import { getItem, setItem, KEYS, clearAll } from '../../utils/storage';
import toast from 'react-hot-toast';

export const SettingsPage = ({ setActivePage }) => {
  const fileInputRef = useRef(null);
  const [accentColor, setAccentColor] = useState('#7c3aed');

  const handleExport = () => {
    const data = {
      habits: getItem(KEYS.HABITS, []),
      tasks: getItem(KEYS.TASKS, []),
      sessions: getItem(KEYS.TIMER_SESSIONS, []),
      settings: getItem(KEYS.TIMER_SETTINGS, {}),
      theme: getItem(KEYS.THEME, 'dark'),
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flowdesk-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Backup exported!');
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result);
        if (window.confirm('This will replace all your data. Continue?')) {
          if (data.habits) setItem(KEYS.HABITS, data.habits);
          if (data.tasks) setItem(KEYS.TASKS, data.tasks);
          if (data.sessions) setItem(KEYS.TIMER_SESSIONS, data.sessions);
          if (data.settings) setItem(KEYS.TIMER_SETTINGS, data.settings);
          if (data.theme) setItem(KEYS.THEME, data.theme);
          toast.success('Data imported successfully!');
          window.location.reload();
        }
      } catch (error) {
        toast.error('Invalid backup file');
      }
    };
    reader.readAsText(file);
  };

  const handleClear = (type) => {
    if (window.confirm(`Clear all ${type}? This cannot be undone.`)) {
      if (type === 'habits') setItem(KEYS.HABITS, []);
      if (type === 'tasks') setItem(KEYS.TASKS, []);
      if (type === 'all') clearAll();
      toast.success(`${type} cleared!`);
      window.location.reload();
    }
  };

  return (
    <div
      style={{
        padding: '32px',
        maxWidth: '800px',
        margin: '0 auto',
        animation: 'fadeSlideUp 0.3s ease',
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          margin: '0 0 32px 0',
        }}
      >
        Settings
      </h1>

      {/* Appearance */}
      <div
        style={{
          background: 'var(--bg-card)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          marginBottom: '20px',
        }}
        className="glass-card"
      >
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: '0 0 16px 0',
          }}
        >
          Appearance
        </h2>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Customize how FlowDesk looks
        </p>
      </div>

      {/* Data Management */}
      <div
        style={{
          background: 'var(--bg-card)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          marginBottom: '20px',
        }}
        className="glass-card"
      >
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: '0 0 16px 0',
          }}
        >
          Data Management
        </h2>

        <div style={{ display: 'grid', gap: '12px' }}>
          <button
            onClick={handleExport}
            style={{
              padding: '12px 16px',
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'var(--transition)',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(0.98)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          >
            <Download size={20} /> Export All Data
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: '12px 16px',
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'var(--transition)',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(0.98)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          >
            <Upload size={20} /> Import Data
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />

          <button
            onClick={() => handleClear('habits')}
            style={{
              padding: '12px 16px',
              background: 'transparent',
              color: '#ef4444',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'var(--transition)',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(239,68,68,0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            <Trash2 size={20} /> Clear Habits
          </button>

          <button
            onClick={() => handleClear('tasks')}
            style={{
              padding: '12px 16px',
              background: 'transparent',
              color: '#ef4444',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'var(--transition)',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(239,68,68,0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            <Trash2 size={20} /> Clear Tasks
          </button>

          <button
            onClick={() => handleClear('all')}
            style={{
              padding: '12px 16px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'var(--transition)',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(0.98)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          >
            <Trash2 size={20} /> Clear All Data
          </button>
        </div>
      </div>

      {/* About */}
      <div
        style={{
          background: 'var(--bg-card)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          textAlign: 'center',
        }}
        className="glass-card"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
          <Zap size={32} color="#7c3aed" />
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            FlowDesk
          </h2>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '16px 0' }}>
          v1.0.0 — All-in-one productivity dashboard
        </p>

        <p
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '0.9rem',
            fontWeight: 600,
            margin: '0 0 20px 0',
          }}
        >

        </p>


      </div>
    </div>
  );
};
