import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem, removeItem, KEYS } from '../utils/storage';
import { today, isSameDay, getLast84Days, toDateString } from '../utils/dateUtils';

// Helper to check if habit should be done today
const shouldDo = (habit) => {
  const today_ = new Date();
  const dayOfWeek = today_.getDay();
  
  if (habit.frequency === 'daily') return true;
  if (habit.frequency === 'weekdays') return dayOfWeek !== 0 && dayOfWeek !== 6;
  if (habit.frequency === 'weekends') return dayOfWeek === 0 || dayOfWeek === 6;
  return true;
};

const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date);
  }
  return days;
};

export const useHabits = () => {
  const [habits, setHabits] = useState(() => getItem(KEYS.HABITS, []));
  const [lastOpenDate, setLastOpenDate] = useState(() => getItem(KEYS.LAST_OPEN_DATE, today()));

  // Check if date changed since last open
  useEffect(() => {
    const currentDate = today();
    if (currentDate !== lastOpenDate) {
      setLastOpenDate(currentDate);
      setItem(KEYS.LAST_OPEN_DATE, currentDate);
    }
  }, [lastOpenDate]);

  const addHabit = useCallback((name, emoji, color, frequency = 'daily') => {
    const newHabit = {
      id: Date.now(),
      name,
      emoji,
      color,
      frequency,
      completions: {},
      createdAt: new Date().toISOString(),
      archived: false,
    };
    const updated = [...habits, newHabit];
    setHabits(updated);
    setItem(KEYS.HABITS, updated);
    return newHabit;
  }, [habits]);

  const toggleHabit = useCallback((id) => {
    const updated = habits.map((habit) => {
      if (habit.id === id) {
        const dateStr = today();
        const completions = {
          ...habit.completions,
          [dateStr]: !habit.completions[dateStr],
        };
        return { ...habit, completions };
      }
      return habit;
    });
    setHabits(updated);
    setItem(KEYS.HABITS, updated);
  }, [habits]);

  const deleteHabit = useCallback((id) => {
    const updated = habits.filter((h) => h.id !== id);
    setHabits(updated);
    setItem(KEYS.HABITS, updated);
  }, [habits]);

  const archiveHabit = useCallback((id) => {
    const updated = habits.map((habit) =>
      habit.id === id ? { ...habit, archived: true } : habit
    );
    setHabits(updated);
    setItem(KEYS.HABITS, updated);
  }, [habits]);

  const getStreak = useCallback((habit) => {
    // Current consecutive streak
    let streak = 0;
    let date = new Date();
    
    while (true) {
      const dateStr = toDateString(date);
      if (habit.completions[dateStr]) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }, []);

  const getLongestStreak = useCallback((habit) => {
    let longest = 0;
    let current = 0;
    const dates = Object.keys(habit.completions).sort();
    
    dates.forEach((dateStr, index) => {
      if (habit.completions[dateStr]) {
        current++;
        longest = Math.max(longest, current);
      } else {
        current = 0;
      }
    });
    
    return longest;
  }, []);

  const getTodayCompletion = useCallback(() => {
    const nonArchivedDaily = habits.filter(
      (h) => !h.archived && shouldDo(h)
    );
    
    const done = nonArchivedDaily.filter((h) => 
      h.completions[today()]
    ).length;
    
    return { done, total: nonArchivedDaily.length };
  }, [habits]);

  const getWeekCompletion = useCallback(() => {
    const last7Days = getLast7Days();
    const nonArchivedDaily = habits.filter((h) => !h.archived);
    
    let total = 0;
    let done = 0;
    
    last7Days.forEach((date) => {
      nonArchivedDaily.forEach((habit) => {
        total++;
        if (habit.completions[toDateString(date)]) {
          done++;
        }
      });
    });
    
    return total === 0 ? 0 : Math.round((done / total) * 100);
  }, [habits]);

  const getHeatmapData = useCallback(() => {
    const last84Days = getLast84Days();
    const data = {};
    
    last84Days.forEach((date) => {
      const dateStr = toDateString(date);
      const count = habits
        .filter((h) => !h.archived && h.completions[dateStr])
        .length;
      data[dateStr] = count;
    });
    
    return data;
  }, [habits]);

  return {
    habits,
    addHabit,
    toggleHabit,
    deleteHabit,
    archiveHabit,
    getStreak,
    getLongestStreak,
    getTodayCompletion,
    getWeekCompletion,
    getHeatmapData,
  };
};
