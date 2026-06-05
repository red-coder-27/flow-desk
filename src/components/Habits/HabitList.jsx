import React, { useState, useEffect } from 'react';
import { Plus, Target } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HabitCard } from './HabitCard';
import { HeatMap } from './HeatMap';
import { AddHabitModal } from './AddHabitModal';
import { useHabits } from '../../hooks/useHabits';
import { getItem, setItem, KEYS } from '../../utils/storage';
import { today } from '../../utils/dateUtils';
import { ErrorBoundary } from '../common/ErrorBoundary';

export const HabitList = () => {
  const habits = useHabits();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confettiShown, setConfettiShown] = useState(() => {
    const lastDate = getItem(KEYS.CONFETTI_DATE, null);
    return lastDate === today();
  });

  const { done, total } = habits.getTodayCompletion();
  const weekCompletion = habits.getWeekCompletion();
  const heatmapData = habits.getHeatmapData();

  // Trigger confetti when all habits done
  useEffect(() => {
    if (done === total && total > 0 && !confettiShown) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setConfettiShown(true);
      setItem(KEYS.CONFETTI_DATE, today());
    }
  }, [done, total, confettiShown]);

  return (
    <ErrorBoundary>
      <div
        style={{
          padding: '32px',
          maxWidth: '100%',
          animation: 'fadeSlideUp 0.3s ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              My Habits
            </h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              padding: '10px 16px',
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
            <Plus size={20} /> Add Habit
          </button>
        </div>

        {/* Weekly Progress Bar */}
        <div
          style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '20px',
            marginBottom: '24px',
          }}
          className="glass-card"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Weekly Progress
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {weekCompletion}%
            </span>
          </div>
          <div
            style={{
              height: '6px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
                width: `${weekCompletion}%`,
                transition: 'width 0.5s ease',
                animation: 'slideIn 0.6s ease',
              }}
            />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '8px 0 0 0' }}>
            {done} of {total} habits done today
          </p>
        </div>

        {/* HeatMap */}
        <div
          style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '20px',
            marginBottom: '24px',
          }}
          className="glass-card"
        >
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
            Activity Heatmap
          </h3>
          <HeatMap heatmapData={heatmapData} />
        </div>

        {/* Habits List */}
        {habits.habits.filter((h) => !h.archived).length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 20px',
              textAlign: 'center',
              background: 'var(--bg-card)',
              backdropFilter: 'blur(12px)',
              border: '2px dashed var(--border)',
              borderRadius: 'var(--radius)',
            }}
            className="glass-card"
          >
            <Target size={48} style={{ color: 'var(--text-secondary)', marginBottom: '16px' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-secondary)', margin: '0 0 8px 0' }}>
              No habits yet
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: '0 0 20px 0' }}>
              Create your first habit to get started!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
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
              onMouseEnter={(e) => (e.target.style.transform = 'scale(0.98)')}
              onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
            >
              Add First Habit
            </button>
          </div>
        ) : (
          <div>
            {habits.habits
              .filter((h) => !h.archived)
              .map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggle={habits.toggleHabit}
                  onDelete={habits.deleteHabit}
                  onArchive={habits.archiveHabit}
                />
              ))}
          </div>
        )}

        {/* Add Habit Modal */}
        <AddHabitModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={habits.addHabit}
        />
      </div>
    </ErrorBoundary>
  );
};
