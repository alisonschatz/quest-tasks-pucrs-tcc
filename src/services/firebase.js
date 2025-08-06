// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Sua configuração Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDJ491DcbnLvcJYE55Q1BC5SUiLAt_DdYA',
  authDomain: 'quest-tasks-pucrs.firebaseapp.com',
  projectId: 'quest-tasks-pucrs',
  storageBucket: 'quest-tasks-pucrs.firebasestorage.app',
  messagingSenderId: '930580049684',
  appId: '1:930580049684:web:8c6d1ae61fca983ea7dc01',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

// Inicializar Authentication
export const auth = getAuth(app);

export default app;
