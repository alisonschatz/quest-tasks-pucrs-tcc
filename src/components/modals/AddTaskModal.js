// src/components/modals/AddTaskModal.js
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';
import { CATEGORIES } from '../../constants/categories';

const AddTaskModal = ({ show, onClose }) => {
  const { addTask } = useTasks();

  // Form states
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('geral');
  const [selectedPriority, setSelectedPriority] = useState('media');
  const [selectedDueDate, setSelectedDueDate] = useState('');
  const [selectedTimeEstimate, setSelectedTimeEstimate] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form
  const resetForm = () => {
    setNewTaskTitle('');
    setNewTaskDescription('');
    setSelectedCategory('geral');
    setSelectedPriority('media');
    setSelectedDueDate('');
    setSelectedTimeEstimate(30);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!newTaskTitle.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const taskData = {
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim(),
        category: selectedCategory,
        priority: selectedPriority,
        dueDate: selectedDueDate || null,
        timeEstimate: selectedTimeEstimate,
      };

      await addTask(taskData);
      handleClose();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getPriorityData = () => [
    {
      id: 'baixa',
      name: 'Fácil',
      color: 'from-green-400 to-emerald-500',
      xp: 15,
      desc: 'Rápida e simples',
    },
    {
      id: 'media',
      name: 'Médio',
      color: 'from-yellow-400 to-orange-500',
      xp: 30,
      desc: 'Esforço moderado',
    },
    {
      id: 'alta',
      name: 'Difícil',
      color: 'from-red-400 to-pink-500',
      xp: 50,
      desc: 'Desafio complexo',
    },
  ];

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-slate-800 rounded-3xl p-8 max-w-2xl w-full border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold flex items-center space-x-2">
              <span>✨</span>
              <span>Nova Quest</span>
            </h3>
            <p className="text-gray-400 text-sm mt-1">Crie uma nova aventura épica</p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-gray-300 transition-colors"
            disabled={isSubmitting}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Título da Quest *
            </label>
            <input
              type="text"
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="O que você quer conquistar hoje?"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
              required
              disabled={isSubmitting}
              maxLength={100}
            />
            <div className="text-xs text-gray-500 mt-1">{newTaskTitle.length}/100 caracteres</div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descrição (opcional)
            </label>
            <textarea
              value={newTaskDescription}
              onChange={e => setNewTaskDescription(e.target.value)}
              placeholder="Adicione mais detalhes sobre sua quest..."
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors resize-none"
              disabled={isSubmitting}
              maxLength={500}
            />
            <div className="text-xs text-gray-500 mt-1">
              {newTaskDescription.length}/500 caracteres
            </div>
          </div>

          {/* Due Date and Time Estimate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Prazo (opcional)
              </label>
              <input
                type="date"
                value={selectedDueDate}
                onChange={e => setSelectedDueDate(e.target.value)}
                min={getMinDate()}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tempo estimado</label>
              <select
                value={selectedTimeEstimate}
                onChange={e => setSelectedTimeEstimate(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
                disabled={isSubmitting}
              >
                <option value={15}>15 minutos</option>
                <option value={30}>30 minutos</option>
                <option value={45}>45 minutos</option>
                <option value={60}>1 hora</option>
                <option value={90}>1h 30min</option>
                <option value={120}>2 horas</option>
                <option value={180}>3 horas</option>
                <option value={240}>4+ horas</option>
              </select>
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Categoria</label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  disabled={isSubmitting}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-white/20 hover:border-white/40'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="text-2xl mb-1">{category.icon}</div>
                  <div className="text-xs font-medium">{category.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Priority Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Dificuldade</label>
            <div className="grid grid-cols-3 gap-2">
              {getPriorityData().map(priority => (
                <button
                  key={priority.id}
                  type="button"
                  onClick={() => setSelectedPriority(priority.id)}
                  disabled={isSubmitting}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedPriority === priority.id
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-white/20 hover:border-white/40'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div
                    className={`w-full h-2 rounded-full bg-gradient-to-r ${priority.color} mb-2`}
                  ></div>
                  <div className="text-sm font-medium">{priority.name}</div>
                  <div className="text-xs text-gray-400 mb-1">+{priority.xp} XP</div>
                  <div className="text-xs text-gray-500">{priority.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!newTaskTitle.trim() || isSubmitting}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Criando Quest...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Criar Quest Épica</span>
              </>
            )}
          </button>

          {/* Keyboard Shortcut Hint */}
          <div className="text-center text-xs text-gray-500">
            💡 Dica: Use Ctrl + Enter para criar rapidamente
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
