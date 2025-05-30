import React from 'react';
import { Check, Trash2 } from 'lucide-react';

const TaskItem = ({ task, onComplete, onRemove, onChangePriority }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-50';
      case 'medium': return 'border-yellow-400 bg-yellow-50';
      case 'low': return 'border-green-400 bg-green-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
        task.completed 
          ? 'bg-green-500/20 border-green-500/50' 
          : `${getPriorityColor(task.priority)} border-opacity-50`
      }`}
    >
      <button
        onClick={() => onComplete(task.id)}
        disabled={task.completed}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          task.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-400 hover:border-purple-500 hover:bg-purple-500/20'
        }`}
      >
        {task.completed && <Check size={14} />}
      </button>
      
      <div className="flex-1">
        <div className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {task.text}
        </div>
        <div className="flex items-center gap-4 mt-1">
          <select
            value={task.priority}
            onChange={(e) => onChangePriority(task.id, e.target.value)}
            disabled={task.completed}
            className="text-xs px-2 py-1 rounded bg-white/50 border border-gray-300"
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
          <span className="text-xs text-gray-600">
            +{task.xpReward} XP
          </span>
        </div>
      </div>
      
      <button
        onClick={() => onRemove(task.id)}
        className="flex-shrink-0 p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default TaskItem;