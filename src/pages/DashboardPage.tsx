import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <section className="app-shell">
      <div className="app-header">
        <h1>Mis tareas</h1>
        <p>Bienvenido{user?.email ? `, ${user.email}` : ''}. Esta es tu área privada.</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </section>
  );
}

export default DashboardPage;
