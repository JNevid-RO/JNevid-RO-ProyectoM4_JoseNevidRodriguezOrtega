import { FormEvent, useState } from 'react';

type TaskFormProps = {
  onCreate: (title: string, description: string) => Promise<void>;
};

export default function TaskForm({ onCreate }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    await onCreate(title.trim(), description.trim());
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label>
        Título
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Describe tu tarea"
          required
        />
      </label>
      <label>
        Descripción
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Detalles de la tarea"
          rows={3}
          required
        />
      </label>
      <button type="submit">Agregar tarea</button>
    </form>
  );
}
