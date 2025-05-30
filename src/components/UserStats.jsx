import React from 'react';
import { Trophy } from 'lucide-react';

const UserStats = ({ userStats, getCurrentLevelProgress }) => {
  return (
    <div className="card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Trophy className="text-yellow-400" />
          Quest Tasks
        </h1>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">Nível {userStats.level}</div>
          <div className="text-sm text-gray-300">{userStats.xp} XP</div>
        </div>
      </div>
      
      {/* Barra de progresso de nível */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>Progresso do Nível</span>
          <span>{Math.round(getCurrentLevelProgress())}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${getCurrentLevelProgress()}%` }}
          />
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white/10 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{userStats.totalCompleted}</div>
          <div className="text-sm text-gray-300">Concluídas</div>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <div className="text-2xl font-bold text-orange-400">{userStats.streak}</div>
          <div className="text-sm text-gray-300">Sequência</div>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-400">{userStats.pendingTasks}</div>
          <div className="text-sm text-gray-300">Pendentes</div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;