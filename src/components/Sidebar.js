// src/components/Sidebar.js
import React from 'react';
import { Trophy, Target, Zap, Settings } from 'lucide-react';
import { CATEGORIES } from '../constants/categories';

const Sidebar = ({ user, playerData, tasks, onOpenAchievements, onOpenStats, onOpenSettings }) => {
  const getXpPercentage = () => {
    return ((playerData.xp || 0) / 100) * 100;
  };

  const getTaskCountByCategory = categoryId => {
    return tasks.filter(t => t.category === categoryId && !t.completed).length;
  };

  const getCompletedTasksToday = () => {
    const today = new Date().toDateString();
    return tasks.filter(t => t.completed && t.completedAt?.toDate?.()?.toDateString() === today)
      .length;
  };

  const getPendingTasks = () => {
    return tasks.filter(t => !t.completed).length;
  };

  return (
    <div className="space-y-6">
      {/* Player Card */}
      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">{playerData.avatar || '🦸‍♂️'}</div>
          <h3 className="text-xl font-bold">{user?.displayName?.split(' ')[0] || 'Aventureiro'}</h3>
          <p className="text-purple-300">{playerData.title || 'Aventureiro'}</p>
          <p className="text-sm text-gray-400 mt-1">Nível {playerData.level || 1}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-black/20 rounded-xl">
            <div className="text-2xl font-bold text-yellow-400">
              {tasks.filter(t => t.completed).length}
            </div>
            <div className="text-xs text-gray-400">Concluídas</div>
          </div>
          <div className="text-center p-3 bg-black/20 rounded-xl">
            <div className="text-2xl font-bold text-blue-400">{getPendingTasks()}</div>
            <div className="text-xs text-gray-400">Pendentes</div>
          </div>
        </div>

        {/* XP Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-300">Experiência</span>
            <span className="text-purple-300">{playerData.xp || 0}/100 XP</span>
          </div>
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 relative"
              style={{ width: `${getXpPercentage()}%` }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-1">{playerData.totalXp || 0} XP total</div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Target size={20} />
          <span>Categorias</span>
        </h3>
        <div className="space-y-3">
          {CATEGORIES.slice(0, 5).map(category => {
            const taskCount = getTaskCountByCategory(category.id);
            return (
              <div
                key={category.id}
                className="flex items-center justify-between p-3 bg-black/20 rounded-xl hover:bg-black/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    taskCount > 0
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  {taskCount}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements Preview */}
      <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <Trophy size={20} className="text-yellow-400" />
            <span>Conquistas</span>
          </h3>
          <button
            onClick={onOpenAchievements}
            className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            Ver todas
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div
            className="aspect-square bg-black/20 rounded-xl flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-200 cursor-pointer"
            title="Primeira Quest"
          >
            🏆
          </div>
          <div
            className="aspect-square bg-black/20 rounded-xl flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-200 cursor-pointer"
            title="Streak de 7 dias"
          >
            ⭐
          </div>
          <div
            className="aspect-square bg-black/20 rounded-xl flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-200 cursor-pointer"
            title="10 Quests Completadas"
          >
            🔥
          </div>
        </div>
        <div className="text-center mt-3">
          <span className="text-sm text-yellow-300 font-medium">
            {playerData.achievements?.length || 0} desbloqueadas
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Zap size={20} className="text-blue-400" />
          <span>Stats Rápidas</span>
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Hoje</span>
            <span className="font-bold text-green-400">
              {getCompletedTasksToday()}/
              {
                tasks.filter(t => {
                  const today = new Date().toDateString();
                  return (
                    t.createdAt?.toDateString() === today ||
                    (!t.completed && (!t.dueDate || new Date(t.dueDate).toDateString() <= today))
                  );
                }).length
              }
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Esta Semana</span>
            <span className="font-bold text-blue-400">
              {
                tasks.filter(t => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return t.completed && t.completedAt?.toDate() >= weekAgo;
                }).length
              }
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Streak Atual</span>
            <span className="font-bold text-orange-400 flex items-center space-x-1">
              <span>🔥</span>
              <span>{playerData.streak || 0}</span>
            </span>
          </div>
          <button
            onClick={onOpenStats}
            className="w-full mt-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 py-3 rounded-lg font-medium transition-all duration-200"
          >
            Ver Estatísticas Detalhadas
          </button>
        </div>
      </div>

      {/* Settings Button */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg font-medium transition-all duration-200"
        >
          <Settings size={18} />
          <span>Configurações</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
