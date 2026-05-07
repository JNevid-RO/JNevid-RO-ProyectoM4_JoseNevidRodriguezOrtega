import type { Task } from '../types/task';

type TaskListProps = {
  tasks: Task[];
  onToggle: (task: Task) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
};

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <div className="empty-state">No hay tareas creadas aún. ¡Añade una nueva!</div>;
  }

  const formatDate = (isoString: string) => {
    if (!isoString) return 'Sin fecha';
    return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short' }).format(new Date(isoString));
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
          <div className="task-card__header">
            <span className={`priority-badge priority-${task.priority || 'media'}`}>
              {(task.priority || 'media').toUpperCase()}
            </span>
            <span className="task-date">Vence: {task.dueDate ? formatDate(task.dueDate) : 'Sin límite'}</span>
          </div>
          <div className="task-card__main">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
          <div className="task-card__footer">
            <span className="task-date created">Creada: {formatDate(task.createdAt)}</span>
            <div className="task-card__actions">
              <button type="button" className={`action-btn ${task.completed ? 'undo-btn' : 'complete-btn'}`} onClick={() => onToggle(task)}>
                {task.completed ? '↺ Restaurar' : '✓ Completar'}
              </button>
              <button type="button" className="action-btn danger-button" onClick={() => onDelete(task.id)}>
                ✕
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
