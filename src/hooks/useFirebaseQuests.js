// src/hooks/useFirebaseQuests.js
import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { db } from '../services/firebase';

export function useFirebaseQuests(userId) {
  const [tasks, setTasks] = useState([]);
  const [playerData, setPlayerData] = useState({
    level: 1,
    xp: 0,
    totalXp: 0,
    streak: 0,
    lastActiveDate: null,
    achievements: [],
    tasksCompleted: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Escutar mudanças das tarefas em tempo real
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const tasksQuery = query(
      collection(db, 'tasks'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeTasks = onSnapshot(
      tasksQuery, 
      (snapshot) => {
        const tasksData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date(),
          completedAt: doc.data().completedAt?.toDate?.() || null
        }));
        setTasks(tasksData);
        setLoading(false);
      },
      (error) => {
        console.error('Erro ao buscar tarefas:', error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribeTasks();
  }, [userId]);

  // Escutar mudanças dos dados do jogador
  useEffect(() => {
    if (!userId) return;

    const playerDocRef = doc(db, 'players', userId);
    
    const unsubscribePlayer = onSnapshot(
      playerDocRef,
      async (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setPlayerData({
            ...data,
            lastActiveDate: data.lastActiveDate?.toDate?.() || null
          });
        } else {
          // Criar documento do jogador se não existir
          const initialPlayerData = {
            level: 1,
            xp: 0,
            totalXp: 0,
            streak: 0,
            lastActiveDate: serverTimestamp(),
            achievements: [],
            tasksCompleted: 0,
            createdAt: serverTimestamp()
          };
          
          await setDoc(playerDocRef, initialPlayerData);
        }
      },
      (error) => {
        console.error('Erro ao buscar dados do jogador:', error);
        setError(error);
      }
    );

    return () => unsubscribePlayer();
  }, [userId]);

  // Adicionar nova tarefa
  const addTask = async (taskData) => {
    if (!userId) return;

    try {
      await addDoc(collection(db, 'tasks'), {
        ...taskData,
        userId,
        completed: false,
        createdAt: serverTimestamp(),
        completedAt: null
      });
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      setError(error);
    }
  };

  // Completar tarefa
  const completeTask = async (taskId) => {
    if (!userId) return;

    try {
      // Atualizar tarefa
      await updateDoc(doc(db, 'tasks', taskId), {
        completed: true,
        completedAt: serverTimestamp()
      });

      // Calcular XP
      const task = tasks.find(t => t.id === taskId);
      const xpGain = getXpForPriority(task?.priority || 'media');
      
      // Atualizar dados do jogador
      await updatePlayerStats(xpGain);

    } catch (error) {
      console.error('Erro ao completar tarefa:', error);
      setError(error);
    }
  };

  // Atualizar estatísticas do jogador
  const updatePlayerStats = async (xpGain) => {
    if (!userId) return;

    try {
      const playerRef = doc(db, 'players', userId);
      const playerDoc = await getDoc(playerRef);
      
      if (playerDoc.exists()) {
        const currentData = playerDoc.data();
        const newTotalXp = (currentData.totalXp || 0) + xpGain;
        const newLevel = Math.floor(newTotalXp / 100) + 1;
        const newXp = newTotalXp % 100;
        const newTasksCompleted = (currentData.tasksCompleted || 0) + 1;

        // Verificar streak
        const today = new Date().toDateString();
        const lastDate = currentData.lastActiveDate?.toDate?.()?.toDateString();
        
        let newStreak = currentData.streak || 0;
        if (lastDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const wasYesterday = lastDate === yesterday.toDateString();
          newStreak = wasYesterday ? newStreak + 1 : 1;
        }

        // Verificar novas conquistas
        const newAchievements = checkNewAchievements(
          currentData.achievements || [],
          newTasksCompleted,
          newStreak,
          newLevel
        );

        await updateDoc(playerRef, {
          xp: newXp,
          totalXp: newTotalXp,
          level: newLevel,
          streak: newStreak,
          tasksCompleted: newTasksCompleted,
          achievements: newAchievements,
          lastActiveDate: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar stats do jogador:', error);
      setError(error);
    }
  };

  // Deletar tarefa
  const deleteTask = async (taskId) => {
    if (!userId) return;

    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      setError(error);
    }
  };

  return {
    tasks,
    playerData,
    loading,
    error,
    addTask,
    completeTask,
    deleteTask
  };
}

// Funções auxiliares
function getXpForPriority(priority) {
  const xpMap = {
    'baixa': 10,
    'media': 25,
    'alta': 50
  };
  return xpMap[priority] || 25;
}

function checkNewAchievements(currentAchievements, tasksCompleted, streak, level) {
  const newAchievements = [...currentAchievements];

  // Primeira Quest
  if (tasksCompleted >= 1 && !newAchievements.includes('first-quest')) {
    newAchievements.push('first-quest');
  }

  // Mestre das Tarefas
  if (tasksCompleted >= 10 && !newAchievements.includes('task-master')) {
    newAchievements.push('task-master');
  }

  // Consistência
  if (streak >= 3 && !newAchievements.includes('consistency')) {
    newAchievements.push('consistency');
  }

  // Veterano
  if (level >= 5 && !newAchievements.includes('veteran')) {
    newAchievements.push('veteran');
  }

  return newAchievements;
}