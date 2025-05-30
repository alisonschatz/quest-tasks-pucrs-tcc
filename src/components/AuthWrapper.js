// src/components/AuthWrapper.js
import React from 'react';
import { useAuth } from '../hooks/useAuth';

function AuthWrapper({ children }) {
  const { user, loading, loginAnonymously } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Carregando Quest Tasks...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Quest Tasks</h1>
            <p className="text-gray-600">Transforme suas tarefas cotidianas em uma aventura épica!</p>
          </div>
          
          <button
            onClick={loginAnonymously}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            🚀 Começar Aventura
          </button>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">
              ✅ Seus dados serão salvos automaticamente na nuvem
            </p>
            <p className="text-xs text-gray-500">
              🔒 Login anônimo - sem necessidade de cadastro
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">TCC PUCRS 2025 - Alison Schatz</p>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

export default AuthWrapper;