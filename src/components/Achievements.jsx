import React from 'react';
import { Award, Star, Trophy, Zap, Target } from 'lucide-react';

const Achievements = ({ userStats }) => {
  // Conquistas disponíveis
  const achievements = [
    { 
      id: 'first_task', 
      name: 'Primeira Tarefa', 
      description: 'Complete sua primeira tarefa', 
      icon: Star, 
      unlocked: userStats.totalCompleted >= 1 
    },
    { 
      id: 'task_master', 
      name: 'Mestre das Tarefas', 
      description: 'Complete 10 tarefas', 
      icon: Trophy, 
      unlocked: userStats.totalCompleted >= 10 
    },
    { 
      id: 'streak_3', 
      name: 'Consistência', 
      description: 'Mantenha uma sequência de 3 dias', 
      icon: Zap, 
      unlocked: userStats.streak >= 3 
    },
    { 
      id: 'level_5', 
      name: 'Veterano', 
      description: 'Alcance o nível 5', 
      icon: Target, 
      unlocked: userStats.level >= 5 
    }
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Award className="text-yellow-400" />
        Conquistas
      </h2>
      
      <div className="space-y-3">
        {achievements.map(achievement => {
          const IconComponent = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                achievement.unlocked
                  ? 'bg-yellow-500/20 border-yellow-500/50'
                  : 'bg-gray-500/20 border-gray-500/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <IconComponent 
                  size={24} 
                  className={achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'} 
                />
                <div>
                  <div className={`font-semibold ${
                    achievement.unlocked ? 'text-white' : 'text-gray-400'
                  }`}>
                    {achievement.name}
                  </div>
                  <div className="text-xs text-gray-300">
                    {achievement.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progresso das conquistas */}
      <div className="mt-4 p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-white">Progresso</span>
          <span className="text-xs text-gray-300">
            {achievements.filter(a => a.unlocked).length}/{achievements.length}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${(achievements.filter(a => a.unlocked).length / achievements.length) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Dicas motivacionais */}
      <div className="mt-6 p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
        <h3 className="font-semibold text-white mb-2">💡 Dica</h3>
        <p className="text-sm text-gray-300">
          Complete tarefas consecutivamente para manter sua sequência e ganhar mais XP!
        </p>
      </div>
    </div>
  );
};

export default Achievements;