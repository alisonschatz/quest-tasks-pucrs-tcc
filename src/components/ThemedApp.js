// src/components/ThemedApp.js - App principal com suporte a temas
import React, { useState } from 'react';
import AuthWrapper from './AuthWrapper';
import AchievementPanel from './AchievementPanel';
import AchievementNotification from './AchievementNotification';
import ThemeSelector from './ThemeSelector';
import { useAuth } from '../hooks/useAuth';
import { useFirebaseQuests } from '../hooks/useFirebaseQuests';
import { ThemeProvider, useTheme } from '../utils/themes';

// Componente de formulário com tema
function ThemedTaskForm({ onSubmit }) {
  const { theme } = useTheme();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priority, setPriority] = React.useState('media');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority
    });

    setTitle('');
    setDescription('');
    setPriority('media');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Título da quest..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`
            w-full px-4 py-3 rounded-lg border transition-colors
            ${theme.border} ${theme.text}
            focus:ring-2 focus:ring-opacity-50 focus:border-opacity-50
            ${theme.id === 'dark' 
              ? 'bg-gray-700 border-gray-600 focus:ring-purple-400 focus:border-purple-400' 
              : 'bg-white focus:ring-purple-500 focus:border-purple-500'
            }
          `}
          required
        />
      </div>
      
      <div>
        <textarea
          placeholder="Descrição (opcional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className={`
            w-full px-4 py-3 rounded-lg border transition-colors resize-none
            ${theme.border} ${theme.text}
            focus:ring-2 focus:ring-opacity-50 focus:border-opacity-50
            ${theme.id === 'dark' 
              ? 'bg-gray-700 border-gray-600 focus:ring-purple-400 focus:border-purple-400' 
              : 'bg-white focus:ring-purple-500 focus:border-purple-500'
            }
          `}
        />
      </div>
      
      <div className="flex gap-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={`
            flex-1 px-4 py-3 rounded-lg border transition-colors
            ${theme.border} ${theme.text}
            focus:ring-2 focus:ring-opacity-50 focus:border-opacity-50
            ${theme.id === 'dark' 
              ? 'bg-gray-700 border-gray-600 focus:ring-purple-400 focus:border-purple-400' 
              : 'bg-white focus:ring-purple-500 focus:border-purple-500'
            }
          `}
        >
          <option value="baixa">🟢 Baixa (+10 XP)</option>
          <option value="media">🟡 Média (+25 XP)</option>
          <option value="alta">🔴 Alta (+50 XP)</option>
        </select>
        
        <button
          type="submit"
          className={`
            px-8 py-3 bg-gradient-to-r text-white rounded-lg font-medium 
            shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200
            ${theme.gradients.button} hover:${theme.gradients.buttonHover}
          `}
        >
          Criar Quest
        </button>
      </div>
    </form>
  );
}

// Componente de item de tarefa com tema
function ThemedTaskItem({ task, onComplete, onDelete }) {
  const { theme } = useTheme();
  
  const getPriorityColor = (priority) => {
    const colors = {
      alta: theme.id === 'dark' ? 'border-l-red-400 bg-red-900 bg-opacity-20' : 'border-l-red-500 bg-red-50',
      media: theme.id === 'dark' ? 'border-l-yellow-400 bg-yellow-900 bg-opacity-20' : 'border-l-yellow-500 bg-yellow-50',
      baixa: theme.id === 'dark' ? 'border-l-green-400 bg-green-900 bg-opacity-20' : 'border-l-green-500 bg-green-50'
    };
    return colors[priority] || colors.baixa;
  };

  const getPriorityEmoji = (priority) => {
    switch (priority) {
      case 'alta': return '🔴';
      case 'media': return '🟡';
      case 'baixa': return '🟢';
      default: return '⚪';
    }
  };

  const getXpForPriority = (priority) => {
    const xpMap = {
      'baixa': 10,
      'media': 25,
      'alta': 50
    };
    return xpMap[priority] || 25;
  };

  return (
    <div className={`
      border-l-4 p-4 rounded-lg transition-all duration-200 
      ${getPriorityColor(task.priority)} 
      ${task.completed ? 'opacity-60' : 'hover:shadow-md'}
    `}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span>{getPriorityEmoji(task.priority)}</span>
            <h3 className={`font-medium ${
              task.completed 
                ? `line-through ${theme.textSecondary}` 
                : theme.text
            }`}>
              {task.title}
            </h3>
            {task.completed && <span className="text-green-600">✅</span>}
          </div>
          
          {task.description && (
            <p className={`text-sm ${theme.textSecondary} ml-6 mb-2`}>
              {task.description}
            </p>
          )}
          
          <div className={`flex items-center gap-4 ml-6 text-xs ${theme.textSecondary}`}>
            <span className={`
              px-2 py-1 rounded-full font-medium
              ${theme.id === 'dark' ? 'bg-gray-700' : 'bg-white'}
            `}>
              +{getXpForPriority(task.priority)} XP
            </span>
            <span>{task.createdAt?.toLocaleDateString?.()}</span>
            {task.completed && task.completedAt && (
              <span className="text-green-600">
                ✓ {task.completedAt?.toLocaleDateString?.()}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 ml-4">
          {!task.completed && (
            <button
              onClick={() => onComplete(task.id)}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors shadow-sm hover:shadow-md"
            >
              Concluir
            </button>
          )}
          
          <button
            onClick={() => onDelete(task.id)}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors shadow-sm hover:shadow-md"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente principal da aplicação com temas
function ThemedMainApp() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const { 
    tasks, 
    playerData, 
    loading, 
    error, 
    addTask, 
    completeTask, 
    deleteTask 
  } = useFirebaseQuests(user?.uid);

  const [showAchievements, setShowAchievements] = useState(false);

  const handleNewAchievement = (achievement) => {
    console.log('🎉 Nova conquista desbloqueada:', achievement.name);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${theme.colors.background}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
               style={{ borderColor: theme.colors.primary }}></div>
          <p className={theme.textSecondary}>Carregando suas quests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${theme.colors.background}`}>
        <div className={`text-center p-6 ${theme.card} rounded-lg shadow-lg max-w-md`}>
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className={`text-xl font-bold text-red-600 mb-2`}>Erro de Conexão</h2>
          <p className={`${theme.textSecondary} mb-4`}>Não foi possível conectar ao Firebase</p>
          <button 
            onClick={() => window.location.reload()}
            className={`
              px-4 py-2 text-white rounded-lg transition-colors
              bg-gradient-to-r ${theme.gradients.button} hover:${theme.gradients.buttonHover}
            `}
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  const handleAddTask = (taskData) => {
    addTask({
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority || 'media',
      category: taskData.category || 'geral'
    });
  };

  const getAchievementEmoji = (achievement) => {
    const emojiMap = {
      'first-quest': '⭐',
      'task-master': '🏆',
      'consistency': '🔥',
      'veteran': '👑',
      'speed-runner': '⚡',
      'productive': '🔥',
      'machine': '🌟',
      'legend': '💎'
    };
    return emojiMap[achievement] || '🏅';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.colors.background}`}>
      {/* Header com tema */}
      <header className={`shadow-sm border-b ${theme.gradients.header} ${theme.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">🎮</span>
              <h1 className={`text-2xl font-bold ${theme.text}`}>Quest Tasks</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {user?.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'Usuário'}
                    className="w-8 h-8 rounded-full ring-2"
                    style={{ '--tw-ring-color': theme.colors.primary }}
                  />
                )}
                <div className="text-right hidden sm:block">
                  <p className={`text-sm font-medium ${theme.text}`}>
                    {user?.displayName || 'Usuário'}
                  </p>
                  <p className={`text-xs ${theme.textSecondary}`}>
                    {user?.email}
                  </p>
                </div>
              </div>
              
              {/* Seletor de Tema */}
              <ThemeSelector playerData={playerData} />
              
              <button
                onClick={() => setShowAchievements(!showAchievements)}
                className={`
                  text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-1
                  ${theme.id === 'dark' 
                    ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                🏆 <span className="hidden sm:inline">Conquistas</span>
              </button>
              
              <button
                onClick={logout}
                className={`
                  text-sm px-3 py-2 rounded-lg transition-colors
                  ${theme.id === 'dark' 
                    ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar do jogador com tema */}
          <div className="lg:col-span-1">
            <div className={`${theme.card} rounded-xl shadow-lg p-6`}>
              <div className="text-center mb-6">
                {user?.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName}
                    className="w-16 h-16 rounded-full mx-auto mb-3 ring-4"
                    style={{ '--tw-ring-color': `${theme.colors.primary}20` }}
                  />
                )}
                <h2 className={`text-lg font-bold ${theme.text}`}>
                  {user?.displayName?.split(' ')[0] || 'Jogador'}
                </h2>
                <p className={`text-sm ${theme.textSecondary}`}>Nível {playerData.level}</p>
              </div>
              
              {/* Barra de XP com tema */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-medium ${theme.textSecondary}`}>Experiência</span>
                  <span className={`text-sm font-bold`} style={{ color: theme.colors.primary }}>
                    {playerData.xp}/100 XP
                  </span>
                </div>
                
                <div className={`w-full rounded-full h-3 ${
                  theme.id === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <div 
                    className={`bg-gradient-to-r h-3 rounded-full transition-all duration-500 ${theme.gradients.xpBar}`}
                    style={{ width: `${playerData.xp}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats com tema */}
              <div className="space-y-4">
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme.id === 'dark' 
                    ? 'bg-orange-900 bg-opacity-20 border border-orange-800' 
                    : 'bg-gradient-to-r from-orange-50 to-red-50'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔥</span>
                    <span className={`text-sm font-medium ${theme.text}`}>Sequência</span>
                  </div>
                  <span className="text-lg font-bold text-orange-600">{playerData.streak}</span>
                </div>
                
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme.id === 'dark' 
                    ? 'bg-green-900 bg-opacity-20 border border-green-800' 
                    : 'bg-gradient-to-r from-green-50 to-emerald-50'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✅</span>
                    <span className={`text-sm font-medium ${theme.text}`}>Concluídas</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">{playerData.tasksCompleted}</span>
                </div>
                
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme.id === 'dark' 
                    ? 'bg-yellow-900 bg-opacity-20 border border-yellow-800' 
                    : 'bg-gradient-to-r from-yellow-50 to-amber-50'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏆</span>
                    <span className={`text-sm font-medium ${theme.text}`}>Conquistas</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-600">{playerData.achievements?.length || 0}</span>
                </div>
              </div>

              {/* Conquistas recentes */}
              {playerData.achievements?.length > 0 && (
                <div className="mt-6">
                  <h3 className={`text-sm font-medium ${theme.text} mb-3`}>🏅 Últimas Conquistas</h3>
                  <div className="flex flex-wrap gap-1">
                    {playerData.achievements.slice(-6).map(achievement => (
                      <span 
                        key={achievement}
                        className="text-lg"
                        title={achievement}
                      >
                        {getAchievementEmoji(achievement)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Área principal */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              
              {/* Panel de Conquistas */}
              {showAchievements && (
                <AchievementPanel playerData={playerData} tasks={tasks} />
              )}
              
              {/* Formulário nova tarefa */}
              <div className={`${theme.card} rounded-xl shadow-lg p-6`}>
                <h2 className={`text-lg font-bold ${theme.text} mb-4`}>➕ Nova Quest</h2>
                <ThemedTaskForm onSubmit={handleAddTask} />
              </div>

              {/* Lista de tarefas */}
              <div className={`${theme.card} rounded-xl shadow-lg p-6`}>
                <h2 className={`text-lg font-bold ${theme.text} mb-4`}>
                  📋 Suas Quests ({tasks.length})
                </h2>
                
                {tasks.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className={`text-lg font-medium ${theme.text} mb-2`}>
                      Nenhuma quest ainda
                    </h3>
                    <p className={theme.textSecondary}>
                      Que tal criar sua primeira quest e começar a ganhar XP?
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tasks.map(task => (
                      <ThemedTaskItem
                        key={task.id}
                        task={task}
                        onComplete={completeTask}
                        onDelete={deleteTask}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Notificações de Conquista */}
      <AchievementNotification 
        playerData={playerData} 
        tasks={tasks}
        onNewAchievement={handleNewAchievement}
      />
    </div>
  );
}

// App principal com ThemeProvider
function App() {
  const { user } = useAuth();
  const { playerData } = useFirebaseQuests(user?.uid);

  return (
    <AuthWrapper>
      <ThemeProvider playerData={playerData}>
        <ThemedMainApp />
      </ThemeProvider>
    </AuthWrapper>
  );
}

export default App;
              