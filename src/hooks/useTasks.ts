import { useCallback, useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { createTask, deleteTask, subscribeUserTasks, updateTask } from '../services/tasks';
import type { Task } from '../types/task';

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeUserTasks(user.uid, (fetchedTasks) => {
      setTasks(fetchedTasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addTask = useCallback(
    async (title: string, description: string) => {
      if (!user) {
        setError('Usuario no autenticado');
        return;
      }

      await createTask(user.uid, { title, description });
    },
    [user]
  );

  const toggleTask = useCallback(async (task: Task) => {
    await updateTask(task.id, { completed: !task.completed });
  }, []);

  const removeTask = useCallback(async (taskId: string) => {
    await deleteTask(taskId);
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    removeTask,
    setError
  };
}
