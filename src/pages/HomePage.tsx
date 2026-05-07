import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function HomePage() {
  const { user } = useAuth();

  return (
    <section className="app-shell">
      <div className="app-header glass-header">
        <h1 className="gradient-text">TaskFlow</h1>
        <p style={{fontSize: '1.2rem', color: '#475569', marginBottom: '2rem'}}>Organiza tus tareas diarias con diseño y fluidez.</p>
        <div className="app-main" style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
          {user ? (
            <Link to="/tasks" className="primary-button" style={{textDecoration: 'none'}}>Ir a mis tareas</Link>
          ) : (
            <>
              <Link to="/login" className="secondary-button" style={{textDecoration: 'none'}}>Iniciar sesión</Link>
              <Link to="/register" className="primary-button" style={{textDecoration: 'none'}}>Crear cuenta</Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
