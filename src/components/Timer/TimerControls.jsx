import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

export const TimerControls = ({ sessionType, setSessionType, isRunning, onStartPause, onReset, onSkip, pomodoroCount }) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Session Type Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          justifyContent: 'center',
        }}
      >
        {['work', 'short', 'long'].map((type) => (
          <button
            key={type}
            onClick={() => setSessionType(type)}
            style={{
              padding: '10px 16px',
              background: sessionType === type ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
              color: sessionType === type ? 'white' : 'var(--text-secondary)',
              border: sessionType === type ? '1px solid var(--accent)' : '1px solid var(--border)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'var(--transition)',
              textTransform: 'capitalize',
            }}
            onMouseEnter={(e) => {
              if (sessionType !== type) {
                e.target.style.background = 'rgba(124,58,237,0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (sessionType !== type) {
                e.target.style.background = 'rgba(255,255,255,0.05)';
              }
            }}
          >
            {type === 'work' ? 'Work' : type === 'short' ? 'Short Break' : 'Long Break'}
          </button>
        ))}
      </div>

      {/* Control Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <button
          onClick={onReset}
          style={{
            background: 'rgba(255,255,255,0.05)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition)',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(124,58,237,0.1)';
            e.target.style.color = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.05)';
            e.target.style.color = 'var(--text-secondary)';
          }}
          title="Reset timer (R)"
        >
          <RotateCcw size={20} />
        </button>

        <button
          onClick={onStartPause}
          style={{
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '1rem',
            fontWeight: 700,
            transition: 'var(--transition)',
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(0.98)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          title="Start/Pause (Space)"
        >
          {isRunning ? (
            <>
              <Pause size={24} /> Pause
            </>
          ) : (
            <>
              <Play size={24} /> Start
            </>
          )}
        </button>

        <button
          onClick={onSkip}
          style={{
            background: 'rgba(255,255,255,0.05)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition)',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(124,58,237,0.1)';
            e.target.style.color = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.05)';
            e.target.style.color = 'var(--text-secondary)';
          }}
          title="Skip session (S)"
        >
          <SkipForward size={20} />
        </button>
      </div>

      {/* Helper text and pomodoro count */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 8px 0' }}>
          Press Space to start/pause
        </p>
        <p style={{ fontSize: '1rem', color: 'var(--accent)', fontWeight: 600, margin: 0 }}>
          🍅 × {pomodoroCount}
        </p>
      </div>
    </div>
  );
};
