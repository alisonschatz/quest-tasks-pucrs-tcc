// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { 
  signInAnonymously, 
  onAuthStateChanged,
  signOut 
} from 'firebase/auth';
import { auth } from '../services/firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginAnonymously = async () => {
    try {
      setLoading(true);
      const result = await signInAnonymously(auth);
      console.log('Login anônimo realizado:', result.user.uid);
      return result.user;
    } catch (error) {
      console.error('Erro no login anônimo:', error);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('Logout realizado');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    loginAnonymously,
    logout
  };
}