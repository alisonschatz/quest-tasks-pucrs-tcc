// src/components/AchievementPanel.js
import React from 'react';
import { useAchievements } from '../utils/achievements';

function AchievementPanel({ playerData, tasks }) {
  const { 
    getAllAchievements, 
    getUnlockedAchievements, 
    getProgress 
  } = useAchievements(playerData, tasks);

  const allAchievements = getAllAchievements();
  const unlockedIds = (playerData.achievements || []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        🏆 Conquistas ({unlockedIds.length}/{allAchievements.length})
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
        {allAchievements.map(achievement => {
          const isUnlocked = unlockedIds.includes(achievement.id);
          const progress = getProgress(achievement.id);
          
          return (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              isUnlocked={isUnlocked}
              progress={progress}
            />
          );
        })}
      </div>
    </div>
  );
}

function AchievementCard({ achievement, isUnlocked, progress }) {
  return (
    <div className={`
      p-3 rounded-lg border-2 transition-all duration-200 
      ${isUnlocked 
        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 shadow-md' 
        : 'bg-gray-50 border-gray-200 opacity-70'
      }
    `}>
      <div className="text-center">
        <div className={`text-2xl mb-2 ${isUnlocked ? 'grayscale-0' : 'grayscale'}`}>
          {achievement.icon}
        </div>
        
        <h3 className={`font-semibold text-sm mb-1 ${
          isUnlocked ? 'text-gray-800' : 'text-gray-500'
        }`}>
          {achievement.name}
        </h3>
        
        <p className={`text-xs mb-2 ${
          isUnlocked ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {achievement.description}
        </p>
        
        <div className={`text-xs font-medium ${
          isUnlocked ? 'text-yellow-600' : 'text-gray-400'
        }`}>
          +{achievement.xpReward} XP
        </div>
        
        {/* Barra de progresso para conquistas não desbloqueadas */}
        {!isUnlocked && progress > 0 && progress < 1 && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round(progress * 100)}%
            </div>
          </div>
        )}
        
        {isUnlocked && (
          <div className="mt-2">
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              ✓ Desbloqueado
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AchievementPanel;