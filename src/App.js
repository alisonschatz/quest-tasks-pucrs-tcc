import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Star, Trophy, Zap, Target, Award } from 'lucide-react';

const GamifiedTodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
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

  // Conquistas disponíveis
  const achievements = [
    { id: 'first_task', name: 'Primeira Tarefa', description: 'Complete sua primeira tarefa', icon: Star, unlocked: userStats.totalCompleted >= 1 },
    { id: 'task_master', name: 'Mestre das Tarefas', description: 'Complete 10 tarefas', icon: Trophy, unlocked: userStats.totalCompleted >= 10 },
    { id: 'streak_3', name: 'Consistência', description: 'Mantenha uma sequência de 3 dias', icon: Zap, unlocked: userStats.streak >= 3 },
    { id: 'level_5', name: 'Veterano', description: 'Alcance o nível 5', icon: Target, unlocked: userStats.level >= 5 }
  ];

  // Adicionar nova tarefa
  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString(),
        xpReward: Math.floor(Math.random() * 30) + 20 // 20-50 XP
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  // Completar tarefa
  const completeTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, completed: true, completedAt: new Date().toISOString() } : t
    ));

    // Atualizar estatísticas do usuário
    const newXp = userStats.xp + task.xpReward;
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
  };

  // Remover tarefa
  const removeTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  // Alterar prioridade da tarefa
  const changePriority = (taskId, priority) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, priority } : t
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-50';
      case 'medium': return 'border-yellow-400 bg-yellow-50';
      case 'low': return 'border-green-400 bg-green-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header com estatísticas do jogador */}
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
              <div className="text-2xl font-bold text-green-400">{tasks.filter(t => !t.completed).length}</div>
              <div className="text-sm text-gray-300">Pendentes</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seção principal de tarefas */}
          <div className="lg:col-span-2">
            {/* Adicionar nova tarefa */}
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Nova Quest</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  placeholder="Digite sua nova tarefa..."
                  className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={addTask}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus size={18} />
                  Adicionar
                </button>
              </div>
            </div>

            {/* Lista de tarefas */}
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-4">Suas Quests</h2>
              <div className="space-y-3">
                {tasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-300">
                    <Target size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Nenhuma quest ainda. Adicione sua primeira tarefa!</p>
                  </div>
                ) : (
                  tasks.map(task => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
                        task.completed 
                          ? 'bg-green-500/20 border-green-500/50' 
                          : `${getPriorityColor(task.priority)} border-opacity-50`
                      }`}
                    >
                      <button
                        onClick={() => completeTask(task.id)}
                        disabled={task.completed}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          task.completed
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-400 hover:border-purple-500 hover:bg-purple-500/20'
                        }`}
                      >
                        {task.completed && <Check size={14} />}
                      </button>
                      
                      <div className="flex-1">
                        <div className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                          {task.text}
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <select
                            value={task.priority}
                            onChange={(e) => changePriority(task.id, e.target.value)}
                            disabled={task.completed}
                            className="text-xs px-2 py-1 rounded bg-white/50 border border-gray-300"
                          >
                            <option value="low">Baixa</option>
                            <option value="medium">Média</option>
                            <option value="high">Alta</option>
                          </select>
                          <span className="text-xs text-gray-600">
                            +{task.xpReward} XP
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeTask(task.id)}
                        className="flex-shrink-0 p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar com conquistas */}
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

            {/* Dicas motivacionais */}
            <div className="mt-6 p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
              <h3 className="font-semibold text-white mb-2">💡 Dica</h3>
              <p className="text-sm text-gray-300">
                Complete tarefas consecutivamente para manter sua sequência e ganhar mais XP!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamifiedTodoApp;