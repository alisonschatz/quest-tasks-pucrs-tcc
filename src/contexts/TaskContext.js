// src/contexts/TaskContext.js
import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useFirebaseQuests } from '../hooks/useFirebaseQuests';
import { useNotifications } from '../hooks/useNotifications';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const { showNotification } = useNotifications();

  const {
    tasks,
    playerData,
    loading,
    error,
    addTask: addTaskBase,
    completeTask: completeTaskBase,
    deleteTask: deleteTaskBase,
  } = useFirebaseQuests(user?.uid);

  // Enhanced task operations with notifications
  const addTask = async taskData => {
    try {
      await addTaskBase(taskData);
      showNotification('Nova quest criada! 🚀', 'success');
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      showNotification('Erro ao criar quest 😞', 'error');
      throw error;
    }
  };

  const completeTask = async taskId => {
    try {
      const task = tasks.find(t => t.id === taskId);
      await completeTaskBase(taskId);

      if (task) {
        showNotification(`Quest concluída! +${task.xp} XP ganhos! 🎉`, 'success');
      }
    } catch (error) {
      console.error('Erro ao completar tarefa:', error);
      showNotification('Erro ao completar quest 😞', 'error');
      throw error;
    }
  };

  const deleteTask = async taskId => {
    try {
      await deleteTaskBase(taskId);
      showNotification('Quest removida', 'info');
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      showNotification('Erro ao remover quest 😞', 'error');
      throw error;
    }
  };

  // Task filtering and sorting utilities
  const getFilteredAndSortedTasks = (filterCategory = 'all', sortBy = 'priority') => {
    let filtered = tasks;

    if (filterCategory !== 'all') {
      filtered = tasks.filter(task => task.category === filterCategory);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { alta: 3, media: 2, baixa: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'dueDate':
          return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
        case 'xp':
          return b.xp - a.xp;
        case 'category':
          return a.category.localeCompare(b.category);
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });
  };

  // Task utility functions
  const isOverdue = dueDate => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const getDaysUntilDue = dueDate => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter(t => !t.completed && isOverdue(t.dueDate)).length;
    const today = tasks.filter(t => {
      const daysUntil = getDaysUntilDue(t.dueDate);
      return !t.completed && daysUntil === 0;
    }).length;

    return {
      total,
      completed,
      pending,
      overdue,
      today,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  const getCategoryStats = () => {
    const categories = ['trabalho', 'saude', 'crescimento', 'casa', 'social', 'geral'];

    return categories.map(categoryId => {
      const categoryTasks = tasks.filter(t => t.category === categoryId);
      const completed = categoryTasks.filter(t => t.completed).length;
      const total = categoryTasks.length;

      return {
        categoryId,
        total,
        completed,
        pending: total - completed,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    });
  };

  const value = {
    // Data
    tasks,
    playerData,
    loading,
    error,

    // Operations
    addTask,
    completeTask,
    deleteTask,

    // Utilities
    getFilteredAndSortedTasks,
    isOverdue,
    getDaysUntilDue,
    getTaskStats,
    getCategoryStats,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
