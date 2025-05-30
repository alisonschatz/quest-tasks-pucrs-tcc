// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { 
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../services/firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('🔐 useAuth: Iniciando...');
    
    const unsubscribe = onAuthStateChanged(
      auth, 
      (user) => {
        console.log('Auth state changed:', user?.email || 'no user');
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error('Auth error:', error);
        setError(error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    try {
      console.log('🚀 Tentando login com Google...');
      setLoading(true);
      setError(null);
      
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider);
      console.log('✅ Login realizado:', result.user.email);
      
      return result.user;
    } catch (error) {
      console.error('❌ Erro no login Google:', error);
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('👋 Fazendo logout...');
      await signOut(auth);
      console.log('✅ Logout realizado');
    } catch (error) {
      console.error('❌ Erro no logout:', error);
      setError(error);
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    loginWithGoogle,
    logout
  };
}