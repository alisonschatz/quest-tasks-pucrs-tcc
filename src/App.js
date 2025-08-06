// src/App.js - Versão final integrada com todos os providers
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { NotificationProvider } from './hooks/useNotifications';
import AuthWrapper from './components/AuthWrapper';
import MainApp from './components/MainApp';
import NotificationSystem from './components/NotificationSystem';
import './App.css';

function App() {
  return (
    <div className="App">
      <NotificationProvider>
        <AuthProvider>
          <TaskProvider>
            <AuthWrapper>
              <MainApp />
              <NotificationSystem />
            </AuthWrapper>
          </TaskProvider>
        </AuthProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;
