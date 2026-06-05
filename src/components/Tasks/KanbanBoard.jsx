import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { Search } from 'lucide-react';
import { TaskColumn } from './TaskColumn';
import { TaskCard } from './TaskCard';
import { AddTaskModal } from './AddTaskModal';
import { useTasks } from '../../hooks/useTasks';
import { ErrorBoundary } from '../common/ErrorBoundary';

export const KanbanBoard = () => {
  const tasks = useTasks();
  const [activeId, setActiveId] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalColumn, setModalColumn] = useState('todo');

  // Filter tasks
  const filteredTasks = tasks.tasks.filter((task) => {
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesSearch =
      searchQuery === '' ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeTask = tasks.tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const overId = over.id;
    const isOverColumn = ['todo', 'inprogress', 'done'].includes(overId);
    const overTask = !isOverColumn ? tasks.tasks.find((t) => t.id === overId) : null;
    
    const overColumn = isOverColumn ? overId : overTask?.column;

    if (!overColumn) return;

    if (activeTask.column !== overColumn) {
      tasks.moveTask(active.id, overColumn);
    } else if (overTask && activeTask.id !== overTask.id) {
      const activeIndex = tasks.tasks.findIndex((t) => t.id === activeTask.id);
      const overIndex = tasks.tasks.findIndex((t) => t.id === overTask.id);
      tasks.reorderTasks(activeIndex, overIndex);
    }
  };

  const getTasksByColumn = (column) => {
    return filteredTasks.filter((t) => t.column === column);
  };

  const activeTask = tasks.tasks.find((t) => t.id === activeId);

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
        <div style={{ marginBottom: '24px' }}>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: '0 0 16px 0',
            }}
          >
            Kanban Board
          </h1>

          {/* Filters */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {/* Priority Filter */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {['all', 'high', 'medium', 'low'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  style={{
                    padding: '8px 12px',
                    background: priorityFilter === p ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                    color: priorityFilter === p ? 'white' : 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    transition: 'var(--transition)',
                    textTransform: 'capitalize',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Search */}
            <div
              style={{
                flex: 1,
                minWidth: '200px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
              }}
            >
              <Search size={16} color="var(--text-secondary)" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  flex: 1,
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Kanban Columns */}
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div
            style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: '20px',
            }}
          >
            {['todo', 'inprogress', 'done'].map((column) => (
              <TaskColumn
                key={column}
                column={column}
                tasks={getTasksByColumn(column)}
                onDelete={tasks.deleteTask}
                onAddClick={() => {
                  setModalColumn(column);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeTask ? (
              <TaskCard task={activeTask} onDelete={tasks.deleteTask} />
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* Add Task Modal */}
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={tasks.addTask}
          defaultColumn={modalColumn}
        />
      </div>
    </ErrorBoundary>
  );
};
