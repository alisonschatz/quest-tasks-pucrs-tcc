// src/index.js - Arquivo de entrada principal do React
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Performance measurement (optional)
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring
function sendToAnalytics(metric) {
  // Here you could send to Google Analytics, Firebase Analytics, etc.
  console.log('Web Vitals:', metric);
}

// Measure performance
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
