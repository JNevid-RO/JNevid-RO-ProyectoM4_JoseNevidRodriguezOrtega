import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import { firestore } from './firebase';
import type { Task } from '../types/task';

const tasksCollection = collection(firestore, 'tasks');

function normalizeTaskSnapshot(docSnapshot: any): Task {
  const data = docSnapshot.data();
  const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : '';
  const updatedAt = data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : '';

  return {
    id: docSnapshot.id,
    userId: data.userId,
    title: data.title,
    description: data.description,
    completed: data.completed ?? false,
    createdAt,
    updatedAt
  };
}

export const subscribeUserTasks = (userId: string, callback: (tasks: Task[]) => void) => {
  const tasksQuery = query(
    tasksCollection,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(tasksQuery, (snapshot) => {
    const tasks = snapshot.docs.map(normalizeTaskSnapshot);
    callback(tasks);
  });
};

export const createTask = async (userId: string, task: Pick<Task, 'title' | 'description'>) => {
  return addDoc(tasksCollection, {
    userId,
    title: task.title,
    description: task.description,
    completed: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

export const updateTask = async (taskId: string, updates: Partial<Pick<Task, 'title' | 'description' | 'completed'>>) => {
  const taskRef = doc(tasksCollection, taskId);
  return updateDoc(taskRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
};

export const deleteTask = async (taskId: string) => {
  const taskRef = doc(tasksCollection, taskId);
  return deleteDoc(taskRef);
};
