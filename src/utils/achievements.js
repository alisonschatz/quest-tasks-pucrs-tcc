// src/utils/achievements.js - Sistema expandido integrado com Firebase
export const ACHIEVEMENTS = {
  // Conquistas Básicas
  'first-quest': {
    id: 'first-quest',
    name: 'Primeira Quest',
    description: 'Complete sua primeira tarefa e comece sua jornada épica',
    icon: '⭐',
    xpReward: 50,
    condition: (playerData, tasks) => {
      return (playerData.tasksCompleted || 0) >= 1;
    },
  },
  'task-master': {
    id: 'task-master',
    name: 'Mestre das Tarefas',
    description: 'Complete 10 tarefas e prove sua dedicação',
    icon: '🏆',
    xpReward: 100,
    condition: (playerData, tasks) => {
      return (playerData.tasksCompleted || 0) >= 10;
    },
  },
  consistency: {
    id: 'consistency',
    name: 'Consistência',
    description: 'Mantenha 3 dias consecutivos de atividade',
    icon: '🔥',
    xpReward: 75,
    condition: (playerData, tasks) => {
      return (playerData.streak || 0) >= 3;
    },
  },
  veteran: {
    id: 'veteran',
    name: 'Veterano',
    description: 'Alcance o nível 5 e se torne um aventureiro experiente',
    icon: '👑',
    xpReward: 200,
    condition: (playerData, tasks) => {
      return (playerData.level || 1) >= 5;
    },
  },

  // Conquistas por Volume
  'speed-runner': {
    id: 'speed-runner',
    name: 'Speed Runner',
    description: 'Complete 5 tarefas em um único dia',
    icon: '⚡',
    xpReward: 30,
    condition: (playerData, tasks) => {
      const today = new Date().toDateString();
      const todayTasks = tasks.filter(
        task => task.completed && task.completedAt?.toDate?.()?.toDateString() === today
      );
      return todayTasks.length >= 5;
    },
  },
  productive: {
    id: 'productive',
    name: 'Produtivo',
    description: 'Complete 10 tarefas em uma semana',
    icon: '💪',
    xpReward: 50,
    condition: (playerData, tasks) => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const weekTasks = tasks.filter(
        task => task.completed && task.completedAt?.toDate?.() >= oneWeekAgo
      );
      return weekTasks.length >= 10;
    },
  },
  machine: {
    id: 'machine',
    name: 'Máquina',
    description: 'Complete 20 tarefas em um dia - você é imparável!',
    icon: '🌟',
    xpReward: 100,
    condition: (playerData, tasks) => {
      const today = new Date().toDateString();
      const todayTasks = tasks.filter(
        task => task.completed && task.completedAt?.toDate?.()?.toDateString() === today
      );
      return todayTasks.length >= 20;
    },
  },
  legend: {
    id: 'legend',
    name: 'Lenda Viva',
    description: 'Complete 100 tarefas no total - você é uma lenda!',
    icon: '💎',
    xpReward: 300,
    condition: (playerData, tasks) => {
      return (playerData.tasksCompleted || 0) >= 100;
    },
  },

  // Conquistas por Consistência
  'weekly-warrior': {
    id: 'weekly-warrior',
    name: 'Guerreiro Semanal',
    description: 'Mantenha 7 dias consecutivos de streak',
    icon: '🗓️',
    xpReward: 120,
    condition: (playerData, tasks) => {
      return (playerData.streak || 0) >= 7;
    },
  },
  'monthly-master': {
    id: 'monthly-master',
    name: 'Mestre Mensal',
    description: 'Mantenha 30 dias consecutivos - disciplina extrema!',
    icon: '📆',
    xpReward: 500,
    condition: (playerData, tasks) => {
      return (playerData.streak || 0) >= 30;
    },
  },
  'quarterly-champion': {
    id: 'quarterly-champion',
    name: 'Campeão Trimestral',
    description: 'Mantenha 90 dias consecutivos de atividade',
    icon: '🏅',
    xpReward: 1000,
    condition: (playerData, tasks) => {
      return (playerData.streak || 0) >= 90;
    },
  },

  // Conquistas por Categoria
  workaholic: {
    id: 'workaholic',
    name: 'Workaholic',
    description: 'Complete 20 tarefas de trabalho',
    icon: '💼',
    xpReward: 80,
    condition: (playerData, tasks) => {
      const workTasks = tasks.filter(task => task.completed && task.category === 'trabalho');
      return workTasks.length >= 20;
    },
  },
  'health-guru': {
    id: 'health-guru',
    name: 'Guru da Saúde',
    description: 'Complete 15 tarefas de saúde',
    icon: '🧘',
    xpReward: 90,
    condition: (playerData, tasks) => {
      const healthTasks = tasks.filter(task => task.completed && task.category === 'saude');
      return healthTasks.length >= 15;
    },
  },
  'lifelong-learner': {
    id: 'lifelong-learner',
    name: 'Eterno Aprendiz',
    description: 'Complete 25 tarefas de crescimento pessoal',
    icon: '📚',
    xpReward: 150,
    condition: (playerData, tasks) => {
      const growthTasks = tasks.filter(task => task.completed && task.category === 'crescimento');
      return growthTasks.length >= 25;
    },
  },
  'home-master': {
    id: 'home-master',
    name: 'Mestre do Lar',
    description: 'Complete 15 tarefas domésticas',
    icon: '🏡',
    xpReward: 70,
    condition: (playerData, tasks) => {
      const homeTasks = tasks.filter(task => task.completed && task.category === 'casa');
      return homeTasks.length >= 15;
    },
  },
  'social-butterfly': {
    id: 'social-butterfly',
    name: 'Borboleta Social',
    description: 'Complete 10 tarefas sociais',
    icon: '🦋',
    xpReward: 60,
    condition: (playerData, tasks) => {
      const socialTasks = tasks.filter(task => task.completed && task.category === 'social');
      return socialTasks.length >= 10;
    },
  },

  // Conquistas por Dificuldade
  'easy-rider': {
    id: 'easy-rider',
    name: 'Começando Bem',
    description: 'Complete 20 tarefas fáceis',
    icon: '🌱',
    xpReward: 40,
    condition: (playerData, tasks) => {
      const easyTasks = tasks.filter(task => task.completed && task.priority === 'baixa');
      return easyTasks.length >= 20;
    },
  },
  'balanced-warrior': {
    id: 'balanced-warrior',
    name: 'Guerreiro Equilibrado',
    description: 'Complete 30 tarefas médias',
    icon: '⚖️',
    xpReward: 80,
    condition: (playerData, tasks) => {
      const mediumTasks = tasks.filter(task => task.completed && task.priority === 'media');
      return mediumTasks.length >= 30;
    },
  },
  'challenge-seeker': {
    id: 'challenge-seeker',
    name: 'Caçador de Desafios',
    description: 'Complete 15 tarefas difíceis',
    icon: '🎯',
    xpReward: 120,
    condition: (playerData, tasks) => {
      const hardTasks = tasks.filter(task => task.completed && task.priority === 'alta');
      return hardTasks.length >= 15;
    },
  },

  // Conquistas Especiais
  perfectionist: {
    id: 'perfectionist',
    name: 'Perfeccionista',
    description: 'Complete 10 tarefas difíceis consecutivas',
    icon: '💫',
    xpReward: 200,
    condition: (playerData, tasks) => {
      const completedTasks = tasks
        .filter(task => task.completed)
        .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));

      let consecutiveHard = 0;
      let maxConsecutive = 0;

      completedTasks.forEach(task => {
        if (task.priority === 'alta') {
          consecutiveHard++;
          maxConsecutive = Math.max(maxConsecutive, consecutiveHard);
        } else {
          consecutiveHard = 0;
        }
      });

      return maxConsecutive >= 10;
    },
  },
  'early-bird': {
    id: 'early-bird',
    name: 'Madrugador',
    description: 'Complete tarefas antes das 7h da manhã',
    icon: '🌅',
    xpReward: 60,
    condition: (playerData, tasks) => {
      return tasks.some(task => task.completed && task.completedAt?.toDate?.()?.getHours() < 7);
    },
  },
  'night-owl': {
    id: 'night-owl',
    name: 'Coruja Noturna',
    description: 'Complete tarefas depois das 22h',
    icon: '🌙',
    xpReward: 60,
    condition: (playerData, tasks) => {
      return tasks.some(task => task.completed && task.completedAt?.toDate?.()?.getHours() >= 22);
    },
  },
  'deadline-master': {
    id: 'deadline-master',
    name: 'Mestre dos Prazos',
    description: 'Complete 10 tarefas no prazo',
    icon: '⏰',
    xpReward: 100,
    condition: (playerData, tasks) => {
      const onTimeTasks = tasks.filter(task => {
        if (!task.completed || !task.dueDate) return false;
        const completedDate = task.completedAt?.toDate?.();
        const dueDate = new Date(task.dueDate);
        return completedDate && completedDate <= dueDate;
      });
      return onTimeTasks.length >= 10;
    },
  },

  // Conquistas de Elite
  unstoppable: {
    id: 'unstoppable',
    name: 'Imparável',
    description: 'Complete tarefas por 14 dias consecutivos',
    icon: '🚀',
    xpReward: 400,
    condition: (playerData, tasks) => {
      // Verificar se completou pelo menos 1 tarefa nos últimos 14 dias
      const dates = new Set();
      const fourteenDaysAgo = new Date();
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

      tasks.forEach(task => {
        if (task.completed && task.completedAt?.toDate?.() >= fourteenDaysAgo) {
          dates.add(task.completedAt.toDate().toDateString());
        }
      });

      return dates.size >= 14;
    },
  },
  'quest-master': {
    id: 'quest-master',
    name: 'Mestre das Quests',
    description: 'Alcance o nível 10 - você é oficialmente um mestre!',
    icon: '🎖️',
    xpReward: 500,
    condition: (playerData, tasks) => {
      return (playerData.level || 1) >= 10;
    },
  },
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
      try {
        if (achievement.condition(playerData, tasks)) {
          newAchievements.push(achievement.id);
        }
      } catch (error) {
        console.warn(`Erro ao verificar conquista ${achievement.id}:`, error);
      }
    });

    return newAchievements;
  };

  const getAchievementData = achievementId => {
    return ACHIEVEMENTS[achievementId];
  };

  const getAllAchievements = () => {
    return Object.values(ACHIEVEMENTS);
  };

  const getUnlockedAchievements = () => {
    return (playerData.achievements || []).map(id => ACHIEVEMENTS[id]).filter(Boolean);
  };

  const getLockedAchievements = () => {
    const unlocked = playerData.achievements || [];
    return Object.values(ACHIEVEMENTS).filter(achievement => !unlocked.includes(achievement.id));
  };

  const isAchievementUnlocked = achievementId => {
    return (playerData.achievements || []).includes(achievementId);
  };

  const getProgress = achievementId => {
    const achievement = ACHIEVEMENTS[achievementId];
    if (!achievement) return 0;

    // Se já está desbloqueada, progresso é 100%
    if (isAchievementUnlocked(achievementId)) return 1;

    try {
      // Para conquistas baseadas em números específicos
      switch (achievementId) {
        case 'task-master':
          return Math.min((playerData.tasksCompleted || 0) / 10, 1);
        case 'legend':
          return Math.min((playerData.tasksCompleted || 0) / 100, 1);
        case 'weekly-warrior':
          return Math.min((playerData.streak || 0) / 7, 1);
        case 'monthly-master':
          return Math.min((playerData.streak || 0) / 30, 1);
        case 'quarterly-champion':
          return Math.min((playerData.streak || 0) / 90, 1);
        case 'veteran':
          return Math.min((playerData.level || 1) / 5, 1);
        case 'quest-master':
          return Math.min((playerData.level || 1) / 10, 1);
        case 'consistency':
          return Math.min((playerData.streak || 0) / 3, 1);

        // Conquistas baseadas em tarefas por categoria
        case 'workaholic':
          const workTasks = tasks.filter(t => t.completed && t.category === 'trabalho').length;
          return Math.min(workTasks / 20, 1);
        case 'health-guru':
          const healthTasks = tasks.filter(t => t.completed && t.category === 'saude').length;
          return Math.min(healthTasks / 15, 1);
        case 'lifelong-learner':
          const growthTasks = tasks.filter(t => t.completed && t.category === 'crescimento').length;
          return Math.min(growthTasks / 25, 1);
        case 'home-master':
          const homeTasks = tasks.filter(t => t.completed && t.category === 'casa').length;
          return Math.min(homeTasks / 15, 1);
        case 'social-butterfly':
          const socialTasks = tasks.filter(t => t.completed && t.category === 'social').length;
          return Math.min(socialTasks / 10, 1);

        // Conquistas por dificuldade
        case 'easy-rider':
          const easyTasks = tasks.filter(t => t.completed && t.priority === 'baixa').length;
          return Math.min(easyTasks / 20, 1);
        case 'balanced-warrior':
          const mediumTasks = tasks.filter(t => t.completed && t.priority === 'media').length;
          return Math.min(mediumTasks / 30, 1);
        case 'challenge-seeker':
          const hardTasks = tasks.filter(t => t.completed && t.priority === 'alta').length;
          return Math.min(hardTasks / 15, 1);

        default:
          // Para outras conquistas, verificar se a condição já está próxima
          return achievement.condition(playerData, tasks) ? 1 : 0;
      }
    } catch (error) {
      console.warn(`Erro ao calcular progresso da conquista ${achievementId}:`, error);
      return 0;
    }
  };

  const getAchievementStats = () => {
    const all = getAllAchievements();
    const unlocked = getUnlockedAchievements();
    const totalXpFromAchievements = unlocked.reduce((total, ach) => total + ach.xpReward, 0);

    return {
      total: all.length,
      unlocked: unlocked.length,
      locked: all.length - unlocked.length,
      completionRate: Math.round((unlocked.length / all.length) * 100),
      totalXpEarned: totalXpFromAchievements,
      potentialXp: all.reduce((total, ach) => total + ach.xpReward, 0),
    };
  };

  const getNextAchievements = (limit = 3) => {
    const locked = getLockedAchievements();

    // Ordenar por progresso decrescente para mostrar as mais próximas
    return locked
      .map(achievement => ({
        ...achievement,
        progress: getProgress(achievement.id),
      }))
      .sort((a, b) => b.progress - a.progress)
      .slice(0, limit);
  };

  return {
    checkAchievements,
    getAchievementData,
    getAllAchievements,
    getUnlockedAchievements,
    getLockedAchievements,
    isAchievementUnlocked,
    getProgress,
    getAchievementStats,
    getNextAchievements,
  };
};
