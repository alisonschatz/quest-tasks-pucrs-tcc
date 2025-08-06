// src/components/NotificationSystem.js
import React from 'react';
import { X, CheckCircle, AlertCircle, Info, Zap } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';

const NotificationSystem = () => {
  const { notifications, removeNotification } = useNotifications();

  const getNotificationIcon = type => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-400" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-400" />;
      case 'warning':
        return <AlertCircle size={20} className="text-yellow-400" />;
      case 'achievement':
        return <Zap size={20} className="text-purple-400" />;
      default:
        return <Info size={20} className="text-blue-400" />;
    }
  };

  const getNotificationStyles = type => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 border-green-500/30 text-green-100';
      case 'error':
        return 'bg-red-500/20 border-red-500/30 text-red-100';
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-100';
      case 'achievement':
        return 'bg-purple-500/20 border-purple-500/30 text-purple-100';
      default:
        return 'bg-blue-500/20 border-blue-500/30 text-blue-100';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map(notification => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
          icon={getNotificationIcon(notification.type)}
          styles={getNotificationStyles(notification.type)}
        />
      ))}
    </div>
  );
};

const NotificationCard = ({ notification, onClose, icon, styles }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isExiting, setIsExiting] = React.useState(false);

  React.useEffect(() => {
    // Entrance animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  // Auto close for certain types
  React.useEffect(() => {
    if (notification.type === 'success' || notification.type === 'info') {
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification.type]);

  return (
    <div
      className={`transform transition-all duration-300 ease-out ${
        isVisible && !isExiting
          ? 'translate-x-0 opacity-100 scale-100'
          : 'translate-x-full opacity-0 scale-95'
      }`}
    >
      <div
        className={`px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-lg ${styles} max-w-sm`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            <div className="flex-shrink-0 mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm leading-5">{notification.message}</p>
              {notification.description && (
                <p className="text-xs opacity-80 mt-1">{notification.description}</p>
              )}
            </div>
          </div>

          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-2 opacity-60 hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress bar for timed notifications */}
        {(notification.type === 'success' || notification.type === 'info') && (
          <div className="mt-2 w-full bg-black/20 rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-white/30 rounded-full animate-progress-bar"
              style={{ animation: 'progress-bar 4s linear forwards' }}
            ></div>
          </div>
        )}

        {/* Special effects for achievements */}
        {notification.type === 'achievement' && (
          <div className="absolute -top-1 -right-1">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSystem;
