import React from 'react';
import { formatTime } from '../../utils/dateUtils';

export const TimerCircle = ({ timeLeft, totalDuration, sessionType, isRunning }) => {
  const progress = 1 - timeLeft / totalDuration;
  const circumference = Math.PI * 2 * 140; // radius = 140
  const strokeDashoffset = circumference * (1 - progress);

  const strokeColor = {
    work: '#7c3aed',
    short: '#10b981',
    long: '#3b82f6',
  }[sessionType];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '32px',
      }}
    >
      <svg width="320" height="320" viewBox="0 0 320 320" style={{ position: 'relative' }}>
        {/* Background circle */}
        <circle
          cx="160"
          cy="160"
          r="140"
          fill="none"
          stroke="var(--bg-secondary)"
          strokeWidth="8"
        />

        {/* Progress arc */}
        <circle
          cx="160"
          cy="160"
          r="140"
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: 'stroke-dashoffset 1s linear',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            filter: isRunning ? `drop-shadow(0 0 20px ${strokeColor})` : 'none',
            animation: isRunning ? 'pulse 2s ease-in-out infinite' : 'none',
          }}
          strokeLinecap="round"
        />

        {/* Center text */}
        <g>
          <text
            x="160"
            y="155"
            textAnchor="middle"
            style={{
              fontSize: '56px',
              fontWeight: '800',
              fill: 'var(--text-primary)',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            {formatTime(timeLeft)}
          </text>
          <text
            x="160"
            y="190"
            textAnchor="middle"
            style={{
              fontSize: '18px',
              fill: 'var(--text-secondary)',
              fontFamily: 'Inter, system-ui, sans-serif',
              textTransform: 'capitalize',
            }}
          >
            {sessionType === 'work' ? 'Focus' : sessionType === 'short' ? 'Short Break' : 'Long Break'}
          </text>
        </g>
      </svg>
    </div>
  );
};
