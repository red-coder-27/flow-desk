import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getLast7Days, getDayOfWeek, toDateString } from '../../utils/dateUtils';

export const WeeklyChart = ({ sessions }) => {
  const chartData = useMemo(() => {
    const last7Days = getLast7Days();
    const dataMap = {};

    // Initialize days
    last7Days.forEach((date) => {
      dataMap[toDateString(date)] = {
        day: getDayOfWeek(date),
        minutes: 0,
      };
    });

    // Calculate total focus time per day
    sessions.forEach((session) => {
      const dateStr = new Date(session.date).toDateString();
      if (dataMap[dateStr] && session.type === 'work') {
        dataMap[dateStr].minutes += Math.round(session.duration / 60);
      }
    });

    return Object.values(dataMap);
  }, [sessions]);

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '20px',
        animation: 'fadeSlideUp 0.5s ease 0.15s both',
      }}
      className="glass-card"
    >
      <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px', margin: '0 0 20px 0' }}>
        Focus Time This Week
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="day"
            stroke="var(--text-secondary)"
            style={{ fontSize: '0.85rem' }}
          />
          <YAxis
            stroke="var(--text-secondary)"
            style={{ fontSize: '0.85rem' }}
            label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
            }}
            formatter={(value) => `${value} min`}
          />
          <Bar
            dataKey="minutes"
            fill="url(#colorGradient)"
            radius={[8, 8, 0, 0]}
            isAnimationActive={true}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
