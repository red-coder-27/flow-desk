import React from 'react';

export const StatCard = ({ icon: Icon, label, value, subtext, color, delay = 0 }) => {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        animation: `fadeSlideUp 0.5s ease ${delay}s both`,
      }}
      className="glass-card"
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          background: `${color}20`,
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Icon size={24} color={color} />
        </div>
      </div>

      <div>
        <div style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          lineHeight: 1,
        }}>
          {value}
        </div>
        <div style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          marginTop: '4px',
        }}>
          {label}
        </div>
        {subtext && (
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            marginTop: '4px',
          }}>
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
};
