import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';

const COLUMN_CONFIG = {
  todo: { label: 'To Do', color: '#7c3aed', emoji: '📋' },
  inprogress: { label: 'In Progress', color: '#f59e0b', emoji: '⚡' },
  done: { label: 'Done', color: '#10b981', emoji: '✓' },
};

export const TaskColumn = ({ column, tasks, onDelete, onAddClick }) => {
  const { setNodeRef, isOver } = useDroppable({ id: column });
  const config = COLUMN_CONFIG[column];

  return (
    <div
      ref={setNodeRef}
      style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius)',
        padding: '16px',
        flex: 1,
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'calc(100vh - 250px)',
        border: isOver ? `2px solid ${config.color}` : `1px solid var(--border)`,
        transition: 'all var(--transition)',
        backgroundColor: isOver ? `${config.color}10` : 'var(--bg-secondary)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: `2px solid ${config.color}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>{config.emoji}</span>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            {config.label}
          </h3>
          <span
            style={{
              background: config.color,
              color: 'white',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            {tasks.length}
          </span>
        </div>
        <button
          onClick={onAddClick}
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
          onMouseEnter={(e) => (e.target.style.background = 'rgba(124,58,237,0.2)')}
          onMouseLeave={(e) => (e.target.style.background = 'rgba(124,58,237,0.1)')}
          title="Add task"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Tasks List */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingRight: '4px',
        }}
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                border: '2px dashed var(--border)',
                borderRadius: '8px',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                padding: '20px',
              }}
            >
              <p style={{ fontSize: '0.9rem', margin: 0 }}>No tasks here</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={onDelete} />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
};
