// src/components/AchievementNotification.js
import React, { useState, useEffect } from 'react';
import { useAchievements } from '../utils/achievements';

function AchievementNotification({ playerData, tasks, onNewAchievement }) {
  const [notifications, setNotifications] = useState([]);
  const { checkAchievements, getAchievementData } = useAchievements(playerData, tasks);

  useEffect(() => {
    // Verificar novas conquistas quando dados mudarem
    const newAchievements = checkAchievements();
    
    if (newAchievements.length > 0) {
      // Adicionar notificações para novas conquistas
      const newNotifications = newAchievements.map(achievementId => ({
        id: Date.now() + Math.random(),
        achievement: getAchievementData(achievementId),
        timestamp: Date.now()
      }));
      
      setNotifications(prev => [...prev, ...newNotifications]);
      
      // Informar o componente pai sobre novas conquistas
      if (onNewAchievement) {
        newAchievements.forEach(achievementId => {
          const achievement = getAchievementData(achievementId);
          onNewAchievement(achievement);
        });
      }
      
      // Remover notificações após 5 segundos
      newNotifications.forEach(notification => {
        setTimeout(() => {
          setNotifications(prev => 
            prev.filter(n => n.id !== notification.id)
          );
        }, 5000);
      });
    }
  }, [playerData.achievements, playerData.tasksCompleted, playerData.streak, playerData.level]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <AchievementToast
          key={notification.id}
          achievement={notification.achievement}
          onClose={() => setNotifications(prev => 
            prev.filter(n => n.id !== notification.id)
          )}
        />
      ))}
    </div>
  );
}

function AchievementToast({ achievement, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animação de entrada
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`
      transform transition-all duration-300 ease-out
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
    `}>
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-lg shadow-2xl border border-yellow-300 max-w-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce">🏆</span>
            <span className="font-bold text-sm">Nova Conquista!</span>
          </div>
          <button 
            onClick={handleClose}
            className="text-white/80 hover:text-white text-lg leading-none"
          >
            ×
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-3xl">
            {achievement.icon}
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">
              {achievement.name}
            </h3>
            <p className="text-yellow-100 text-sm">
              {achievement.description}
            </p>
            <div className="text-yellow-200 text-sm font-medium mt-1">
              +{achievement.xpReward} XP ganhos!
            </div>
          </div>
        </div>
        
        {/* Confetes animados */}
        <div className="absolute -top-2 -right-2 text-yellow-200 animate-pulse">
          ✨
        </div>
        <div className="absolute -top-1 -left-1 text-orange-200 animate-pulse delay-100">
          🎉
        </div>
      </div>
    </div>
  );
}

export default AchievementNotification;