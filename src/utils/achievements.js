// src/utils/achievements.js
export const ACHIEVEMENTS = {
  // Conquistas Originais
  'first-quest': {
    id: 'first-quest',
    name: 'Primeira Quest',
    description: 'Complete sua primeira tarefa',
    icon: '⭐',
    xpReward: 50,
    condition: (playerData, tasks) => {
      return playerData.tasksCompleted >= 1;
    }
  },
  'task-master': {
    id: 'task-master',
    name: 'Mestre das Tarefas',
    description: 'Complete 10 tarefas',
    icon: '🏆',
    xpReward: 100,
    condition: (playerData, tasks) => {
      return playerData.tasksCompleted >= 10;
    }
  },
  'consistency': {
    id: 'consistency',
    name: 'Consistência',
    description: 'Mantenha 3 dias de streak',
    icon: '🔥',
    xpReward: 75,
    condition: (playerData, tasks) => {
      return playerData.streak >= 3;
    }
  },
  'veteran': {
    id: 'veteran',
    name: 'Veterano',
    description: 'Alcance o nível 5',
    icon: '👑',
    xpReward: 200,
    condition: (playerData, tasks) => {
      return playerData.level >= 5;
    }
  },

  // Conquistas por Volume
  'speed-runner': {
    id: 'speed-runner',
    name: 'Speed Runner',
    description: 'Complete 5 tarefas em 1 dia',
    icon: '⚡',
    xpReward: 30,
    condition: (playerData, tasks) => {
      const today = new Date().toDateString();
      const todayTasks = tasks.filter(task => 
        task.completed && 
        task.completedAt?.toDate?.()?.toDateString() === today
      );
      return todayTasks.length >= 5;
    }
  },
  'productive': {
    id: 'productive',
    name: 'Produtivo',
    description: 'Complete 10 tarefas em 1 semana',
    icon: '🔥',
    xpReward: 50,
    condition: (playerData, tasks) => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const weekTasks = tasks.filter(task =>
        task.completed &&
        task.completedAt?.toDate?.() >= oneWeekAgo
      );
      return weekTasks.length >= 10;
    }
  },
  'machine': {
    id: 'machine',
    name: 'Máquina',
    description: 'Complete 20 tarefas em 1 dia',
    icon: '🌟',
    xpReward: 100,
    condition: (playerData, tasks) => {
      const today = new Date().toDateString();
      const todayTasks = tasks.filter(task => 
        task.completed && 
        task.completedAt?.toDate?.()?.toDateString() === today
      );
      return todayTasks.length >= 20;
    }
  },
  'legend': {
    id: 'legend',
    name: 'Lenda',
    description: 'Complete 100 tarefas total',
    icon: '💎',
    xpReward: 200,
    condition: (playerData, tasks) => {
      return playerData.tasksCompleted >= 100;
    }
  },

  // Conquistas por Consistência
  'weekly-warrior': {
    id: 'weekly-warrior',
    name: 'Guerreiro Semanal',
    description: 'Mantenha 7 dias de streak',
    icon: '🗓️',
    xpReward: 40,
    condition: (playerData, tasks) => {
      return playerData.streak >= 7;
    }
  },
  'monthly-master': {
    id: 'monthly-master',
    name: 'Mestre Mensal',
    description: 'Mantenha 30 dias de streak',
    icon: '📆',
    xpReward: 150,
    condition: (playerData, tasks) => {
      return playerData.streak >= 30;
    }
  },
  'quarterly-champion': {
    id: 'quarterly-champion',
    name: 'Campeão Trimestral',
    description: 'Mantenha 90 dias de streak',
    icon: '🏅',
    xpReward: 300,
    condition: (playerData, tasks) => {
      return playerData.streak >= 90;
    }
  },
  'annual-god': {
    id: 'annual-god',
    name: 'Deus Anual',
    description: 'Mantenha 365 dias de streak',
    icon: '👑',
    xpReward: 1000,
    condition: (playerData, tasks) => {
      return playerData.streak >= 365;
    }
  },

  // Conquistas por Horário
  'early-bird': {
    id: 'early-bird',
    name: 'Madrugador',
    description: 'Complete uma tarefa antes de 7h',
    icon: '🌅',
    xpReward: 25,
    condition: (playerData, tasks) => {
      return tasks.some(task =>
        task.completed &&
        task.completedAt?.toDate?.()?.getHours() < 7
      );
    }
  },
  'night-owl': {
    id: 'night-owl',
    name: 'Coruja',
    description: 'Complete uma tarefa depois de 22h',
    icon: '🌙',
    xpReward: 25,
    condition: (playerData, tasks) => {
      return tasks.some(task =>
        task.completed &&
        task.completedAt?.toDate?.()?.getHours() >= 22
      );
    }
  },
  'punctual': {
    id: 'punctual',
    name: 'Pontual',
    description: 'Complete 10 tarefas entre 9h-17h',
    icon: '⏰',
    xpReward: 75,
    condition: (playerData, tasks) => {
      const businessHoursTasks = tasks.filter(task => {
        if (!task.completed || !task.completedAt) return false;
        const hour = task.completedAt.toDate?.()?.getHours();
        return hour >= 9 && hour <= 17;
      });
      return businessHoursTasks.length >= 10;
    }
  },

  // Conquistas Especiais
  'detailed': {
    id: 'detailed',
    name: 'Detalhista',
    description: 'Crie 20 tarefas com descrição',
    icon: '📝',
    xpReward: 50,
    condition: (playerData, tasks) => {
      const detailedTasks = tasks.filter(task =>
        task.description && task.description.trim().length > 0
      );
      return detailedTasks.length >= 20;
    }
  },
  'focused': {
    id: 'focused',
    name: 'Focado',
    description: 'Complete apenas tarefas altas por 5 dias',
    icon: '🎯',
    xpReward: 80,
    condition: (playerData, tasks) => {
      // Verificar últimos 5 dias
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
      
      const recentTasks = tasks.filter(task =>
        task.completed &&
        task.completedAt?.toDate?.() >= fiveDaysAgo
      );
      
      const onlyHighPriority = recentTasks.every(task => 
        task.priority === 'alta'
      );
      
      return recentTasks.length >= 5 && onlyHighPriority;
    }
  },
  'diversified': {
    id: 'diversified',
    name: 'Diversificado',
    description: 'Use todas as prioridades em 1 dia',
    icon: '🚀',
    xpReward: 30,
    condition: (playerData, tasks) => {
      const today = new Date().toDateString();
      const todayTasks = tasks.filter(task => 
        task.completed && 
        task.completedAt?.toDate?.()?.toDateString() === today
      );
      
      const priorities = new Set(todayTasks.map(task => task.priority));
      return priorities.has('baixa') && priorities.has('media') && priorities.has('alta');
    }
  },

  // Conquistas de Elite
  'perfectionist': {
    id: 'perfectionist',
    name: 'Perfeccionista',
    description: 'Complete 50 tarefas consecutivas de alta prioridade',
    icon: '💫',
    xpReward: 150,
    condition: (playerData, tasks) => {
      const completedTasks = tasks
        .filter(task => task.completed)
        .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));
      
      let consecutiveHigh = 0;
      let maxConsecutive = 0;
      
      completedTasks.forEach(task => {
        if (task.priority === 'alta') {
          consecutiveHigh++;
          maxConsecutive = Math.max(maxConsecutive, consecutiveHigh);
        } else {
          consecutiveHigh = 0;
        }
      });
      
      return maxConsecutive >= 50;
    }
  },
  'unstoppable': {
    id: 'unstoppable',
    name: 'Imparável',
    description: 'Complete tarefas por 10 dias consecutivos',
    icon: '🔥',
    xpReward: 200,
    condition: (playerData, tasks) => {
      // Verificar se completou pelo menos 1 tarefa nos últimos 10 dias
      const dates = new Set();
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
      
      tasks.forEach(task => {
        if (task.completed && task.completedAt?.toDate?.() >= tenDaysAgo) {
          dates.add(task.completedAt.toDate().toDateString());
        }
      });
      
      return dates.size >= 10;
    }
  }
};

