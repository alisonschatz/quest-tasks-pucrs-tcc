import { useState, useEffect } from 'react';

const useGameification = () => {
  const [userStats, setUserStats] = useState({
    level: 1,
    xp: 0,
    totalCompleted: 0,
    streak: 0,
    lastCompletedDate: null
  });

  // Sistema de níveis baseado em XP
  const getXpForLevel = (level) => level * 100;
  
  const getCurrentLevelProgress = () => {
    const currentLevelXp = getXpForLevel(userStats.level);
    const nextLevelXp = getXpForLevel(userStats.level + 1);
    const progress = ((userStats.xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  const updateUserStats = (xpGained) => {
    const newXp = userStats.xp + xpGained;
    const newLevel = Math.floor(newXp / 100) + 1;
    const today = new Date().toDateString();
    const lastCompleted = userStats.lastCompletedDate;
    
    let newStreak = userStats.streak;
    if (lastCompleted) {
      const lastDate = new Date(lastCompleted).toDateString();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastDate === today) {
        // Já completou hoje, mantém streak
      } else if (lastDate === yesterday.toDateString()) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    setUserStats({
      level: newLevel,
      xp: newXp,
      totalCompleted: userStats.totalCompleted + 1,
      streak: newStreak,
      lastCompletedDate: today
    });

    // Retorna se houve level up para animações
    return newLevel > userStats.level;
  };

  return {
    userStats,
    getCurrentLevelProgress,
    updateUserStats,
    getXpForLevel
  };
};

export default useGameification;