import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

type SortOption = 'createdAt' | 'dueDate' | 'priority';
type TabOption = 'pending' | 'completed';

function DashboardPage() {
  const { user, logout } = useAuth();
  const { tasks, loading, error, addTask, toggleTask, removeTask, sendTasksSummary } = useTasks();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabOption>('pending');
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSendSummary = async () => {
    await sendTasksSummary();
  };

  const processedTasks = useMemo(() => {
    let filtered = tasks.filter((task) => 
      activeTab === 'completed' ? task.completed : !task.completed
    );

    const priorityWeight = { alta: 3, media: 2, baja: 1 };

    filtered.sort((a, b) => {
      if (sortBy === 'priority') {
        const weightA = priorityWeight[a.priority as keyof typeof priorityWeight] || 0;
        const weightB = priorityWeight[b.priority as keyof typeof priorityWeight] || 0;
        if (weightA !== weightB) return weightB - weightA;
      }
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return filtered;
  }, [tasks, activeTab, sortBy]);

  return (
    <section className="app-shell">
      <div className="app-header glass-header">
        <h1 className="gradient-text">TaskFlow</h1>
        <p>Bienvenido{user?.email ? `, ${user.email}` : ''}. Tu centro de productividad personal.</p>
        <div className="dashboard-actions">
          <button onClick={handleSendSummary} className="secondary-button icon-btn">
            ✉️ Enviar resumen
          </button>
          <button onClick={handleLogout} className="icon-btn">🚪 Salir</button>
        </div>
      </div>

      <div className="app-main">
        <TaskForm onCreate={addTask} />

        {error && <div className="form-error glass-error">{error}</div>}

        <div className="task-controls form-glass">
          <div className="tabs">
            <button 
              className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pendientes
            </button>
            <button 
              className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              Completadas
            </button>
          </div>
          <div className="sort-control">
            <label>Ordenar por:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}>
              <option value="createdAt">Creación (Más recientes)</option>
              <option value="priority">Prioridad (Alta a Baja)</option>
              <option value="dueDate">Vencimiento (Próximas)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">Cargando tu flujo de tareas...</div>
        ) : (
          <TaskList tasks={processedTasks} onToggle={toggleTask} onDelete={removeTask} />
        )}
      </div>
    </section>
  );
}

export default DashboardPage;
