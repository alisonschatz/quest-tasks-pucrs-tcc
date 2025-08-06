// src/hooks/useFirebaseQuests.js - Versão expandida com novos campos
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
  serverTimestamp,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAchievements } from '../utils/achievements';

export function useFirebaseQuests(userId) {
  const [tasks, setTasks] = useState([]);
  const [playerData, setPlayerData] = useState({
    level: 1,
    xp: 0,
    totalXp: 0,
    streak: 0,
    lastActiveDate: null,
    achievements: [],
    tasksCompleted: 0,
    avatar: '🦸‍♂️',
    title: 'Aventureiro',
    joinDate: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hook para verificar conquistas
  const { checkAchievements } = useAchievements(playerData, tasks);

  // Escutar mudanças das tarefas em tempo real
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    console.log('useFirebaseQuests: Iniciando para userId:', userId);

    const tasksQuery = query(collection(db, 'tasks'), where('userId', '==', userId));

    const unsubscribeTasks = onSnapshot(
      tasksQuery,
      snapshot => {
        console.log('Snapshot recebido:', snapshot.size, 'documentos');

        const tasksData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            completedAt: data.completedAt?.toDate?.() || null,
            dueDate: data.dueDate || null, // String format YYYY-MM-DD
            timeEstimate: data.timeEstimate || 30,
            description: data.description || '',
            category: data.category || 'geral',
            priority: data.priority || 'media',
            xp: data.xp || getXpForPriority(data.priority || 'media'),
          };
        });

        tasksData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        console.log('Tasks processadas:', tasksData);
        setTasks(tasksData);
        setLoading(false);
        setError(null);
      },
      error => {
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

    console.log('useFirebaseQuests: Configurando player data para:', userId);

    const playerDocRef = doc(db, 'players', userId);

    const unsubscribePlayer = onSnapshot(
      playerDocRef,
      async docSnapshot => {
        console.log('Player doc exists:', docSnapshot.exists());

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          console.log('Player data:', data);

          setPlayerData({
            ...data,
            lastActiveDate: data.lastActiveDate?.toDate?.() || null,
            joinDate: data.joinDate?.toDate?.() || data.createdAt?.toDate?.() || new Date(),
            avatar: data.avatar || '🦸‍♂️',
            title: data.title || getTitleForLevel(data.level || 1),
          });
        } else {
          console.log('Criando novo player document');

          const initialPlayerData = {
            level: 1,
            xp: 0,
            totalXp: 0,
            streak: 0,
            lastActiveDate: serverTimestamp(),
            achievements: [],
            tasksCompleted: 0,
            avatar: '🦸‍♂️',
            title: 'Aventureiro',
            joinDate: serverTimestamp(),
            createdAt: serverTimestamp(),
          };

          try {
            await setDoc(playerDocRef, initialPlayerData);
            console.log('Player document criado');
          } catch (error) {
            console.error('Erro ao criar player document:', error);
            setError(error);
          }
        }
      },
      error => {
        console.error('Erro ao buscar dados do jogador:', error);
        setError(error);
      }
    );

    return () => unsubscribePlayer();
  }, [userId]);

  // Verificar conquistas quando dados mudarem
  useEffect(() => {
    if (!userId || tasks.length === 0) return;

    const newAchievements = checkAchievements();

    if (newAchievements.length > 0) {
      console.log('🏆 Novas conquistas desbloqueadas:', newAchievements);
      updatePlayerAchievements(newAchievements);
    }
  }, [playerData.tasksCompleted, playerData.streak, playerData.level, tasks.length]);

  const addTask = async taskData => {
    if (!userId) {
      console.error('Sem userId para adicionar tarefa');
      return;
    }

    console.log('Adicionando tarefa:', taskData);

    try {
      const xp = getXpForPriority(taskData.priority);
      const docRef = await addDoc(collection(db, 'tasks'), {
        title: taskData.title,
        description: taskData.description || '',
        category: taskData.category || 'geral',
        priority: taskData.priority || 'media',
        dueDate: taskData.dueDate || null,
        timeEstimate: taskData.timeEstimate || 30,
        xp: xp,
        userId,
        completed: false,
        createdAt: serverTimestamp(),
        completedAt: null,
      });

      console.log('Tarefa adicionada com ID:', docRef.id);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      setError(error);
      throw error;
    }
  };

  const completeTask = async taskId => {
    if (!userId) return;

    console.log('Completando tarefa:', taskId);

    try {
      // Atualizar tarefa
      await updateDoc(doc(db, 'tasks', taskId), {
        completed: true,
        completedAt: serverTimestamp(),
      });

      // Calcular XP
      const task = tasks.find(t => t.id === taskId);
      const xpGain = task?.xp || getXpForPriority(task?.priority || 'media');

      console.log('XP ganho:', xpGain, 'para prioridade:', task?.priority);

      // Atualizar dados do jogador
      await updatePlayerStats(xpGain);
    } catch (error) {
      console.error('Erro ao completar tarefa:', error);
      setError(error);
      throw error;
    }
  };

  const updatePlayerStats = async xpGain => {
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

        // Atualizar título baseado no nível
        const newTitle = getTitleForLevel(newLevel);

        console.log('Atualizando stats:', {
          xp: newXp,
          totalXp: newTotalXp,
          level: newLevel,
          streak: newStreak,
          tasksCompleted: newTasksCompleted,
          title: newTitle,
        });

        await updateDoc(playerRef, {
          xp: newXp,
          totalXp: newTotalXp,
          level: newLevel,
          streak: newStreak,
          tasksCompleted: newTasksCompleted,
          title: newTitle,
          lastActiveDate: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar stats do jogador:', error);
      setError(error);
      throw error;
    }
  };

  const updatePlayerAchievements = async newAchievements => {
    if (!userId || newAchievements.length === 0) return;

    try {
      const playerRef = doc(db, 'players', userId);
      const playerDoc = await getDoc(playerRef);

      if (playerDoc.exists()) {
        const currentData = playerDoc.data();
        const updatedAchievements = [...(currentData.achievements || []), ...newAchievements];

        // Calcular XP bônus das conquistas
        const { ACHIEVEMENTS } = await import('../utils/achievements');
        const bonusXP = newAchievements.reduce((total, achievementId) => {
          return total + (ACHIEVEMENTS[achievementId]?.xpReward || 0);
        }, 0);

        const newTotalXp = (currentData.totalXp || 0) + bonusXP;
        const newLevel = Math.floor(newTotalXp / 100) + 1;
        const newXp = newTotalXp % 100;
        const newTitle = getTitleForLevel(newLevel);

        console.log('🏆 Atualizando conquistas:', {
          achievements: updatedAchievements,
          bonusXP,
          newTotalXp,
          newLevel,
          newTitle,
        });

        await updateDoc(playerRef, {
          achievements: updatedAchievements,
          totalXp: newTotalXp,
          level: newLevel,
          xp: newXp,
          title: newTitle,
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar conquistas:', error);
      setError(error);
      throw error;
    }
  };

  const deleteTask = async taskId => {
    if (!userId) return;

    console.log('Deletando tarefa:', taskId);

    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      console.log('Tarefa deletada');
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      setError(error);
      throw error;
    }
  };

  const updatePlayerAvatar = async newAvatar => {
    if (!userId) return;

    try {
      const playerRef = doc(db, 'players', userId);
      await updateDoc(playerRef, {
        avatar: newAvatar,
      });
      console.log('Avatar atualizado:', newAvatar);
    } catch (error) {
      console.error('Erro ao atualizar avatar:', error);
      setError(error);
      throw error;
    }
  };

  return {
    tasks,
    playerData,
    loading,
    error,
    addTask,
    completeTask,
    deleteTask,
    updatePlayerAvatar,
  };
}

function getXpForPriority(priority) {
  const xpMap = {
    baixa: 15,
    media: 30,
    alta: 50,
  };
  return xpMap[priority] || 30;
}

function getTitleForLevel(level) {
  if (level < 5) return 'Aventureiro';
  if (level < 10) return 'Explorador';
  if (level < 15) return 'Guerreiro';
  if (level < 20) return 'Veterano';
  if (level < 25) return 'Especialista';
  if (level < 30) return 'Mestre';
  if (level < 40) return 'Lenda';
  return 'Deus das Quests';
}
