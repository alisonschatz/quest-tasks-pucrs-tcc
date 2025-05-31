// src/components/ThemeSelector.js
import React, { useState } from 'react';
import { useThemes, useTheme } from '../utils/themes';

function ThemeSelector({ playerData }) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, currentTheme, changeTheme } = useTheme();
  const { 
    getAvailableThemes, 
    getLockedThemes, 
    getNextThemeToUnlock 
  } = useThemes(playerData);

  const availableThemes = getAvailableThemes();
  const lockedThemes = getLockedThemes();
  const nextTheme = getNextThemeToUnlock();

  return (
    <div className="relative">
      {/* Botão para abrir seletor */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${theme.id === 'dark' 
            ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }
          flex items-center gap-2
        `}
      >
        <span className="text-lg">{theme.icon}</span>
        <span className="hidden sm:inline">Temas</span>
      </button>

      {/* Modal/Dropdown do seletor */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-4 z-50 flex items-center justify-center">
            <div className={`
              bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden
              ${theme.id === 'dark' ? 'bg-gray-800' : 'bg-white'}
            `}>
              {/* Header */}
              <div className={`
                p-6 border-b
                ${theme.id === 'dark' 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-gray-50 border-gray-200'
                }
              `}>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className={`text-xl font-bold ${
                      theme.id === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      🎨 Personalizar Tema
                    </h2>
                    <p className={`text-sm mt-1 ${
                      theme.id === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {availableThemes.length} de {availableThemes.length + lockedThemes.length} temas desbloqueados
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`
                      text-2xl transition-colors w-8 h-8 flex items-center justify-center
                      ${theme.id === 'dark' 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-500 hover:text-gray-900'
                      }
                    `}
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Conteúdo */}
              <div className={`
                p-6 overflow-y-auto max-h-96
                ${theme.id === 'dark' ? 'bg-gray-800' : 'bg-white'}
              `}>
                
                {/* Temas Disponíveis */}
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme.id === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    ✨ Temas Disponíveis
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableThemes.map(themeOption => (
                      <ThemeCard
                        key={themeOption.id}
                        theme={themeOption}
                        isSelected={currentTheme === themeOption.id}
                        isUnlocked={true}
                        onSelect={() => {
                          changeTheme(themeOption.id);
                          setIsOpen(false);
                        }}
                        currentTheme={theme}
                      />
                    ))}
                  </div>
                </div>

                {/* Temas Bloqueados */}
                {lockedThemes.length > 0 && (
                  <div>
                    <h3 className={`text-lg font-semibold mb-4 ${
                      theme.id === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      🔒 Temas Bloqueados
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {lockedThemes.map(themeOption => (
                        <ThemeCard
                          key={themeOption.id}
                          theme={themeOption}
                          isSelected={false}
                          isUnlocked={false}
                          onSelect={() => {}}
                          currentTheme={theme}
                          playerLevel={playerData.level}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Próximo tema */}
                {nextTheme && (
                  <div className={`
                    mt-6 p-4 rounded-lg border-2 border-dashed
                    ${theme.id === 'dark' 
                      ? 'border-gray-600 bg-gray-700' 
                      : 'border-gray-300 bg-gray-50'
                    }
                  `}>
                    <h4 className={`font-medium mb-2 ${
                      theme.id === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      🎯 Próximo tema para desbloquear:
                    </h4>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{nextTheme.icon}</span>
                      <div>
                        <p className={`font-medium ${
                          theme.id === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {nextTheme.name}
                        </p>
                        <p className={`text-sm ${
                          theme.id === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {nextTheme.unlockCondition 
                            ? `Desbloqueie a conquista "${nextTheme.unlockCondition}"`
                            : `Alcance o nível ${nextTheme.unlockLevel}`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ThemeCard({ theme, isSelected, isUnlocked, onSelect, currentTheme, playerLevel }) {
  const getUnlockText = () => {
    if (theme.unlockCondition) {
      return `Conquista: ${theme.unlockCondition}`;
    }
    return `Nível ${theme.unlockLevel}`;
  };

  const getProgressText = () => {
    if (theme.unlockCondition) {
      return `Desbloqueie a conquista "${theme.unlockCondition}"`;
    }
    return `${playerLevel}/${theme.unlockLevel}`;
  };

  return (
    <div 
      className={`
        relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
        ${currentTheme.id === 'dark' ? 'bg-gray-700' : 'bg-white'}
        ${isUnlocked 
          ? isSelected 
            ? 'border-blue-500 shadow-lg transform scale-105 bg-blue-50'
            : `border-gray-200 hover:border-gray-300 hover:shadow-md ${
                currentTheme.id === 'dark' 
                  ? 'border-gray-600 hover:border-gray-500' 
                  : 'border-gray-200 hover:border-gray-300'
              }`
          : `opacity-60 cursor-not-allowed ${
              currentTheme.id === 'dark' 
                ? 'border-gray-600' 
                : 'border-gray-200'
            }`
        }
        ${!isUnlocked ? 'filter grayscale' : ''}
      `}
      onClick={isUnlocked ? onSelect : undefined}
    >
      {/* Ícone do tema */}
      <div className="text-center mb-3">
        <div className={`text-3xl mb-2 ${!isUnlocked ? 'grayscale' : ''}`}>
          {theme.icon}
        </div>
        <h4 className={`font-semibold ${
          isUnlocked 
            ? (currentTheme.id === 'dark' ? 'text-white' : 'text-gray-900')
            : 'text-gray-400'
        }`}>
          {theme.name}
        </h4>
      </div>

      {/* Preview das cores do tema */}
      <div className="flex justify-center gap-1 mb-3">
        <div 
          className="w-4 h-4 rounded-full border border-gray-200"
          style={{ backgroundColor: theme.colors.primary }}
        />
        <div 
          className="w-4 h-4 rounded-full border border-gray-200"
          style={{ backgroundColor: theme.colors.secondary }}
        />
        <div 
          className="w-4 h-4 rounded-full border border-gray-200"
          style={{ backgroundColor: theme.colors.success }}
        />
      </div>

      {/* Descrição */}
      <p className={`text-xs text-center mb-3 ${
        isUnlocked 
          ? (currentTheme.id === 'dark' ? 'text-gray-300' : 'text-gray-600')
          : 'text-gray-400'
      }`}>
        {theme.description}
      </p>

      {/* Status */}
      <div className="text-center">
        {isUnlocked ? (
          isSelected ? (
            <div className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              <span>✓</span>
              <span>Ativo</span>
            </div>
          ) : (
            <button className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
              Selecionar
            </button>
          )
        ) : (
          <div className="text-xs text-gray-500">
            <div className="mb-1">🔒 {getUnlockText()}</div>
            <div className="text-xs">{getProgressText()}</div>
          </div>
        )}
      </div>

      {/* Badge selecionado */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          ✓
        </div>
      )}
    </div>
  );
}

export default ThemeSelector;