import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const EMOJIS = ['🎯', '💪', '📚', '🏃', '💧', '🧘', '🍎', '😴', '✍️', '🎨', '🎵', '💻', '🌱', '🧹', '💊', '🚴', '🏋️', '🧠', '❤️', '⭐'];
const COLORS = ['#7c3aed', '#ef4444', '#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#06b6d4', '#84cc16'];

export const AddHabitModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJIS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [frequency, setFrequency] = useState('daily');

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Habit name is required');
      return;
    }
    onAdd(name, selectedEmoji, selectedColor, frequency);
    setName('');
    setSelectedEmoji(EMOJIS[0]);
    setSelectedColor(COLORS[0]);
    setFrequency('daily');
    toast.success('Habit added! 🎯');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        animation: 'fadeSlideUp 0.2s ease',
      }}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          background: 'var(--bg-card)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '32px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          animation: 'fadeSlideUp 0.2s ease',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(124,58,237,0.1)',
            border: 'none',
            color: 'var(--accent)',
            padding: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={20} />
        </button>

        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '24px',
            margin: '0 0 24px 0',
          }}
        >
          Create New Habit
        </h2>

        {/* Habit Name */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: '8px',
            }}
          >
            Habit Name
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 40))}
              placeholder="e.g., Morning Meditation"
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
            <span
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
              }}
            >
              {name.length}/40
            </span>
          </div>
        </div>

        {/* Emoji Picker */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: '8px',
            }}
          >
            Choose Emoji
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '8px',
            }}
          >
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedEmoji(emoji)}
                style={{
                  padding: '12px',
                  background: selectedEmoji === emoji ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                  border: selectedEmoji === emoji ? '2px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Color Picker */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: '8px',
            }}
          >
            Choose Color
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '8px',
            }}
          >
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: color,
                  border: selectedColor === color ? '3px solid white' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              />
            ))}
          </div>
        </div>

        {/* Frequency */}
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: '8px',
            }}
          >
            Frequency
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['daily', 'weekdays', 'weekends'].map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => setFrequency(freq)}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  background: frequency === freq ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                  color: frequency === freq ? 'white' : 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  transition: 'var(--transition)',
                  textTransform: 'capitalize',
                }}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(0.98)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        >
          Add Habit
        </button>
      </form>
    </div>
  );
};
