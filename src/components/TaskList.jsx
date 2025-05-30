import React, { useState } from 'react';
import { Plus, Target } from 'lucide-react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onAddTask, onCompleteTask, onRemoveTask, onChangePriority }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(newTask.trim());
      setNewTask('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="lg:col-span-2">
      {/* Adicionar nova tarefa */}
      <div className="card mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Nova Quest</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua nova tarefa..."
            className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleAddTask}
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
              <TaskItem
                key={task.id}
                task={task}
                onComplete={onCompleteTask}
                onRemove={onRemoveTask}
                onChangePriority={onChangePriority}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;