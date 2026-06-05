// Storage utility with try-catch for localStorage safety
export const KEYS = {
  HABITS: 'flowdesk_habits',
  TASKS: 'flowdesk_tasks',
  TIMER_SESSIONS: 'flowdesk_timer_sessions',
  TIMER_SETTINGS: 'flowdesk_timer_settings',
  THEME: 'flowdesk_theme',
  LAST_OPEN_DATE: 'flowdesk_last_open_date',
  CONFETTI_DATE: 'flowdesk_confetti_date',
};

export const getItem = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return fallback;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
  }
};

export const clearAll = () => {
  try {
    Object.values(KEYS).forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};
