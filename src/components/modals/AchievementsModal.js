// src/components/modals/AchievementsModal.js
import React from 'react';
import { X, Trophy, Star, Lock } from 'lucide-react';
import { useAchievements } from '../../utils/achievements';

const AchievementsModal = ({ show, onClose, playerData }) => {
  const { getAllAchievements, getProgress, isAchievementUnlocked } = useAchievements(
    playerData,
    []
  );

  if (!show) return null;

  const allAchievements = getAllAchievements();
  const unlockedCount = playerData.achievements?.length || 0;
  const totalCount = allAchievements.length;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-slate-800 rounded-3xl p-8 max-w-6xl w-full max-h-[85vh] overflow-y-auto border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-3xl font-bold flex items-center space-x-3">
              <Trophy className="text-yellow-400" size={32} />
              <span>Conquistas</span>
            </h3>
            <p className="text-gray-400 mt-2">
              Sua jornada épica em números • {unlockedCount}/{totalCount} desbloqueadas
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Overview */}
        <div className="mb-8 p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl border border-yellow-500/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-semibold text-yellow-300">Progresso Geral</h4>
              <p className="text-yellow-200 text-sm">
                Continue conquistando para desbloquear mais!
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-400">
                {Math.round((unlockedCount / totalCount) * 100)}%
              </div>
              <div className="text-sm text-yellow-300">Completo</div>
            </div>
          </div>

          <div className="w-full bg-yellow-900/30 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000 ease-out"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            >
              <div className="h-full bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allAchievements.map(achievement => {
            const isUnlocked = isAchievementUnlocked(achievement.id, playerData);
            const progress = getProgress(achievement.id, playerData);

            return (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                isUnlocked={isUnlocked}
                progress={progress}
                playerData={playerData}
              />
            );
          })}
        </div>

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">{unlockedCount}</div>
            <div className="text-sm text-green-300">Conquistadas</div>
          </div>

          <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {allAchievements.reduce((total, ach) => {
                return total + (isAchievementUnlocked(ach.id, playerData) ? ach.xpReward : 0);
              }, 0)}
            </div>
            <div className="text-sm text-blue-300">XP de Bônus</div>
          </div>

          <div className="bg-purple-500/20 border border-purple-500/30 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {totalCount - unlockedCount}
            </div>
            <div className="text-sm text-purple-300">Restantes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AchievementCard = ({ achievement, isUnlocked, progress, playerData }) => {
  const getUnlockDate = () => {
    // This would come from playerData in a real implementation
    return isUnlocked ? 'Desbloqueado' : null;
  };

  const getProgressText = () => {
    if (isUnlocked) return null;

    // Different progress text based on achievement type
    switch (achievement.id) {
      case 'task-master':
        return `${playerData.tasksCompleted || 0}/10 tarefas`;
      case 'legend':
        return `${playerData.tasksCompleted || 0}/100 tarefas`;
      case 'consistency':
        return `${playerData.streak || 0}/3 dias`;
      case 'weekly-warrior':
        return `${playerData.streak || 0}/7 dias`;
      case 'monthly-master':
        return `${playerData.streak || 0}/30 dias`;
      case 'veteran':
        return `Nível ${playerData.level || 1}/5`;
      default:
        return `${Math.round(progress * 100)}% completo`;
    }
  };

  return (
    <div
      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
        isUnlocked
          ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/40 shadow-lg shadow-yellow-500/10 glow-pulse'
          : 'bg-white/5 border-white/10 opacity-75 hover:opacity-90'
      }`}
    >
      <div className="text-center">
        <div className={`text-5xl mb-3 ${!isUnlocked ? 'grayscale' : 'animate-bounce'}`}>
          {achievement.icon}
        </div>

        <h4
          className={`font-bold text-lg mb-2 ${isUnlocked ? 'text-yellow-300' : 'text-gray-400'}`}
        >
          {achievement.name}
        </h4>

        <p
          className={`text-sm mb-4 leading-relaxed ${
            isUnlocked ? 'text-gray-300' : 'text-gray-500'
          }`}
        >
          {achievement.description}
        </p>

        {/* XP Reward */}
        <div
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
            isUnlocked
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
          }`}
        >
          +{achievement.xpReward} XP
        </div>

        {isUnlocked ? (
          <div className="space-y-2">
            <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center space-x-2">
              <Star size={16} />
              <span>Conquistado!</span>
            </div>
            {getUnlockDate() && <div className="text-xs text-yellow-400">{getUnlockDate()}</div>}
          </div>
        ) : (
          <div className="space-y-3">
            {progress > 0 && (
              <div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400">{getProgressText()}</div>
              </div>
            )}

            <div className="bg-gray-700/50 text-gray-300 px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center space-x-2">
              <Lock size={16} />
              <span>Bloqueado</span>
            </div>

            <div className="text-xs text-gray-500">Continue jogando para desbloquear!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsModal;
