import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function HomePage() {
  const { user } = useAuth();

  return (
    <section className="app-shell">
      <div className="app-header">
        <h1>MateCode Task Manager</h1>
        <p>Organiza tus tareas diarias con persistencia en la nube.</p>
        <div className="app-main">
          {user ? (
            <Link to="/tasks">Ir a mis tareas</Link>
          ) : (
            <>
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/register">Crear cuenta</Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
