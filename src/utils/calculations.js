// Utilitários para cálculos do sistema de gamificação

export const calculateTaskXP = (priority = 'medium') => {
  const baseXP = Math.floor(Math.random() * 30) + 20; // 20-50 XP base
  
  const priorityMultiplier = {
    low: 1,
    medium: 1.2,
    high: 1.5
  };
  
  return Math.floor(baseXP * (priorityMultiplier[priority] || 1));
};

export const calculateLevel = (totalXP) => {
  return Math.floor(totalXP / 100) + 1;
};

export const getXPForLevel = (level) => {
  return level * 100;
};

export const getLevelProgress = (currentXP) => {
  const currentLevel = calculateLevel(currentXP);
  const currentLevelXP = getXPForLevel(currentLevel);
  const nextLevelXP = getXPForLevel(currentLevel + 1);
  
  const progress = ((currentXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  return Math.max(0, Math.min(100, progress));
};

export const calculateStreak = (lastCompletedDate) => {
  if (!lastCompletedDate) return 1;
  
  const today = new Date().toDateString();
  const lastDate = new Date(lastCompletedDate).toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (lastDate === today) {
    return 0; // Mantém streak atual
  } else if (lastDate === yesterday.toDateString()) {
    return 1; // Incrementa streak
  } else {
    return -1; // Reset streak
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

export const getTimeOfDay = () => {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
};

export const getMotivationalMessage = (userStats) => {
  const { level, streak, totalCompleted } = userStats;
  const timeOfDay = getTimeOfDay();
  
  const greetings = {
    morning: 'Bom dia',
    afternoon: 'Boa tarde',
    evening: 'Boa noite'
  };
  
  const messages = [
    `${greetings[timeOfDay]}! Você está no nível ${level}!`,
    `Sequência de ${streak} dias! Continue assim!`,
    `${totalCompleted} tarefas concluídas! Você é incrível!`,
    'Cada tarefa te deixa mais forte!',
    'Sua jornada está apenas começando!',
    'Foco e determinação levam ao sucesso!'
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

// Configurações do jogo
export const GAME_CONFIG = {
  XP_PER_LEVEL: 100,
  MIN_XP_PER_TASK: 20,
  MAX_XP_PER_TASK: 50,
  PRIORITY_MULTIPLIERS: {
    low: 1,
    medium: 1.2,
    high: 1.5
  },
  ACHIEVEMENTS: {
    FIRST_TASK: { threshold: 1, xpBonus: 50 },
    TASK_MASTER: { threshold: 10, xpBonus: 100 },
    STREAK_3: { threshold: 3, xpBonus: 75 },
    LEVEL_5: { threshold: 5, xpBonus: 200 }
  }
};