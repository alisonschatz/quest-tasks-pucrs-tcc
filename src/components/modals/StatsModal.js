// src/components/modals/StatsModal.js
import React, { useMemo } from 'react';
import { X, TrendingUp, Calendar, Clock, Target, Award, BarChart3, PieChart } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';
import { CATEGORIES } from '../../constants/categories';

const StatsModal = ({ show, onClose, tasks, playerData }) => {
  const { getTaskStats, getCategoryStats, isOverdue, getDaysUntilDue } = useTasks();

  const stats = useMemo(() => {
    if (!tasks || tasks.length === 0) return null;

    const now = new Date();
    const today = now.toDateString();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Basic stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const overdueTasks = tasks.filter(t => !t.completed && isOverdue(t.dueDate)).length;

    // Time-based stats
    const todayCompleted = tasks.filter(
      t => t.completed && t.completedAt?.toDate?.()?.toDateString() === today
    ).length;

    const weekCompleted = tasks.filter(
      t => t.completed && t.completedAt?.toDate?.() >= weekAgo
    ).length;

    const monthCompleted = tasks.filter(
      t => t.completed && t.completedAt?.toDate?.() >= monthAgo
    ).length;

    // Priority distribution
    const priorityStats = {
      alta: tasks.filter(t => t.priority === 'alta').length,
      media: tasks.filter(t => t.priority === 'media').length,
      baixa: tasks.filter(t => t.priority === 'baixa').length,
    };

    const priorityCompleted = {
      alta: tasks.filter(t => t.completed && t.priority === 'alta').length,
      media: tasks.filter(t => t.completed && t.priority === 'media').length,
      baixa: tasks.filter(t => t.completed && t.priority === 'baixa').length,
    };

    // Category stats
    const categoryStats = CATEGORIES.map(category => {
      const categoryTasks = tasks.filter(t => t.category === category.id);
      const categoryCompleted = categoryTasks.filter(t => t.completed).length;
      return {
        ...category,
        total: categoryTasks.length,
        completed: categoryCompleted,
        pending: categoryTasks.length - categoryCompleted,
        completionRate:
          categoryTasks.length > 0
            ? Math.round((categoryCompleted / categoryTasks.length) * 100)
            : 0,
      };
    });

    // XP and productivity
    const totalXpEarned = tasks.filter(t => t.completed).reduce((sum, t) => sum + (t.xp || 0), 0);

    const avgTasksPerDay = weekCompleted / 7;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Time estimates
    const totalTimeSpent = tasks
      .filter(t => t.completed)
      .reduce((sum, t) => sum + (t.timeEstimate || 30), 0);

    const avgTimePerTask = completedTasks > 0 ? Math.round(totalTimeSpent / completedTasks) : 0;

    // Streak analysis
    const streakHistory = calculateStreakHistory(tasks);

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      todayCompleted,
      weekCompleted,
      monthCompleted,
      priorityStats,
      priorityCompleted,
      categoryStats,
      totalXpEarned,
      avgTasksPerDay,
      completionRate,
      totalTimeSpent,
      avgTimePerTask,
      streakHistory,
    };
  }, [tasks, isOverdue]);

  if (!show) return null;

  if (!stats) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
        <div className="bg-slate-800 rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl text-center">
          <BarChart3 size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Sem Dados Suficientes</h3>
          <p className="text-gray-400 mb-6">
            Crie algumas tarefas para ver suas estatísticas detalhadas!
          </p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Entendido
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-slate-800 rounded-3xl p-8 max-w-6xl w-full max-h-[85vh] overflow-y-auto border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-3xl font-bold flex items-center space-x-3">
              <BarChart3 className="text-blue-400" size={32} />
              <span>Estatísticas Detalhadas</span>
            </h3>
            <p className="text-gray-400 mt-2">Análise completa da sua produtividade</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Overview Stats */}
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
              <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center space-x-2">
                <TrendingUp size={20} />
                <span>Performance Geral</span>
              </h4>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{stats.completionRate}%</div>
                  <div className="text-sm text-blue-300">Taxa de Conclusão</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">{stats.totalXpEarned}</div>
                  <div className="text-sm text-purple-300">XP Total Ganho</div>
                </div>
              </div>

              <div className="w-full bg-blue-900/30 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${stats.completionRate}%` }}
                />
              </div>
              <div className="text-xs text-blue-300 text-center">
                {stats.completedTasks} de {stats.totalTasks} quests concluídas
              </div>
            </div>

            {/* Time-based Analysis */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
              <h4 className="text-xl font-semibold text-green-300 mb-4 flex items-center space-x-2">
                <Calendar size={20} />
                <span>Análise Temporal</span>
              </h4>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-500/20 rounded-xl">
                  <div className="text-2xl font-bold text-green-400">{stats.todayCompleted}</div>
                  <div className="text-xs text-green-300">Hoje</div>
                </div>
                <div className="text-center p-3 bg-green-500/20 rounded-xl">
                  <div className="text-2xl font-bold text-green-400">{stats.weekCompleted}</div>
                  <div className="text-xs text-green-300">Esta Semana</div>
                </div>
                <div className="text-center p-3 bg-green-500/20 rounded-xl">
                  <div className="text-2xl font-bold text-green-400">{stats.monthCompleted}</div>
                  <div className="text-xs text-green-300">Este Mês</div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-900/30 rounded-xl">
                <div className="text-sm text-green-300 mb-1">Média Diária (7 dias)</div>
                <div className="text-lg font-bold text-green-400">
                  {stats.avgTasksPerDay.toFixed(1)} quests/dia
                </div>
              </div>
            </div>

            {/* Priority Distribution */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Target size={20} />
                <span>Distribuição por Prioridade</span>
              </h4>

              <div className="space-y-3">
                {[
                  {
                    key: 'alta',
                    name: 'Alta',
                    color: 'from-red-500 to-pink-500',
                    textColor: 'text-red-400',
                  },
                  {
                    key: 'media',
                    name: 'Média',
                    color: 'from-yellow-500 to-orange-500',
                    textColor: 'text-yellow-400',
                  },
                  {
                    key: 'baixa',
                    name: 'Baixa',
                    color: 'from-green-500 to-emerald-500',
                    textColor: 'text-green-400',
                  },
                ].map(priority => (
                  <div key={priority.key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${priority.color}`} />
                      <span className="text-gray-300">{priority.name}</span>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${priority.textColor}`}>
                        {stats.priorityCompleted[priority.key]}/{stats.priorityStats[priority.key]}
                      </div>
                      <div className="text-xs text-gray-400">
                        {stats.priorityStats[priority.key] > 0
                          ? Math.round(
                              (stats.priorityCompleted[priority.key] /
                                stats.priorityStats[priority.key]) *
                                100
                            )
                          : 0}
                        %
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Category & Time Analysis */}
          <div className="space-y-6">
            {/* Category Performance */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <PieChart size={20} />
                <span>Performance por Categoria</span>
              </h4>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {stats.categoryStats
                  .filter(cat => cat.total > 0)
                  .sort((a, b) => b.completionRate - a.completionRate)
                  .map(category => (
                    <div key={category.id} className="bg-black/20 p-3 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{category.icon}</span>
                          <span className="font-medium text-gray-300">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-white">
                            {category.completed}/{category.total}
                          </div>
                          <div className="text-xs text-gray-400">{category.completionRate}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${category.completionRate}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Time Analysis */}
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-500/30">
              <h4 className="text-xl font-semibold text-orange-300 mb-4 flex items-center space-x-2">
                <Clock size={20} />
                <span>Análise de Tempo</span>
              </h4>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-orange-500/20 rounded-xl">
                  <div className="text-2xl font-bold text-orange-400">
                    {Math.floor(stats.totalTimeSpent / 60)}h {stats.totalTimeSpent % 60}m
                  </div>
                  <div className="text-xs text-orange-300">Tempo Total</div>
                </div>
                <div className="text-center p-3 bg-orange-500/20 rounded-xl">
                  <div className="text-2xl font-bold text-orange-400">{stats.avgTimePerTask}m</div>
                  <div className="text-xs text-orange-300">Média/Quest</div>
                </div>
              </div>

              <div className="p-3 bg-orange-900/30 rounded-xl">
                <div className="text-sm text-orange-300 mb-1">Produtividade</div>
                <div className="text-lg font-bold text-orange-400">
                  {stats.completedTasks > 0
                    ? (stats.totalXpEarned / (stats.totalTimeSpent / 60)).toFixed(1)
                    : 0}{' '}
                  XP/hora
                </div>
              </div>
            </div>

            {/* Player Progress */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
              <h4 className="text-xl font-semibold text-purple-300 mb-4 flex items-center space-x-2">
                <Award size={20} />
                <span>Progresso do Jogador</span>
              </h4>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-purple-200">Nível Atual</span>
                  <span className="text-2xl font-bold text-purple-400">
                    {playerData.level || 1}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-purple-200">Título</span>
                  <span className="text-lg font-semibold text-pink-400">
                    {playerData.title || 'Aventureiro'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-purple-200">Streak Atual</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-400">🔥</span>
                    <span className="text-xl font-bold text-orange-400">
                      {playerData.streak || 0}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-purple-200">Conquistas</span>
                  <span className="text-lg font-bold text-yellow-400">
                    {playerData.achievements?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="mt-8 p-6 bg-gradient-to-r from-gray-500/20 to-slate-500/20 rounded-2xl border border-gray-500/30">
          <h4 className="text-lg font-semibold text-white mb-3">📊 Resumo Geral</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">{stats.pendingTasks}</div>
              <div className="text-sm text-gray-400">Pendentes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">{stats.overdueTasks}</div>
              <div className="text-sm text-gray-400">Atrasadas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">
                {Math.floor((stats.totalTimeSpent || 0) / 60)}h
              </div>
              <div className="text-sm text-gray-400">Investidas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{playerData.totalXp || 0}</div>
              <div className="text-sm text-gray-400">XP Total</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate streak history
const calculateStreakHistory = tasks => {
  // This would calculate historical streak data
  // For now, return a simple structure
  return {
    current: 0,
    longest: 0,
    thisWeek: 0,
    thisMonth: 0,
  };
};

export default StatsModal;