// Hook para verificar conquistas
export const useAchievements = (playerData, tasks) => {
  const checkAchievements = () => {
    const newAchievements = [];
    const currentAchievements = playerData.achievements || [];
    
    Object.values(ACHIEVEMENTS).forEach(achievement => {
      // Se já tem a conquista, pular
      if (currentAchievements.includes(achievement.id)) return;
      
      // Verificar condição
      if (achievement.condition(playerData, tasks)) {
        newAchievements.push(achievement.id);
      }
    });
    
    return newAchievements;
  };

  const getAchievementData = (achievementId) => {
    return ACHIEVEMENTS[achievementId];
  };

  const getAllAchievements = () => {
    return Object.values(ACHIEVEMENTS);
  };

  const getUnlockedAchievements = () => {
    return (playerData.achievements || []).map(id => ACHIEVEMENTS[id]);
  };

  const getLockedAchievements = () => {
    const unlocked = playerData.achievements || [];
    return Object.values(ACHIEVEMENTS).filter(achievement =>
      !unlocked.includes(achievement.id)
    );
  };

  const getProgress = (achievementId) => {
    const achievement = ACHIEVEMENTS[achievementId];
    if (!achievement) return 0;
    
    // Para conquistas baseadas em número
    if (achievementId === 'task-master') {
      return Math.min(playerData.tasksCompleted / 10, 1);
    }
    if (achievementId === 'legend') {
      return Math.min(playerData.tasksCompleted / 100, 1);
    }
    if (achievementId === 'weekly-warrior') {
      return Math.min(playerData.streak / 7, 1);
    }
    if (achievementId === 'monthly-master') {
      return Math.min(playerData.streak / 30, 1);
    }
    
    // Para outras conquistas, retornar 0 ou 1
    return achievement.condition(playerData, tasks) ? 1 : 0;
  };

  return {
    checkAchievements,
    getAchievementData,
    getAllAchievements,
    getUnlockedAchievements,
    getLockedAchievements,
    getProgress
  };
};