import { useState, useCallback } from 'react';
import { getItem, setItem, KEYS } from '../utils/storage';

export const useTasks = () => {
  const [tasks, setTasks] = useState(() => getItem(KEYS.TASKS, []));

  const addTask = useCallback((title, description = '', priority = 'medium', column = 'todo', dueDate = null) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      column,
      createdAt: new Date().toISOString(),
      dueDate,
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    setItem(KEYS.TASKS, updated);
    return newTask;
  }, [tasks]);

  const moveTask = useCallback((id, newColumn) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, column: newColumn } : task
    );
    setTasks(updated);
    setItem(KEYS.TASKS, updated);
  }, [tasks]);

  const deleteTask = useCallback((id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    setItem(KEYS.TASKS, updated);
  }, [tasks]);

  const reorderTasks = useCallback((activeIndex, overIndex) => {
    const updated = [...tasks];
    const [removed] = updated.splice(activeIndex, 1);
    updated.splice(overIndex, 0, removed);

    setTasks(updated);
    setItem(KEYS.TASKS, updated);
  }, [tasks]);

  const getTasksByColumn = useCallback((column) => {
    return tasks.filter((t) => t.column === column);
  }, [tasks]);

  const getTaskCounts = useCallback(() => {
    return {
      todo: tasks.filter((t) => t.column === 'todo').length,
      inprogress: tasks.filter((t) => t.column === 'inprogress').length,
      done: tasks.filter((t) => t.column === 'done').length,
    };
  }, [tasks]);

  return {
    tasks,
    addTask,
    moveTask,
    deleteTask,
    reorderTasks,
    getTasksByColumn,
    getTaskCounts,
    setTasks,
  };
};
