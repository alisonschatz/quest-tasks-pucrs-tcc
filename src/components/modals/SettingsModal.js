// src/components/modals/SettingsModal.js
import React, { useState, useEffect } from 'react';
import {
  X,
  Settings,
  Bell,
  Palette,
  Download,
  Upload,
  Trash2,
  Moon,
  Sun,
  Monitor,
  Volume2,
  VolumeX,
  Shield,
  Database,
  RotateCcw,
  Save,
  AlertTriangle,
} from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import { useTasks } from '../../contexts/TaskContext';

const SettingsModal = ({ show, onClose }) => {
  const { showNotification } = useNotifications();
  const { tasks, playerData } = useTasks();

  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      taskReminders: true,
      achievements: true,
      dailyStreaks: true,
      weeklyReports: false,
      soundEnabled: true,
    },
    appearance: {
      theme: 'auto', // auto, light, dark
      colorScheme: 'purple', // purple, blue, green, pink
      animations: true,
      reducedMotion: false,
    },
    privacy: {
      shareStats: false,
      publicProfile: false,
      analyticsOptIn: true,
    },
    advanced: {
      autoBackup: true,
      betaFeatures: false,
      developerMode: false,
    },
  });

  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('quest-tasks-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
    setIsDirty(true);
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem('quest-tasks-settings', JSON.stringify(settings));

      // Here you could also save to Firebase/user preferences
      // await updateUserSettings(settings);

      setIsDirty(false);
      showNotification('Configurações salvas com sucesso! ⚙️', 'success');
    } catch (error) {
      console.error('Error saving settings:', error);
      showNotification('Erro ao salvar configurações 😞', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const resetSettings = () => {
    if (window.confirm('Tem certeza que deseja restaurar todas as configurações padrão?')) {
      setSettings({
        notifications: {
          taskReminders: true,
          achievements: true,
          dailyStreaks: true,
          weeklyReports: false,
          soundEnabled: true,
        },
        appearance: {
          theme: 'auto',
          colorScheme: 'purple',
          animations: true,
          reducedMotion: false,
        },
        privacy: {
          shareStats: false,
          publicProfile: false,
          analyticsOptIn: true,
        },
        advanced: {
          autoBackup: true,
          betaFeatures: false,
          developerMode: false,
        },
      });
      setIsDirty(true);
      showNotification('Configurações restauradas! 🔄', 'info');
    }
  };

  const exportData = () => {
    try {
      const exportData = {
        playerData,
        tasks: tasks.map(task => ({
          ...task,
          createdAt: task.createdAt?.toISOString(),
          completedAt: task.completedAt?.toISOString(),
        })),
        settings,
        exportDate: new Date().toISOString(),
        version: '1.0',
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `quest-tasks-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();

      URL.revokeObjectURL(url);
      showNotification('Dados exportados com sucesso! 📥', 'success');
    } catch (error) {
      console.error('Error exporting data:', error);
      showNotification('Erro ao exportar dados 😞', 'error');
    }
  };

  const importData = event => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      try {
        const result = e.target && e.target.result;
        if (typeof result === 'string') {
          const importedData = JSON.parse(result);

          if (window.confirm('Importar dados substituirá suas informações atuais. Continuar?')) {
            // Here you would implement the import logic
            console.log('Importing data:', importedData);
            showNotification('Funcionalidade de importação em desenvolvimento 🚧', 'info');
          }
        }
      } catch (error) {
        console.error('Error importing data:', error);
        showNotification('Arquivo inválido ou corrompido 😞', 'error');
      }
    };
    reader.readAsText(file);

    // Reset input
    event.target.value = '';
  };

  const clearAllData = () => {
    const confirmText = 'APAGAR TUDO';
    const userInput = prompt(
      `⚠️ ATENÇÃO: Esta ação é IRREVERSÍVEL!\n\n` +
        `Todos os seus dados serão permanentemente apagados:\n` +
        `• Todas as quests\n` +
        `• Progresso e XP\n` +
        `• Conquistas\n` +
        `• Configurações\n\n` +
        `Digite "${confirmText}" (sem aspas) para confirmar:`
    );

    if (userInput === confirmText) {
      // Here you would implement the data clearing logic
      console.log('Clearing all data...');
      showNotification('Funcionalidade de limpeza em desenvolvimento 🚧', 'info');
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-slate-800 rounded-3xl p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-3xl font-bold flex items-center space-x-3">
              <Settings className="text-blue-400" size={32} />
              <span>Configurações</span>
            </h3>
            <p className="text-gray-400 mt-2">Personalize sua experiência no Quest Tasks</p>
          </div>
          <div className="flex items-center space-x-2">
            {isDirty && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={saveSettings}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  ) : (
                    <Save size={16} />
                  )}
                  <span>Salvar</span>
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-gray-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-500/30">
              <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center space-x-2">
                <Bell size={20} />
                <span>Notificações</span>
              </h4>

              <div className="space-y-4">
                <ToggleSetting
                  label="Lembretes de Tarefas"
                  description="Receba lembretes sobre tarefas pendentes"
                  checked={settings.notifications.taskReminders}
                  onChange={checked => updateSetting('notifications', 'taskReminders', checked)}
                />

                <ToggleSetting
                  label="Conquistas"
                  description="Notificações quando conquistar achievements"
                  checked={settings.notifications.achievements}
                  onChange={checked => updateSetting('notifications', 'achievements', checked)}
                />

                <ToggleSetting
                  label="Streaks Diários"
                  description="Lembrete para manter sua sequência"
                  checked={settings.notifications.dailyStreaks}
                  onChange={checked => updateSetting('notifications', 'dailyStreaks', checked)}
                />

                <ToggleSetting
                  label="Relatórios Semanais"
                  description="Resumo semanal do seu progresso"
                  checked={settings.notifications.weeklyReports}
                  onChange={checked => updateSetting('notifications', 'weeklyReports', checked)}
                />

                <ToggleSetting
                  label="Sons"
                  description="Efeitos sonoros para feedback"
                  checked={settings.notifications.soundEnabled}
                  onChange={checked => updateSetting('notifications', 'soundEnabled', checked)}
                  icon={
                    settings.notifications.soundEnabled ? (
                      <Volume2 size={16} />
                    ) : (
                      <VolumeX size={16} />
                    )
                  }
                />
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
              <h4 className="text-xl font-semibold text-green-300 mb-4 flex items-center space-x-2">
                <Shield size={20} />
                <span>Privacidade</span>
              </h4>

              <div className="space-y-4">
                <ToggleSetting
                  label="Compartilhar Estatísticas"
                  description="Permitir compartilhamento anônimo de stats"
                  checked={settings.privacy.shareStats}
                  onChange={checked => updateSetting('privacy', 'shareStats', checked)}
                />

                <ToggleSetting
                  label="Perfil Público"
                  description="Tornar seu perfil visível para outros usuários"
                  checked={settings.privacy.publicProfile}
                  onChange={checked => updateSetting('privacy', 'publicProfile', checked)}
                />

                <ToggleSetting
                  label="Analytics"
                  description="Ajudar a melhorar o app compartilhando dados de uso"
                  checked={settings.privacy.analyticsOptIn}
                  onChange={checked => updateSetting('privacy', 'analyticsOptIn', checked)}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Appearance */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
              <h4 className="text-xl font-semibold text-purple-300 mb-4 flex items-center space-x-2">
                <Palette size={20} />
                <span>Aparência</span>
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">Tema</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'light', label: 'Claro', icon: <Sun size={16} /> },
                      { id: 'dark', label: 'Escuro', icon: <Moon size={16} /> },
                      { id: 'auto', label: 'Auto', icon: <Monitor size={16} /> },
                    ].map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => updateSetting('appearance', 'theme', theme.id)}
                        className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center space-y-1 ${
                          settings.appearance.theme === theme.id
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        {theme.icon}
                        <span className="text-xs">{theme.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Esquema de Cores
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'purple', color: 'bg-purple-500' },
                      { id: 'blue', color: 'bg-blue-500' },
                      { id: 'green', color: 'bg-green-500' },
                      { id: 'pink', color: 'bg-pink-500' },
                    ].map(scheme => (
                      <button
                        key={scheme.id}
                        onClick={() => updateSetting('appearance', 'colorScheme', scheme.id)}
                        className={`w-full h-10 rounded-lg border-2 transition-all ${scheme.color} ${
                          settings.appearance.colorScheme === scheme.id
                            ? 'border-white scale-110'
                            : 'border-gray-600 hover:border-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <ToggleSetting
                  label="Animações"
                  description="Efeitos visuais e transições"
                  checked={settings.appearance.animations}
                  onChange={checked => updateSetting('appearance', 'animations', checked)}
                />

                <ToggleSetting
                  label="Movimento Reduzido"
                  description="Para usuários sensíveis ao movimento"
                  checked={settings.appearance.reducedMotion}
                  onChange={checked => updateSetting('appearance', 'reducedMotion', checked)}
                />
              </div>
            </div>

            {/* Data Management */}
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-500/30">
              <h4 className="text-xl font-semibold text-orange-300 mb-4 flex items-center space-x-2">
                <Database size={20} />
                <span>Gerenciamento de Dados</span>
              </h4>

              <div className="space-y-4">
                <ToggleSetting
                  label="Backup Automático"
                  description="Fazer backup dos dados automaticamente"
                  checked={settings.advanced.autoBackup}
                  onChange={checked => updateSetting('advanced', 'autoBackup', checked)}
                />

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={exportData}
                    className="flex items-center justify-center space-x-2 p-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
                  >
                    <Download size={16} />
                    <span>Exportar</span>
                  </button>

                  <label className="flex items-center justify-center space-x-2 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors cursor-pointer">
                    <Upload size={16} />
                    <span>Importar</span>
                    <input type="file" accept=".json" onChange={importData} className="hidden" />
                  </label>
                </div>

                <div className="pt-4 border-t border-orange-500/30">
                  <div className="flex items-center space-x-2 mb-3 text-red-400">
                    <AlertTriangle size={16} />
                    <span className="text-sm font-medium">Zona de Perigo</span>
                  </div>

                  <button
                    onClick={clearAllData}
                    className="w-full flex items-center justify-center space-x-2 p-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                  >
                    <Trash2 size={16} />
                    <span>Apagar Todos os Dados</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="mt-8 bg-gray-500/20 rounded-2xl p-6 border border-gray-500/30">
          <h4 className="text-xl font-semibold text-gray-300 mb-4">🔧 Avançado</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ToggleSetting
              label="Recursos Beta"
              description="Testar funcionalidades experimentais"
              checked={settings.advanced.betaFeatures}
              onChange={checked => updateSetting('advanced', 'betaFeatures', checked)}
            />

            <ToggleSetting
              label="Modo Desenvolvedor"
              description="Logs detalhados e informações de debug"
              checked={settings.advanced.developerMode}
              onChange={checked => updateSetting('advanced', 'developerMode', checked)}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={resetSettings}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors"
          >
            <RotateCcw size={16} />
            <span>Restaurar Padrões</span>
          </button>

          {isDirty && (
            <div className="flex items-center space-x-2 text-yellow-400">
              <AlertTriangle size={16} />
              <span className="text-sm">Alterações não salvas</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Component for toggle settings
const ToggleSetting = ({ label, description, checked, onChange, icon }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          {icon}
          <span className="font-medium text-white">{label}</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
          checked ? 'bg-green-600 focus:ring-green-500' : 'bg-gray-600 focus:ring-gray-500'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default SettingsModal;
