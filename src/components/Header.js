// src/components/Header.js
import React from 'react';
import { Flame, LogOut } from 'lucide-react';

const Header = ({ user, playerData, onOpenProfile, onLogout }) => {
  const getXpPercentage = () => {
    return ((playerData.xp || 0) / 100) * 100;
  };

  return (
    <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              🎮
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Quest Tasks
              </h1>
              <p className="text-xs text-gray-400">Level Up Your Life</p>
            </div>
          </div>

          {/* Player Stats */}
          <div className="flex items-center space-x-6">
            {/* Level & XP */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-sm text-black">
                {playerData.level || 1}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold">{playerData.xp || 0}/100 XP</div>
                <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                    style={{ width: `${getXpPercentage()}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Streak */}
            <div className="flex items-center space-x-2 bg-orange-500/20 px-3 py-2 rounded-lg border border-orange-500/30">
              <Flame size={16} className="text-orange-400" />
              <span className="font-bold text-orange-400">{playerData.streak || 0}</span>
            </div>

            {/* Profile Button */}
            <button
              onClick={onOpenProfile}
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-lg hover:scale-110 transition-transform duration-200"
              title={`${user?.displayName || 'Usuário'} - ${playerData.title || 'Aventureiro'}`}
            >
              {playerData.avatar || '🦸‍♂️'}
            </button>

            {/* Quick Actions - Desktop only */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={onLogout}
                className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-gray-300 transition-colors"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
