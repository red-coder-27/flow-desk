import React, { useState, useRef } from 'react';
import { Trash2, Archive, ChevronDown, ChevronUp } from 'lucide-react';
import { getLast7Days, toDateString } from '../../utils/dateUtils';
import toast from 'react-hot-toast';

export const HabitCard = ({ habit, onToggle, onDelete, onArchive }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStartRef = useRef(0);

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const diff = touchStartRef.current - currentX;
    if (diff > 0) {
      setSwipeOffset(Math.min(diff, 120));
    }
  };

  const handleTouchEnd = () => {
    if (swipeOffset > 60) {
      if (swipeOffset > 100) {
        if (window.confirm('Delete this habit?')) {
          onDelete(habit.id);
          toast.success('Habit deleted');
        }
      }
    }
    setSwipeOffset(0);
  };

  const isCompletedToday = habit.completions[toDateString(new Date())];
  const streak = useRef(0);
  const dayCount = Object.keys(habit.completions)
    .filter((date) => habit.completions[date])
    .sort()
    .reduce((acc, date, idx, arr) => {
      if (idx === 0) return 1;
      const prevDate = new Date(arr[idx - 1]);
      const currentDate = new Date(date);
      const diffTime = Math.abs(currentDate - prevDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays === 1 ? acc + 1 : 1;
    }, 0);

  // Calculate current streak
  let currentStreak = 0;
  let date = new Date();
  while (true) {
    const dateStr = toDateString(date);
    if (habit.completions[dateStr]) {
      currentStreak++;
      date.setDate(date.getDate() - 1);
    } else {
      break;
    }
  }

  const last7Days = getLast7Days();
  const completionColors = {
    0: '#1e293b',
    1: '#4c1d95',
    2: '#6d28d9',
    3: '#7c3aed',
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(12px)',
        border: `1px solid var(--border)`,
        borderLeft: `4px solid ${habit.color}`,
        borderRadius: 'var(--radius)',
        padding: '16px',
        marginBottom: '12px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'var(--transition)',
        cursor: 'pointer',
      }}
      className="glass-card"
      onMouseEnter={(e) => {
        if (window.innerWidth > 768) {
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Swipe delete overlay */}
      {swipeOffset > 0 && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            background: '#ef4444',
            width: swipeOffset,
            display: 'flex',
            alignItems: 'center',
            paddingRight: '16px',
            zIndex: 0,
          }}
        >
          <Trash2 size={20} color="white" style={{ marginLeft: 'auto' }} />
        </div>
      )}

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          transform: `translateX(-${swipeOffset}px)`,
          transition: swipeOffset === 0 ? 'transform 0.2s' : 'none',
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px',
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>{habit.emoji}</span>
            <div>
              <h3
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                {habit.name}
              </h3>
              {currentStreak > 2 && (
                <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#f59e0b' }}>
                  🔥 {currentStreak} day streak
                </p>
              )}
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
            Best: {dayCount} days
          </p>
        </div>

        {/* Completion ring and actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <button
            onClick={() => onToggle(habit.id)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: `2px solid ${
                isCompletedToday ? habit.color : 'var(--border)'
              }`,
              background: isCompletedToday ? habit.color : 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition)',
              opacity: isCompletedToday ? 1 : 0.6,
            }}
            title="Toggle completion"
          >
            {isCompletedToday && <span style={{ color: 'white', fontSize: '1.2rem' }}>✓</span>}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: 'rgba(124,58,237,0.1)',
              border: 'none',
              color: 'var(--accent)',
              padding: '6px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition)',
            }}
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          <button
            onClick={() => {
              if (window.confirm('Delete this habit?')) {
                onDelete(habit.id);
                toast.success('Habit deleted');
              }
            }}
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: 'none',
              color: '#ef4444',
              padding: '6px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition)',
            }}
            title="Delete habit"
          >
            <Trash2 size={18} />
          </button>

          <button
            onClick={() => {
              onArchive(habit.id);
              toast.success('Habit archived');
            }}
            style={{
              background: 'rgba(107,114,128,0.1)',
              border: 'none',
              color: 'var(--text-secondary)',
              padding: '6px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition)',
            }}
            title="Archive habit"
          >
            <Archive size={18} />
          </button>
        </div>
      </div>

      {/* Expanded view - Last 7 days */}
      {isExpanded && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 8px 0' }}>
            Last 7 days
          </p>
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'space-between' }}>
            {last7Days.map((date) => {
              const dateStr = toDateString(date);
              const isCompleted = habit.completions[dateStr];
              const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
              const dayLabel = dayNames[date.getDay()];

              return (
                <div
                  key={dateStr}
                  style={{
                    textAlign: 'center',
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '4px',
                      background: isCompleted ? habit.color : '#1e293b',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                      margin: '0 auto 4px',
                      opacity: isCompleted ? 1 : 0.4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onMouseEnter={(e) => (e.target.style.opacity = '1')}
                    onMouseLeave={(e) => (e.target.style.opacity = isCompleted ? '1' : '0.4')}
                  >
                    {isCompleted && <span style={{ color: 'white', fontSize: '0.9rem' }}>✓</span>}
                  </div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>
                    {dayLabel}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
