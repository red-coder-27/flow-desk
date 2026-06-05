import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { getItem, setItem, KEYS } from '../utils/storage';

const TimerContext = createContext();

const DEFAULT_SETTINGS = {
  work: 25,
  short: 5,
  long: 15,
  autoBreak: false,
  autoPomo: false,
  sound: true,
  tickSound: false,
  longInterval: 4,
};

// Web Audio API sound generation
const playSound = (frequencies, durations, volumes) => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    frequencies.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.frequency.value = freq;
      const startTime = audioContext.currentTime + (index > 0 ? durations[index - 1] / 1000 : 0);
      gain.gain.setValueAtTime(volumes[index] || 0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + durations[index] / 1000);
      osc.start(startTime);
      osc.stop(startTime + durations[index] / 1000);
    });
  } catch (error) {
    console.error('Audio error:', error);
  }
};

export const playWorkComplete = () => {
  // Ascending 3-tone chime: C5(523.25), E5(659.25), G5(783.99)
  playSound([523.25, 659.25, 783.99], [200, 200, 200], [0.4, 0.4, 0.4]);
};

export const playBreakComplete = () => {
  // Single soft bell: A4(440)
  playSound([440], [400], [0.3]);
};

export const playTick = () => {
  // Soft tick: high pitch
  playSound([880], [50], [0.15]);
};

export const TimerProvider = ({ children }) => {
  const [sessionType, setSessionType] = useState('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [sessions, setSessions] = useState(() => getItem(KEYS.TIMER_SESSIONS, []));
  const [settings, setSettingsState] = useState(() => ({
    ...DEFAULT_SETTINGS,
    ...getItem(KEYS.TIMER_SETTINGS, {}),
  }));
  
  const timerIntervalRef = useRef(null);
  const lastTickRef = useRef(0);

  // Timer interval
  useEffect(() => {
    if (!isRunning) return;

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
      
      // Optional tick sound
      if (settings.tickSound) {
        if (Date.now() - lastTickRef.current >= 1000) {
          playTick();
          lastTickRef.current = Date.now();
        }
      }
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isRunning, settings.tickSound]);

  // Handle session completion
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      // Play sound
      if (settings.sound) {
        if (sessionType === 'work') {
          playWorkComplete();
        } else {
          playBreakComplete();
        }
      }

      // Log session
      const newSession = {
        id: Date.now(),
        date: new Date().toISOString(),
        type: sessionType,
        duration: sessionType === 'work' 
          ? settings.work * 60 
          : sessionType === 'short' 
          ? settings.short * 60 
          : settings.long * 60,
        completed: true,
      };
      setSessions((prev) => [...prev, newSession]);
      setItem(KEYS.TIMER_SESSIONS, [...sessions, newSession]);

      // Update pomodoro count for work sessions
      if (sessionType === 'work') {
        setPomodoroCount((prev) => prev + 1);
      }

      // Auto-switch session type
      if (settings.autoBreak) {
        if (sessionType === 'work') {
          const shouldLongBreak = (pomodoroCount + 1) % settings.longInterval === 0;
          setSessionType(shouldLongBreak ? 'long' : 'short');
          const newDuration = shouldLongBreak ? settings.long : settings.short;
          setTimeLeft(newDuration * 60);
          if (settings.autoPomo) {
            setIsRunning(true);
          } else {
            setIsRunning(false);
          }
        } else {
          // Break completed, switch back to work
          setSessionType('work');
          setTimeLeft(settings.work * 60);
          if (settings.autoPomo) {
            setIsRunning(true);
          } else {
            setIsRunning(false);
          }
        }
      }
    }
  }, [timeLeft, isRunning, sessionType, settings, pomodoroCount, sessions]);

  const startPause = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    const duration = 
      sessionType === 'work' ? settings.work : 
      sessionType === 'short' ? settings.short : 
      settings.long;
    setTimeLeft(duration * 60);
  }, [sessionType, settings]);

  const skip = useCallback(() => {
    if (sessionType === 'work') {
      setSessionType('short');
      setTimeLeft(settings.short * 60);
    } else if (sessionType === 'short') {
      setSessionType('work');
      setTimeLeft(settings.work * 60);
    } else {
      setSessionType('work');
      setTimeLeft(settings.work * 60);
    }
    setIsRunning(false);
  }, [sessionType, settings]);

  const updateSettings = useCallback((newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettingsState(updated);
    setItem(KEYS.TIMER_SETTINGS, updated);
    
    // Reset current timer with new duration
    const duration = 
      sessionType === 'work' ? updated.work : 
      sessionType === 'short' ? updated.short : 
      updated.long;
    setTimeLeft(duration * 60);
    setIsRunning(false);
  }, [settings, sessionType]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore if typing in input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space' && (e.target === document.body || e.target.tagName === 'BODY')) {
        e.preventDefault();
        startPause();
      }
      if (e.code === 'KeyR' && !e.ctrlKey && !e.metaKey) {
        reset();
      }
      if (e.code === 'KeyS' && !e.ctrlKey && !e.metaKey) {
        skip();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [startPause, reset, skip]);

  return (
    <TimerContext.Provider value={{
      sessionType,
      setSessionType,
      timeLeft,
      setTimeLeft,
      isRunning,
      setIsRunning,
      pomodoroCount,
      setPomodoroCount,
      sessions,
      setSessions,
      settings,
      updateSettings,
      startPause,
      reset,
      skip,
    }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within TimerProvider');
  }
  return context;
};
