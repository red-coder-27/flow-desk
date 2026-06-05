import React, { useMemo } from 'react';
import { Clock } from 'lucide-react';
import { formatSessionDate } from '../../utils/dateUtils';

export const SessionLog = ({ sessions }) => {
  const recentSessions = useMemo(() => {
    const sorted = [...sessions].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sorted.slice(0, 20);
  }, [sessions]);

  // Calculate focus stats
  const today = new Date().toDateString();
  const todayFocus = recentSessions
    .filter((s) => new Date(s.date).toDateString() === today && s.type === 'work')
    .reduce((sum, s) => sum + s.duration, 0);

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  const weekFocus = recentSessions
    .filter((s) => new Date(s.date) >= weekStart && s.type === 'work')
    .reduce((sum, s) => sum + s.duration, 0);

  const formatMinutes = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getPriorityColor = (type) => {
    switch (type) {
      case 'work':
        return '#7c3aed';
      case 'short':
        return '#10b981';
      case 'long':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '20px',
      }}
      className="glass-card"
    >
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
        Session History
      </h3>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        <div
          style={{
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: '8px',
            padding: '12px',
          }}
        >
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Today</p>
          <p style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent)', margin: '4px 0 0 0' }}>
            {formatMinutes(todayFocus)}
          </p>
        </div>
        <div
          style={{
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: '8px',
            padding: '12px',
          }}
        >
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>This Week</p>
          <p style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent)', margin: '4px 0 0 0' }}>
            {formatMinutes(weekFocus)}
          </p>
        </div>
      </div>

      {/* Sessions Table */}
      {recentSessions.length === 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            textAlign: 'center',
          }}
        >
          <Clock size={40} style={{ color: 'var(--text-secondary)', marginBottom: '12px' }} />
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>
            No sessions yet. Start your first focus session!
          </p>
        </div>
      ) : (
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '8px 0', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Date
                </th>
                <th style={{ textAlign: 'left', padding: '8px 0', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Type
                </th>
                <th style={{ textAlign: 'left', padding: '8px 0', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Duration
                </th>
                <th style={{ textAlign: 'center', padding: '8px 0', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  ✓
                </th>
              </tr>
            </thead>
            <tbody>
              {recentSessions.map((session) => (
                <tr
                  key={session.id}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    padding: '12px 0',
                  }}
                >
                  <td style={{ padding: '12px 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {formatSessionDate(session.date)}
                  </td>
                  <td style={{ padding: '12px 0', fontSize: '0.85rem' }}>
                    <span
                      style={{
                        background: getPriorityColor(session.type) + '20',
                        color: getPriorityColor(session.type),
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                      }}
                    >
                      {session.type}
                    </span>
                  </td>
                  <td style={{ padding: '12px 0', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {Math.round(session.duration / 60)} min
                  </td>
                  <td style={{ padding: '12px 0', textAlign: 'center', fontSize: '1rem' }}>
                    {session.completed ? '✓' : '✗'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
