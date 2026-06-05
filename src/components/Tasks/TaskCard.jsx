import React from 'react';
import { Trash2, GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const TaskCard = ({ task, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#10b981',
  };

  const priorityEmojis = {
    high: '🔴',
    medium: '🟡',
    low: '🟢',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="glass-card"
      onMouseEnter={(e) => {
        if (!isDragging) {
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
      onMouseOverCapture={(e) => {
        e.currentTarget.querySelector('[data-delete-btn]').style.opacity = '1';
      }}
      onMouseLeaveCapture={(e) => {
        e.currentTarget.querySelector('[data-delete-btn]').style.opacity = '0';
      }}
      style={{
        ...style,
        background: 'var(--bg-card)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '16px',
        marginBottom: '8px',
        display: 'flex',
        gap: '12px',
        transition: 'var(--transition)',
        cursor: isDragging ? 'grabbing' : 'grab',
        position: 'relative',
      }}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          padding: '0',
          cursor: 'grab',
          display: 'flex',
          alignItems: 'center',
          height: '24px',
          flex: '0 0 auto',
        }}
        title="Drag to reorder"
      >
        <GripVertical size={18} />
      </button>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span
            style={{
              background: `${priorityColors[task.priority]}20`,
              color: priorityColors[task.priority],
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            {priorityEmojis[task.priority]} {task.priority}
          </span>
        </div>

        <h4
          style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: '0 0 4px 0',
            wordBreak: 'break-word',
          }}
        >
          {task.title}
        </h4>

        {task.description && (
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              margin: '0 0 8px 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {task.description}
          </p>
        )}

        <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          {task.dueDate && (
            <span style={{ color: 'var(--warning)' }}>
              📅 {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Delete Button */}
      <button
        data-delete-btn
        onClick={() => {
          if (window.confirm('Delete this task?')) {
            onDelete(task.id);
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
          opacity: 0,
          transition: 'opacity var(--transition)',
          flex: '0 0 auto',
        }}
        title="Delete task"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};
