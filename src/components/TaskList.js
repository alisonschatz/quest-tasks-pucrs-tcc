// src/components/TaskList.js
import React from 'react';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import { useTasks } from '../contexts/TaskContext';
import { CATEGORIES } from '../constants/categories';

const TaskList = ({ filterCategory, setFilterCategory, sortBy, setSortBy, onOpenAddTask }) => {
  const { getFilteredAndSortedTasks } = useTasks();
  const filteredTasks = getFilteredAndSortedTasks(filterCategory, sortBy);

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:border-purple-500 focus:outline-none transition-colors"
          >
            <option value="all">📋 Todas Categorias</option>
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:border-purple-500 focus:outline-none transition-colors"
          >
            <option value="priority">🎯 Por Prioridade</option>
            <option value="dueDate">📅 Por Prazo</option>
            <option value="xp">⭐ Por XP</option>
            <option value="category">📂 Por Categoria</option>
            <option value="createdAt">🕒 Mais Recentes</option>
          </select>

          <div className="text-sm text-gray-400">
            {filteredTasks.length} quest{filteredTasks.length !== 1 ? 's' : ''}
            {filterCategory !== 'all' && (
              <span className="ml-1">• {CATEGORIES.find(c => c.id === filterCategory)?.name}</span>
            )}
          </div>
        </div>

        <button
          onClick={onOpenAddTask}
          className="group bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Nova Quest</span>
        </button>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
          Suas Quests{' '}
          {filterCategory !== 'all'
            ? `- ${CATEGORIES.find(c => c.id === filterCategory)?.name}`
            : 'Ativas'}
        </h2>
        {filteredTasks.length > 0 && (
          <p className="text-gray-400 text-sm">
            {filteredTasks.filter(t => !t.completed).length} pendentes •{' '}
            {filteredTasks.filter(t => t.completed).length} concluídas
          </p>
        )}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <EmptyState
            filterCategory={filterCategory}
            onOpenAddTask={onOpenAddTask}
            onClearFilter={() => setFilterCategory('all')}
          />
        ) : (
          filteredTasks.map(task => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};

const EmptyState = ({ filterCategory, onOpenAddTask, onClearFilter }) => {
  const isFiltered = filterCategory !== 'all';
  const categoryData = CATEGORIES.find(c => c.id === filterCategory);

  return (
    <div className="text-center py-16">
      <div className="text-8xl mb-6">{isFiltered ? categoryData?.icon || '📋' : '🎯'}</div>

      <h3 className="text-2xl font-bold mb-2 text-gray-300">
        {isFiltered
          ? `Nenhuma quest em ${categoryData?.name || 'categoria'}`
          : 'Nenhuma quest ainda'}
      </h3>

      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        {isFiltered
          ? `Você ainda não tem quests na categoria ${categoryData?.name || 'selecionada'}. Que tal criar uma agora?`
          : 'Sua jornada épica está prestes a começar! Crie sua primeira quest e ganhe XP.'}
      </p>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onOpenAddTask}
          className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>{isFiltered ? 'Criar Quest Nesta Categoria' : 'Criar Primeira Quest'}</span>
        </button>

        {isFiltered && (
          <button
            onClick={onClearFilter}
            className="bg-white/10 hover:bg-white/20 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/30"
          >
            Ver Todas as Quests
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskList;
