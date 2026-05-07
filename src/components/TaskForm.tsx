import { FormEvent, useState } from 'react';

type TaskFormProps = {
  onCreate: (title: string, description: string, priority: 'baja' | 'media' | 'alta', dueDate: string) => Promise<void>;
};

export default function TaskForm({ onCreate }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'baja' | 'media' | 'alta'>('media');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    await onCreate(title.trim(), description.trim(), priority, dueDate);
    setTitle('');
    setDescription('');
    setPriority('media');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form form-glass">
      <div className="form-group">
        <label>
          Título de la Tarea
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ej: Preparar presentación"
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Descripción
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Agrega los detalles importantes..."
            rows={3}
            required
          />
        </label>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>
            Prioridad
            <select value={priority} onChange={(e) => setPriority(e.target.value as any)}>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Fecha de Vencimiento
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
        </div>
      </div>
      <button type="submit" className="primary-button submit-btn">
        <span>+</span> Crear Tarea
      </button>
    </form>
  );
}
