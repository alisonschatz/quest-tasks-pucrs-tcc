// src/components/TaskCard.js
import React, { useState } from 'react';
import { CheckCircle2, X, Target, Star, Clock, Calendar } from 'lucide-react';
import { useTasks } from '../contexts/TaskContext';
import { CATEGORIES } from '../constants/categories';

const TaskCard = ({ task }) => {
  const { completeTask, deleteTask, isOverdue, getDaysUntilDue } = useTasks();
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionAnimation, setCompletionAnimation] = useState(false);

  const handleComplete = async () => {
    if (task.completed || isCompleting) return;

    setIsCompleting(true);
    setCompletionAnimation(true);

    try {
      await completeTask(task.id);

      // Animation timing
      setTimeout(() => {
        setCompletionAnimation(false);
      }, 2000);
    } catch (error) {
      console.error('Erro ao completar tarefa:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta quest?')) {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
      }
    }
  };

  const categoryData =
    CATEGORIES.find(c => c.id === task.category) || CATEGORIES[CATEGORIES.length - 1];
  const daysUntilDue = getDaysUntilDue(task.dueDate);
  const overdue = isOverdue(task.dueDate);

  const getDifficultyColor = priority => {
    switch (priority) {
      case 'alta':
        return 'from-red-400 to-pink-500';
      case 'media':
        return 'from-yellow-400 to-orange-500';
      case 'baixa':
        return 'from-green-400 to-emerald-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getDueDateInfo = () => {
    if (!task.dueDate) return null;

    if (overdue) {
      return {
        text: '⚠️ Atrasada',
        className: 'bg-red-500/20 text-red-300 border border-red-500/30',
      };
    }

    if (daysUntilDue === 0) {
      return {
        text: '📅 Hoje',
        className: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
      };
    }

    if (daysUntilDue === 1) {
      return {
        text: '📅 Amanhã',
        className: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
      };
    }

    return {
      text: `📅 ${daysUntilDue}d`,
      className: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    };
  };

  const dueDateInfo = getDueDateInfo();

  return (
    <div
      className={`group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 ${
        task.completed
          ? 'opacity-60 border-white/5'
          : overdue
            ? 'border-red-500/50 bg-red-500/5'
            : 'border-white/10 hover:border-white/20 hover:scale-[1.02]'
      } ${completionAnimation ? 'animate-pulse bg-green-500/20' : ''}`}
    >
      {/* Priority & Due Date Badges */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <div
          className={`w-3 h-3 rounded-full bg-gradient-to-r ${getDifficultyColor(task.priority)} shadow-lg`}
        ></div>
        {dueDateInfo && (
          <div className={`text-xs px-2 py-1 rounded-full font-medium ${dueDateInfo.className}`}>
            {dueDateInfo.text}
          </div>
        )}
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          {/* Complete Button */}
          <button
            onClick={handleComplete}
            disabled={task.completed || isCompleting}
            className={`mt-1 w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
              task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : isCompleting
                  ? 'bg-purple-500/50 border-purple-500 animate-spin'
                  : 'border-white/30 hover:border-purple-400 hover:bg-purple-400/20'
            }`}
          >
            <CheckCircle2 size={20} />
          </button>

          {/* Task Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start space-x-3 mb-3">
              <span className="text-2xl mt-1">{categoryData.icon}</span>
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-semibold text-lg mb-1 ${task.completed ? 'line-through text-gray-400' : ''}`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-gray-400 mb-2 line-clamp-2">{task.description}</p>
                )}
              </div>
            </div>

            {/* Tags and Info */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${categoryData.color} text-white`}
              >
                {categoryData.name}
              </span>

              <div className="flex items-center space-x-1 text-sm text-gray-400">
                <Target size={14} />
                <span className="capitalize">{task.priority}</span>
              </div>

              <div className="flex items-center space-x-1 text-sm text-gray-400">
                <Star size={14} />
                <span>+{task.xp} XP</span>
              </div>

              {task.timeEstimate && (
                <div className="flex items-center space-x-1 text-sm text-gray-400">
                  <Clock size={14} />
                  <span>{task.timeEstimate}min</span>
                </div>
              )}

              {task.createdAt && (
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>{task.createdAt.toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-4">
          <button
            onClick={handleDelete}
            className="w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-lg flex items-center justify-center text-red-400 transition-colors"
            title="Excluir quest"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Completion Glow Effect */}
      {task.completed && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl pointer-events-none"></div>
      )}

      {/* XP Gain Animation */}
      {completionAnimation && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-green-400 animate-bounce pointer-events-none z-10">
          +{task.xp} XP!
        </div>
      )}
    </div>
  );
};

export default TaskCard;
