// src/components/AuthWrapper.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function AuthWrapper({ children }) {
  const { user, loading, error, loginWithGoogle } = useAuth();
  const [isLogging, setIsLogging] = useState(false);

  // Loading inicial
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-6"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-purple-400 opacity-20 mx-auto"></div>
          </div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Quest Tasks
          </h2>
          <p className="text-lg text-gray-300 mb-2">Carregando sua aventura épica...</p>
          <div className="flex justify-center space-x-1 mt-4">
            <div className="animate-bounce w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="animate-bounce w-2 h-2 bg-purple-500 rounded-full delay-100"></div>
            <div className="animate-bounce w-2 h-2 bg-purple-500 rounded-full delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de login
  if (!user) {
    const handleGoogleLogin = async () => {
      try {
        setIsLogging(true);
        await loginWithGoogle();
      } catch (error) {
        console.error('Erro no login:', error);
        // Erro já é tratado no hook
      } finally {
        setIsLogging(false);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border border-white/20">
          {/* Header */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-4xl transform rotate-3 hover:rotate-0 transition-transform duration-300 mx-auto mb-6">
              🎮
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              Quest Tasks
            </h1>
            <p className="text-gray-300 text-lg mb-2">Level Up Your Life</p>
            <p className="text-gray-400 text-sm">
              Transforme suas tarefas cotidianas em uma aventura épica!
            </p>
          </div>

          {/* Botão de Login Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLogging}
            className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 py-4 px-6 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg mb-6 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLogging ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                <span>Conectando...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Entrar com Google</span>
              </>
            )}
          </button>

          {/* Erro */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 text-red-200 rounded-2xl text-sm backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-red-400">⚠️</span>
                <span className="font-semibold">Erro no Login</span>
              </div>
              <p>
                {error.code === 'auth/popup-closed-by-user'
                  ? 'Login cancelado pelo usuário'
                  : error.code === 'auth/popup-blocked'
                    ? 'Popup bloqueado. Permita popups para este site.'
                    : 'Erro no login. Tente novamente.'}
              </p>
            </div>
          )}

          {/* Features Preview */}
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center space-x-2">
              <span>✨</span>
              <span>Ao fazer login você terá:</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto">
                  ☁️
                </div>
                <p className="text-sm text-gray-300 font-medium">Dados Seguros na Nuvem</p>
              </div>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto">
                  📱
                </div>
                <p className="text-sm text-gray-300 font-medium">Multi-dispositivo</p>
              </div>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto">
                  🏆
                </div>
                <p className="text-sm text-gray-300 font-medium">Sistema de Conquistas</p>
              </div>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto">
                  📊
                </div>
                <p className="text-sm text-gray-300 font-medium">Relatórios Detalhados</p>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm mb-4">
            <span>🔒</span>
            <span>Login 100% seguro com Google</span>
          </div>

          {/* Footer */}
          <div className="text-center border-t border-white/10 pt-4">
            <p className="text-xs text-gray-500 mb-1">Quest Tasks - TCC PUCRS 2025</p>
            <p className="text-xs text-gray-600">Desenvolvido por Alison Schatz</p>
          </div>
        </div>
      </div>
    );
  }

  // Usuário logado - mostrar app
  return children;
}

export default AuthWrapper;
