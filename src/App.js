import React from 'react';
import AuthWrapper from './components/AuthWrapper';
import { useAuth } from './hooks/useAuth';

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

  // Função para adicionar tarefa
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
      {/* Header com informações do usuário Google */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">🎮</span>
              <h1 className="text-2xl font-bold text-gray-900">Quest Tasks</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Info do usuário Google */}
              <div className="flex items-center space-x-3">
                {user?.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'Usuário'}
                    className="w-8 h-8 rounded-full ring-2 ring-purple-200"
                  />
                )}
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.displayName || 'Usuário'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email}
                  </p>
                </div>
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
              {/* Cabeçalho com foto do usuário */}
              <div className="text-center mb-6">
                {user?.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName}
                    className="w-16 h-16 rounded-full mx-auto mb-3 ring-4 ring-purple-100"
                  />
                )}
                <h2 className="text-lg font-bold text-gray-800">
                  {user?.displayName?.split(' ')[0] || 'Jogador'}
                </h2>
                <p className="text-sm text-gray-500">Nível {playerData.level}</p>
              </div>
              
              {/* Barra de XP */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Experiência</span>
                  <span className="text-sm font-bold text-purple-600">
                    {playerData.xp}/100 XP
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${playerData.xp}%` }}
                  ></div>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔥</span>
                    <span className="text-sm font-medium text-gray-700">Sequência</span>
                  </div>
                  <span className="text-lg font-bold text-orange-600">{playerData.streak}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✅</span>
                    <span className="text-sm font-medium text-gray-700">Concluídas</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">{playerData.tasksCompleted}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏆</span>
                    <span className="text-sm font-medium text-gray-700">Conquistas</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-600">{playerData.achievements?.length || 0}</span>
                </div>
              </div>

              {/* Conquistas */}
              {playerData.achievements?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">🏅 Suas Conquistas</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {playerData.achievements.map(achievement => (
                      <div 
                        key={achievement}
                        className="bg-gradient-to-r from-yellow-100 to-orange-100 p-2 rounded-lg text-center"
                      >
                        <div className="text-lg mb-1">{getAchievementEmoji(achievement)}</div>
                        <div className="text-xs font-medium text-gray-700">
                          {getAchievementName(achievement)}
                        </div>
                      </div>
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
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  📋 Suas Quests ({tasks.length})
                </h2>
                
                {tasks.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      Nenhuma quest ainda
                    </h3>
                    <p className="text-gray-500">
                      Que tal criar sua primeira quest e começar a ganhar XP?
                    </p>
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
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          required
        />
      </div>
      
      <div>
        <textarea
          placeholder="Descrição (opcional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
        />
      </div>
      
      <div className="flex gap-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
        >
          <option value="baixa">🟢 Baixa (+10 XP)</option>
          <option value="media">🟡 Média (+25 XP)</option>
          <option value="alta">🔴 Alta (+50 XP)</option>
        </select>
        
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
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
    <div className={`border-l-4 p-4 rounded-lg transition-all duration-200 ${getPriorityColor(task.priority)} ${task.completed ? 'opacity-60' : 'hover:shadow-md'}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span>{getPriorityEmoji(task.priority)}</span>
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            {task.completed && <span className="text-green-600">✅</span>}
          </div>
          
          {task.description && (
            <p className="text-sm text-gray-600 ml-6 mb-2">{task.description}</p>
          )}
          
          <div className="flex items-center gap-4 ml-6 text-xs text-gray-500">
            <span className="bg-white px-2 py-1 rounded-full font-medium">
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

function getAchievementName(achievement) {
  const nameMap = {
    'first-quest': 'Primeira Quest',
    'task-master': 'Mestre',
    'consistency': 'Consistente',
    'veteran': 'Veterano'
  };
  return nameMap[achievement] || 'Conquista';
}

export default MainApp;