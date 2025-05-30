// src/App.js
import React from 'react';
import AuthWrapper from './components/AuthWrapper';
import { useAuth } from './hooks/useAuth';
import { useFirebaseQuests } from './hooks/useFirebaseQuests';

// Componente principal da aplicação
function MainApp() {
  const { user, logout } = useAuth();
  const { 
    tasks, 
    playerData, 
    loading, 
    error, 
    addTask, 
    completeTask, 
    deleteTask 
  } = useFirebaseQuests(user?.uid);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando suas quests...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Erro de Conexão</h2>
          <p className="text-gray-600 mb-4">Não foi possível conectar ao Firebase</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  // Função para adicionar tarefa (exemplo)
  const handleAddTask = (taskData) => {
    addTask({
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority || 'media',
      category: taskData.category || 'geral'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">🎮</span>
              <h1 className="text-2xl font-bold text-gray-900">Quest Tasks</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                ID: {user?.uid?.slice(0, 8)}...
              </div>
              <button
                onClick={logout}
                className="text-gray-500 hover:text-gray-700 text-sm bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Stats do Jogador */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">⚡ Seu Progresso</h2>
              
              {/* Nível */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Nível</span>
                  <span className="text-2xl font-bold text-purple-600">{playerData.level}</span>
                </div>
                
                {/* Barra de XP */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${playerData.xp}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{playerData.xp}/100 XP</p>
              </div>

              {/* Estatísticas */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">🔥 Sequência</span>
                  <span className="font-semibold">{playerData.streak} dias</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">✅ Concluídas</span>
                  <span className="font-semibold">{playerData.tasksCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">🏆 Conquistas</span>
                  <span className="font-semibold">{playerData.achievements?.length || 0}</span>
                </div>
              </div>

              {/* Conquistas */}
              {playerData.achievements?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">🏅 Conquistas</h3>
                  <div className="flex flex-wrap gap-1">
                    {playerData.achievements.map(achievement => (
                      <span 
                        key={achievement}
                        className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full"
                      >
                        {getAchievementEmoji(achievement)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lista de Tarefas */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              
              {/* Formulário para Adicionar Tarefa */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">➕ Nova Quest</h2>
                <TaskForm onSubmit={handleAddTask} />
              </div>

              {/* Lista de Tarefas */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">📋 Suas Quests</h2>
                
                {tasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">🎯</div>
                    <p>Nenhuma quest ainda. Que tal criar sua primeira?</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tasks.map(task => (
                      <TaskItem
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
    </div>
  );
}

// Componente para formulário de tarefa
function TaskForm({ onSubmit }) {
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          required
        />
      </div>
      
      <div className="flex gap-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="baixa">🟢 Baixa (+10 XP)</option>
          <option value="media">🟡 Média (+25 XP)</option>
          <option value="alta">🔴 Alta (+50 XP)</option>
        </select>
        
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium"
        >
          Criar Quest
        </button>
      </div>
    </form>
  );
}

// Componente para item de tarefa
function TaskItem({ task, onComplete, onDelete }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta': return 'border-l-red-500 bg-red-50';
      case 'media': return 'border-l-yellow-500 bg-yellow-50';
      case 'baixa': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getPriorityEmoji = (priority) => {
    switch (priority) {
      case 'alta': return '🔴';
      case 'media': return '🟡';
      case 'baixa': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className={`border-l-4 p-4 rounded-lg ${getPriorityColor(task.priority)} ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span>{getPriorityEmoji(task.priority)}</span>
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            {task.completed && <span className="text-green-600">✅</span>}
          </div>
          
          {task.description && (
            <p className="text-sm text-gray-600 ml-6">{task.description}</p>
          )}
          
          <div className="flex items-center gap-4 mt-2 ml-6 text-xs text-gray-500">
            <span>+{getXpForPriority(task.priority)} XP</span>
            <span>{task.createdAt?.toLocaleDateString?.()}</span>
          </div>
        </div>
        
        <div className="flex gap-2 ml-4">
          {!task.completed && (
            <button
              onClick={() => onComplete(task.id)}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              Concluir
            </button>
          )}
          
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

// Funções auxiliares
function getXpForPriority(priority) {
  const xpMap = {
    'baixa': 10,
    'media': 25,
    'alta': 50
  };
  return xpMap[priority] || 25;
}

function getAchievementEmoji(achievement) {
  const emojiMap = {
    'first-quest': '⭐',
    'task-master': '🏆',
    'consistency': '🔥',
    'veteran': '👑'
  };
  return emojiMap[achievement] || '🏅';
}

// Componente principal do App
function App() {
  return (
    <AuthWrapper>
      <MainApp />
    </AuthWrapper>
  );
}

export default App;