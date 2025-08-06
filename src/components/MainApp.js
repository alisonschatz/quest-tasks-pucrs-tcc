// src/components/MainApp.js
import React, { useState } from 'react';
import { Plus, Flame, Trophy, Zap, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TaskContext';
import { useNotifications } from '../hooks/useNotifications';
import Header from './Header';
import TaskList from './TaskList';
import Sidebar from './Sidebar';
import AddTaskModal from './modals/AddTaskModal';
import AchievementsModal from './modals/AchievementsModal';
import StatsModal from './modals/StatsModal';
import ProfileModal from './modals/ProfileModal';
import SettingsModal from './modals/SettingsModal';

const MainApp = () => {
  const { user, logout } = useAuth();
  const { tasks, playerData, loading, error } = useTasks();
  const { showNotification } = useNotifications();

  // Modal states
  const [showAddTask, setShowAddTask] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Filter states
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Carregando Quest Tasks...</p>
          <p className="text-sm text-gray-400 mt-2">Preparando sua aventura épica</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white p-8 bg-red-500/20 rounded-2xl border border-red-500/30 max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2 text-red-300">Erro de Conexão</h2>
          <p className="text-gray-300 mb-4">Não foi possível conectar com o servidor</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <Header
          user={user}
          playerData={playerData}
          onOpenProfile={() => setShowProfile(true)}
          onLogout={logout}
        />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tasks Section - 2/3 */}
            <div className="lg:col-span-2">
              <TaskList
                tasks={tasks}
                playerData={playerData}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onOpenAddTask={() => setShowAddTask(true)}
              />
            </div>

            {/* Sidebar - 1/3 */}
            <div className="lg:col-span-1">
              <Sidebar
                user={user}
                playerData={playerData}
                tasks={tasks}
                onOpenAchievements={() => setShowAchievements(true)}
                onOpenStats={() => setShowStats(true)}
                onOpenSettings={() => setShowSettings(true)}
              />
            </div>
          </div>
        </main>

        {/* Modals */}
        <AddTaskModal show={showAddTask} onClose={() => setShowAddTask(false)} />

        <AchievementsModal
          show={showAchievements}
          onClose={() => setShowAchievements(false)}
          playerData={playerData}
        />

        <StatsModal
          show={showStats}
          onClose={() => setShowStats(false)}
          tasks={tasks}
          playerData={playerData}
        />

        <ProfileModal
          show={showProfile}
          onClose={() => setShowProfile(false)}
          user={user}
          playerData={playerData}
          onOpenSettings={() => {
            setShowProfile(false);
            setShowSettings(true);
          }}
          onLogout={logout}
        />

        <SettingsModal show={showSettings} onClose={() => setShowSettings(false)} />
      </div>
    </div>
  );
};

export default MainApp;
