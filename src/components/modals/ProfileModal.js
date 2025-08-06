// src/components/modals/ProfileModal.js
import React, { useState } from 'react';
import {
  X,
  User,
  Settings,
  LogOut,
  Calendar,
  Trophy,
  Zap,
  Edit3,
  Save,
  RotateCcw,
} from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';

const ProfileModal = ({ show, onClose, user, playerData, onOpenSettings, onLogout }) => {
  const { tasks } = useTasks();
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(playerData.avatar || '🦸‍♂️');

  // Avatar options
  const avatarOptions = [
    '🦸‍♂️',
    '🦸‍♀️',
    '🧙‍♂️',
    '🧙‍♀️',
    '👨‍💻',
    '👩‍💻',
    '🥷',
    '🦹‍♂️',
    '🦹‍♀️',
    '👨‍🚀',
    '👩‍🚀',
    '🧑‍🎓',
    '👨‍🔬',
    '👩‍🔬',
    '🦾',
    '🐱‍👤',
    '🐱‍🏍',
    '🐱‍💻',
    '🎯',
    '🏆',
    '⭐',
    '💎',
    '🔥',
    '⚡',
    '🌟',
    '💫',
    '🎪',
    '🎭',
    '🎨',
    '🎮',
  ];

  const handleSaveAvatar = async () => {
    try {
      // This would call updatePlayerAvatar from context
      // await updatePlayerAvatar(selectedAvatar);
      console.log('Avatar atualizado:', selectedAvatar);
      setIsEditingAvatar(false);
    } catch (error) {
      console.error('Erro ao atualizar avatar:', error);
    }
  };

  const getJoinDate = () => {
    const joinDate = playerData.joinDate || playerData.createdAt;
    if (!joinDate) return 'Recentemente';

    const date = joinDate.toDate ? joinDate.toDate() : new Date(joinDate);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getActivityStreak = () => {
    if (!tasks || tasks.length === 0) return 0;

    // Calculate current activity streak
    const today = new Date();
    let streak = 0;
    let checkDate = new Date(today);

    while (true) {
      const dateStr = checkDate.toDateString();
      const hasActivity = tasks.some(
        task => task.completed && task.completedAt?.toDate?.()?.toDateString() === dateStr
      );

      if (hasActivity) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }

      // Limit to reasonable calculation
      if (streak > 365) break;
    }

    return streak;
  };

  const getRecentAchievements = () => {
    // Return last 6 achievements (mock data for now)
    const recentAchievements = (playerData.achievements || []).slice(-6);
    const achievementEmojis = {
      'first-quest': '⭐',
      'task-master': '🏆',
      consistency: '🔥',
      veteran: '👑',
      'speed-runner': '⚡',
      productive: '💪',
      machine: '🌟',
      legend: '💎',
      'weekly-warrior': '🗓️',
      'monthly-master': '📆',
    };

    return recentAchievements.map(id => ({
      id,
      emoji: achievementEmojis[id] || '🏅',
    }));
  };

  const getLevelProgress = () => {
    const currentXp = playerData.xp || 0;
    return (currentXp / 100) * 100; // Assuming 100 XP per level
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-slate-800 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-3xl font-bold flex items-center space-x-3">
              <User className="text-purple-400" size={32} />
              <span>Perfil do Aventureiro</span>
            </h3>
            <p className="text-gray-400 mt-2">Gerencie suas informações e progresso</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-8">
          {/* Profile Header */}
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center text-5xl shadow-2xl transform hover:scale-105 transition-transform duration-200">
                {selectedAvatar}
              </div>
              <button
                onClick={() => setIsEditingAvatar(true)}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
                title="Editar Avatar"
              >
                <Edit3 size={16} />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">
              {user?.displayName || 'Aventureiro Anônimo'}
            </h2>
            <p className="text-purple-300 text-lg font-medium mb-1">
              {playerData.title || 'Aventureiro'}
            </p>
            <p className="text-gray-400 text-sm">Membro desde {getJoinDate()}</p>
          </div>

          {/* Avatar Editor */}
          {isEditingAvatar && (
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-blue-300">Escolha seu Avatar</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedAvatar(playerData.avatar || '🦸‍♂️')}
                    className="p-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-gray-300 transition-colors"
                    title="Cancelar"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    onClick={handleSaveAvatar}
                    className="p-2 bg-green-600 hover:bg-green-500 rounded-lg text-white transition-colors"
                    title="Salvar"
                  >
                    <Save size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-6 sm:grid-cols-8 gap-3 max-h-48 overflow-y-auto">
                {avatarOptions.map(avatar => (
                  <button
                    key={avatar}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-200 ${
                      selectedAvatar === avatar
                        ? 'bg-blue-500 scale-110 shadow-lg'
                        : 'bg-gray-700 hover:bg-gray-600 hover:scale-105'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Level & XP */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-500/30">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-yellow-300">Nível & Experiência</h4>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-black">
                  {playerData.level || 1}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-200">XP Atual</span>
                  <span className="text-yellow-400 font-bold">{playerData.xp || 0}/100</span>
                </div>
                <div className="w-full bg-yellow-900/30 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${getLevelProgress()}%` }}
                  />
                </div>
                <div className="text-xs text-yellow-300">XP Total: {playerData.totalXp || 0}</div>
              </div>
            </div>

            {/* Activity Stats */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-green-300">Atividade</h4>
                <Zap className="text-green-400" size={24} />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-green-200">Quests Concluídas</span>
                  <span className="text-2xl font-bold text-green-400">
                    {playerData.tasksCompleted || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-200">Streak Atual</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-400">🔥</span>
                    <span className="text-xl font-bold text-orange-400">
                      {playerData.streak || 0}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-200">Dias Ativos</span>
                  <span className="text-lg font-bold text-green-400">{getActivityStreak()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-purple-300 flex items-center space-x-2">
                <Trophy size={20} />
                <span>Conquistas Recentes</span>
              </h4>
              <span className="text-sm text-purple-200">
                {playerData.achievements?.length || 0} desbloqueadas
              </span>
            </div>

            {getRecentAchievements().length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {getRecentAchievements().map(achievement => (
                  <div
                    key={achievement.id}
                    className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl transform hover:scale-110 transition-transform duration-200 shadow-lg"
                    title={achievement.id}
                  >
                    {achievement.emoji}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400">
                <Trophy size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Complete mais quests para ganhar conquistas!</p>
              </div>
            )}
          </div>

          {/* Account Info */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Calendar size={20} />
              <span>Informações da Conta</span>
            </h4>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-gray-300">Email</span>
                <span className="text-gray-400 font-mono text-sm">{user?.email}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-gray-300">ID do Usuário</span>
                <span className="text-gray-400 font-mono text-xs">
                  {user?.uid?.substring(0, 8)}...
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-gray-300">Último Login</span>
                <span className="text-gray-400 text-sm">
                  {user?.metadata?.lastSignInTime
                    ? new Date(user.metadata.lastSignInTime).toLocaleDateString('pt-BR')
                    : 'Agora'}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-300">Conta Criada</span>
                <span className="text-gray-400 text-sm">
                  {user?.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString('pt-BR')
                    : getJoinDate()}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="flex items-center justify-center space-x-3 p-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Settings size={20} />
              <span>Configurações</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Tem certeza que deseja sair?')) {
                  onLogout();
                  onClose();
                }
              }}
              className="flex items-center justify-center space-x-3 p-4 bg-red-600 hover:bg-red-700 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <LogOut size={20} />
              <span>Sair da Conta</span>
            </button>
          </div>

          {/* Fun Stats */}
          <div className="bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-2xl p-6 border border-indigo-500/30">
            <h4 className="text-lg font-semibold text-indigo-300 mb-4">🎮 Stats Curiosas</h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-indigo-400">
                  {Math.floor((playerData.totalXp || 0) / 10)}
                </div>
                <div className="text-xs text-indigo-300">Níveis Ganhos</div>
              </div>

              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {tasks
                    ? Math.round(
                        (tasks.filter(t => t.completed).length / Math.max(tasks.length, 1)) * 100
                      )
                    : 0}
                  %
                </div>
                <div className="text-xs text-blue-300">Taxa Sucesso</div>
              </div>

              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {tasks ? tasks.filter(t => t.priority === 'alta' && t.completed).length : 0}
                </div>
                <div className="text-xs text-purple-300">Quests Difíceis</div>
              </div>

              <div>
                <div className="text-2xl font-bold text-pink-400">
                  {Math.max(playerData.streak || 0, getActivityStreak())}
                </div>
                <div className="text-xs text-pink-300">Melhor Streak</div>
              </div>
            </div>
          </div>

          {/* Motivational Quote */}
          <div className="text-center p-6 bg-gradient-to-r from-gray-500/10 to-slate-500/10 rounded-2xl border border-gray-500/20">
            <div className="text-4xl mb-3">✨</div>
            <blockquote className="text-lg italic text-gray-300 mb-2">
              "A jornada de mil milhas começa com um único passo."
            </blockquote>
            <cite className="text-sm text-gray-400">- Provérbio Chinês</cite>
            <p className="text-xs text-gray-500 mt-2">
              Continue sua jornada épica, uma quest por vez! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
