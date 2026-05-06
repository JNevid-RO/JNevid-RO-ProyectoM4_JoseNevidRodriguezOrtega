import type { Task } from '../types/task';

type TaskListProps = {
  tasks: Task[];
  onToggle: (task: Task) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
};

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p>No hay tareas creadas aún.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
          <div className="task-card__main">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
          <div className="task-card__actions">
            <button type="button" onClick={() => onToggle(task)}>
              {task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
            </button>
            <button type="button" className="danger-button" onClick={() => onDelete(task.id)}>
              Eliminar
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
