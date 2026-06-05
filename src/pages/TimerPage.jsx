import React, { useState } from 'react';
import { useTimer } from '../contexts/TimerContext';
import { TimerCircle } from '../components/Timer/TimerCircle';
import { TimerControls } from '../components/Timer/TimerControls';
import { TimerSettings } from '../components/Timer/TimerSettings';
import { SessionLog } from '../components/Timer/SessionLog';

export const TimerPage = () => {
  const { 
    sessionType, 
    setSessionType,
    timeLeft, 
    isRunning, 
    startPause,
    reset,
    skip,
    pomodoroCount, 
    settings, 
    updateSettings,
    sessions 
  } = useTimer();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', minHeight: 'calc(100vh - 80px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '32px' }}>
        {/* Timer Circle - Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
          <TimerCircle 
            timeLeft={timeLeft}
            totalDuration={
              sessionType === 'work' ? settings.work * 60 :
              sessionType === 'short' ? settings.short * 60 :
              settings.long * 60
            }
            sessionType={sessionType}
            isRunning={isRunning}
          />
        </div>

        {/* Controls & Stats - Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center' }}>
          {/* Session Type Indicator */}
          <div className="glass-card" style={{
            padding: '20px',
            textAlign: 'center',
            borderRadius: '16px',
            background: sessionType === 'work'
              ? 'rgba(99, 102, 241, 0.1)'
              : sessionType === 'short'
                ? 'rgba(34, 197, 94, 0.1)'
                : 'rgba(168, 85, 247, 0.1)',
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
              Current Session
            </p>
            <h2 style={{
              margin: '0',
              fontSize: '32px',
              fontWeight: '700',
              color: sessionType === 'work' ? '#6366f1' : sessionType === 'short' ? '#22c55e' : '#a855f7',
            }}>
              {sessionType === 'work' ? '🎯 Work Time' : sessionType === 'short' ? '☕ Short Break' : '🌟 Long Break'}
            </h2>
            <p style={{ margin: '12px 0 0 0', fontSize: '48px', fontWeight: '900', color: 'var(--text-primary)' }}>
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </p>
            {pomodoroCount > 0 && (
              <p style={{ margin: '12px 0 0 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                Pomodoros Completed: <span style={{ fontWeight: '700', color: 'var(--accent)' }}>{pomodoroCount}</span>
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="glass-card" style={{ padding: '20px', borderRadius: '16px' }}>
            <TimerControls 
              sessionType={sessionType}
              setSessionType={setSessionType}
              isRunning={isRunning}
              onStartPause={startPause}
              onReset={reset}
              onSkip={skip}
              pomodoroCount={pomodoroCount}
            />
          </div>

          {/* Settings Toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              padding: '12px 20px',
              background: showSettings ? 'var(--accent)' : 'var(--bg-card)',
              color: showSettings ? 'white' : 'var(--text-primary)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {showSettings ? '✓ Close Settings' : '⚙️ Timer Settings'}
          </button>

          {/* Settings Panel */}
          {showSettings && (
            <div className="glass-card" style={{ padding: '20px', borderRadius: '16px', animation: 'fadeSlideUp 0.3s' }}>
              <TimerSettings 
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
                settings={settings}
                onUpdate={updateSettings}
              />
            </div>
          )}
        </div>
      </div>

      {/* Session Log - Full Width Below */}
      <div style={{ marginTop: '40px', animation: 'fadeSlideUp 0.4s 0.2s both' }}>
        <SessionLog sessions={sessions || []} />
      </div>

      {/* Keyboard Shortcuts Info */}
      <div style={{
        marginTop: '32px',
        padding: '16px',
        background: 'var(--bg-card)',
        borderRadius: '12px',
        fontSize: '13px',
        color: 'var(--text-secondary)',
        textAlign: 'center',
      }}>
        <p style={{ margin: '0' }}>
          💡 <strong>Keyboard Shortcuts:</strong> Space (play/pause) | R (reset) | S (skip) | ? (help)
        </p>
      </div>
    </div>
  );
};

export default { TimerPage };
