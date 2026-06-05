import React, { useEffect, useState } from 'react';
import { Activity, Target, CheckCircle2, Flame, Clock } from 'lucide-react';
import { StatCard } from './StatCard';
import { WeeklyChart } from './WeeklyChart';
import { QuoteCard } from './QuoteCard';
import { useHabits } from '../../hooks/useHabits';
import { useTasks } from '../../hooks/useTasks';
import { useTimer } from '../../contexts/TimerContext';
import { formatTime } from '../../utils/dateUtils';
import toast from 'react-hot-toast';

export const DashboardHome = ({ setActivePage }) => {
  const habits = useHabits();
  const tasks = useTasks();
  const timer = useTimer();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  const { done, total } = habits.getTodayCompletion();
  const weekCompletion = habits.getWeekCompletion();
  const heatmapData = habits.getHeatmapData();
  const taskCounts = tasks.getTaskCounts();
  
  // Calculate total focus time today
  const focusTimeToday = timer.sessions
    .filter((s) => new Date(s.date).toDateString() === new Date().toDateString() && s.type === 'work')
    .reduce((sum, s) => sum + s.duration, 0);

  const focusHours = Math.floor(focusTimeToday / 3600);
  const focusMinutes = Math.floor((focusTimeToday % 3600) / 60);

  // Get current streak for flame icon
  const streaks = habits.habits
    .filter((h) => !h.archived)
    .map((h) => habits.getStreak(h));
  const maxStreak = streaks.length > 0 ? Math.max(...streaks) : 0;

  return (
    <div
      style={{
        padding: '32px',
        maxWidth: '100%',
        animation: 'fadeSlideUp 0.3s ease',
      }}
    >
      {/* Greeting */}
      <div style={{ marginBottom: '40px' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: '0 0 8px 0',
            letterSpacing: '-0.02em',
          }}
        >
          {greeting}, let's get productive 🚀
        </h1>
        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            margin: 0,
          }}
        >
          Track your habits, focus, and tasks all in one place.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <StatCard
          icon={Target}
          label="Habits Today"
          value={`${done}/${total}`}
          subtext="Complete your goals"
          color="#7c3aed"
          delay={0}
        />
        <StatCard
          icon={Clock}
          label="Focus Time"
          value={`${focusHours}h ${focusMinutes}m`}
          subtext="Staying focused"
          color="#3b82f6"
          delay={0.1}
        />
        <StatCard
          icon={CheckCircle2}
          label="Tasks Done"
          value={taskCounts.done}
          subtext={`${taskCounts.todo} to do`}
          color="#10b981"
          delay={0.2}
        />
        <StatCard
          icon={Flame}
          label="Current Streak"
          value={`🔥 ${maxStreak}`}
          subtext="Keep it going!"
          color="#f59e0b"
          delay={0.3}
        />
      </div>

      {/* Two-column row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {/* Habit Completion Ring */}
        <div
          style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: 'fadeSlideUp 0.5s ease 0.15s both',
          }}
          className="glass-card"
        >
          <svg width="120" height="120" style={{ marginBottom: '16px' }}>
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="var(--bg-secondary)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke={total === 0 ? '#9ca3af' : done === total ? '#10b981' : '#7c3aed'}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(done / (total || 1)) * 314.159} 314.159`}
              style={{
                transition: 'stroke-dasharray 0.5s ease, stroke 0.3s ease',
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
              }}
              strokeLinecap="round"
            />
            <text
              x="60"
              y="65"
              textAnchor="middle"
              style={{
                fontSize: '24px',
                fontWeight: '800',
                fill: 'var(--text-primary)',
              }}
            >
              {total === 0 ? '0' : Math.round((done / total) * 100)}%
            </text>
          </svg>
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                margin: '0 0 4px 0',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              Habit Completion
            </p>
            <p
              style={{
                margin: 0,
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
              }}
            >
              {done} of {total} habits done today
            </p>
          </div>
        </div>

        {/* Timer Status Card */}
        <div
          style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            animation: 'fadeSlideUp 0.5s ease 0.2s both',
          }}
          className="glass-card"
        >
          {timer.isRunning ? (
            <>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  margin: '0 0 8px 0',
                  textTransform: 'capitalize',
                }}
              >
                {timer.sessionType} Session
              </p>
              <p
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'var(--accent)',
                  margin: '0 0 12px 0',
                }}
              >
                {formatTime(timer.timeLeft)}
              </p>
              <button
                onClick={() => timer.startPause()}
                style={{
                  background: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'var(--transition)',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(0.98)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Pause (Space)
              </button>
            </>
          ) : (
            <>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  margin: '0 0 12px 0',
                }}
              >
                No active session
              </p>
              <button
                onClick={() => {
                  setActivePage('timer');
                  timer.startPause();
                }}
                style={{
                  background: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'var(--transition)',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(0.98)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Start Focus →
              </button>
            </>
          )}
        </div>
      </div>

      {/* Weekly Chart */}
      <div style={{ marginBottom: '32px' }}>
        <WeeklyChart sessions={timer.sessions} />
      </div>

      {/* Quote and Task Summary Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        <QuoteCard />

        {/* Task Summary */}
        <div
          style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '24px',
            animation: 'fadeSlideUp 0.5s ease 0.3s both',
          }}
          className="glass-card"
        >
          <h3
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '16px',
              margin: '0 0 16px 0',
            }}
          >
            Task Summary
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#7c3aed',
                }}
              />
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {taskCounts.todo} To Do
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#f59e0b',
                }}
              />
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {taskCounts.inprogress} In Progress
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981',
                }}
              />
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {taskCounts.done} Done
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px',
        }}
      >
        <button
          onClick={() => setActivePage('habits')}
          style={{
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.95rem',
            transition: 'var(--transition)',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(0.98)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          📋 Check Habits
        </button>
        <button
          onClick={() => {
            setActivePage('timer');
            timer.startPause();
          }}
          style={{
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.95rem',
            transition: 'var(--transition)',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(0.98)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          ⏱ Start Focus
        </button>
        <button
          onClick={() => setActivePage('tasks')}
          style={{
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.95rem',
            transition: 'var(--transition)',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(0.98)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          ➕ Add Task
        </button>
      </div>
    </div>
  );
};
