export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'baja' | 'media' | 'alta';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
};
