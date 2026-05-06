import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function DashboardPage() {
  const { user, logout } = useAuth();
  const { tasks, loading, error, addTask, toggleTask, removeTask } = useTasks();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <section className="app-shell">
      <div className="app-header">
        <h1>Mis tareas</h1>
        <p>Bienvenido{user?.email ? `, ${user.email}` : ''}. Crea, gestiona y sincroniza tus tareas.</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <div className="app-main">
        <TaskForm onCreate={addTask} />

        {error && <p className="form-error">{error}</p>}

        {loading ? (
          <p>Cargando tareas...</p>
        ) : (
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={removeTask} />
        )}
      </div>
    </section>
  );
}

export default DashboardPage;
